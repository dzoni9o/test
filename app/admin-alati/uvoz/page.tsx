'use client'

import { useState, useRef, useCallback } from 'react'
import Link from 'next/link'
import {
  Upload, FileText, CheckCircle, AlertCircle, Download,
  Loader2, ChevronRight, Info, RefreshCw
} from 'lucide-react'

type ImportResult = {
  total: number
  created: number
  updated: number
  skipped: number
  errors: { row: number; sifra: string; reason: string }[]
}

type Stage = 'idle' | 'dry' | 'importing' | 'done' | 'error'

const COLUMNS = [
  { name: 'naziv', required: true, desc: 'Pun naziv proizvoda' },
  { name: 'sifra', required: true, desc: 'Jedinstvena šifra artikla (SKU)' },
  { name: 'barkod', required: false, desc: 'EAN/barcode broj' },
  { name: 'kratki_opis', required: false, desc: 'Kratki opis (1–2 rečenice)' },
  { name: 'cena_bez_pdv', required: true, desc: 'Cena u RSD bez PDV-a (npr. 1650)' },
  { name: 'precrtana_cena', required: false, desc: 'Stara/precrtana cena sa PDV' },
  { name: 'b2b_cena', required: false, desc: 'Veleprodajna cena bez PDV' },
  { name: 'zaliha', required: false, desc: 'Količina na stanju (broj)' },
  { name: 'status_zalihe', required: false, desc: 'in_stock / out_of_stock / on_request / preorder' },
  { name: 'jedinica', required: false, desc: 'kom / met / kg / pak / kutija' },
  { name: 'min_kolicina', required: false, desc: 'Minimalna narudžbina (default: 1)' },
  { name: 'kategorija', required: false, desc: 'Slug kategorije (npr. kablovi, rasveta)' },
  { name: 'brend', required: false, desc: 'Naziv brenda — kreira se automatski ako ne postoji' },
  { name: 'tagovi', required: false, desc: 'Tagovi odvojeni tačka-zarezom (npr. led;panel;ip65)' },
  { name: 'istaknuto', required: false, desc: 'true / false — prikazati na homepageu' },
  { name: 'novo', required: false, desc: 'true / false — oznaka NOVO' },
  { name: 'akcija', required: false, desc: 'true / false — oznaka Akcija' },
  { name: 'status', required: false, desc: 'active / draft / archived (default: active)' },
  { name: 'specifikacije', required: false, desc: 'Osobina:Vrednost odvojeni pipe-om (npr. Snaga:40 W|IP klasa:IP65)' },
]

