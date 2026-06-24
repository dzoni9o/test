'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Zap, Eye, EyeOff, Loader2 } from 'lucide-react'
import { toast } from '@/components/ui/Toast'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch('/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
      })
      if (res.ok) {
        toast('Uspešno ste se prijavili!', 'success')
        router.push('/nalog')
        router.refresh()
      } else {
        const data = await res.json()
        toast(data.errors?.[0]?.message ?? 'Pogrešan email ili lozinka', 'error')
      }
    } catch {
      toast('Greška pri prijavi. Pokušajte ponovo.', 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
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
          <h1 className="text-2xl font-black text-gray-900 mb-1">Prijava</h1>
          <p className="text-gray-500 text-sm mb-6">
            Nemaš nalog?{' '}
            <Link href="/nalog/registracija" className="text-[#1B3A6B] font-semibold hover:underline">
              Registruj se besplatno
            </Link>
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Email adresa</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="marko@email.com"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B3A6B]/20 focus:border-[#1B3A6B] transition-all"
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-sm font-medium text-gray-700">Lozinka</label>
                <Link href="/nalog/zaboravljena-lozinka" className="text-xs text-[#1B3A6B] hover:underline">
                  Zaboravili ste lozinku?
                </Link>
              </div>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 pr-11 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B3A6B]/20 focus:border-[#1B3A6B] transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[#1B3A6B] hover:bg-[#2a4f8f] disabled:opacity-60 text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              {loading ? <><Loader2 size={18} className="animate-spin" /> Prijavljivanje...</> : 'Prijavi se'}
            </button>
          </form>

          <div className="relative my-5">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-100" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-white px-3 text-xs text-gray-400">ili nastavi kao gost</span>
            </div>
          </div>

          <Link
            href="/checkout"
            className="block text-center w-full py-2.5 border border-gray-200 hover:bg-gray-50 text-gray-700 text-sm font-medium rounded-xl transition-colors"
          >
            Naruči bez registracije
          </Link>
        </div>

        <p className="text-center text-xs text-gray-400 mt-4">
          Prijavom prihvataš{' '}
          <Link href="/uslovi" className="hover:underline">Uslove korišćenja</Link>
          {' '}i{' '}
          <Link href="/privatnost" className="hover:underline">Politiku privatnosti</Link>
        </p>
      </div>
    </div>
  )
}
