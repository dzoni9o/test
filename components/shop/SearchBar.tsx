'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { Search, X, Package, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { formatPrice } from '@/lib/utils'
import { useRouter } from 'next/navigation'

type SearchResult = {
  id: string
  name: string
  slug: string
  sku: string
  price: number
  priceWithVat: number
}

export default function SearchBar() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const router = useRouter()

  const search = useCallback(async (q: string) => {
    if (q.length < 2) { setResults([]); setOpen(false); return }
    setLoading(true)
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`)
      const data = await res.json()
      setResults(data.docs ?? [])
      setOpen(true)
    } catch {
      setResults([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => search(query), 300)
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current) }
  }, [query, search])

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      setOpen(false)
      router.push(`/pretraga?q=${encodeURIComponent(query.trim())}`)
    }
  }

  const clear = () => { setQuery(''); setResults([]); setOpen(false); inputRef.current?.focus() }

  return (
    <div ref={containerRef} className="relative flex-1 max-w-2xl">
      <form onSubmit={handleSubmit}>
        <div className="relative">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => results.length > 0 && setOpen(true)}
            placeholder="Pretraži proizvode, šifre artikala, brendove..."
            className="w-full pl-10 pr-10 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1B3A6B]/20 focus:border-[#1B3A6B] transition-all"
          />
          {loading && (
            <Loader2 size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 animate-spin" />
          )}
          {!loading && query && (
            <button type="button" onClick={clear} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
              <X size={16} />
            </button>
          )}
        </div>
      </form>

      {/* Dropdown results */}
      {open && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-2xl shadow-xl border border-gray-100 z-50 overflow-hidden">
          {results.length === 0 ? (
            <div className="px-4 py-8 text-center text-sm text-gray-400">
              Nema rezultata za &quot;{query}&quot;
            </div>
          ) : (
            <>
              <ul className="divide-y divide-gray-50 max-h-80 overflow-y-auto">
                {results.map((product) => (
                  <li key={product.id}>
                    <Link
                      href={`/proizvodi/${product.slug}`}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
                      onClick={() => setOpen(false)}
                    >
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center shrink-0">
                        <Package size={18} className="text-gray-300" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-800 truncate">{product.name}</p>
                        <p className="text-xs text-gray-400">SKU: {product.sku}</p>
                      </div>
                      <span className="text-sm font-bold text-[#1B3A6B] shrink-0">
                        {formatPrice(product.priceWithVat ?? product.price * 1.2)}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="px-4 py-2.5 bg-gray-50 border-t">
                <Link
                  href={`/pretraga?q=${encodeURIComponent(query)}`}
                  onClick={() => setOpen(false)}
                  className="text-sm text-[#1B3A6B] font-medium hover:underline"
                >
                  Prikaži sve rezultate za &quot;{query}&quot; →
                </Link>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )
}
