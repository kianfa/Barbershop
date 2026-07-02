'use client'

import { useState } from 'react'
import { Menu, X, Scissors, Phone } from 'lucide-react'
import { navLinks, PHONE_TEL } from '@/lib/site-data'

export function SiteHeader() {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4">
        <a href="/" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/15 text-primary glow-green">
            <Scissors className="h-5 w-5" />
          </span>
          <span className="text-sm font-bold leading-tight text-foreground">
            آرایشگاه
            <span className="block text-primary text-glow">مهدی خوش‌قدم</span>
          </span>
        </a>

        <nav className="hidden items-center gap-7 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="/booking"
            className="hidden rounded-full bg-primary px-5 py-2 text-sm font-bold text-primary-foreground transition-transform hover:scale-[1.03] glow-green sm:inline-flex"
          >
            رزرو نوبت
          </a>
          <a
            href={`tel:${PHONE_TEL}`}
            aria-label="تماس تلفنی"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground glow-green sm:hidden"
          >
            <Phone className="h-5 w-5" />
          </a>
          <button
            type="button"
            aria-label={open ? 'بستن منو' : 'باز کردن منو'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-foreground lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-border/60 bg-background/95 px-4 py-3 lg:hidden">
          <ul className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-3 py-3 text-sm text-muted-foreground transition-colors hover:bg-card hover:text-primary"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="/booking"
                onClick={() => setOpen(false)}
                className="mt-1 block rounded-xl bg-primary px-3 py-3 text-center text-sm font-bold text-primary-foreground glow-green"
              >
                رزرو نوبت
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  )
}
