import { NextResponse } from 'next/server'
import { getPayloadClient } from '@/lib/payload'

export async function GET() {
  const checks = {
    database: { ok: false, label: 'Baza podataka', detail: '' },
    blob: { ok: false, label: 'Vercel Blob (slike)', detail: '' },
    payloadSecret: { ok: false, label: 'PAYLOAD_SECRET', detail: '' },
    siteUrl: { ok: false, label: 'NEXT_PUBLIC_SITE_URL', detail: '' },
    env: process.env.NODE_ENV ?? 'unknown',
  }

  // Database
  try {
    const payload = await getPayloadClient()
    await payload.find({ collection: 'users', limit: 0 })
    checks.database.ok = true
    checks.database.detail = process.env.DATABASE_URI?.startsWith('file:')
      ? 'SQLite (lokalno)'
      : 'PostgreSQL'
  } catch (e) {
    checks.database.detail = e instanceof Error ? e.message : 'Greška pri konekciji'
  }

  // Vercel Blob
  const blobToken = process.env.BLOB_READ_WRITE_TOKEN
  if (blobToken && blobToken.startsWith('vercel_blob_rw_')) {
    checks.blob.ok = true
    checks.blob.detail = `Store: ${blobToken.split('_')[3] ?? '?'}`
  } else {
    checks.blob.detail = blobToken ? 'Nevažeći token format' : 'Nije podešeno (lokalni upload)'
  }

  // PAYLOAD_SECRET
  const secret = process.env.PAYLOAD_SECRET
  if (secret && secret.length >= 32) {
    checks.payloadSecret.ok = true
    checks.payloadSecret.detail = `${secret.length} znakova`
  } else if (secret) {
    checks.payloadSecret.detail = `Prekratak (${secret.length} znakova, min 32)`
  } else {
    checks.payloadSecret.detail = 'Nije postavljeno (koristi se default!)'
  }

  // NEXT_PUBLIC_SITE_URL
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  if (siteUrl && siteUrl.startsWith('http')) {
    checks.siteUrl.ok = true
    checks.siteUrl.detail = siteUrl
  } else {
    checks.siteUrl.detail = siteUrl ?? 'Nije postavljeno'
  }

  return NextResponse.json(checks)
}
