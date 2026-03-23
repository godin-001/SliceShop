'use client'

import { useCreateStore } from '@/hooks/useStore'
import { chaosCasing } from '@/lib/utils'
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
    <div
      className="min-h-screen w-full flex flex-col items-center pt-32 pb-20 px-4"
      style={{ backgroundColor: '#0a0a0a' }}
    >
      <h1
        className="text-3xl font-bold mb-10"
        style={{ fontFamily: '"Syne", sans-serif', color: '#fff' }}
      >
        {chaosCasing('Create Your Store')}
      </h1>

      {/* Progress indicator */}
      <div className="flex items-center gap-0 mb-14 w-full max-w-md">
        {STEPS.map((label, i) => {
          const stepNum = i + 1
          const isActive = step === stepNum
          const isCompleted = step > stepNum

          return (
            <div key={label} className="flex items-center flex-1 last:flex-initial">
              <div className="flex flex-col items-center gap-2">
                <div
                  className="w-8 h-8 flex items-center justify-center text-xs font-bold"
                  style={{
                    fontFamily: '"DM Mono", monospace',
                    backgroundColor: isActive || isCompleted ? '#22c55e' : 'transparent',
                    border: isActive || isCompleted ? 'none' : '0.5px solid rgba(255,255,255,0.08)',
                    color: isActive || isCompleted ? '#0a0a0a' : 'rgba(255,255,255,0.4)',
                  }}
                >
                  {isCompleted ? '✓' : stepNum}
                </div>
                <span
                  className="text-[10px] uppercase"
                  style={{
                    fontFamily: '"DM Mono", monospace',
                    letterSpacing: '0.1em',
                    color: isActive ? '#22c55e' : 'rgba(255,255,255,0.4)',
                  }}
                >
                  {label}
                </span>
              </div>

              {i < STEPS.length - 1 && (
                <div
                  className="flex-1 h-px mx-3 mt-[-18px]"
                  style={{
                    backgroundColor: step > stepNum ? '#22c55e' : 'rgba(255,255,255,0.08)',
                  }}
                />
              )}
            </div>
          )
        })}
      </div>

      {/* Step content */}
      <div
        className="w-full max-w-lg"
        style={{ border: '0.5px solid rgba(255,255,255,0.08)' }}
      >
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
