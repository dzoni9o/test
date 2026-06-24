'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ShoppingCart, User, Menu, X, Phone, ChevronDown, Zap, Heart, Search } from 'lucide-react'
import { useCartStore } from '@/lib/store'
import { useWishlistStore } from '@/lib/wishlist'
import { cn } from '@/lib/utils'
import SearchBar from '@/components/shop/SearchBar'

const NAV_CATEGORIES = [
  {
    name: 'Kablovi',
    href: '/kategorije/kablovi',
    sub: ['Instalacioni kablovi', 'Koaksijalni', 'Mrežni (UTP/FTP)', 'Alarmni', 'Audio/Video'],
  },
  {
    name: 'Rasveta',
    href: '/kategorije/rasveta',
    sub: ['LED sijalice', 'LED paneli', 'Spoljna rasveta', 'Industrijsko', 'Lusteri'],
  },
  {
    name: 'Razvodne table',
    href: '/kategorije/razvodne-table',
    sub: ['Plastične kutije', 'Metalne kutije', 'DIN šine', 'Nosači kablova'],
  },
  {
    name: 'Automatika',
    href: '/kategorije/automatika',
    sub: ['Osigurači', 'Prekidači', 'Kontaktori', 'Releji', 'Tajmeri', 'Senzori'],
  },
  {
    name: 'Elektromaterijal',
    href: '/kategorije/elektromaterijal',
    sub: ['Prekidači i utičnice', 'Kanalice', 'Priključnice', 'Alati', 'Merila'],
  },
  {
    name: 'Brendovi',
    href: '/brendovi',
    sub: ['Schneider Electric', 'Legrand', 'Hager', 'ABB', 'Gewiss'],
  },
]

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const { totalItems, toggleCart } = useCartStore()
  const { items: wishlistItems } = useWishlistStore()

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Top bar */}
      <div className="bg-[#1B3A6B] text-white text-sm py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <a href="tel:+381112345678" className="flex items-center gap-1.5 hover:text-yellow-400 transition-colors">
              <Phone size={13} />
              <span>011 234 5678</span>
            </a>
            <span className="text-blue-300">|</span>
            <span className="text-blue-200">Pon–Pet: 08:00–17:00</span>
          </div>
          <div className="hidden md:flex items-center gap-4 text-blue-200">
            <span>🚚 Besplatna dostava za porudžbine over 5.000 RSD</span>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="w-9 h-9 bg-[#1B3A6B] rounded-lg flex items-center justify-center">
              <Zap size={20} className="text-yellow-400" />
            </div>
            <div>
              <span className="font-black text-xl text-[#1B3A6B] tracking-tight">Elektro</span>
              <span className="font-black text-xl text-yellow-500 tracking-tight">IN</span>
            </div>
          </Link>

          {/* Search bar */}
          <div className="hidden md:flex flex-1">
            <SearchBar />
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-1 ml-auto md:ml-0">
            {/* Mobile search icon (search bar is always shown below on mobile) */}
            <span className="md:hidden p-2">
              <Search size={20} className="text-gray-400" />
            </span>

            {/* Wishlist */}
            <Link
              href="/wishlist"
              className="relative hidden md:flex items-center gap-1.5 px-3 py-2 hover:bg-gray-100 rounded-lg text-sm text-gray-700 transition-colors"
            >
              <Heart size={18} />
              {wishlistItems.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {wishlistItems.length}
                </span>
              )}
            </Link>

            {/* Account */}
            <Link
              href="/nalog"
              className="hidden md:flex items-center gap-1.5 px-3 py-2 hover:bg-gray-100 rounded-lg text-sm text-gray-700 transition-colors"
            >
              <User size={18} />
              <span>Nalog</span>
            </Link>

            {/* Cart */}
            <button
              onClick={toggleCart}
              className="relative flex items-center gap-1.5 px-3 py-2 bg-yellow-500 hover:bg-yellow-400 rounded-lg text-sm font-semibold text-[#1B3A6B] transition-colors"
            >
              <ShoppingCart size={18} />
              <span className="hidden md:inline">Korpa</span>
              {totalItems() > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-[#1B3A6B] text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {totalItems()}
                </span>
              )}
            </button>

            {/* Mobile menu */}
            <button
              className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} className="text-gray-600" />}
            </button>
          </div>
        </div>

        {/* Mobile search */}
        <div className="md:hidden px-4 pb-3">
          <SearchBar />
        </div>
      </div>

      {/* Nav bar */}
      <nav className="bg-[#1B3A6B] hidden md:block">
        <div className="max-w-7xl mx-auto px-4">
          <ul className="flex items-center">
            {NAV_CATEGORIES.map((cat) => (
              <li
                key={cat.name}
                className="relative group"
                onMouseEnter={() => setActiveDropdown(cat.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={cat.href}
                  className="flex items-center gap-1 px-4 py-3 text-sm text-blue-100 hover:text-white hover:bg-white/10 transition-colors"
                >
                  {cat.name}
                  <ChevronDown size={13} className="mt-0.5" />
                </Link>

                {activeDropdown === cat.name && (
                  <div className="absolute top-full left-0 w-52 bg-white rounded-b-xl shadow-xl border-t-2 border-yellow-500 py-2 z-50">
                    {cat.sub.map((s) => (
                      <Link
                        key={s}
                        href={`${cat.href}/${s.toLowerCase().replace(/\s+/g, '-')}`}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-[#1B3A6B] transition-colors"
                      >
                        {s}
                      </Link>
                    ))}
                  </div>
                )}
              </li>
            ))}
            <li className="ml-auto">
              <Link
                href="/akcije"
                className="flex items-center gap-1.5 px-4 py-3 text-sm font-semibold text-yellow-400 hover:text-yellow-300 transition-colors"
              >
                🔥 Akcije
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-b shadow-lg">
          {NAV_CATEGORIES.map((cat) => (
            <Link
              key={cat.name}
              href={cat.href}
              className="block px-4 py-3 text-sm text-gray-700 border-b hover:bg-gray-50"
              onClick={() => setMobileOpen(false)}
            >
              {cat.name}
            </Link>
          ))}
          <Link
            href="/akcije"
            className="block px-4 py-3 text-sm font-semibold text-orange-600 bg-orange-50"
            onClick={() => setMobileOpen(false)}
          >
            🔥 Akcije
          </Link>
        </div>
      )}
    </header>
  )
}
