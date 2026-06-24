import { NextRequest, NextResponse } from 'next/server'
import { getPayloadClient } from '@/lib/payload'

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get('q')?.trim()
  if (!q || q.length < 2) return NextResponse.json({ docs: [], totalDocs: 0 })

  try {
    const payload = await getPayloadClient()
    const result = await payload.find({
      collection: 'products',
      where: {
        and: [
          { status: { equals: 'active' } },
          {
            or: [
              { name: { contains: q } },
              { sku: { contains: q } },
              { barcode: { contains: q } },
            ],
          },
        ],
      },
      limit: 8,
      depth: 1,
    })
    return NextResponse.json(result)
  } catch {
    return NextResponse.json({ docs: [], totalDocs: 0 })
  }
}
