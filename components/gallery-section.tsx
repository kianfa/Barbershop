import Image from 'next/image'
import { galleryItems } from '@/lib/site-data'

export function GallerySection() {
  return (
    <section id="gallery" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-16 sm:py-24">
      <div className="text-center">
        <h2 className="text-2xl font-black text-foreground sm:text-4xl">
          نمونه کارها
        </h2>
        <p className="mx-auto mt-3 max-w-md text-pretty text-sm text-muted-foreground">
          نگاهی به کیفیت کار و دقت مهدی خوش‌قدم در استایل‌های مختلف.
        </p>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-3 sm:mt-10 sm:gap-4 lg:grid-cols-4">
        {galleryItems.map((item) => (
          <div
            key={item.label}
            className="group relative aspect-[4/5] overflow-hidden rounded-2xl border border-border bg-card/40 transition-all hover:border-primary/70 hover:glow-green sm:rounded-3xl"
          >
            <Image
              src={item.src}
              alt={item.label}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/85 via-transparent to-transparent" />
            <span className="absolute bottom-3 right-3 rounded-full bg-background/70 px-3 py-1 text-xs font-bold text-primary backdrop-blur">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}
