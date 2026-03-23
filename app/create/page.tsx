import StoreCreatorWizard from '@/components/create/StoreCreatorWizard'

export const metadata = {
  title: 'Create Store — SliceShop',
}

export default function CreatePage() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-2xl mx-auto px-6">
        <StoreCreatorWizard />
      </div>
    </div>
  )
}
