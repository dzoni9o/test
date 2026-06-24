import Link from 'next/link'
import { CheckCircle, ArrowRight, Building2, Tag, Clock, FileText, Headphones, Percent } from 'lucide-react'

const BENEFITS = [
  { icon: Tag, title: 'Veleprodajne cene', desc: 'Do 30% niže cene od maloprodajnih, prilagođene obimu narudžbine.' },
  { icon: Clock, title: 'Odloženo plaćanje', desc: 'Plaćanje na 15, 30 ili 45 dana za verifikovane B2B partnere.' },
  { icon: FileText, title: 'R1 računi', desc: 'Sve narudžbine automatski prate R1 račun za knjiženje PDV-a.' },
  { icon: Headphones, title: 'Account manager', desc: 'Dedikovan kontakt u firmi za brzu podršku i tehničke savete.' },
  { icon: Percent, title: 'Kumulativni rabat', desc: 'Što više kupuješ, to je popust veći. Sistem nagrađuje lojalnost.' },
  { icon: CheckCircle, title: 'Prioritetna isporuka', desc: 'B2B narudžbine imaju prednost — isporuka isti ili naredni dan.' },
]

export default function B2BPage() {
  return (
    <div className="bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#1B3A6B] to-[#0f2244] text-white py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Building2 size={56} className="text-yellow-400 mx-auto mb-5" />
          <h1 className="text-4xl md:text-5xl font-black mb-4">
            ElektroIN <span className="text-yellow-400">B2B Program</span>
          </h1>
          <p className="text-xl text-blue-200 mb-8 max-w-2xl mx-auto">
            Specijalni uslovi za firme, preduzetnike i izvođače radova.
            Veleprodajne cene, odloženo plaćanje, R1 računi.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href="/nalog/registracija"
              className="inline-flex items-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-[#1B3A6B] font-bold px-8 py-3.5 rounded-xl transition-colors"
            >
              Prijavi firmu
              <ArrowRight size={18} />
            </Link>
            <a
              href="tel:+381112345678"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-medium px-8 py-3.5 rounded-xl transition-colors"
            >
              Pozovi nas
            </a>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-black text-gray-900 text-center mb-10">Šta dobijate kao B2B partner?</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {BENEFITS.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-[#1B3A6B]/10 rounded-xl flex items-center justify-center mb-4">
                <Icon size={22} className="text-[#1B3A6B]" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Price tiers */}
      <section className="bg-white border-y border-gray-100 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl font-black text-gray-900 text-center mb-8">Tabela rabata po obimu</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#1B3A6B] text-white">
                  <th className="px-4 py-3 text-left rounded-tl-xl">Mesečni promet</th>
                  <th className="px-4 py-3 text-center">Rabat</th>
                  <th className="px-4 py-3 text-center">Rok plaćanja</th>
                  <th className="px-4 py-3 text-right rounded-tr-xl">Prioritet dostave</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  ['0 – 50.000 RSD', '5%', 'odmah', 'Standard'],
                  ['50.000 – 200.000 RSD', '10%', '15 dana', 'Povišen'],
                  ['200.000 – 500.000 RSD', '18%', '30 dana', 'Visok'],
                  ['500.000+ RSD', '25–30%', '45 dana', 'Prioritet'],
                ].map(([range, discount, payment, priority], i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="px-4 py-3 font-medium text-gray-800">{range}</td>
                    <td className="px-4 py-3 text-center">
                      <span className="font-bold text-[#1B3A6B] bg-blue-100 px-2 py-0.5 rounded-lg">{discount}</span>
                    </td>
                    <td className="px-4 py-3 text-center text-gray-600">{payment}</td>
                    <td className="px-4 py-3 text-right text-gray-600">{priority}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-400 mt-3 text-center">* Rabati se primenjuju na osnovu prethodnog meseca. Kontaktirajte nas za individualne uslove.</p>
        </div>
      </section>

      {/* How it works */}
      <section className="max-w-4xl mx-auto px-4 py-14">
        <h2 className="text-2xl font-black text-gray-900 text-center mb-10">Kako postati B2B partner?</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { step: '1', title: 'Registracija', desc: 'Kreira firma nalog i unesite PIB firme. Proces traje 2 minuta.' },
            { step: '2', title: 'Verifikacija', desc: 'Naš tim verifikuje PIB i aktivira B2B cene u roku od 24 sata.' },
            { step: '3', title: 'Kupovina', desc: 'Automatski vidite veleprodajne cene i možete naručivati sa odloženim plaćanjem.' },
          ].map(({ step, title, desc }) => (
            <div key={step} className="text-center">
              <div className="w-14 h-14 bg-yellow-500 rounded-2xl flex items-center justify-center text-[#1B3A6B] font-black text-2xl mx-auto mb-4">
                {step}
              </div>
              <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
              <p className="text-sm text-gray-500">{desc}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link
            href="/nalog/registracija"
            className="inline-flex items-center gap-2 bg-[#1B3A6B] hover:bg-[#2a4f8f] text-white font-bold px-10 py-4 rounded-xl transition-colors text-lg"
          >
            Počni odmah — besplatno
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  )
}
