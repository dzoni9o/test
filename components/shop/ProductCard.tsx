'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Star, Package, Heart } from 'lucide-react'
import { useCartStore } from '@/lib/store'
import { useWishlistStore } from '@/lib/wishlist'
import { formatPrice } from '@/lib/utils'
import { cn } from '@/lib/utils'

export type ProductCardData = {
  id: string
  name: string
  slug: string
  sku: string
  price: number
  priceWithVat: number
  comparePrice?: number
  image?: string
  rating?: number
  reviewCount?: number
  inStock: boolean
  stock: number
  unit: string
  brand?: string
  isNew?: boolean
  onSale?: boolean
  badge?: string
}

type Props = {
  product: ProductCardData
  className?: string
}

export default function ProductCard({ product, className }: Props) {
  const { addItem } = useCartStore()
  const { toggle, has } = useWishlistStore()
  const isWishlisted = has(product.id)

  const discount = product.comparePrice
    ? Math.round((1 - product.priceWithVat / product.comparePrice) * 100)
    : 0

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault()
    addItem({
      id: product.id,
      name: product.name,
      slug: product.slug,
      sku: product.sku,
      price: product.price,
      priceWithVat: product.priceWithVat,
      image: product.image,
      stock: product.stock,
      unit: product.unit,
    })
  }

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    toggle(product)
  }

  return (
    <Link
      href={`/proizvodi/${product.slug}`}
      className={cn(
        'bg-white rounded-2xl border border-gray-100 hover:border-[#1B3A6B]/20 hover:shadow-lg transition-all group overflow-hidden flex flex-col',
        className
      )}
    >
      {/* Image */}
      <div className="relative bg-gray-50 aspect-square flex items-center justify-center overflow-hidden">
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <Package size={48} className="text-gray-200 group-hover:scale-110 transition-transform" />
        )}

        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {product.isNew && (
            <span className="text-xs font-bold px-2 py-0.5 bg-green-500 text-white rounded-lg">NOVO</span>
          )}
          {product.onSale && discount > 0 && (
            <span className="text-xs font-bold px-2 py-0.5 bg-red-500 text-white rounded-lg">-{discount}%</span>
          )}
          {product.badge && !product.isNew && !product.onSale && (
            <span className="text-xs font-bold px-2 py-0.5 bg-orange-500 text-white rounded-lg">{product.badge}</span>
          )}
          {!product.inStock && (
            <span className="text-xs font-bold px-2 py-0.5 bg-gray-400 text-white rounded-lg">Nema</span>
          )}
        </div>

        {/* Wishlist */}
        <button
          onClick={handleWishlist}
          className={cn(
            'absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center transition-all opacity-0 group-hover:opacity-100',
            isWishlisted
              ? 'bg-red-500 text-white opacity-100'
              : 'bg-white/90 text-gray-400 hover:text-red-500 shadow'
          )}
        >
          <Heart size={14} className={isWishlisted ? 'fill-current' : ''} />
        </button>
      </div>

      {/* Info */}
      <div className="p-3 flex flex-col flex-1">
        {product.brand && (
          <p className="text-xs text-gray-400 mb-0.5">{product.brand} · {product.sku}</p>
        )}
        {!product.brand && (
          <p className="text-xs text-gray-400 mb-0.5">SKU: {product.sku}</p>
        )}

        <h3 className="text-sm font-semibold text-gray-800 leading-tight line-clamp-2 group-hover:text-[#1B3A6B] transition-colors mb-2 flex-1">
          {product.name}
        </h3>

        {product.rating !== undefined && (
          <div className="flex items-center gap-1 mb-2">
            <Star size={11} className="fill-yellow-400 text-yellow-400" />
            <span className="text-xs font-medium text-gray-700">{product.rating.toFixed(1)}</span>
            {product.reviewCount !== undefined && (
              <span className="text-xs text-gray-400">({product.reviewCount})</span>
            )}
          </div>
        )}

        {/* Price row */}
        <div className="flex items-end justify-between gap-1">
          <div>
            <p className="text-base font-black text-[#1B3A6B] leading-none">
              {formatPrice(product.priceWithVat)}
            </p>
            {product.comparePrice && product.comparePrice > product.priceWithVat && (
              <p className="text-xs text-gray-400 line-through">{formatPrice(product.comparePrice)}</p>
            )}
            <p className="text-xs text-gray-400">{formatPrice(product.price)} bez PDV</p>
          </div>

          <button
            onClick={handleAdd}
            disabled={!product.inStock}
            className="w-9 h-9 bg-yellow-500 hover:bg-yellow-400 disabled:bg-gray-200 disabled:text-gray-400 shrink-0 rounded-xl flex items-center justify-center text-[#1B3A6B] font-black text-xl transition-colors"
          >
            +
          </button>
        </div>
      </div>
    </Link>
  )
}
