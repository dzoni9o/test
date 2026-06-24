import Link from 'next/link'
import {
  Package, Heart, User, MapPin, LogOut, ChevronRight,
  ShoppingBag, Clock, CheckCircle, Truck
} from 'lucide-react'

const MOCK_ORDERS = [
  {
    id: 'EI-260601-1234', date: '01.06.2026.', status: 'delivered', total: 12480,
    items: 3, statusLabel: 'Isporučeno',
  },
  {
    id: 'EI-260515-8821', date: '15.05.2026.', status: 'shipped', total: 5760,
    items: 1, statusLabel: 'U dostavi',
  },
  {
    id: 'EI-260430-3312', date: '30.04.2026.', status: 'processing', total: 28900,
    items: 7, statusLabel: 'U obradi',
  },
]

const STATUS_STYLE: Record<string, string> = {
  delivered: 'bg-green-100 text-green-700',
  shipped: 'bg-blue-100 text-blue-700',
  processing: 'bg-yellow-100 text-yellow-700',
  pending: 'bg-gray-100 text-gray-600',
  cancelled: 'bg-red-100 text-red-700',
}

const STATUS_ICON: Record<string, React.ReactNode> = {
  delivered: <CheckCircle size={13} />,
  shipped: <Truck size={13} />,
  processing: <Clock size={13} />,
}

function formatRSD(price: number) {
  return new Intl.NumberFormat('sr-RS', { style: 'currency', currency: 'RSD', minimumFractionDigits: 0 }).format(price)
}

export default function AccountPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-black text-gray-900 mb-6">Moj nalog</h1>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Sidebar */}
        <aside className="space-y-3">
          {/* User card */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-[#1B3A6B] rounded-full flex items-center justify-center text-white font-bold text-lg">
                MP
              </div>
              <div>
                <p className="font-bold text-gray-900">Marko Petrović</p>
                <p className="text-sm text-gray-500">marko@email.com</p>
              </div>
            </div>
            <span className="inline-flex items-center gap-1 text-xs font-medium bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
              Registrovani kupac
            </span>
          </div>

          {/* Nav */}
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            {[
              { href: '/nalog', icon: ShoppingBag, label: 'Narudžbine', active: true },
              { href: '/wishlist', icon: Heart, label: 'Lista želja' },
              { href: '/nalog/adrese', icon: MapPin, label: 'Adrese' },
              { href: '/nalog/profil', icon: User, label: 'Podaci naloga' },
            ].map(({ href, icon: Icon, label, active }) => (
              <Link
                key={href}
                href={href}
                className={`flex items-center justify-between px-4 py-3 border-b last:border-0 text-sm transition-colors ${
                  active ? 'bg-blue-50 text-[#1B3A6B] font-semibold' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon size={16} />
                  {label}
                </div>
                <ChevronRight size={14} className="text-gray-400" />
              </Link>
            ))}
            <button className="w-full flex items-center gap-2.5 px-4 py-3 text-sm text-red-500 hover:bg-red-50 transition-colors">
              <LogOut size={16} />
              Odjavi se
            </button>
          </div>
        </aside>

        {/* Main */}
        <div className="lg:col-span-2 space-y-4">
          {/* Stats */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: 'Ukupno narudžbina', value: '12', icon: Package },
              { label: 'Potrošeno ukupno', value: '147.240 RSD', icon: ShoppingBag },
              { label: 'Lista želja', value: '3 artikla', icon: Heart },
            ].map(({ label, value, icon: Icon }) => (
              <div key={label} className="bg-white rounded-2xl border border-gray-100 p-4 text-center">
                <Icon size={20} className="text-[#1B3A6B] mx-auto mb-2" />
                <p className="font-black text-gray-900 text-lg leading-none mb-1">{value}</p>
                <p className="text-xs text-gray-400">{label}</p>
              </div>
            ))}
          </div>

          {/* Recent orders */}
          <div className="bg-white rounded-2xl border border-gray-100">
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <h2 className="font-black text-gray-900">Nedavne narudžbine</h2>
              <Link href="/nalog/narudzbine" className="text-sm text-[#1B3A6B] hover:underline">Sve narudžbine</Link>
            </div>

            <div className="divide-y divide-gray-50">
              {MOCK_ORDERS.map((order) => (
                <div key={order.id} className="p-4 flex items-center justify-between gap-4">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-semibold text-sm text-gray-800">{order.id}</p>
                      <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${STATUS_STYLE[order.status]}`}>
                        {STATUS_ICON[order.status]}
                        {order.statusLabel}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400">{order.date} · {order.items} artikla</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="font-bold text-gray-900">{formatRSD(order.total)}</p>
                    <Link href={`/nalog/narudzbine/${order.id}`} className="text-xs text-[#1B3A6B] hover:underline">
                      Detalji →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
