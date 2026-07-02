import { Brush, Clock, Crown, Scissors, Sparkles } from 'lucide-react'
import { services } from '@/lib/site-data'

const icons: Record<string, typeof Scissors> = {
  classic: Scissors,
  beard: Brush,
  shave: Sparkles,
  groom: Crown,
}

export function ServicesSection() {
  return (
    <section id="services" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-10 sm:py-20">
      <div className="text-center">
        <h2 className="text-2xl font-black text-foreground sm:text-4xl">
          خدمات آرایشگاه
        </h2>
        <p className="mx-auto mt-2 max-w-md text-pretty text-sm leading-6 text-muted-foreground sm:mt-3">
          خدمات تخصصی مردانه با بالاترین کیفیت و متریال درجه‌یک.
        </p>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-2 sm:mt-10 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
        {services.map((service) => {
          const Icon = icons[service.id] ?? Scissors
          return (
            <article
              key={service.id}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card/85 p-3 transition-all hover:border-primary/70 hover:glow-green sm:flex sm:min-h-56 sm:flex-col sm:p-5"
            >
              <div className="absolute inset-x-4 top-0 h-px bg-gradient-to-l from-transparent via-primary/50 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

              <div className="flex items-center gap-3 sm:flex-col sm:items-start sm:gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground sm:h-12 sm:w-12 sm:rounded-2xl">
                  <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                </span>

                <div className="min-w-0 flex-1 sm:w-full">
                  <div className="flex items-start justify-between gap-2 sm:block">
                    <h3 className="text-sm font-black leading-6 text-foreground sm:text-lg sm:leading-7">
                      {service.title}
                    </h3>
                    <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-secondary px-2 py-0.5 text-[11px] font-medium text-muted-foreground sm:mt-3 sm:w-fit sm:px-2.5 sm:py-1">
                      <Clock className="h-3 w-3 text-primary sm:h-3.5 sm:w-3.5" />
                      {service.duration}
                    </span>
                  </div>

                  <p className="mt-0.5 text-[11px] leading-5 text-muted-foreground sm:mt-3 sm:text-sm sm:leading-6">
                    {service.description}
                  </p>
                </div>
              </div>

              <div className="mt-2 flex items-center justify-between gap-3 sm:mt-auto sm:border-t sm:border-border/60 sm:pt-4">
                <span className="text-sm font-black text-primary sm:text-base">
                  {service.price}
                </span>
                <a
                  href="/booking"
                  className="inline-flex h-8 items-center justify-center rounded-full bg-primary px-4 text-xs font-black text-primary-foreground transition-transform hover:scale-[1.04] sm:h-9 sm:px-5 sm:text-sm"
                >
                  رزرو
                </a>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}
