'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ChevronRight, CheckCircle, XCircle, RefreshCw, Database, Image, Key, Globe, Server } from 'lucide-react'

type Check = { ok: boolean; label: string; detail: string }
type Status = {
  database: Check
  blob: Check
  payloadSecret: Check
  siteUrl: Check
  env: string
}

const ENV_VARS = [
  {
    name: 'PAYLOAD_SECRET',
    required: true,
    desc: 'Tajni ključ za Payload CMS sesije i enkripciju',
    example: 'openssl rand -base64 32',
    docs: 'https://payloadcms.com/docs/configuration/overview#secret',
  },
  {
    name: 'DATABASE_URI',
    required: true,
    desc: 'PostgreSQL connection string za produkciju',
    example: 'postgres://user:pass@ep-xxx.neon.tech/elektroin?sslmode=require',
    docs: 'https://neon.tech/docs/connect/connect-from-any-app',
  },
  {
    name: 'BLOB_READ_WRITE_TOKEN',
    required: false,
    desc: 'Vercel Blob token za čuvanje slika na CDN-u',
    example: 'vercel_blob_rw_... (Vercel Dashboard → Storage → Blob)',
    docs: 'https://vercel.com/docs/storage/vercel-blob',
  },
  {
    name: 'NEXT_PUBLIC_SITE_URL',
    required: false,
    desc: 'Javni URL sajta (potreban za OG slike i emailove)',
    example: 'https://elektroin.rs',
    docs: null,
  },
]

const ICONS: Record<string, React.ElementType> = {
  database: Database,
  blob: Image,
  payloadSecret: Key,
  siteUrl: Globe,
}

export default function SistemPage() {
  const [status, setStatus] = useState<Status | null>(null)
  const [loading, setLoading] = useState(true)

  const fetchStatus = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/system-status')
      const data = await res.json()
      setStatus(data)
    } catch {
      // ignore
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchStatus() }, [])

  const checks = status
    ? ['database', 'blob', 'payloadSecret', 'siteUrl'].map((key) => ({
        key,
        ...(status[key as keyof Status] as Check),
        Icon: ICONS[key],
      }))
    : []

  const allOk = checks.every((c) => c.ok)

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <nav className="flex items-center gap-1.5 text-sm text-gray-400 mb-6">
        <Link href="/" className="hover:text-[#1B3A6B]">Početna</Link>
        <ChevronRight size={14} />
        <span className="text-gray-700 font-medium">Status sistema</span>
      </nav>

      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black text-gray-900">Status sistema</h1>
          <p className="text-gray-500 text-sm mt-1">Proverite da li su sve komponente ispravno podešene</p>
        </div>
        <button
          onClick={fetchStatus}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 text-gray-600 text-sm font-medium rounded-xl hover:bg-gray-50 disabled:opacity-50 transition-colors"
        >
          <RefreshCw size={15} className={loading ? 'animate-spin' : ''} />
          Osveži
        </button>
      </div>

      {/* Environment badge */}
      {status && (
        <div className="mb-5 flex items-center gap-2">
          <Server size={15} className="text-gray-400" />
          <span className="text-sm text-gray-500">Okruženje:</span>
          <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
            status.env === 'production'
              ? 'bg-green-100 text-green-700'
              : 'bg-amber-100 text-amber-700'
          }`}>
            {status.env}
          </span>
        </div>
      )}

      {/* Status cards */}
      <div className="grid grid-cols-1 gap-3 mb-8">
        {loading
          ? Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-16 bg-gray-100 rounded-2xl animate-pulse" />
            ))
          : checks.map(({ key, ok, label, detail, Icon }) => (
              <div
                key={key}
                className={`flex items-center gap-4 p-4 rounded-2xl border ${
                  ok
                    ? 'bg-green-50 border-green-200'
                    : 'bg-red-50 border-red-200'
                }`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  ok ? 'bg-green-100' : 'bg-red-100'
                }`}>
                  <Icon size={20} className={ok ? 'text-green-600' : 'text-red-500'} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`font-semibold text-sm ${ok ? 'text-green-800' : 'text-red-800'}`}>{label}</p>
                  <p className={`text-xs truncate ${ok ? 'text-green-600' : 'text-red-500'}`}>{detail}</p>
                </div>
                {ok
                  ? <CheckCircle size={20} className="text-green-500 shrink-0" />
                  : <XCircle size={20} className="text-red-400 shrink-0" />
                }
              </div>
            ))
        }
      </div>

      {!loading && allOk && (
        <div className="bg-green-50 border border-green-200 rounded-2xl p-4 mb-8 text-sm text-green-800 font-medium text-center">
          Sve komponente su ispravno podešene.
        </div>
      )}

      {/* Env var reference table */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100">
          <h2 className="font-bold text-gray-900">Environment varijable</h2>
          <p className="text-xs text-gray-500 mt-0.5">Postavite ih u Vercel Dashboard → Settings → Environment Variables</p>
        </div>
        <div className="divide-y divide-gray-50">
          {ENV_VARS.map(({ name, required, desc, example, docs }) => (
            <div key={name} className="px-5 py-4">
              <div className="flex items-start justify-between gap-3 mb-1">
                <code className="bg-gray-100 text-[#1B3A6B] px-2 py-0.5 rounded text-xs font-mono font-bold">{name}</code>
                <div className="flex items-center gap-2 shrink-0">
                  {required
                    ? <span className="text-xs font-semibold text-red-500">Obavezno</span>
                    : <span className="text-xs text-gray-400">Opciono</span>
                  }
                  {docs && (
                    <a href={docs} target="_blank" rel="noopener noreferrer" className="text-xs text-[#1B3A6B] hover:underline">
                      Docs →
                    </a>
                  )}
                </div>
              </div>
              <p className="text-xs text-gray-600 mb-1">{desc}</p>
              <p className="text-xs text-gray-400 font-mono">Primer: {example}</p>
            </div>
          ))}
        </div>
        <div className="px-5 py-4 bg-amber-50 border-t border-amber-100">
          <p className="text-xs text-amber-700">
            <strong>Lokalni razvoj:</strong> Kreiraj <code>.env.local</code> fajl u root-u projekta i dodaj varijable tamo. Nikad ne commit-uj <code>.env.local</code> u git.
          </p>
        </div>
      </div>

      {/* Quick links */}
      <div className="mt-6 grid grid-cols-2 gap-3">
        <a
          href="https://vercel.com/dashboard"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 py-3 border border-gray-200 text-gray-700 text-sm font-medium rounded-xl hover:bg-gray-50 transition-colors"
        >
          Vercel Dashboard →
        </a>
        <a
          href="https://neon.tech/dashboard"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 py-3 border border-gray-200 text-gray-700 text-sm font-medium rounded-xl hover:bg-gray-50 transition-colors"
        >
          Neon (PostgreSQL) →
        </a>
      </div>
    </div>
  )
}
