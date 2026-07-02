import { Clock, MapPin, Phone, Camera, MessageCircle, Send, Scissors } from 'lucide-react'
import { workingHours, BARBER_NAME, PHONE, PHONE_TEL, ADDRESS, MAP_URL } from '@/lib/site-data'

const socials = [
  { label: 'اینستاگرام', icon: Camera, href: '#' },
  { label: 'واتساپ', icon: MessageCircle, href: '#' },
  { label: 'تلگرام', icon: Send, href: '#' },
]

export function SiteFooter() {
  return (
    <footer id="contact" className="scroll-mt-20 border-t border-border/60 bg-card/40">
      <div className="mx-auto max-w-6xl px-4 py-14">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* brand + hours */}
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/15 text-primary glow-green">
                <Scissors className="h-5 w-5" />
              </span>
              <span className="text-sm font-bold text-foreground">
                آرایشگاه مردانه {BARBER_NAME}
              </span>
            </div>
            <div className="mt-5 rounded-2xl border border-border bg-card p-4">
              <p className="flex items-center gap-2 text-sm font-bold text-foreground">
                <Clock className="h-4 w-4 text-primary" />
                ساعات کاری
              </p>
              <ul className="mt-3 space-y-2">
                {workingHours.map((wh) => (
                  <li
                    key={wh.day}
                    className="flex items-center justify-between gap-2 text-sm"
                  >
                    <span className="text-muted-foreground">{wh.day}</span>
                    <span className="font-medium text-foreground">{wh.time}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* address + contact */}
          <div>
            <p className="flex items-center gap-2 text-sm font-bold text-foreground">
              <MapPin className="h-4 w-4 text-primary" />
              آدرس
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {ADDRESS}
            </p>
            <a
              href={`tel:${PHONE_TEL}`}
              className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-bold text-primary-foreground transition-transform hover:scale-[1.02] glow-green"
            >
              <Phone className="h-4 w-4" />
              تماس سریع
            </a>
            <p className="mt-3 text-center text-xs text-muted-foreground">{PHONE}</p>

            <div className="mt-5 flex items-center gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card text-foreground transition-all hover:border-primary hover:text-primary hover:glow-green"
                >
                  <s.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* map placeholder */}
          <div>
            <p className="mb-3 text-sm font-bold text-foreground">موقعیت روی نقشه</p>
            <a
              href={MAP_URL}
              target="_blank"
              rel="noreferrer"
              aria-label={`مشاهده موقعیت ${ADDRESS} روی نقشه`}
              className="relative block h-56 overflow-hidden rounded-2xl border border-border bg-secondary/40"
            >
              <div
                className="absolute inset-0 opacity-40"
                style={{
                  backgroundImage:
                    'linear-gradient(oklch(0.876 0.263 142 / 12%) 1px, transparent 1px), linear-gradient(90deg, oklch(0.876 0.263 142 / 12%) 1px, transparent 1px)',
                  backgroundSize: '28px 28px',
                }}
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-center">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground glow-green">
                  <MapPin className="h-6 w-6" />
                </span>
                <span className="rounded-full bg-background/70 px-3 py-1 text-xs text-muted-foreground backdrop-blur">
                  {ADDRESS}
                </span>
              </div>
            </a>
          </div>
        </div>

        <div className="mt-12 border-t border-border/60 pt-6 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} آرایشگاه مردانه {BARBER_NAME} — تمامی حقوق
          محفوظ است.
        </div>
      </div>
    </footer>
  )
}
