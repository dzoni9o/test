import { NextRequest, NextResponse } from 'next/server'
import { parse } from 'csv-parse/sync'
import { getPayloadClient } from '@/lib/payload'
import type { Where } from 'payload'

type CsvRow = {
  naziv: string
  sifra: string
  barkod?: string
  kratki_opis?: string
  cena_bez_pdv: string
  precrtana_cena?: string
  b2b_cena?: string
  zaliha?: string
  status_zalihe?: string
  jedinica?: string
  min_kolicina?: string
  kategorija?: string
  brend?: string
  tagovi?: string
  istaknuto?: string
  novo?: string
  akcija?: string
  status?: string
  specifikacije?: string
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[čć]/g, 'c')
    .replace(/š/g, 's')
    .replace(/ž/g, 'z')
    .replace(/đ/g, 'dj')
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
    .trim()
}

function parseSpecs(raw: string) {
  if (!raw?.trim()) return []
  return raw.split('|').map((pair) => {
    const [key, value] = pair.split(':')
    return { key: key?.trim() ?? '', value: value?.trim() ?? '', unit: '' }
  }).filter((s) => s.key)
}

function parseTags(raw: string) {
  if (!raw?.trim()) return []
  return raw.split(';').map((t) => ({ tag: t.trim() })).filter((t) => t.tag)
}

function bool(val: string | undefined): boolean {
  return val?.trim().toLowerCase() === 'true' || val?.trim() === '1'
}

export async function POST(req: NextRequest) {
  const payload = await getPayloadClient()

  const formData = await req.formData()
  const file = formData.get('file') as File | null
  const dryRun = formData.get('dryRun') === 'true'

  if (!file) {
    return NextResponse.json({ error: 'Nije priložen fajl' }, { status: 400 })
  }

  const text = await file.text()

  let rows: CsvRow[]
  try {
    rows = parse(text, {
      columns: true,
      skip_empty_lines: true,
      trim: true,
      bom: true,
    }) as CsvRow[]
  } catch {
    return NextResponse.json({ error: 'Nevažeći CSV format' }, { status: 400 })
  }

  const results = {
    total: rows.length,
    created: 0,
    updated: 0,
    skipped: 0,
    errors: [] as { row: number; sifra: string; reason: string }[],
  }

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i]
    const rowNum = i + 2

    if (!row.naziv?.trim() || !row.sifra?.trim()) {
      results.errors.push({ row: rowNum, sifra: row.sifra ?? '', reason: 'Nedostaje naziv ili šifra' })
      results.skipped++
      continue
    }

    const price = parseFloat(row.cena_bez_pdv)
    if (isNaN(price) || price <= 0) {
      results.errors.push({ row: rowNum, sifra: row.sifra, reason: 'Nevažeća cena' })
      results.skipped++
      continue
    }

    // Resolve category
    let categoryId: string | undefined
    if (row.kategorija?.trim()) {
      const catResult = await payload.find({
        collection: 'categories',
        where: { slug: { equals: row.kategorija.trim() } } as Where,
        limit: 1,
      })
      if (catResult.docs.length > 0) {
        categoryId = catResult.docs[0].id as string
      }
    }

    // Resolve brand
    let brandId: string | undefined
    if (row.brend?.trim()) {
      const brandResult = await payload.find({
        collection: 'brands',
        where: { name: { equals: row.brend.trim() } } as Where,
        limit: 1,
      })
      if (brandResult.docs.length > 0) {
        brandId = brandResult.docs[0].id as string
      } else if (!dryRun) {
        // Auto-create brand
        const newBrand = await payload.create({
          collection: 'brands',
          data: {
            name: row.brend.trim(),
            slug: slugify(row.brend.trim()),
          },
        })
        brandId = newBrand.id as string
      }
    }

    const productData = {
      name: row.naziv.trim(),
      slug: slugify(row.naziv.trim()),
      sku: row.sifra.trim(),
      barcode: row.barkod?.trim() || undefined,
      shortDescription: row.kratki_opis?.trim() || undefined,
      price,
      priceWithVat: Math.round(price * 1.2 * 100) / 100,
      comparePrice: row.precrtana_cena ? parseFloat(row.precrtana_cena) : undefined,
      b2bPrice: row.b2b_cena ? parseFloat(row.b2b_cena) : undefined,
      stock: row.zaliha ? parseInt(row.zaliha) : 0,
      stockStatus: (row.status_zalihe?.trim() || 'in_stock') as 'in_stock' | 'out_of_stock' | 'on_request' | 'preorder',
      unit: (row.jedinica?.trim() || 'kom') as 'kom' | 'm' | 'kg' | 'pak' | 'kutija',
      minOrderQty: row.min_kolicina ? parseInt(row.min_kolicina) : 1,
      category: categoryId,
      brand: brandId,
      tags: parseTags(row.tagovi ?? ''),
      specs: parseSpecs(row.specifikacije ?? ''),
      featured: bool(row.istaknuto),
      isNew: bool(row.novo),
      onSale: bool(row.akcija),
      status: (row.status?.trim() || 'active') as 'active' | 'draft' | 'archived',
    }

    if (dryRun) {
      results.created++
      continue
    }

    try {
      // Check if exists by SKU
      const existing = await payload.find({
        collection: 'products',
        where: { sku: { equals: row.sifra.trim() } } as Where,
        limit: 1,
      })

      if (existing.docs.length > 0) {
        await payload.update({
          collection: 'products',
          id: existing.docs[0].id as string,
          data: productData,
        })
        results.updated++
      } else {
        await payload.create({
          collection: 'products',
          data: productData,
        })
        results.created++
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Nepoznata greška'
      results.errors.push({ row: rowNum, sifra: row.sifra, reason: message })
      results.skipped++
    }
  }

  return NextResponse.json(results)
}
