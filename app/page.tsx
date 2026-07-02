import { SiteHeader } from '@/components/site-header'
import { HeroSection } from '@/components/hero-section'
import { ServicesSection } from '@/components/services-section'
import { GallerySection } from '@/components/gallery-section'
import { TestimonialsSection } from '@/components/testimonials-section'
import { SiteFooter } from '@/components/site-footer'

export default function Page() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        <HeroSection />
        <ServicesSection />
        <GallerySection />
        <TestimonialsSection />
      </main>
      <SiteFooter />
    </div>
  )
}
