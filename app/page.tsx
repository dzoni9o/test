import Link from 'next/link'
import {
  Zap, Shield, Truck, HeadphonesIcon, ArrowRight, Star,
  Package, ChevronRight, Building2
} from 'lucide-react'

const CATEGORIES = [
  { name: 'Kablovi', href: '/kategorije/kablovi', icon: '🔌', color: 'bg-blue-50 hover:bg-blue-100', count: '1.200+' },
  { name: 'Rasveta', href: '/kategorije/rasveta', icon: '💡', color: 'bg-yellow-50 hover:bg-yellow-100', count: '800+' },
  { name: 'Razvodne table', href: '/kategorije/razvodne-table', icon: '⚡', color: 'bg-orange-50 hover:bg-orange-100', count: '300+' },
  { name: 'Automatika', href: '/kategorije/automatika', icon: '🔧', color: 'bg-green-50 hover:bg-green-100', count: '500+' },
  { name: 'Prekidači', href: '/kategorije/prekidaci', icon: '🔲', color: 'bg-purple-50 hover:bg-purple-100', count: '400+' },
  { name: 'Kanalice', href: '/kategorije/kanalice', icon: '📏', color: 'bg-gray-50 hover:bg-gray-100', count: '200+' },
  { name: 'Alati i merila', href: '/kategorije/alati', icon: '🔩', color: 'bg-red-50 hover:bg-red-100', count: '150+' },
  { name: 'Sve kategorije', href: '/kategorije', icon: '📦', color: 'bg-slate-50 hover:bg-slate-100', count: '4.000+' },
]

const BRANDS = [
  { name: 'Schneider Electric', logo: '⚡' },
  { name: 'Legrand', logo: '🔲' },
  { name: 'Hager', logo: '🔧' },
  { name: 'ABB', logo: '⚙️' },
  { name: 'Gewiss', logo: '🔌' },
  { name: 'Philips', logo: '💡' },
]

const WHY_US = [
  {
    icon: Truck,
    title: 'Brza dostava',
    desc: 'Isporuka u roku od 24–48h na celoj teritoriji Srbije. Besplatno za porudžbine over 5.000 RSD.',
  },
  {
    icon: Shield,
    title: 'Originalni proizvodi',
    desc: 'Isključivo originalna roba direktno od ovlašćenih distributera. Garantovan kvalitet.',
  },
  {
    icon: HeadphonesIcon,
    title: 'Stručna podrška',
    desc: 'Tim elektrotehničara dostupan za savete i tehničku pomoć pri izboru opreme.',
  },
  {
    icon: Building2,
    title: 'B2B / Veleprodaja',
    desc: 'Posebne cene i uslovi za firme, izvođače radova i veleprodajne kupce.',
  },
]

const FEATURED_PRODUCTS = [
  { id: '1', name: 'Kabel PP-Y 3x1.5mm²', price: 180, priceVat: 216, sku: 'KAB-001', rating: 4.8, reviews: 24, badge: 'Bestseller' },
  { id: '2', name: 'LED panel 60x60 40W neutralna', price: 2800, priceVat: 3360, sku: 'LED-045', rating: 4.9, reviews: 41, badge: 'NOVO' },
  { id: '3', name: 'Schneider Acti9 iC60N 16A', price: 1650, priceVat: 1980, sku: 'SCH-112', rating: 5.0, reviews: 18, badge: null },
  { id: '4', name: 'Razvodna tabla UP 12 modula', price: 890, priceVat: 1068, sku: 'RAZ-023', rating: 4.7, reviews: 33, badge: 'Akcija' },
  { id: '5', name: 'Utičnica Legrand Mosaic 2P+E', price: 320, priceVat: 384, sku: 'LEG-078', rating: 4.8, reviews: 56, badge: null },
  { id: '6', name: 'Koaksijalni kabl RG6 75 Ohm', price: 95, priceVat: 114, sku: 'KOA-034', rating: 4.6, reviews: 29, badge: null },
  { id: '7', name: 'Kontaktor Schneider LC1D25 25A', price: 3200, priceVat: 3840, sku: 'SCH-234', rating: 5.0, reviews: 12, badge: null },
  { id: '8', name: 'LED traka 24V 14.4W/m IP65', price: 650, priceVat: 780, sku: 'LED-120', rating: 4.9, reviews: 37, badge: 'NOVO' },
]

