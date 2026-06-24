'use client'

import { useEffect, useState } from 'react'
import { CheckCircle, X, AlertCircle, Info } from 'lucide-react'
import { cn } from '@/lib/utils'

type ToastType = 'success' | 'error' | 'info'

type Toast = {
  id: string
  message: string
  type: ToastType
}

let listeners: ((toasts: Toast[]) => void)[] = []
let toasts: Toast[] = []

function notify(toastsList: Toast[]) {
  toasts = toastsList
  listeners.forEach((l) => l(toasts))
}

export function toast(message: string, type: ToastType = 'success') {
  const id = Math.random().toString(36).slice(2)
  notify([...toasts, { id, message, type }])
  setTimeout(() => notify(toasts.filter((t) => t.id !== id)), 3500)
}

const ICONS = {
  success: CheckCircle,
  error: AlertCircle,
  info: Info,
}

const COLORS = {
  success: 'bg-green-500',
  error: 'bg-red-500',
  info: 'bg-[#1B3A6B]',
}

export default function ToastContainer() {
  const [items, setItems] = useState<Toast[]>([])

  useEffect(() => {
    listeners.push(setItems)
    return () => { listeners = listeners.filter((l) => l !== setItems) }
  }, [])

  if (items.length === 0) return null

  return (
    <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2">
      {items.map((item) => {
        const Icon = ICONS[item.type]
        return (
          <div
            key={item.id}
            className={cn(
              'flex items-center gap-3 px-4 py-3 rounded-xl text-white shadow-lg max-w-sm',
              COLORS[item.type]
            )}
          >
            <Icon size={18} className="shrink-0" />
            <p className="text-sm font-medium flex-1">{item.message}</p>
            <button
              onClick={() => notify(toasts.filter((t) => t.id !== item.id))}
              className="opacity-70 hover:opacity-100"
            >
              <X size={16} />
            </button>
          </div>
        )
      })}
    </div>
  )
}
