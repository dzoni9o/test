'use client'

import { useWishlistStore } from '@/lib/wishlist'
import ProductCard from '@/components/shop/ProductCard'
import Link from 'next/link'
import { Heart, Trash2 } from 'lucide-react'

export default function WishlistPage() {
  const { items, clear } = useWishlistStore()

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black text-gray-900">Lista želja</h1>
          <p className="text-gray-500 text-sm">{items.length} {items.length === 1 ? 'artikal' : 'artikala'}</p>
        </div>
        {items.length > 0 && (
          <button
            onClick={clear}
            className="flex items-center gap-1.5 text-sm text-red-500 hover:text-red-700 transition-colors"
          >
            <Trash2 size={15} />
            Obriši sve
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <div className="text-center py-20">
          <Heart size={64} className="mx-auto mb-4 text-gray-200" />
          <h2 className="text-xl font-bold text-gray-800 mb-2">Lista želja je prazna</h2>
          <p className="text-gray-500 mb-6">
            Klikni na srce na bilo kom proizvodu da ga sačuvaš ovde.
          </p>
          <Link
            href="/kategorije"
            className="inline-flex items-center gap-2 bg-[#1B3A6B] text-white font-bold px-6 py-3 rounded-xl hover:bg-[#2a4f8f] transition-colors"
          >
            Pregledaj katalog
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {items.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}