function formatRSD(price: number): string {
  return new Intl.NumberFormat('sr-RS', {
    style: 'currency',
    currency: 'RSD',
    minimumFractionDigits: 0,
  }).format(price)
}

export default function HomePage() {
  return (
    <div className="bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#1B3A6B] via-[#1e4080] to-[#0f2244] text-white">
        <div className="max-w-7xl mx-auto px-4 py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-yellow-500/20 border border-yellow-500/30 rounded-full px-4 py-1.5 text-yellow-400 text-sm font-medium mb-6">
                <Zap size={14} />
                Over 4.000 artikala na stanju
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-6">
                Elektromaterijal<br />
                <span className="text-yellow-400">za svakoga.</span>
              </h1>
              <p className="text-lg text-blue-200 mb-8 max-w-md leading-relaxed">
                Od kabla do kompletnih razvodnih tabla — sve na jednom mestu.
                Profesionalni brend po pristupačnim cenama, dostava za 24h.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/kategorije"
                  className="inline-flex items-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-[#1B3A6B] font-bold px-6 py-3 rounded-xl transition-colors"
                >
                  Pregledaj katalog
                  <ArrowRight size={18} />
                </Link>
                <Link
                  href="/b2b"
                  className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-medium px-6 py-3 rounded-xl transition-colors"
                >
                  B2B / Veleprodaja
                </Link>
              </div>
              <div className="flex gap-8 mt-10 pt-8 border-t border-white/10">
                {[['4.000+', 'Artikala'], ['15+', 'Godina'], ['50.000+', 'Kupaca']].map(([num, label]) => (
                  <div key={label}>
                    <p className="text-2xl font-black text-yellow-400">{num}</p>
                    <p className="text-sm text-blue-300">{label}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="hidden md:flex items-center justify-center">
              <div className="relative w-80 h-80">
                <div className="absolute inset-0 bg-yellow-500/20 rounded-full blur-3xl" />
                <div className="relative grid grid-cols-2 gap-4 p-8">
                  {['⚡', '🔌', '💡', '🔧'].map((icon, i) => (
                    <div
                      key={i}
                      className="w-32 h-32 bg-white/10 backdrop-blur border border-white/20 rounded-2xl flex items-center justify-center text-5xl"
                    >
                      {icon}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-black text-gray-900">Kategorije</h2>
          <Link href="/kategorije" className="text-sm text-[#1B3A6B] hover:underline flex items-center gap-1">
            Sve kategorije <ChevronRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.name}
              href={cat.href}
              className={`${cat.color} rounded-2xl p-4 flex flex-col items-center gap-2 text-center transition-all group border border-transparent hover:border-[#1B3A6B]/10 hover:shadow-md`}
            >
              <span className="text-3xl group-hover:scale-110 transition-transform">{cat.icon}</span>
              <span className="text-xs font-semibold text-gray-700 leading-tight">{cat.name}</span>
              <span className="text-xs text-gray-400">{cat.count}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured products */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-black text-gray-900">Popularni proizvodi</h2>
          <Link href="/proizvodi" className="text-sm text-[#1B3A6B] hover:underline flex items-center gap-1">
            Svi proizvodi <ChevronRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {FEATURED_PRODUCTS.map((product) => (
            <Link
              key={product.id}
              href={`/proizvodi/${product.sku.toLowerCase()}`}
              className="bg-white rounded-2xl border border-gray-100 hover:border-[#1B3A6B]/20 hover:shadow-lg transition-all group overflow-hidden"
            >
              <div className="relative bg-gray-50 aspect-square flex items-center justify-center">
                <Package size={48} className="text-gray-200" />
                {product.badge && (
                  <span className={`absolute top-2 left-2 text-xs font-bold px-2 py-1 rounded-lg ${
                    product.badge === 'Bestseller' ? 'bg-orange-500 text-white' :
                    product.badge === 'NOVO' ? 'bg-green-500 text-white' :
                    product.badge === 'Akcija' ? 'bg-red-500 text-white' : 'bg-gray-700 text-white'
                  }`}>
                    {product.badge}
                  </span>
                )}
              </div>
              <div className="p-3">
                <p className="text-xs text-gray-400 mb-1">SKU: {product.sku}</p>
                <h3 className="text-sm font-semibold text-gray-800 leading-tight line-clamp-2 group-hover:text-[#1B3A6B] transition-colors mb-2">
                  {product.name}
                </h3>
                <div className="flex items-center gap-1 mb-2">
                  <Star size={11} className="fill-yellow-400 text-yellow-400" />
                  <span className="text-xs font-medium text-gray-700">{product.rating}</span>
                  <span className="text-xs text-gray-400">({product.reviews})</span>
                </div>
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-base font-black text-[#1B3A6B]">{formatRSD(product.priceVat)}</p>
                    <p className="text-xs text-gray-400">{formatRSD(product.price)} bez PDV</p>
                  </div>
                  <button className="w-8 h-8 bg-yellow-500 hover:bg-yellow-400 rounded-lg flex items-center justify-center text-[#1B3A6B] font-bold transition-colors text-lg">
                    +
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Promo banner */}
      <section className="max-w-7xl mx-auto px-4 py-6">
        <div className="bg-gradient-to-r from-yellow-500 to-orange-500 rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-sm font-semibold text-yellow-900/70 mb-1">SPECIJALNA PONUDA</p>
            <h3 className="text-2xl md:text-3xl font-black text-[#1B3A6B] mb-2">
              Schneider Electric<br />do -30% popusta
            </h3>
            <p className="text-[#1B3A6B]/70">Ograničene zalihe. Iskoristi odmah!</p>
          </div>
          <Link
            href="/kategorije/schneider-electric"
            className="shrink-0 bg-[#1B3A6B] hover:bg-[#2a4f8f] text-white font-bold px-8 py-4 rounded-xl transition-colors flex items-center gap-2"
          >
            Pogledaj akciju
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* Brands */}
      <section className="max-w-7xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-black text-gray-900 mb-6 text-center">Brendovi koje prodajemo</h2>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
          {BRANDS.map((brand) => (
            <Link
              key={brand.name}
              href={`/brendovi/${brand.name.toLowerCase().replace(/\s+/g, '-')}`}
              className="bg-white border border-gray-100 hover:border-[#1B3A6B]/20 rounded-2xl p-4 flex flex-col items-center gap-2 hover:shadow-md transition-all group"
            >
              <span className="text-3xl">{brand.logo}</span>
              <span className="text-xs font-semibold text-gray-600 text-center leading-tight group-hover:text-[#1B3A6B] transition-colors">
                {brand.name}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Why us */}
      <section className="bg-white border-y border-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-black text-gray-900 mb-8 text-center">Zašto ElektroIN?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {WHY_US.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex flex-col items-center text-center p-6">
                <div className="w-14 h-14 bg-[#1B3A6B]/10 rounded-2xl flex items-center justify-center mb-4">
                  <Icon size={24} className="text-[#1B3A6B]" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* B2B CTA */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="bg-[#1B3A6B] rounded-3xl p-8 md:p-12 text-white text-center">
          <Building2 size={48} className="text-yellow-400 mx-auto mb-4" />
          <h2 className="text-3xl font-black mb-3">Imate firmu?</h2>
          <p className="text-blue-200 mb-6 max-w-xl mx-auto">
            Prijavite se kao B2B kupac i ostvarite posebne veleprodajne cene,
            odloženo plaćanje i prioritetnu isporuku.
          </p>
          <Link
            href="/b2b"
            className="inline-flex items-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-[#1B3A6B] font-bold px-8 py-3.5 rounded-xl transition-colors"
          >
            Saznaj više o B2B programu
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  )
}
