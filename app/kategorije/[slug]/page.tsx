import { Filter, SlidersHorizontal, Grid, List, Package, Star, ChevronRight } from 'lucide-react'
import Link from 'next/link'

const MOCK_PRODUCTS = Array.from({ length: 24 }, (_, i) => ({
  id: String(i + 1),
  name: [
    'Kabel PP-Y 3x1.5mm²', 'LED panel 60x60 40W', 'Schneider Acti9 iC60N 16A',
    'Razvodna tabla UP 12 modula', 'Utičnica Legrand Mosaic', 'Koaksijalni kabl RG6',
  ][i % 6],
  price: [180, 2800, 1650, 890, 320, 95][i % 6],
  priceVat: [216, 3360, 1980, 1068, 384, 114][i % 6],
  sku: `SKU-${String(i + 1).padStart(4, '0')}`,
  rating: 4.5 + (i % 5) * 0.1,
  reviews: 10 + i * 3,
  inStock: i % 7 !== 0,
  brand: ['Schneider', 'Legrand', 'Hager', 'ABB', 'Gewiss', 'Philips'][i % 6],
  isNew: i % 8 === 0,
  onSale: i % 5 === 0,
}))

function formatRSD(price: number) {
  return new Intl.NumberFormat('sr-RS', { style: 'currency', currency: 'RSD', minimumFractionDigits: 0 }).format(price)
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const categoryName = slug.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-sm text-gray-400 mb-4">
        <Link href="/" className="hover:text-[#1B3A6B]">Početna</Link>
        <ChevronRight size={14} />
        <Link href="/kategorije" className="hover:text-[#1B3A6B]">Kategorije</Link>
        <ChevronRight size={14} />
        <span className="text-gray-700 font-medium">{categoryName}</span>
      </nav>

      <div className="flex gap-6">
        {/* Filters sidebar */}
        <aside className="hidden lg:block w-60 shrink-0">
          <div className="bg-white rounded-2xl border border-gray-100 p-4 sticky top-24">
            <div className="flex items-center gap-2 font-semibold text-gray-800 mb-4">
              <SlidersHorizontal size={16} />
              Filteri
            </div>

            {/* Price range */}
            <div className="mb-5">
              <p className="text-sm font-semibold text-gray-700 mb-3">Cena (sa PDV)</p>
              <div className="flex gap-2">
                <input type="number" placeholder="Od" className="w-full border border-gray-200 rounded-lg px-2 py-1.5 text-sm focus:outline-none focus:border-[#1B3A6B]" />
                <input type="number" placeholder="Do" className="w-full border border-gray-200 rounded-lg px-2 py-1.5 text-sm focus:outline-none focus:border-[#1B3A6B]" />
              </div>
            </div>

            {/* Availability */}
            <div className="mb-5">
              <p className="text-sm font-semibold text-gray-700 mb-3">Dostupnost</p>
              <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                <input type="checkbox" className="rounded" defaultChecked />
                Na stanju
              </label>
            </div>

            {/* Brands */}
            <div className="mb-5">
              <p className="text-sm font-semibold text-gray-700 mb-3">Brend</p>
              <div className="space-y-2">
                {['Schneider Electric', 'Legrand', 'Hager', 'ABB', 'Gewiss'].map((brand) => (
                  <label key={brand} className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                    <input type="checkbox" className="rounded" />
                    {brand}
                  </label>
                ))}
              </div>
            </div>

            <button className="w-full py-2 bg-[#1B3A6B] text-white text-sm font-semibold rounded-xl hover:bg-[#2a4f8f] transition-colors">
              Primeni filtre
            </button>
          </div>
        </aside>

        {/* Main content */}
        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-center justify-between mb-4 gap-4 flex-wrap">
            <div>
              <h1 className="text-2xl font-black text-gray-900">{categoryName}</h1>
              <p className="text-sm text-gray-400">{MOCK_PRODUCTS.length} proizvoda</p>
            </div>
            <div className="flex items-center gap-2">
              <button className="lg:hidden flex items-center gap-1.5 px-3 py-2 border border-gray-200 rounded-xl text-sm hover:bg-gray-50">
                <Filter size={15} />
                Filteri
              </button>
              <select className="border border-gray-200 rounded-xl px-3 py-2 text-sm bg-white focus:outline-none focus:border-[#1B3A6B]">
                <option>Sortiranje: popularnost</option>
                <option>Cena: rastuće</option>
                <option>Cena: opadajuće</option>
                <option>Najnoviji</option>
                <option>Naziv: A-Z</option>
              </select>
              <div className="hidden md:flex border border-gray-200 rounded-xl overflow-hidden">
                <button className="p-2 bg-[#1B3A6B] text-white"><Grid size={16} /></button>
                <button className="p-2 hover:bg-gray-50"><List size={16} /></button>
              </div>
            </div>
          </div>

          {/* Products grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4">
            {MOCK_PRODUCTS.map((product) => (
              <Link
                key={product.id}
                href={`/proizvodi/${product.sku.toLowerCase()}`}
                className="bg-white rounded-2xl border border-gray-100 hover:border-[#1B3A6B]/20 hover:shadow-lg transition-all group overflow-hidden"
              >
                <div className="relative bg-gray-50 aspect-square flex items-center justify-center">
                  <Package size={40} className="text-gray-200" />
                  <div className="absolute top-2 left-2 flex flex-col gap-1">
                    {product.isNew && (
                      <span className="text-xs font-bold px-1.5 py-0.5 bg-green-500 text-white rounded-md">NOVO</span>
                    )}
                    {product.onSale && (
                      <span className="text-xs font-bold px-1.5 py-0.5 bg-red-500 text-white rounded-md">Akcija</span>
                    )}
                    {!product.inStock && (
                      <span className="text-xs font-bold px-1.5 py-0.5 bg-gray-400 text-white rounded-md">Nema</span>
                    )}
                  </div>
                </div>
                <div className="p-3">
                  <p className="text-xs text-gray-400 mb-0.5">{product.brand} · {product.sku}</p>
                  <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 leading-tight group-hover:text-[#1B3A6B] transition-colors mb-1.5">
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-1 mb-2">
                    <Star size={10} className="fill-yellow-400 text-yellow-400" />
                    <span className="text-xs text-gray-600">{product.rating.toFixed(1)} ({product.reviews})</span>
                  </div>
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="font-black text-[#1B3A6B]">{formatRSD(product.priceVat)}</p>
                      <p className="text-xs text-gray-400">{formatRSD(product.price)} bez PDV</p>
                    </div>
                    <button
                      disabled={!product.inStock}
                      className="w-8 h-8 bg-yellow-500 hover:bg-yellow-400 disabled:bg-gray-200 disabled:text-gray-400 rounded-lg flex items-center justify-center text-[#1B3A6B] font-bold transition-colors text-lg"
                    >
                      +
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-center gap-1 mt-8">
            {[1, 2, 3, '...', 12].map((page, i) => (
              <button
                key={i}
                className={`w-10 h-10 rounded-xl text-sm font-medium transition-colors ${
                  page === 1
                    ? 'bg-[#1B3A6B] text-white'
                    : 'border border-gray-200 hover:bg-gray-50 text-gray-600'
                }`}
              >
                {page}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
