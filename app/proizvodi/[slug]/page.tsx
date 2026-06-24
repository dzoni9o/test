'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Star, ShoppingCart, Package, ChevronRight, Truck, Shield,
  FileText, Minus, Plus, Heart, Share2, CheckCircle, Info
} from 'lucide-react'
import { useCartStore } from '@/lib/store'

const MOCK_PRODUCT = {
  id: 'sch-112',
  name: 'Schneider Electric Acti9 iC60N 16A Jednopolni Osigurač',
  sku: 'SCH-112',
  barcode: '3606480089541',
  price: 1650,
  priceVat: 1980,
  comparePrice: 2200,
  brand: 'Schneider Electric',
  category: 'Automatika',
  rating: 4.9,
  reviewCount: 18,
  stock: 47,
  unit: 'kom',
  inStock: true,
  isNew: false,
  onSale: true,
  shortDescription: 'Jednopolni automatski osigurač karakteristike C, 16A, 6kA prekidna moć. Pogodан za zaštitu strujnih kola u stambenim i lakim komercijalnim objektima.',
  specs: [
    { key: 'Struja', value: '16', unit: 'A' },
    { key: 'Napon', value: '230/400', unit: 'V' },
    { key: 'Karakteristika okidanja', value: 'C', unit: '' },
    { key: 'Prekidna moć', value: '6', unit: 'kA' },
    { key: 'Broj polova', value: '1', unit: '' },
    { key: 'Dimenzija (moduli)', value: '1', unit: 'mod.' },
    { key: 'Stepen zaštite', value: 'IP20', unit: '' },
    { key: 'Temperatura rada', value: '-25 do +60', unit: '°C' },
  ],
}

function formatRSD(price: number) {
  return new Intl.NumberFormat('sr-RS', { style: 'currency', currency: 'RSD', minimumFractionDigits: 0 }).format(price)
}

