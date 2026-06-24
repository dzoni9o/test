import { NextRequest, NextResponse } from 'next/server'
import { getProducts } from '@/lib/api'

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl
  try {
    const result = await getProducts({
      category: searchParams.get('category') ?? undefined,
      brand: searchParams.get('brand') ?? undefined,
      search: searchParams.get('q') ?? undefined,
      page: Number(searchParams.get('page') ?? 1),
      limit: Number(searchParams.get('limit') ?? 24),
      sort: searchParams.get('sort') ?? undefined,
      featured: searchParams.get('featured') === 'true',
      onSale: searchParams.get('onSale') === 'true',
    })
    return NextResponse.json(result)
  } catch (err) {
    return NextResponse.json({ error: 'Greška pri učitavanju proizvoda' }, { status: 500 })
  }
}
