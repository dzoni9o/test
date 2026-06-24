import { getPayloadClient } from './payload'
import type { Where } from 'payload'

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

  const conditions: Where[] = [{ status: { equals: 'active' } }]
  if (opts.category) conditions.push({ 'category.slug': { equals: opts.category } })
  if (opts.brand) conditions.push({ 'brand.slug': { equals: opts.brand } })
  if (opts.featured) conditions.push({ featured: { equals: true } })
  if (opts.onSale) conditions.push({ onSale: { equals: true } })
  if (opts.search) {
    conditions.push({
      or: [
        { name: { contains: opts.search } },
        { sku: { contains: opts.search } },
      ],
    })
  }

  const where: Where = conditions.length === 1 ? conditions[0] : { and: conditions }

  return payload.find({
    collection: 'products',
    where,
    page: opts.page ?? 1,
    limit: opts.limit ?? 24,
    sort: opts.sort ?? '-createdAt',
    depth: 2,
  })
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
  const where: Where = opts.featured ? { featured: { equals: true } } : {}

  return (await payload.find({
    collection: 'categories',
    where,
    sort: 'order',
    limit: 100,
    depth: 1,
  })).docs
}

export async function getBrands(opts: { featured?: boolean } = {}) {
  const payload = await getPayloadClient()
  const where: Where = opts.featured ? { featured: { equals: true } } : {}

  return (await payload.find({
    collection: 'brands',
    where,
    limit: 50,
  })).docs
}

export async function getUserOrders(userId: string) {
  const payload = await getPayloadClient()
  return (await payload.find({
    collection: 'orders',
    where: { customer: { equals: userId } },
    sort: '-createdAt',
    limit: 50,
  })).docs
}