export default function ProductPage() {
  const [qty, setQty] = useState(1)
  const [activeTab, setActiveTab] = useState<'opis' | 'specifikacije' | 'recenzije'>('opis')
  const { addItem } = useCartStore()

  const handleAddToCart = () => {
    addItem({
      id: MOCK_PRODUCT.id,
      name: MOCK_PRODUCT.name,
      slug: MOCK_PRODUCT.sku.toLowerCase(),
      sku: MOCK_PRODUCT.sku,
      price: MOCK_PRODUCT.price,
      priceWithVat: MOCK_PRODUCT.priceVat,
      stock: MOCK_PRODUCT.stock,
      unit: MOCK_PRODUCT.unit,
    })
  }

  const discount = MOCK_PRODUCT.comparePrice
    ? Math.round((1 - MOCK_PRODUCT.priceVat / (MOCK_PRODUCT.comparePrice)) * 100)
    : 0

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-sm text-gray-400 mb-6 flex-wrap">
        <Link href="/" className="hover:text-[#1B3A6B]">Početna</Link>
        <ChevronRight size={14} />
        <Link href="/kategorije/automatika" className="hover:text-[#1B3A6B]">Automatika</Link>
        <ChevronRight size={14} />
        <Link href="/brendovi/schneider-electric" className="hover:text-[#1B3A6B]">Schneider Electric</Link>
        <ChevronRight size={14} />
        <span className="text-gray-700 font-medium line-clamp-1">{MOCK_PRODUCT.name}</span>
      </nav>

      <div className="grid lg:grid-cols-2 gap-8 mb-10">
        {/* Image gallery */}
        <div className="space-y-3">
          <div className="bg-white rounded-2xl border border-gray-100 aspect-square flex items-center justify-center overflow-hidden">
            <Package size={120} className="text-gray-200" />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className={`bg-white rounded-xl border-2 aspect-square flex items-center justify-center cursor-pointer transition-colors ${i === 1 ? 'border-[#1B3A6B]' : 'border-gray-100 hover:border-gray-300'}`}
              >
                <Package size={24} className="text-gray-200" />
              </div>
            ))}
          </div>
        </div>

        {/* Product info */}
        <div>
          {/* Brand + SKU */}
          <div className="flex items-center gap-2 mb-3">
            <Link href="/brendovi/schneider-electric" className="text-sm font-semibold text-[#1B3A6B] hover:underline">
              {MOCK_PRODUCT.brand}
            </Link>
            <span className="text-gray-300">|</span>
            <span className="text-sm text-gray-400">SKU: {MOCK_PRODUCT.sku}</span>
            {MOCK_PRODUCT.onSale && (
              <span className="ml-auto text-xs font-bold px-2 py-0.5 bg-red-500 text-white rounded-lg">-{discount}%</span>
            )}
          </div>

          <h1 className="text-xl md:text-2xl font-black text-gray-900 mb-3 leading-tight">
            {MOCK_PRODUCT.name}
          </h1>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-4">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={14}
                  className={star <= Math.round(MOCK_PRODUCT.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200 fill-gray-200'}
                />
              ))}
            </div>
            <span className="text-sm font-medium text-gray-700">{MOCK_PRODUCT.rating}</span>
            <span className="text-sm text-gray-400">({MOCK_PRODUCT.reviewCount} recenzija)</span>
          </div>

          {/* Price */}
          <div className="bg-gray-50 rounded-2xl p-4 mb-4">
            <div className="flex items-end gap-3">
              <span className="text-3xl font-black text-[#1B3A6B]">{formatRSD(MOCK_PRODUCT.priceVat)}</span>
              {MOCK_PRODUCT.comparePrice && (
                <span className="text-lg text-gray-400 line-through mb-0.5">{formatRSD(MOCK_PRODUCT.comparePrice)}</span>
              )}
            </div>
            <p className="text-sm text-gray-500 mt-1">
              {formatRSD(MOCK_PRODUCT.price)} bez PDV (PDV {formatRSD(MOCK_PRODUCT.priceVat - MOCK_PRODUCT.price)})
            </p>
          </div>

          {/* Stock */}
          <div className={`flex items-center gap-2 text-sm font-medium mb-4 ${MOCK_PRODUCT.inStock ? 'text-green-600' : 'text-red-500'}`}>
            <CheckCircle size={16} />
            {MOCK_PRODUCT.inStock ? `Na stanju (${MOCK_PRODUCT.stock} kom)` : 'Nije na stanju'}
          </div>

          {/* Short desc */}
          <p className="text-sm text-gray-600 mb-5 leading-relaxed">{MOCK_PRODUCT.shortDescription}</p>

          {/* Qty + Cart */}
          <div className="flex gap-3 mb-4">
            <div className="flex items-center bg-gray-100 rounded-xl">
              <button
                onClick={() => setQty(Math.max(1, qty - 1))}
                className="w-11 h-11 flex items-center justify-center hover:bg-gray-200 rounded-l-xl transition-colors"
              >
                <Minus size={16} />
              </button>
              <span className="w-12 text-center font-bold">{qty}</span>
              <button
                onClick={() => setQty(Math.min(MOCK_PRODUCT.stock, qty + 1))}
                className="w-11 h-11 flex items-center justify-center hover:bg-gray-200 rounded-r-xl transition-colors"
              >
                <Plus size={16} />
              </button>
            </div>
            <button
              onClick={handleAddToCart}
              disabled={!MOCK_PRODUCT.inStock}
              className="flex-1 flex items-center justify-center gap-2 bg-yellow-500 hover:bg-yellow-400 disabled:bg-gray-200 disabled:text-gray-400 text-[#1B3A6B] font-bold py-3 rounded-xl transition-colors"
            >
              <ShoppingCart size={18} />
              Dodaj u korpu
            </button>
            <button className="w-11 h-11 flex items-center justify-center border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors text-gray-500">
              <Heart size={18} />
            </button>
            <button className="w-11 h-11 flex items-center justify-center border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors text-gray-500">
              <Share2 size={18} />
            </button>
          </div>

          {/* Shipping info */}
          <div className="space-y-2 border border-gray-100 rounded-2xl p-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Truck size={16} className="text-[#1B3A6B]" />
              Dostava: <span className="font-medium">1–2 radna dana</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Shield size={16} className="text-[#1B3A6B]" />
              Garancija: <span className="font-medium">24 meseca</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <FileText size={16} className="text-[#1B3A6B]" />
              Dostupan R1 račun za pravna lica
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Info size={16} className="text-[#1B3A6B]" />
              Šifra barcode: {MOCK_PRODUCT.barcode}
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden mb-8">
        <div className="flex border-b border-gray-100">
          {(['opis', 'specifikacije', 'recenzije'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-4 text-sm font-semibold capitalize transition-colors ${
                activeTab === tab
                  ? 'border-b-2 border-[#1B3A6B] text-[#1B3A6B]'
                  : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
              {tab === 'recenzije' && ` (${MOCK_PRODUCT.reviewCount})`}
            </button>
          ))}
        </div>

        <div className="p-6">
          {activeTab === 'opis' && (
            <p className="text-gray-600 leading-relaxed">
              {MOCK_PRODUCT.shortDescription}<br /><br />
              Schneider Electric Acti9 iC60N serija je poznata po pouzdanosti i dugom veku trajanja.
              Ovi automatski osigurači su dizajnirani za zaštitu instalacija u stambenim i lakim komercijalnim objektima.
              Jednopolna verzija sa karakteristikom okidanja C savršena je za zaštitu strujnih kola sa motornim potrošačima.
            </p>
          )}

          {activeTab === 'specifikacije' && (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <tbody className="divide-y divide-gray-50">
                  {MOCK_PRODUCT.specs.map(({ key, value, unit }) => (
                    <tr key={key} className="hover:bg-gray-50">
                      <td className="py-3 pr-4 font-medium text-gray-600 w-1/2">{key}</td>
                      <td className="py-3 text-gray-900 font-semibold">{value} {unit}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'recenzije' && (
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                <div className="text-center">
                  <p className="text-4xl font-black text-[#1B3A6B]">{MOCK_PRODUCT.rating}</p>
                  <div className="flex justify-center my-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} size={12} className="fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-xs text-gray-400">{MOCK_PRODUCT.reviewCount} recenzija</p>
                </div>
                <div className="flex-1">
                  {[5, 4, 3, 2, 1].map((stars) => (
                    <div key={stars} className="flex items-center gap-2 mb-1">
                      <span className="text-xs text-gray-500 w-3">{stars}</span>
                      <div className="flex-1 bg-gray-200 rounded-full h-1.5">
                        <div
                          className="bg-yellow-400 h-1.5 rounded-full"
                          style={{ width: `${[78, 15, 5, 2, 0][5 - stars]}%` }}
                        />
                      </div>
                      <span className="text-xs text-gray-400">{[78, 15, 5, 2, 0][5 - stars]}%</span>
                    </div>
                  ))}
                </div>
              </div>
              {[
                { name: 'Marko P.', rating: 5, date: '15.06.2025.', text: 'Odličan proizvod, tačno kako je opisano. Brza isporuka.' },
                { name: 'Jelena M.', rating: 5, date: '02.05.2025.', text: 'Koristim za instalaciju u stanu, radi perfektno. Preporučujem.' },
              ].map((review) => (
                <div key={review.name} className="border-t border-gray-100 pt-4">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-sm">{review.name}</span>
                    <span className="text-xs text-gray-400">{review.date}</span>
                  </div>
                  <div className="flex mb-1.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} size={11} className={s <= review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200 fill-gray-200'} />
                    ))}
                  </div>
                  <p className="text-sm text-gray-600">{review.text}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
