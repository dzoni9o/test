'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Zap, Eye, EyeOff, Loader2, Building2, User } from 'lucide-react'
import { toast } from '@/components/ui/Toast'

type AccountType = 'personal' | 'business'

export default function RegistrationPage() {
  const [type, setType] = useState<AccountType>('personal')
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', password: '', confirmPassword: '',
    phone: '', company: '', pib: '',
  })
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const set = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [field]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (form.password !== form.confirmPassword) {
      toast('Lozinke se ne podudaraju', 'error'); return
    }
    if (form.password.length < 8) {
      toast('Lozinka mora imati najmanje 8 karaktera', 'error'); return
    }
    setLoading(true)
    try {
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
          firstName: form.firstName,
          lastName: form.lastName,
          phone: form.phone,
          role: type === 'business' ? 'b2b' : 'customer',
          company: type === 'business' ? form.company : undefined,
          pib: type === 'business' ? form.pib : undefined,
        }),
        credentials: 'include',
      })
      if (res.ok) {
        toast('Nalog uspešno kreiran!', 'success')
        router.push('/nalog')
        router.refresh()
      } else {
        const data = await res.json()
        toast(data.errors?.[0]?.message ?? 'Greška pri registraciji', 'error')
      }
    } catch {
      toast('Greška. Pokušajte ponovo.', 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg">
        <div className="flex justify-center mb-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-[#1B3A6B] rounded-xl flex items-center justify-center">
              <Zap size={22} className="text-yellow-400" />
            </div>
            <div>
              <span className="font-black text-2xl text-[#1B3A6B]">Elektro</span>
              <span className="font-black text-2xl text-yellow-500">IN</span>
            </div>
          </Link>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <h1 className="text-2xl font-black text-gray-900 mb-1">Kreiraj nalog</h1>
          <p className="text-gray-500 text-sm mb-6">
            Već imaš nalog?{' '}
            <Link href="/nalog/login" className="text-[#1B3A6B] font-semibold hover:underline">Prijavi se</Link>
          </p>

          {/* Account type */}
          <div className="flex gap-3 mb-5">
            {([['personal', User, 'Fizičko lice'], ['business', Building2, 'Pravno lice (B2B)']] as const).map(
              ([val, Icon, label]) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => setType(val as AccountType)}
                  className={`flex-1 flex items-center gap-2 p-3 rounded-xl border-2 text-sm font-medium transition-colors ${
                    type === val ? 'border-[#1B3A6B] bg-blue-50 text-[#1B3A6B]' : 'border-gray-200 text-gray-600 hover:border-gray-300'
                  }`}
                >
                  <Icon size={16} />
                  {label}
                </button>
              )
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Ime *</label>
                <input type="text" required value={form.firstName} onChange={set('firstName')} placeholder="Marko"
                  className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#1B3A6B] focus:ring-1 focus:ring-[#1B3A6B]/20" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Prezime *</label>
                <input type="text" required value={form.lastName} onChange={set('lastName')} placeholder="Petrović"
                  className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#1B3A6B] focus:ring-1 focus:ring-[#1B3A6B]/20" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Email *</label>
              <input type="email" required value={form.email} onChange={set('email')} placeholder="marko@email.com"
                className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#1B3A6B] focus:ring-1 focus:ring-[#1B3A6B]/20" />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Telefon</label>
              <input type="tel" value={form.phone} onChange={set('phone')} placeholder="+381 60 123 4567"
                className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#1B3A6B] focus:ring-1 focus:ring-[#1B3A6B]/20" />
            </div>

            {type === 'business' && (
              <div className="grid grid-cols-2 gap-3 p-3 bg-blue-50 rounded-xl">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Naziv firme *</label>
                  <input type="text" required={type === 'business'} value={form.company} onChange={set('company')} placeholder="Firma d.o.o."
                    className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-[#1B3A6B]" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">PIB *</label>
                  <input type="text" required={type === 'business'} value={form.pib} onChange={set('pib')} placeholder="123456789"
                    className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-[#1B3A6B]" />
                </div>
              </div>
            )}

            <div className="relative">
              <label className="block text-xs font-medium text-gray-700 mb-1">Lozinka *</label>
              <input type={showPass ? 'text' : 'password'} required value={form.password} onChange={set('password')}
                placeholder="Min. 8 karaktera"
                className="w-full border border-gray-200 rounded-xl px-3 py-2.5 pr-10 text-sm focus:outline-none focus:border-[#1B3A6B] focus:ring-1 focus:ring-[#1B3A6B]/20" />
              <button type="button" onClick={() => setShowPass(!showPass)}
                className="absolute right-3 bottom-2.5 text-gray-400 hover:text-gray-600">
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Potvrdi lozinku *</label>
              <input type="password" required value={form.confirmPassword} onChange={set('confirmPassword')}
                placeholder="Ponovi lozinku"
                className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#1B3A6B] focus:ring-1 focus:ring-[#1B3A6B]/20" />
            </div>

            <button type="submit" disabled={loading}
              className="w-full py-3 bg-[#1B3A6B] hover:bg-[#2a4f8f] disabled:opacity-60 text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2 mt-1">
              {loading ? <><Loader2 size={18} className="animate-spin" /> Kreiranje...</> : 'Kreiraj nalog'}
            </button>
          </form>

          {type === 'business' && (
            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-xl text-xs text-yellow-800">
              <strong>B2B nalog:</strong> Naš tim će pregledati vaš zahtev i aktivirati veleprodajne cene u roku od 24h.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
