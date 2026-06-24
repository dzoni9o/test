import Link from 'next/link'
import { MapPin, Phone, Mail, Clock, Zap } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-[#0F2347] text-gray-300">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-yellow-500 rounded-lg flex items-center justify-center">
                <Zap size={20} className="text-[#1B3A6B]" />
              </div>
              <div>
                <span className="font-black text-xl text-white">Elektro</span>
                <span className="font-black text-xl text-yellow-400">IN</span>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed mb-4">
              Elektromaterijal za profesionalce i domaćinstva. Kvalitet, pouzdanost i
              stručna podrška od 2008. godine.
            </p>
            <div className="flex gap-3">
              {[
                { label: 'f', title: 'Facebook' },
                { label: 'in', title: 'Instagram' },
                { label: 'li', title: 'LinkedIn' },
              ].map(({ label, title }) => (
                <a key={title} href="#" title={title} className="w-9 h-9 bg-white/10 hover:bg-yellow-500 hover:text-[#1B3A6B] text-gray-400 rounded-lg flex items-center justify-center transition-all text-xs font-bold">
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-semibold text-white mb-4">Kategorije</h4>
            <ul className="space-y-2 text-sm">
              {[
                ['Kablovi', '/kategorije/kablovi'],
                ['Rasveta', '/kategorije/rasveta'],
                ['Razvodne table', '/kategorije/razvodne-table'],
                ['Automatika', '/kategorije/automatika'],
                ['Elektromaterijal', '/kategorije/elektromaterijal'],
                ['Brendovi', '/brendovi'],
                ['Akcije', '/akcije'],
              ].map(([name, href]) => (
                <li key={name}>
                  <Link href={href} className="hover:text-yellow-400 transition-colors">
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="font-semibold text-white mb-4">Informacije</h4>
            <ul className="space-y-2 text-sm">
              {[
                ['O nama', '/o-nama'],
                ['Dostava', '/dostava'],
                ['Povrat robe', '/povrat'],
                ['Uslovi korišćenja', '/uslovi'],
                ['Politika privatnosti', '/privatnost'],
                ['Reklamacije', '/reklamacije'],
                ['B2B / Veleprodaja', '/b2b'],
              ].map(([name, href]) => (
                <li key={name}>
                  <Link href={href} className="hover:text-yellow-400 transition-colors">
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-white mb-4">Kontakt</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <MapPin size={15} className="text-yellow-400 mt-0.5 shrink-0" />
                <span>Smederevski put 29D<br />11000 Beograd (Zvezdara)</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone size={15} className="text-yellow-400 shrink-0" />
                <a href="tel:+381112345678" className="hover:text-yellow-400 transition-colors">
                  011 234 5678
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail size={15} className="text-yellow-400 shrink-0" />
                <a href="mailto:info@elektroin.rs" className="hover:text-yellow-400 transition-colors">
                  info@elektroin.rs
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock size={15} className="text-yellow-400 mt-0.5 shrink-0" />
                <span>Pon–Pet: 08:00–17:00<br />Sub: 08:00–13:00</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Trust badges */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <span className="text-green-400">✓</span>
              <span>Sigurno plaćanje</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-400">✓</span>
              <span>14 dana povrat</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-400">✓</span>
              <span>Garantovana isporuka</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-400">✓</span>
              <span>R1 i R2 račun</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-400">✓</span>
              <span>Stručna podrška</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10 bg-black/20">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-gray-500">
          <span>© {new Date().getFullYear()} ElektroIN d.o.o. • PIB: 12345678 • Sva prava zadržana.</span>
          <div className="flex items-center gap-3">
            <img src="/images/visa.svg" alt="Visa" className="h-5 opacity-60" />
            <img src="/images/mastercard.svg" alt="Mastercard" className="h-5 opacity-60" />
            <img src="/images/dina.svg" alt="Dina" className="h-5 opacity-60" />
          </div>
        </div>
      </div>
    </footer>
  )
}
