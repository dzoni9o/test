'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useCartStore } from '@/lib/store'
import { ChevronRight, CreditCard, Truck, Banknote, CheckCircle, Lock } from 'lucide-react'

function formatRSD(price: number) {
  return new Intl.NumberFormat('sr-RS', { style: 'currency', currency: 'RSD', minimumFractionDigits: 0 }).format(price)
}

const STEPS = ['Podaci', 'Dostava', 'Plaćanje', 'Potvrda']

export default function CheckoutPage() {
  const { items, subtotal, vatAmount, total, clearCart } = useCartStore()
  const [step, setStep] = useState(0)
  const [invoiceType, setInvoiceType] = useState<'r2' | 'r1'>('r2')
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'cod' | 'bank'>('card')
  const [shippingMethod, setShippingMethod] = useState<'courier' | 'pickup'>('courier')

  const shippingCost = shippingMethod === 'pickup' ? 0 : subtotal() >= 5000 ? 0 : 350

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <p className="text-6xl mb-4">🛒</p>
        <h1 className="text-2xl font-black text-gray-900 mb-3">Korpa je prazna</h1>
        <p className="text-gray-500 mb-6">Dodajte proizvode pa se vratite ovde.</p>
        <Link href="/kategorije" className="inline-flex items-center gap-2 bg-[#1B3A6B] text-white font-bold px-6 py-3 rounded-xl hover:bg-[#2a4f8f] transition-colors">
          Pregledaj katalog
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-sm text-gray-400 mb-6">
        <Link href="/" className="hover:text-[#1B3A6B]">Početna</Link>
        <ChevronRight size={14} />
        <Link href="/korpa" className="hover:text-[#1B3A6B]">Korpa</Link>
        <ChevronRight size={14} />
        <span className="text-gray-700 font-medium">Narudžbina</span>
      </nav>

      {/* Progress steps */}
      <div className="flex items-center mb-8">
        {STEPS.map((s, i) => (
          <div key={s} className="flex items-center flex-1 last:flex-none">
            <div className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                i < step ? 'bg-green-500 text-white' :
                i === step ? 'bg-[#1B3A6B] text-white' :
                'bg-gray-200 text-gray-500'
              }`}>
                {i < step ? <CheckCircle size={16} /> : i + 1}
              </div>
              <span className={`text-sm font-medium hidden sm:block ${i === step ? 'text-[#1B3A6B]' : 'text-gray-400'}`}>{s}</span>
            </div>
            {i < STEPS.length - 1 && (
              <div className={`flex-1 h-0.5 mx-3 ${i < step ? 'bg-green-500' : 'bg-gray-200'}`} />
            )}
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left - Forms */}
        <div className="lg:col-span-2 space-y-4">
          {/* Step 0: Customer info */}
          {step === 0 && (
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <h2 className="font-black text-gray-900 text-lg mb-4">Podaci o kupcu</h2>

              {/* Invoice type */}
              <div className="flex gap-3 mb-5">
                {[['r2', 'Fizičko lice (R2)'], ['r1', 'Pravno lice (R1)']].map(([val, label]) => (
                  <label key={val} className={`flex-1 flex items-center gap-2 p-3 rounded-xl border-2 cursor-pointer transition-colors ${invoiceType === val ? 'border-[#1B3A6B] bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}>
                    <input type="radio" name="invoiceType" value={val} checked={invoiceType === val as 'r2' | 'r1'} onChange={() => setInvoiceType(val as 'r2' | 'r1')} className="hidden" />
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${invoiceType === val ? 'border-[#1B3A6B]' : 'border-gray-300'}`}>
                      {invoiceType === val && <div className="w-2 h-2 bg-[#1B3A6B] rounded-full" />}
                    </div>
                    <span className="text-sm font-medium">{label}</span>
                  </label>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Ime *</label>
                  <input type="text" className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#1B3A6B] focus:ring-1 focus:ring-[#1B3A6B]/20" placeholder="Marko" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Prezime *</label>
                  <input type="text" className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#1B3A6B] focus:ring-1 focus:ring-[#1B3A6B]/20" placeholder="Petrović" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                  <input type="email" className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#1B3A6B] focus:ring-1 focus:ring-[#1B3A6B]/20" placeholder="marko@email.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Telefon *</label>
                  <input type="tel" className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#1B3A6B] focus:ring-1 focus:ring-[#1B3A6B]/20" placeholder="+381 60 123 4567" />
                </div>
                {invoiceType === 'r1' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Naziv firme *</label>
                      <input type="text" className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#1B3A6B]" placeholder="Firma d.o.o." />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">PIB *</label>
                      <input type="text" className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#1B3A6B]" placeholder="123456789" />
                    </div>
                  </>
                )}
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Ulica i broj *</label>
                  <input type="text" className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#1B3A6B]" placeholder="Knez Mihailova 1" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Grad *</label>
                  <input type="text" className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#1B3A6B]" placeholder="Beograd" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Poštanski broj *</label>
                  <input type="text" className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#1B3A6B]" placeholder="11000" />
                </div>
              </div>

              <button
                onClick={() => setStep(1)}
                className="mt-5 w-full py-3 bg-[#1B3A6B] hover:bg-[#2a4f8f] text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                Nastavi na dostavu
                <ChevronRight size={18} />
              </button>
            </div>
          )}

          {/* Step 1: Shipping */}
          {step === 1 && (
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <h2 className="font-black text-gray-900 text-lg mb-4">Način dostave</h2>
              <div className="space-y-3">
                {[
                  { value: 'courier', label: 'Kurirska dostava', desc: '1–2 radna dana', price: subtotal() >= 5000 ? 'Besplatno' : '350 RSD', icon: Truck },
                  { value: 'pickup', label: 'Preuzimanje u radnji', desc: 'Smederevski put 29D, Beograd', price: 'Besplatno', icon: CheckCircle },
                ].map(({ value, label, desc, price, icon: Icon }) => (
                  <label key={value} className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-colors ${shippingMethod === value ? 'border-[#1B3A6B] bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}>
                    <input type="radio" name="shipping" value={value} checked={shippingMethod === value as 'courier' | 'pickup'} onChange={() => setShippingMethod(value as 'courier' | 'pickup')} className="hidden" />
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${shippingMethod === value ? 'border-[#1B3A6B]' : 'border-gray-300'}`}>
                      {shippingMethod === value && <div className="w-2.5 h-2.5 bg-[#1B3A6B] rounded-full" />}
                    </div>
                    <Icon size={20} className="text-[#1B3A6B] shrink-0" />
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800">{label}</p>
                      <p className="text-sm text-gray-500">{desc}</p>
                    </div>
                    <span className="font-bold text-[#1B3A6B]">{price}</span>
                  </label>
                ))}
              </div>
              <div className="flex gap-3 mt-5">
                <button onClick={() => setStep(0)} className="flex-1 py-3 border border-gray-200 text-gray-600 font-medium rounded-xl hover:bg-gray-50 transition-colors">Nazad</button>
                <button onClick={() => setStep(2)} className="flex-1 py-3 bg-[#1B3A6B] text-white font-bold rounded-xl hover:bg-[#2a4f8f] transition-colors flex items-center justify-center gap-2">
                  Nastavi na plaćanje <ChevronRight size={18} />
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Payment */}
          {step === 2 && (
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <h2 className="font-black text-gray-900 text-lg mb-4">Način plaćanja</h2>
              <div className="space-y-3 mb-5">
                {[
                  { value: 'card', label: 'Platna kartica', desc: 'Visa, Mastercard, Dina', icon: CreditCard },
                  { value: 'cod', label: 'Plaćanje pouzećem', desc: 'Platite kuriru pri isporuci', icon: Banknote },
                  { value: 'bank', label: 'Virmanski transfer (R1)', desc: 'Za pravna lica — plaćanje na račun', icon: Banknote },
                ].map(({ value, label, desc, icon: Icon }) => (
                  <label key={value} className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-colors ${paymentMethod === value ? 'border-[#1B3A6B] bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}>
                    <input type="radio" name="payment" value={value} checked={paymentMethod === value as 'card' | 'cod' | 'bank'} onChange={() => setPaymentMethod(value as 'card' | 'cod' | 'bank')} className="hidden" />
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${paymentMethod === value ? 'border-[#1B3A6B]' : 'border-gray-300'}`}>
                      {paymentMethod === value && <div className="w-2.5 h-2.5 bg-[#1B3A6B] rounded-full" />}
                    </div>
                    <Icon size={20} className="text-[#1B3A6B] shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-800">{label}</p>
                      <p className="text-sm text-gray-500">{desc}</p>
                    </div>
                  </label>
                ))}
              </div>

              {paymentMethod === 'card' && (
                <div className="bg-gray-50 rounded-xl p-4 space-y-3 mb-5">
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                    <Lock size={14} />
                    Sigurno plaćanje putem SSL konekcije
                  </div>
                  <input type="text" placeholder="Broj kartice" className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#1B3A6B]" />
                  <div className="grid grid-cols-2 gap-3">
                    <input type="text" placeholder="MM / GG" className="border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#1B3A6B]" />
                    <input type="text" placeholder="CVV" className="border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#1B3A6B]" />
                  </div>
                  <input type="text" placeholder="Ime na kartici" className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#1B3A6B]" />
                </div>
              )}

              <div className="flex gap-3">
                <button onClick={() => setStep(1)} className="flex-1 py-3 border border-gray-200 text-gray-600 font-medium rounded-xl hover:bg-gray-50 transition-colors">Nazad</button>
                <button
                  onClick={() => setStep(3)}
                  className="flex-1 py-3 bg-yellow-500 hover:bg-yellow-400 text-[#1B3A6B] font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  Potvrdi narudžbinu
                  <CheckCircle size={18} />
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Confirmation */}
          {step === 3 && (
            <div className="bg-white rounded-2xl border border-gray-100 p-8 text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle size={40} className="text-green-500" />
              </div>
              <h2 className="text-2xl font-black text-gray-900 mb-2">Narudžbina primljena!</h2>
              <p className="text-gray-500 mb-1">Broj narudžbine: <span className="font-bold text-gray-800">EI-260624-4892</span></p>
              <p className="text-gray-500 mb-6">Potvrdu ćemo poslati na vašu email adresu.</p>
              <div className="flex gap-3 justify-center">
                <Link href="/" className="px-6 py-3 bg-[#1B3A6B] text-white font-bold rounded-xl hover:bg-[#2a4f8f] transition-colors">
                  Početna strana
                </Link>
                <Link href="/nalog/narudzbine" className="px-6 py-3 border border-gray-200 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors">
                  Moje narudžbine
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Right - Order summary */}
        <div>
          <div className="bg-white rounded-2xl border border-gray-100 p-5 sticky top-24">
            <h3 className="font-black text-gray-900 mb-4">Pregled narudžbine</h3>
            <div className="space-y-3 mb-4">
              {items.map((item) => (
                <div key={item.id} className="flex gap-3">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg shrink-0 flex items-center justify-center text-gray-300 text-xs">📦</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800 line-clamp-1">{item.name}</p>
                    <p className="text-xs text-gray-400">{item.quantity}× {formatRSD(item.priceWithVat)}</p>
                  </div>
                  <span className="text-sm font-bold text-gray-800 shrink-0">{formatRSD(item.priceWithVat * item.quantity)}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-100 pt-3 space-y-2 text-sm">
              <div className="flex justify-between text-gray-500">
                <span>Bez PDV:</span>
                <span>{formatRSD(subtotal())}</span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>PDV 20%:</span>
                <span>{formatRSD(vatAmount())}</span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>Dostava:</span>
                <span>{shippingCost === 0 ? 'Besplatno' : formatRSD(shippingCost)}</span>
              </div>
              <div className="flex justify-between font-black text-base text-gray-900 pt-2 border-t border-gray-100">
                <span>Ukupno:</span>
                <span className="text-[#1B3A6B]">{formatRSD(total() + shippingCost)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
