'use client'

import { useCreateStore } from '@/hooks/useStore'
import StepIdentity from './StepIdentity'
import StepProducts from './StepProducts'
import StepPayments from './StepPayments'
import ConfirmationScreen from './ConfirmationScreen'

const STEPS = ['Identity', 'Products', 'Payments'] as const

export default function StoreCreatorWizard() {
  const {
    step, nextStep, prevStep,
    storeName, setStoreName,
    description, setDescription,
    category, setCategory,
    products, addProduct, removeProduct,
    paymentCurrency, setPaymentCurrency,
    autoConfirm, setAutoConfirm,
    isDeploying, isDeployed, deploy,
  } = useCreateStore()

  if (isDeployed) {
    return <ConfirmationScreen storeName={storeName} />
  }

  return (
    <div style={{ paddingTop: '2rem', paddingBottom: '3rem' }}>
      {/* Heading */}
      <div style={{ marginBottom: '2.5rem' }}>
        <p style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '0.6875rem', color: '#71717a', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.75rem' }}>
          Store creator
        </p>
        <h1 style={{ fontFamily: '"Playfair Display", serif', fontSize: '2rem', fontWeight: 700, color: '#1a1a1a' }}>
          Open your store
        </h1>
      </div>

      {/* Progress indicator */}
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '2.5rem' }}>
        {STEPS.map((label, i) => {
          const stepNum = i + 1
          const isActive = step === stepNum
          const isCompleted = step > stepNum

          return (
            <div key={label} style={{ display: 'flex', alignItems: 'center', flex: i < STEPS.length - 1 ? 1 : undefined }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.375rem' }}>
                <div style={{
                  width: '2rem',
                  height: '2rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '50%',
                  fontFamily: '"IBM Plex Mono", monospace',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  backgroundColor: isActive ? '#f97316' : isCompleted ? '#16a34a' : 'transparent',
                  border: isActive || isCompleted ? 'none' : '1px solid rgba(0,0,0,0.15)',
                  color: isActive || isCompleted ? '#ffffff' : '#71717a',
                  transition: 'all 0.2s',
                }}>
                  {isCompleted ? '✓' : stepNum}
                </div>
                <span style={{
                  fontFamily: '"IBM Plex Mono", monospace',
                  fontSize: '0.6rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: isActive ? '#f97316' : isCompleted ? '#16a34a' : '#71717a',
                }}>
                  {label}
                </span>
              </div>

              {i < STEPS.length - 1 && (
                <div style={{
                  flex: 1,
                  height: '1px',
                  margin: '0 0.75rem',
                  marginBottom: '1.25rem',
                  backgroundColor: step > stepNum ? '#16a34a' : 'rgba(0,0,0,0.1)',
                  transition: 'background-color 0.2s',
                }} />
              )}
            </div>
          )
        })}
      </div>

      {/* Step content */}
      <div style={{
        background: '#ffffff',
        border: '1px solid rgba(0,0,0,0.08)',
        borderRadius: '12px',
        overflow: 'hidden',
      }}>
        {step === 1 && (
          <StepIdentity
            storeName={storeName}
            setStoreName={setStoreName}
            description={description}
            setDescription={setDescription}
            category={category}
            setCategory={setCategory}
            onNext={nextStep}
          />
        )}
        {step === 2 && (
          <StepProducts
            products={products}
            addProduct={addProduct}
            removeProduct={removeProduct}
            onNext={nextStep}
            onBack={prevStep}
          />
        )}
        {step === 3 && (
          <StepPayments
            paymentCurrency={paymentCurrency}
            setPaymentCurrency={setPaymentCurrency}
            autoConfirm={autoConfirm}
            setAutoConfirm={setAutoConfirm}
            onBack={prevStep}
            onDeploy={deploy}
            isDeploying={isDeploying}
          />
        )}
      </div>
    </div>
  )
}
