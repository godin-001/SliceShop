'use client'

import { useState } from 'react'
import type { Product } from '@/lib/mock-data'

interface StepProductsProps {
  products: Product[]
  addProduct: (product: Omit<Product, 'id' | 'active'>) => void
  removeProduct: (id: string) => void
  onNext: () => void
  onBack: () => void
}

export default function StepProducts({
  products,
  addProduct,
  removeProduct,
  onNext,
  onBack,
}: StepProductsProps) {
  const [showForm, setShowForm] = useState(false)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [stock, setStock] = useState('')
  const [unlimited, setUnlimited] = useState(false)
  const [digitalUrl, setDigitalUrl] = useState('')

  const resetForm = () => {
    setName('')
    setDescription('')
    setPrice('')
    setStock('')
    setUnlimited(false)
    setDigitalUrl('')
    setShowForm(false)
  }

  const handleAdd = () => {
    if (!name || !price) return
    addProduct({
      name,
      description,
      priceUSD: parseFloat(price),
      stock: unlimited ? 'unlimited' : parseInt(stock || '0', 10),
      category: 'digital',
      digitalUrl: digitalUrl || undefined,
    })
    resetForm()
  }

  const labelStyle = {
    fontFamily: '"DM Mono", monospace',
    letterSpacing: '0.1em',
    color: 'rgba(255,255,255,0.4)',
  } as const

  const inputStyle = {
    backgroundColor: 'transparent',
    border: '0.5px solid rgba(255,255,255,0.08)',
    fontFamily: '"DM Mono", monospace',
    cursor: 'crosshair' as const,
  }

  return (
    <div className="p-8 flex flex-col gap-6">
      {/* Products list */}
      {products.length > 0 && (
        <div className="flex flex-col gap-2">
          {products.map((p) => (
            <div
              key={p.id}
              className="flex items-center justify-between px-4 py-3"
              style={{ border: '0.5px solid rgba(255,255,255,0.08)' }}
            >
              <div className="flex flex-col">
                <span
                  className="text-sm text-white"
                  style={{ fontFamily: '"DM Mono", monospace' }}
                >
                  {p.name}
                </span>
                <span
                  className="text-xs"
                  style={{
                    fontFamily: '"DM Mono", monospace',
                    color: '#22c55e',
                  }}
                >
                  ${p.priceUSD}
                </span>
              </div>
              <button
                onClick={() => removeProduct(p.id)}
                className="text-xs text-white/30 hover:text-red-400 transition-colors"
                style={{
                  fontFamily: '"DM Mono", monospace',
                  cursor: 'crosshair',
                }}
              >
                DELETE
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Add product button / inline form */}
      {!showForm ? (
        <button
          onClick={() => setShowForm(true)}
          className="w-full py-3 text-xs uppercase font-bold tracking-widest text-white/50 hover:text-white transition-colors"
          style={{
            fontFamily: '"DM Mono", monospace',
            letterSpacing: '0.1em',
            border: '0.5px solid rgba(255,255,255,0.08)',
            backgroundColor: 'transparent',
            cursor: 'crosshair',
          }}
        >
          ADD PRODUCT +
        </button>
      ) : (
        <div
          className="flex flex-col gap-4 p-4"
          style={{ border: '0.5px solid rgba(255,255,255,0.08)' }}
        >
          {/* Name */}
          <div className="flex flex-col gap-1">
            <label className="text-[10px] uppercase" style={labelStyle}>
              Product Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Product name"
              className="w-full px-3 py-2 text-sm text-white placeholder:text-white/20 outline-none"
              style={inputStyle}
            />
          </div>

          {/* Description */}
          <div className="flex flex-col gap-1">
            <label className="text-[10px] uppercase" style={labelStyle}>
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Short description"
              rows={2}
              className="w-full px-3 py-2 text-sm text-white placeholder:text-white/20 outline-none resize-none"
              style={inputStyle}
            />
          </div>

          {/* Price */}
          <div className="flex flex-col gap-1">
            <label className="text-[10px] uppercase" style={labelStyle}>
              Price (USD)
            </label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="0.00"
              min="0"
              step="0.01"
              className="w-full px-3 py-2 text-sm text-white placeholder:text-white/20 outline-none"
              style={inputStyle}
            />
          </div>

          {/* Stock */}
          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <label className="text-[10px] uppercase" style={labelStyle}>
                Stock Quantity
              </label>
              <button
                onClick={() => setUnlimited(!unlimited)}
                className="flex items-center gap-2 text-[10px] uppercase"
                style={{
                  fontFamily: '"DM Mono", monospace',
                  letterSpacing: '0.1em',
                  color: unlimited ? '#22c55e' : 'rgba(255,255,255,0.4)',
                  cursor: 'crosshair',
                }}
              >
                <span
                  className="inline-block w-3 h-3"
                  style={{
                    border: '0.5px solid',
                    borderColor: unlimited ? '#22c55e' : 'rgba(255,255,255,0.2)',
                    backgroundColor: unlimited ? '#22c55e' : 'transparent',
                  }}
                />
                Unlimited
              </button>
            </div>
            {!unlimited && (
              <input
                type="number"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                placeholder="100"
                min="0"
                className="w-full px-3 py-2 text-sm text-white placeholder:text-white/20 outline-none"
                style={inputStyle}
              />
            )}
          </div>

          {/* Digital URL */}
          <div className="flex flex-col gap-1">
            <label className="text-[10px] uppercase" style={labelStyle}>
              Digital Delivery URL{' '}
              <span style={{ color: 'rgba(255,255,255,0.2)' }}>(optional)</span>
            </label>
            <input
              type="url"
              value={digitalUrl}
              onChange={(e) => setDigitalUrl(e.target.value)}
              placeholder="https://..."
              className="w-full px-3 py-2 text-sm text-white placeholder:text-white/20 outline-none"
              style={inputStyle}
            />
          </div>

          {/* Form actions */}
          <div className="flex gap-3">
            <button
              onClick={resetForm}
              className="flex-1 py-2 text-xs uppercase tracking-widest text-white/40 hover:text-white transition-colors"
              style={{
                fontFamily: '"DM Mono", monospace',
                letterSpacing: '0.1em',
                border: '0.5px solid rgba(255,255,255,0.08)',
                backgroundColor: 'transparent',
                cursor: 'crosshair',
              }}
            >
              CANCEL
            </button>
            <button
              onClick={handleAdd}
              disabled={!name || !price}
              className="flex-1 py-2 text-xs uppercase font-bold tracking-widest transition-opacity disabled:opacity-30"
              style={{
                fontFamily: '"DM Mono", monospace',
                letterSpacing: '0.1em',
                backgroundColor: '#22c55e',
                color: '#0a0a0a',
                cursor: name && price ? 'crosshair' : 'not-allowed',
              }}
            >
              ADD
            </button>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex gap-3 mt-4">
        <button
          onClick={onBack}
          className="flex-1 py-3 text-xs uppercase tracking-widest text-white/50 hover:text-white transition-colors"
          style={{
            fontFamily: '"DM Mono", monospace',
            letterSpacing: '0.1em',
            border: '0.5px solid rgba(255,255,255,0.08)',
            backgroundColor: 'transparent',
            cursor: 'crosshair',
          }}
        >
          {'\u2190 BACK'}
        </button>
        <button
          onClick={onNext}
          disabled={products.length === 0}
          className="flex-1 py-3 text-xs uppercase font-bold tracking-widest transition-opacity disabled:opacity-30"
          style={{
            fontFamily: '"DM Mono", monospace',
            letterSpacing: '0.1em',
            backgroundColor: '#22c55e',
            color: '#0a0a0a',
            cursor: products.length > 0 ? 'crosshair' : 'not-allowed',
          }}
        >
          {'NEXT \u2192'}
        </button>
      </div>
    </div>
  )
}
