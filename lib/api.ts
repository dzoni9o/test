import { getPayloadClient } from './payload'

export async function getProducts(opts: {
  category?: string
  brand?: string
  search?: string
  page?: number
  limit?: number
  sort?: string
  featured?: boolean
  onSale?: boolean
} = {}) {
  const payload = await getPayloadClient()
  const where: Record<string, unknown> = { status: { equals: 'active' } }

  if (opts.category) where['category.slug'] = { equals: opts.category }
  if (opts.brand) where['brand.slug'] = { equals: opts.brand }
  if (opts.featured) where.featured = { equals: true }
  if (opts.onSale) where.onSale = { equals: true }
  if (opts.search) {
    where.or = [
      { name: { contains: opts.search } },
      { sku: { contains: opts.search } },
    ]
  }

  const result = await payload.find({
    collection: 'products',
    where,
    page: opts.page ?? 1,
    limit: opts.limit ?? 24,
    sort: opts.sort ?? '-createdAt',
    depth: 2,
  })

  return result
}

export async function getProduct(slug: string) {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'products',
    where: { slug: { equals: slug } },
    depth: 2,
    limit: 1,
  })
  return result.docs[0] ?? null
}

export async function getCategories(opts: { featured?: boolean } = {}) {
  const payload = await getPayloadClient()
  const where: Record<string, unknown> = {}
  if (opts.featured) where.featured = { equals: true }

  const result = await payload.find({
    collection: 'categories',
    where,
    sort: 'order',
    limit: 100,
    depth: 1,
  })
  return result.docs
}

export async function getBrands(opts: { featured?: boolean } = {}) {
  const payload = await getPayloadClient()
  const where: Record<string, unknown> = {}
  if (opts.featured) where.featured = { equals: true }

  const result = await payload.find({
    collection: 'brands',
    where,
    limit: 50,
  })
  return result.docs
}

export async function getUserOrders(userId: string) {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'orders',
    where: { customer: { equals: userId } },
    sort: '-createdAt',
    limit: 50,
  })
  return result.docs
}
