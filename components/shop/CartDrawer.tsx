'use client'

import { useCartStore } from '@/lib/store'
import { formatPrice } from '@/lib/utils'
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, subtotal, vatAmount, total, totalItems } =
    useCartStore()

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm"
        onClick={closeCart}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b bg-[#1B3A6B] text-white">
          <div className="flex items-center gap-2">
            <ShoppingBag size={20} />
            <span className="font-semibold">Korpa ({totalItems()} artikla)</span>
          </div>
          <button
            onClick={closeCart}
            className="w-8 h-8 hover:bg-white/20 rounded-lg flex items-center justify-center transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-gray-400 p-8">
              <ShoppingBag size={64} className="opacity-20" />
              <p className="text-center">Korpa je prazna.<br />Dodajte proizvode iz kataloga.</p>
              <button
                onClick={closeCart}
                className="px-6 py-2.5 bg-[#1B3A6B] text-white rounded-xl text-sm font-semibold hover:bg-[#2a4f8f] transition-colors"
              >
                Pregledaj katalog
              </button>
            </div>
          ) : (
            <ul className="divide-y">
              {items.map((item) => (
                <li key={item.id} className="p-4 flex gap-3">
                  {/* Image */}
                  <div className="w-16 h-16 bg-gray-100 rounded-lg shrink-0 overflow-hidden">
                    {item.image ? (
                      <Image src={item.image} alt={item.name} width={64} height={64} className="object-cover w-full h-full" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-300 text-2xl">📦</div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <Link
                      href={`/proizvodi/${item.slug}`}
                      onClick={closeCart}
                      className="text-sm font-medium text-gray-800 hover:text-[#1B3A6B] line-clamp-2 leading-tight"
                    >
                      {item.name}
                    </Link>
                    <p className="text-xs text-gray-400 mt-0.5">SKU: {item.sku}</p>

                    <div className="flex items-center justify-between mt-2">
                      {/* Qty controls */}
                      <div className="flex items-center gap-1 bg-gray-100 rounded-lg">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-7 h-7 flex items-center justify-center hover:bg-gray-200 rounded-lg transition-colors"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="w-8 text-center text-sm font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          disabled={item.quantity >= item.stock}
                          className="w-7 h-7 flex items-center justify-center hover:bg-gray-200 rounded-lg transition-colors disabled:opacity-40"
                        >
                          <Plus size={12} />
                        </button>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <p className="text-sm font-bold text-[#1B3A6B]">
                          {formatPrice(item.priceWithVat * item.quantity)}
                        </p>
                        <p className="text-xs text-gray-400">{formatPrice(item.price)} bez PDV</p>
                      </div>
                    </div>
                  </div>

                  {/* Remove */}
                  <button
                    onClick={() => removeItem(item.id)}
                    className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors self-start"
                  >
                    <Trash2 size={15} />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Summary */}
        {items.length > 0 && (
          <div className="border-t p-4 space-y-3 bg-gray-50">
            <div className="space-y-1.5 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Ukupno bez PDV:</span>
                <span>{formatPrice(subtotal())}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>PDV (20%):</span>
                <span>{formatPrice(vatAmount())}</span>
              </div>
              <div className="flex justify-between font-bold text-base text-gray-900 pt-1 border-t">
                <span>Ukupno:</span>
                <span>{formatPrice(total())}</span>
              </div>
            </div>

            <p className="text-xs text-green-600 font-medium text-center">
              🚚 Besplatna dostava za porudžbine over 5.000 RSD
            </p>

            <Link
              href="/checkout"
              onClick={closeCart}
              className="flex items-center justify-center gap-2 w-full py-3 bg-yellow-500 hover:bg-yellow-400 text-[#1B3A6B] font-bold rounded-xl transition-colors"
            >
              Naruči
              <ArrowRight size={18} />
            </Link>

            <button
              onClick={closeCart}
              className="w-full py-2.5 border border-gray-300 hover:bg-gray-100 text-gray-700 text-sm font-medium rounded-xl transition-colors"
            >
              Nastavi kupovinu
            </button>
          </div>
        )}
      </div>
    </>
  )
}
