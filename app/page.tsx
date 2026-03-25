import Hero from '@/components/landing/Hero'
import ValueProps from '@/components/landing/ValueProps'
import Ticker from '@/components/landing/Ticker'
import HowItWorks from '@/components/landing/HowItWorks'
import FeaturedStores from '@/components/landing/FeaturedStores'

export default function Home() {
  return (
    <>
      <Hero />
      <ValueProps />
      <Ticker />
      <HowItWorks />
      <FeaturedStores />
    </>
  )
}