export default function ImportPage() {
  const [file, setFile] = useState<File | null>(null)
  const [dragging, setDragging] = useState(false)
  const [stage, setStage] = useState<Stage>('idle')
  const [dryResult, setDryResult] = useState<ImportResult | null>(null)
  const [finalResult, setFinalResult] = useState<ImportResult | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragging(false)
    const f = e.dataTransfer.files[0]
    if (f?.name.endsWith('.csv')) setFile(f)
  }, [])

  const runImport = async (dryRun: boolean) => {
    if (!file) return
    setStage(dryRun ? 'dry' : 'importing')

    const fd = new FormData()
    fd.append('file', file)
    fd.append('dryRun', String(dryRun))

    try {
      const res = await fetch('/api/import', { method: 'POST', body: fd })
      const data: ImportResult = await res.json()
      if (dryRun) {
        setDryResult(data)
        setStage('idle')
      } else {
        setFinalResult(data)
        setStage('done')
      }
    } catch {
      setStage('error')
    }
  }

  const reset = () => {
    setFile(null)
    setDryResult(null)
    setFinalResult(null)
    setStage('idle')
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-sm text-gray-400 mb-6">
        <Link href="/" className="hover:text-[#1B3A6B]">Početna</Link>
        <ChevronRight size={14} />
        <span className="text-gray-700 font-medium">Uvoz proizvoda</span>
      </nav>

      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black text-gray-900">Uvoz proizvoda iz CSV</h1>
          <p className="text-gray-500 text-sm mt-1">Učitaj kompletni katalog jednim fajlom</p>
        </div>
        <a
          href="/sample-import.csv"
          download
          className="flex items-center gap-2 px-4 py-2.5 bg-[#1B3A6B] hover:bg-[#2a4f8f] text-white text-sm font-semibold rounded-xl transition-colors"
        >
          <Download size={16} />
          Preuzmi template
        </a>
      </div>

      {/* Result - done */}
      {stage === 'done' && finalResult && (
        <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <CheckCircle size={24} className="text-green-600" />
            </div>
            <div>
              <h2 className="font-black text-gray-900">Uvoz završen!</h2>
              <p className="text-sm text-gray-500">Obrađeno {finalResult.total} redova</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3 mb-5">
            {[
              { label: 'Kreirano', value: finalResult.created, color: 'bg-green-50 text-green-700 border-green-200' },
              { label: 'Ažurirano', value: finalResult.updated, color: 'bg-blue-50 text-blue-700 border-blue-200' },
              { label: 'Preskočeno', value: finalResult.skipped, color: 'bg-red-50 text-red-700 border-red-200' },
            ].map(({ label, value, color }) => (
              <div key={label} className={`rounded-xl border p-4 text-center ${color}`}>
                <p className="text-3xl font-black">{value}</p>
                <p className="text-sm font-medium">{label}</p>
              </div>
            ))}
          </div>
          {finalResult.errors.length > 0 && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-4">
              <p className="text-sm font-semibold text-red-700 mb-2 flex items-center gap-1">
                <AlertCircle size={15} />
                Greške ({finalResult.errors.length}):
              </p>
              <ul className="space-y-1 max-h-40 overflow-y-auto">
                {finalResult.errors.map((e, i) => (
                  <li key={i} className="text-xs text-red-600">
                    Red {e.row} (SKU: {e.sifra || '—'}): {e.reason}
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className="flex gap-3">
            <Link
              href="/admin"
              className="flex-1 py-2.5 bg-[#1B3A6B] text-white font-bold rounded-xl text-center text-sm hover:bg-[#2a4f8f] transition-colors"
            >
              Otvori Admin panel →
            </Link>
            <button
              onClick={reset}
              className="flex items-center gap-1.5 px-4 py-2.5 border border-gray-200 text-gray-600 text-sm font-medium rounded-xl hover:bg-gray-50 transition-colors"
            >
              <RefreshCw size={15} />
              Novi uvoz
            </button>
          </div>
        </div>
      )}

      {stage !== 'done' && (
        <>
          {/* Drop zone */}
          <div
            onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
            onDragLeave={() => setDragging(false)}
            onDrop={handleDrop}
            onClick={() => inputRef.current?.click()}
            className={`relative border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-all mb-5 ${
              dragging
                ? 'border-[#1B3A6B] bg-blue-50'
                : file
                ? 'border-green-400 bg-green-50'
                : 'border-gray-200 hover:border-[#1B3A6B]/40 hover:bg-gray-50'
            }`}
          >
            <input
              ref={inputRef}
              type="file"
              accept=".csv"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0]
                if (f) { setFile(f); setDryResult(null) }
              }}
            />
            {file ? (
              <div className="flex flex-col items-center gap-2">
                <FileText size={36} className="text-green-500" />
                <p className="font-semibold text-gray-800">{file.name}</p>
                <p className="text-sm text-gray-500">{(file.size / 1024).toFixed(1)} KB</p>
                <p className="text-xs text-green-600 font-medium">Klikni da promeniš fajl</p>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2 text-gray-400">
                <Upload size={36} />
                <p className="font-semibold text-gray-700">Prevuci CSV ovde ili klikni</p>
                <p className="text-sm">Podržani format: .csv (UTF-8)</p>
              </div>
            )}
          </div>

          {/* Dry run result */}
          {dryResult && (
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5 mb-5">
              <div className="flex items-center gap-2 font-semibold text-blue-800 mb-3">
                <Info size={18} />
                Analiza fajla — {dryResult.total} redova
              </div>
              <div className="grid grid-cols-3 gap-3 mb-3">
                {[
                  { label: 'Za kreiranje', value: dryResult.created },
                  { label: 'Za ažuriranje', value: dryResult.updated },
                  { label: 'Sa greškom', value: dryResult.skipped },
                ].map(({ label, value }) => (
                  <div key={label} className="bg-white rounded-xl border border-blue-100 p-3 text-center">
                    <p className="text-2xl font-black text-blue-700">{value}</p>
                    <p className="text-xs text-blue-600">{label}</p>
                  </div>
                ))}
              </div>
              {dryResult.errors.length > 0 && (
                <div className="bg-white rounded-xl border border-red-200 p-3 mb-3">
                  <p className="text-xs font-semibold text-red-600 mb-1">Redovi sa greškama:</p>
                  <ul className="space-y-0.5 max-h-32 overflow-y-auto">
                    {dryResult.errors.map((e, i) => (
                      <li key={i} className="text-xs text-red-500">
                        Red {e.row}: {e.reason}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <p className="text-sm text-blue-700">
                Sve izgleda u redu? Klikni <strong>Pokreni uvoz</strong> da upišeš u bazu.
              </p>
            </div>
          )}

          {/* Actions */}
          {file && (
            <div className="flex gap-3">
              <button
                onClick={() => runImport(true)}
                disabled={stage === 'dry' || stage === 'importing'}
                className="flex-1 flex items-center justify-center gap-2 py-3 border-2 border-[#1B3A6B] text-[#1B3A6B] font-bold rounded-xl hover:bg-blue-50 disabled:opacity-50 transition-colors"
              >
                {stage === 'dry' ? <Loader2 size={18} className="animate-spin" /> : <FileText size={18} />}
                {stage === 'dry' ? 'Analiziram...' : 'Analiziraj fajl'}
              </button>
              <button
                onClick={() => runImport(false)}
                disabled={stage === 'dry' || stage === 'importing'}
                className="flex-1 flex items-center justify-center gap-2 py-3 bg-[#1B3A6B] hover:bg-[#2a4f8f] text-white font-bold rounded-xl disabled:opacity-50 transition-colors"
              >
                {stage === 'importing' ? <Loader2 size={18} className="animate-spin" /> : <Upload size={18} />}
                {stage === 'importing' ? 'Uvozim...' : 'Pokreni uvoz'}
              </button>
            </div>
          )}

          {stage === 'error' && (
            <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-sm text-red-700">
              <AlertCircle size={16} />
              Greška pri uvozu. Proverite format fajla i pokušajte ponovo.
            </div>
          )}
        </>
      )}

      {/* Format table */}
      <div className="mt-8 bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100 flex items-center gap-2">
          <Info size={16} className="text-[#1B3A6B]" />
          <h2 className="font-bold text-gray-900">Format CSV kolona</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2.5 text-left text-xs font-semibold text-gray-500 uppercase">Kolona</th>
                <th className="px-4 py-2.5 text-left text-xs font-semibold text-gray-500 uppercase">Obavezna</th>
                <th className="px-4 py-2.5 text-left text-xs font-semibold text-gray-500 uppercase">Opis</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {COLUMNS.map(({ name, required, desc }) => (
                <tr key={name} className="hover:bg-gray-50">
                  <td className="px-4 py-2.5">
                    <code className="bg-gray-100 text-[#1B3A6B] px-1.5 py-0.5 rounded text-xs font-mono">{name}</code>
                  </td>
                  <td className="px-4 py-2.5">
                    {required
                      ? <span className="text-xs font-semibold text-red-500">Da</span>
                      : <span className="text-xs text-gray-400">Ne</span>
                    }
                  </td>
                  <td className="px-4 py-2.5 text-gray-600 text-xs">{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-5 py-4 bg-amber-50 border-t border-amber-100">
          <p className="text-xs text-amber-700">
            <strong>Napomena:</strong> CSV mora biti UTF-8 enkodiran. Separator: zarez (,). Ako polje sadrži zarez, stavite ga pod navodnike. Kategorije moraju biti prethodno kreirane u adminu (slug npr. <code>kablovi</code>, <code>rasveta</code>). Brendovi se kreiraju automatski.
          </p>
        </div>
      </div>
    </div>
  )
}
