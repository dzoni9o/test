'use client'

import { useEffect, useState, useCallback } from 'react'
import { useSearchParams } from 'next/navigation'
import { Search, SlidersHorizontal, Loader2 } from 'lucide-react'
import ProductCard, { type ProductCardData } from '@/components/shop/ProductCard'
import { Suspense } from 'react'

const MOCK_RESULTS: ProductCardData[] = [
  { id: '1', name: 'Kabel PP-Y 3x1.5mm²', slug: 'kab-001', sku: 'KAB-001', price: 180, priceWithVat: 216, inStock: true, stock: 150, unit: 'met', brand: 'Generic', rating: 4.8, reviewCount: 24 },
  { id: '2', name: 'Kabel PP-Y 3x2.5mm²', slug: 'kab-002', sku: 'KAB-002', price: 280, priceWithVat: 336, inStock: true, stock: 90, unit: 'met', brand: 'Generic', rating: 4.7, reviewCount: 18 },
  { id: '3', name: 'Kabel NYM-J 3x1.5mm²', slug: 'kab-003', sku: 'KAB-003', price: 220, priceWithVat: 264, inStock: true, stock: 200, unit: 'met', brand: 'Generic', rating: 4.9, reviewCount: 31 },
  { id: '4', name: 'Koaksijalni kabl RG6 75 Ohm', slug: 'koa-001', sku: 'KOA-001', price: 95, priceWithVat: 114, inStock: true, stock: 500, unit: 'met', brand: 'Generic', rating: 4.5, reviewCount: 12 },
]

function SearchContent() {
  const searchParams = useSearchParams()
  const q = searchParams.get('q') ?? ''
  const [results, setResults] = useState<ProductCardData[]>([])
  const [loading, setLoading] = useState(false)
  const [total, setTotal] = useState(0)

  const doSearch = useCallback(async (query: string) => {
    if (!query) return
    setLoading(true)
    try {
      const res = await fetch(`/api/products?q=${encodeURIComponent(query)}&limit=24`)
      const data = await res.json()
      if (data.docs?.length > 0) {
        setResults(data.docs)
        setTotal(data.totalDocs)
      } else {
        // Fallback mock while DB is empty
        const filtered = MOCK_RESULTS.filter((p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.sku.toLowerCase().includes(query.toLowerCase())
        )
        setResults(filtered)
        setTotal(filtered.length)
      }
    } catch {
      setResults(MOCK_RESULTS)
      setTotal(MOCK_RESULTS.length)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { if (q) doSearch(q) }, [q, doSearch])

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
          <Search size={14} />
          Rezultati pretrage
        </div>
        <h1 className="text-2xl font-black text-gray-900">
          {q ? (
            <>
              Pretraga za{' '}
              <span className="text-[#1B3A6B]">&ldquo;{q}&rdquo;</span>
            </>
          ) : 'Pretraži proizvode'}
        </h1>
        {!loading && q && (
          <p className="text-gray-500 mt-1">
            {total === 0 ? 'Nema rezultata' : `${total} rezultat${total === 1 ? '' : total < 5 ? 'a' : 'a'}`}
          </p>
        )}
      </div>

      {loading && (
        <div className="flex items-center justify-center py-20">
          <Loader2 size={32} className="animate-spin text-[#1B3A6B]" />
        </div>
      )}

      {!loading && q && results.length === 0 && (
        <div className="text-center py-20">
          <p className="text-5xl mb-4">🔍</p>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Nema rezultata za &ldquo;{q}&rdquo;</h2>
          <p className="text-gray-500 mb-6">Proverite pravopis ili pokušajte sa drugačijim pojmom.</p>
          <div className="flex flex-wrap gap-2 justify-center text-sm text-gray-500">
            <span>Pokušaj:</span>
            {['kabel', 'LED', 'Schneider', 'osigurač', 'utičnica'].map((s) => (
              <a
                key={s}
                href={`/pretraga?q=${s}`}
                className="text-[#1B3A6B] hover:underline font-medium"
              >
                {s}
              </a>
            ))}
          </div>
        </div>
      )}

      {!loading && results.length > 0 && (
        <div className="flex gap-6">
          {/* Filters */}
          <aside className="hidden lg:block w-56 shrink-0">
            <div className="bg-white rounded-2xl border border-gray-100 p-4 sticky top-24">
              <div className="flex items-center gap-2 font-semibold text-gray-800 mb-4 text-sm">
                <SlidersHorizontal size={15} />
                Filtriraj rezultate
              </div>
              <div className="mb-4">
                <p className="text-xs font-semibold text-gray-600 mb-2 uppercase tracking-wide">Cena</p>
                <div className="flex gap-2">
                  <input type="number" placeholder="Od" className="w-full border border-gray-200 rounded-lg px-2 py-1.5 text-xs focus:outline-none focus:border-[#1B3A6B]" />
                  <input type="number" placeholder="Do" className="w-full border border-gray-200 rounded-lg px-2 py-1.5 text-xs focus:outline-none focus:border-[#1B3A6B]" />
                </div>
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-600 mb-2 uppercase tracking-wide">Dostupnost</p>
                <label className="flex items-center gap-2 text-xs text-gray-600 cursor-pointer">
                  <input type="checkbox" defaultChecked className="rounded" />
                  Samo na stanju
                </label>
              </div>
            </div>
          </aside>

          {/* Results grid */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-gray-500">{total} rezultata</p>
              <select className="border border-gray-200 rounded-xl px-3 py-2 text-sm bg-white focus:outline-none focus:border-[#1B3A6B]">
                <option>Relevantnost</option>
                <option>Cena: rastuće</option>
                <option>Cena: opadajuće</option>
              </select>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4">
              {results.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      )}

      {!q && (
        <div className="text-center py-20 text-gray-400">
          <Search size={48} className="mx-auto mb-4 opacity-20" />
          <p>Unesite pojam za pretragu u gornji search bar</p>
        </div>
      )}
    </div>
  )
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center py-20">
        <Loader2 size={32} className="animate-spin text-[#1B3A6B]" />
      </div>
    }>
      <SearchContent />
    </Suspense>
  )
}
