import { redirect } from 'next/navigation'

// /dashboard → redirect to demo store dashboard
export default function DashboardIndex() {
  redirect('/dashboard/demo-store')
}
