import StoreCreatorWizard from '@/components/create/StoreCreatorWizard'

export const metadata = {
  title: 'Create Store — SliceShop',
}

export default function CreatePage() {
  return (
    <div style={{ minHeight: '100vh', paddingTop: '5rem', paddingBottom: '4rem', background: '#fafaf8' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '0 1.5rem' }}>
        <StoreCreatorWizard />
      </div>
    </div>
  )
}
