import { Star, Quote } from 'lucide-react'
import { testimonials } from '@/lib/site-data'

export function TestimonialsSection() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-14 sm:py-24">
      <div className="text-center">
        <h2 className="text-2xl font-black text-foreground sm:text-4xl">
          نظر مشتریان
        </h2>
        <p className="mx-auto mt-3 max-w-md text-pretty text-sm text-muted-foreground">
          رضایت مشتری‌ها بهترین معرفی‌نامه ماست.
        </p>
      </div>

      <div className="relative mt-8 md:mt-10">
        <div
          className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain scroll-smooth px-4 pb-3 scrollbar-none md:mx-0 md:grid md:grid-cols-3 md:overflow-visible md:px-0 md:pb-0"
          aria-label="نظر مشتریان"
        >
          {testimonials.map((t) => (
            <figure
              key={t.name}
              className="flex w-[82vw] max-w-80 flex-none snap-start flex-col gap-3 rounded-3xl border border-border bg-card/95 p-5 transition-all hover:border-primary/60 hover:glow-green md:w-auto md:max-w-none md:p-6"
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex gap-0.5" aria-label="امتیاز ۵ از ۵">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>
                <Quote className="h-6 w-6 shrink-0 text-primary/40" />
              </div>

              <blockquote className="text-sm leading-7 text-muted-foreground">
                {t.text}
              </blockquote>

              <figcaption className="mt-auto flex items-center gap-3 border-t border-border/60 pt-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/15 text-sm font-bold text-primary md:h-11 md:w-11">
                  {t.initials}
                </span>
                <span className="text-sm font-bold text-foreground">{t.name}</span>
              </figcaption>
            </figure>
          ))}
        </div>

        <p className="mt-2 text-center text-xs text-muted-foreground/70 md:hidden">
          برای دیدن نظرهای بیشتر، کارت‌ها را به چپ و راست بکشید.
        </p>
      </div>
    </section>
  )
}
