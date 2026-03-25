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

const LABEL = {
  fontFamily: '"IBM Plex Mono", monospace',
  fontSize: '0.625rem',
  letterSpacing: '0.1em',
  textTransform: 'uppercase' as const,
  color: '#71717a',
  display: 'block',
  marginBottom: '0.5rem',
}

const INPUT = {
  width: '100%',
  padding: '0.625rem 0.875rem',
  fontFamily: '"IBM Plex Mono", monospace',
  fontSize: '0.875rem',
  color: '#1a1a1a',
  background: '#fafaf8',
  border: '1px solid rgba(0,0,0,0.1)',
  borderRadius: '8px',
  outline: 'none',
  cursor: 'crosshair' as const,
}

export default function StepProducts({
  products, addProduct, removeProduct, onNext, onBack,
}: StepProductsProps) {
  const [showForm, setShowForm] = useState(false)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [stock, setStock] = useState('')
  const [unlimited, setUnlimited] = useState(false)
  const [digitalUrl, setDigitalUrl] = useState('')

  const resetForm = () => {
    setName(''); setDescription(''); setPrice(''); setStock('')
    setUnlimited(false); setDigitalUrl(''); setShowForm(false)
  }

  const handleAdd = () => {
    if (!name || !price) return
    addProduct({
      name, description,
      priceUSD: parseFloat(price),
      stock: unlimited ? 'unlimited' : parseInt(stock || '0', 10),
      category: 'digital',
      digitalUrl: digitalUrl || undefined,
    })
    resetForm()
  }

  return (
    <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* Products list */}
      {products.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {products.map((p) => (
            <div key={p.id} style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '0.75rem 1rem',
              background: '#fafaf8',
              border: '1px solid rgba(0,0,0,0.07)',
              borderRadius: '8px',
            }}>
              <div>
                <p style={{ fontFamily: '"Inter", sans-serif', fontSize: '0.875rem', color: '#1a1a1a', fontWeight: 500 }}>{p.name}</p>
                <p style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '0.75rem', color: '#16a34a', marginTop: '0.125rem' }}>${p.priceUSD} cUSD</p>
              </div>
              <button onClick={() => removeProduct(p.id)} style={{
                fontFamily: '"IBM Plex Mono", monospace', fontSize: '0.625rem',
                color: '#71717a', background: 'none', border: 'none', cursor: 'crosshair',
                textTransform: 'uppercase', letterSpacing: '0.08em',
              }}>
                Remove
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Add product */}
      {!showForm ? (
        <button
          onClick={() => setShowForm(true)}
          style={{
            width: '100%', padding: '0.75rem',
            fontFamily: '"IBM Plex Mono", monospace', fontSize: '0.75rem',
            textTransform: 'uppercase', letterSpacing: '0.08em',
            color: '#71717a', background: 'transparent',
            border: '1px dashed rgba(0,0,0,0.15)', borderRadius: '8px',
            cursor: 'crosshair',
          }}
        >
          + Add product
        </button>
      ) : (
        <div style={{ border: '1px solid rgba(0,0,0,0.08)', borderRadius: '8px', padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem', background: '#fafaf8' }}>
          <div><label style={LABEL}>Product Name</label>
            <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Product name" style={INPUT} /></div>
          <div><label style={LABEL}>Description</label>
            <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Short description" rows={2} style={{ ...INPUT, resize: 'none' }} /></div>
          <div><label style={LABEL}>Price (USD)</label>
            <input type="number" value={price} onChange={e => setPrice(e.target.value)} placeholder="0.00" min="0" step="0.01" style={INPUT} /></div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <label style={{ ...LABEL, marginBottom: 0 }}>Stock Quantity</label>
              <button onClick={() => setUnlimited(!unlimited)} style={{
                fontFamily: '"IBM Plex Mono", monospace', fontSize: '0.625rem',
                textTransform: 'uppercase', letterSpacing: '0.08em',
                color: unlimited ? '#f97316' : '#71717a', background: 'none', border: 'none', cursor: 'crosshair',
              }}>
                {unlimited ? '✓ ' : ''}Unlimited
              </button>
            </div>
            {!unlimited && <input type="number" value={stock} onChange={e => setStock(e.target.value)} placeholder="100" min="0" style={INPUT} />}
          </div>
          <div><label style={LABEL}>Digital URL <span style={{ color: '#71717a', fontWeight: 400 }}>(optional)</span></label>
            <input type="url" value={digitalUrl} onChange={e => setDigitalUrl(e.target.value)} placeholder="https://..." style={INPUT} /></div>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button onClick={resetForm} style={{
              flex: 1, padding: '0.625rem', fontFamily: '"Inter", sans-serif', fontSize: '0.875rem',
              color: '#71717a', background: 'transparent', border: '1px solid rgba(0,0,0,0.12)', borderRadius: '8px', cursor: 'crosshair',
            }}>Cancel</button>
            <button onClick={handleAdd} disabled={!name || !price} style={{
              flex: 1, padding: '0.625rem', fontFamily: '"Inter", sans-serif', fontSize: '0.875rem', fontWeight: 600,
              color: '#ffffff', background: name && price ? '#f97316' : '#f9731660', border: 'none', borderRadius: '8px',
              cursor: name && price ? 'crosshair' : 'not-allowed',
            }}>Add</button>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
        <button onClick={onBack} style={{
          flex: 1, padding: '0.875rem', fontFamily: '"Inter", sans-serif', fontSize: '0.9375rem',
          color: '#71717a', background: 'transparent', border: '1px solid rgba(0,0,0,0.12)', borderRadius: '8px', cursor: 'crosshair',
        }}>← Back</button>
        <button onClick={onNext} disabled={products.length === 0} style={{
          flex: 1, padding: '0.875rem', fontFamily: '"Inter", sans-serif', fontSize: '0.9375rem', fontWeight: 600,
          color: '#ffffff', background: products.length > 0 ? '#f97316' : '#f9731660', border: 'none', borderRadius: '8px',
          cursor: products.length > 0 ? 'crosshair' : 'not-allowed',
        }}>Next →</button>
      </div>
    </div>
  )
}
