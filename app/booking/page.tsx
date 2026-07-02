import type { Metadata } from 'next'
import { BookingSection } from '@/components/booking-section'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import { BARBER_NAME } from '@/lib/site-data'

export const metadata: Metadata = {
  title: `رزرو آنلاین نوبت | آرایشگاه مردانه ${BARBER_NAME}`,
  description: `رزرو آنلاین نوبت آرایشگاه مردانه ${BARBER_NAME} با انتخاب خدمت، روز و ساعت دلخواه.`,
}

export default function BookingPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        <BookingSection />
      </main>
      <SiteFooter />
    </div>
  )
}
