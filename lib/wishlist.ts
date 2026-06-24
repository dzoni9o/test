'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { ProductCardData } from '@/components/shop/ProductCard'

type WishlistStore = {
  items: ProductCardData[]
  add: (product: ProductCardData) => void
  remove: (id: string) => void
  toggle: (product: ProductCardData) => void
  has: (id: string) => boolean
  clear: () => void
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],
      add: (product) =>
        set((s) => ({ items: s.items.some((i) => i.id === product.id) ? s.items : [...s.items, product] })),
      remove: (id) => set((s) => ({ items: s.items.filter((i) => i.id !== id) })),
      toggle: (product) => {
        if (get().has(product.id)) get().remove(product.id)
        else get().add(product)
      },
      has: (id) => get().items.some((i) => i.id === id),
      clear: () => set({ items: [] }),
    }),
    { name: 'elektroin-wishlist' }
  )
)
