'use client'

import { type FormEvent, useMemo, useState } from 'react'
import { ArrowRight, CalendarDays, Check, Clock, Lock, Percent, User } from 'lucide-react'
import { services, BARBER_NAME } from '@/lib/site-data'

const times = [
  '۱۰:۰۰',
  '۱۰:۴۵',
  '۱۱:۳۰',
  '۱۲:۱۵',
  '۱۴:۰۰',
  '۱۵:۳۰',
  '۱۷:۰۰',
  '۱۸:۳۰',
  '۲۰:۰۰',
]

const bookedTimesByDayOffset: Record<number, string[]> = {
  0: ['۱۱:۳۰', '۱۸:۳۰'],
  1: ['۱۰:۴۵', '۱۵:۳۰'],
  3: ['۱۲:۱۵', '۲۰:۰۰'],
  5: ['۱۴:۰۰'],
}

const VALID_DISCOUNT_CODE = 'MEHDI10'
const DISCOUNT_RATE = 0.1
const persianDigits = '۰۱۲۳۴۵۶۷۸۹'
const arabicDigits = '٠١٢٣٤٥٦٧٨٩'

function toEnglishDigits(value: string) {
  return value
    .replace(/[۰-۹]/g, (digit) => String(persianDigits.indexOf(digit)))
    .replace(/[٠-٩]/g, (digit) => String(arabicDigits.indexOf(digit)))
}

function getPriceInToman(price: string) {
  const normalized = toEnglishDigits(price)
  const priceNumber = Number(normalized.match(/\d+/)?.[0] ?? 0)

  if (!priceNumber) {
    return null
  }

  return price.includes('هزار') ? priceNumber * 1000 : priceNumber
}

function formatToman(value: number) {
  return `${new Intl.NumberFormat('fa-IR').format(value)} تومان`
}

function useUpcomingDays() {
  return useMemo(() => {
    const weekdayFmt = new Intl.DateTimeFormat('fa-IR', { weekday: 'short' })
    const dayFmt = new Intl.DateTimeFormat('fa-IR', { day: 'numeric' })
    const monthFmt = new Intl.DateTimeFormat('fa-IR', { month: 'short' })
    return Array.from({ length: 7 }).map((_, i) => {
      const d = new Date()
      d.setDate(d.getDate() + i)
      return {
        key: d.toISOString().slice(0, 10),
        offset: i,
        weekday: i === 0 ? 'امروز' : weekdayFmt.format(d),
        day: dayFmt.format(d),
        month: monthFmt.format(d),
      }
    })
  }, [])
}

export function BookingSection() {
  const days = useUpcomingDays()
  const [serviceId, setServiceId] = useState(services[0].id)
  const [dayKey, setDayKey] = useState(days[0].key)
  const [time, setTime] = useState<string | null>(null)
  const [discountCode, setDiscountCode] = useState('')
  const [discountStatus, setDiscountStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [discountApplied, setDiscountApplied] = useState(false)
  const [confirmed, setConfirmed] = useState(false)

  const selectedService = services.find((s) => s.id === serviceId)!
  const selectedDay = days.find((d) => d.key === dayKey)!
  const bookedTimes = bookedTimesByDayOffset[selectedDay.offset] ?? []
  const servicePrice = getPriceInToman(selectedService.price)
  const discountAmount = discountApplied && servicePrice ? Math.round(servicePrice * DISCOUNT_RATE) : 0
  const finalPrice = servicePrice && discountApplied ? servicePrice - discountAmount : servicePrice
  const canConfirm = Boolean(time)

  const handleDiscountSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const normalizedCode = discountCode.trim().toUpperCase()

    if (!normalizedCode) {
      setDiscountApplied(false)
      setDiscountStatus('idle')
      return
    }

    if (normalizedCode === VALID_DISCOUNT_CODE) {
      setDiscountApplied(true)
      setDiscountStatus('success')
      setConfirmed(false)
      return
    }

    setDiscountApplied(false)
    setDiscountStatus('error')
    setConfirmed(false)
  }

  return (
    <section
      id="booking"
      className="scroll-mt-20 bg-gradient-to-b from-transparent via-primary/5 to-transparent px-4 pb-16 pt-28 sm:pb-24 sm:pt-32"
    >
      <div className="mx-auto max-w-5xl">
        <a
          href="/"
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-4 py-2 text-xs font-bold text-muted-foreground transition-colors hover:border-primary hover:text-primary"
        >
          <ArrowRight className="h-4 w-4" />
          بازگشت به صفحه اصلی
        </a>

        <div className="grid items-start gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="rounded-3xl border border-primary/20 bg-card/70 p-5 sm:p-7 lg:sticky lg:top-24">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-3 py-1.5 text-xs font-bold text-primary">
              <CalendarDays className="h-4 w-4" />
              صفحه اختصاصی رزرو
            </span>
            <h1 className="mt-5 text-2xl font-black leading-tight text-foreground sm:text-4xl">
              رزرو آنلاین نوبت
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              خدمت، روز و ساعت دلخواهت رو انتخاب کن. چند زمان نمونه به‌صورت رزرو شده نمایش داده شده‌اند تا انتخاب زمان راحت‌تر باشد.
            </p>

            <div className="mt-6 flex items-center gap-3 rounded-2xl border border-border bg-secondary/50 p-4">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/15 text-primary">
                <User className="h-6 w-6" />
              </span>
              <div>
                <p className="text-xs text-muted-foreground">آرایشگر</p>
                <p className="text-base font-bold text-foreground">{BARBER_NAME}</p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-primary/30 bg-card p-4 glow-green sm:p-6 lg:p-8">
            {/* service select */}
            <div>
              <p className="mb-3 text-sm font-bold text-foreground">انتخاب خدمت</p>
              <div className="grid grid-cols-1 gap-2 min-[420px]:grid-cols-2">
                {services.map((service) => {
                  const active = service.id === serviceId
                  return (
                    <button
                      key={service.id}
                      type="button"
                      onClick={() => {
                        setServiceId(service.id)
                        setConfirmed(false)
                      }}
                      aria-pressed={active}
                      className={`flex min-h-24 flex-col justify-between rounded-2xl border p-3 text-right transition-all sm:p-4 ${
                        active
                          ? 'border-primary bg-primary/10 glow-green'
                          : 'border-border bg-secondary/40 hover:border-primary/50'
                      }`}
                    >
                      <span>
                        <span className="block text-sm font-bold text-foreground">
                          {service.title}
                        </span>
                        <span className="mt-1 line-clamp-2 block text-xs leading-5 text-muted-foreground">
                          {service.description}
                        </span>
                      </span>
                      <span className="mt-3 flex items-center justify-between gap-2 text-xs">
                        <span className="inline-flex items-center gap-1 text-muted-foreground">
                          <Clock className="h-3 w-3 text-primary" />
                          {service.duration}
                        </span>
                        <span className="font-bold text-primary">{service.price}</span>
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* date selector */}
            <div className="mt-6">
              <p className="mb-3 flex items-center gap-2 text-sm font-bold text-foreground">
                <CalendarDays className="h-4 w-4 text-primary" />
                انتخاب روز
              </p>
              <div className="grid grid-cols-4 gap-2 sm:grid-cols-7">
                {days.map((d) => {
                  const active = d.key === dayKey
                  return (
                    <button
                      key={d.key}
                      type="button"
                      onClick={() => {
                        setDayKey(d.key)
                        setTime(null)
                        setConfirmed(false)
                      }}
                      aria-pressed={active}
                      className={`flex min-h-20 flex-col items-center justify-center gap-1 rounded-2xl border px-2 py-2.5 transition-all ${
                        active
                          ? 'border-primary bg-primary text-primary-foreground glow-green'
                          : 'border-border bg-secondary/40 text-foreground hover:border-primary/50'
                      }`}
                    >
                      <span className="text-[11px] leading-none opacity-80">{d.weekday}</span>
                      <span className="text-lg font-black leading-none">{d.day}</span>
                      <span className="text-[10px] leading-none opacity-70">{d.month}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* time chips */}
            <div className="mt-6">
              <div className="mb-3 flex items-center justify-between gap-3">
                <p className="flex items-center gap-2 text-sm font-bold text-foreground">
                  <Clock className="h-4 w-4 text-primary" />
                  انتخاب ساعت
                </p>
                <span className="text-[11px] text-muted-foreground">زمان‌های غیرفعال رزرو شده‌اند</span>
              </div>
              <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 lg:grid-cols-5">
                {times.map((t) => {
                  const booked = bookedTimes.includes(t)
                  const active = t === time && !booked
                  return (
                    <button
                      key={t}
                      type="button"
                      disabled={booked}
                      onClick={() => {
                        setTime(t)
                        setConfirmed(false)
                      }}
                      aria-pressed={active}
                      className={`min-h-12 rounded-2xl border px-2 py-2 text-center transition-all ${
                        active
                          ? 'border-primary bg-primary text-primary-foreground glow-green'
                          : booked
                            ? 'cursor-not-allowed border-border/70 bg-secondary/20 text-muted-foreground/60 opacity-75'
                            : 'border-border bg-secondary/40 text-foreground hover:border-primary/50'
                      }`}
                    >
                      <span className="block text-sm font-black leading-none">{t}</span>
                      {booked && (
                        <span className="mt-1 inline-flex items-center justify-center gap-1 text-[10px] leading-none">
                          <Lock className="h-3 w-3" />
                          رزرو شده
                        </span>
                      )}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* discount code */}
            <div className="mt-6 rounded-2xl border border-border/60 bg-secondary/35 p-3 sm:p-4">
              <div className="mb-2 flex items-center gap-2 text-sm font-bold text-foreground">
                <Percent className="h-4 w-4 text-primary" />
                کد تخفیف
              </div>
              <form onSubmit={handleDiscountSubmit} className="flex gap-2">
                <input
                  type="text"
                  dir="auto"
                  value={discountCode}
                  onChange={(event) => {
                    setDiscountCode(event.target.value)
                    setDiscountStatus('idle')
                    setDiscountApplied(false)
                    setConfirmed(false)
                  }}
                  placeholder="کد تخفیف خود را وارد کنید"
                  aria-label="کد تخفیف"
                  autoComplete="off"
                  className="min-w-0 flex-1 rounded-2xl border border-border bg-background/50 px-3 py-3 text-right text-sm font-bold text-foreground outline-none transition-colors placeholder:text-muted-foreground/45 focus:border-primary"
                />
                <button
                  type="submit"
                  className="shrink-0 rounded-2xl border border-primary/40 bg-primary/10 px-4 py-3 text-sm font-black text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
                >
                  اعمال
                </button>
              </form>
              {discountStatus === 'success' && (
                <p className="mt-2 text-xs font-bold text-primary">کد تخفیف ۱۰٪ اعمال شد</p>
              )}
              {discountStatus === 'error' && (
                <p className="mt-2 text-xs font-bold text-destructive">کد تخفیف معتبر نیست</p>
              )}
            </div>

            {/* summary */}
            <div className="mt-6 rounded-2xl border border-border/60 bg-secondary/40 p-4 text-sm">
              <div className="flex items-center justify-between gap-2 border-b border-border/50 py-1.5">
                <span className="text-muted-foreground">خدمت</span>
                <span className="font-bold text-foreground">
                  {selectedService.title}
                </span>
              </div>
              <div className="flex items-center justify-between gap-2 border-b border-border/50 py-1.5">
                <span className="text-muted-foreground">روز</span>
                <span className="font-bold text-foreground">
                  {selectedDay.weekday} {selectedDay.day} {selectedDay.month}
                </span>
              </div>
              <div className="flex items-center justify-between gap-2 border-b border-border/50 py-1.5">
                <span className="text-muted-foreground">ساعت</span>
                <span className="font-bold text-foreground">
                  {time ?? 'انتخاب نشده'}
                </span>
              </div>
              <div className="flex items-center justify-between gap-2 border-b border-border/50 py-1.5">
                <span className="text-muted-foreground">هزینه</span>
                <span className="text-left font-bold text-foreground">
                  {discountApplied && finalPrice ? (
                    <span className="flex flex-col items-end gap-0.5">
                      <span className="text-xs text-muted-foreground line-through">{selectedService.price}</span>
                      <span className="text-primary">{formatToman(finalPrice)}</span>
                    </span>
                  ) : (
                    selectedService.price
                  )}
                </span>
              </div>
              {discountApplied && discountAmount > 0 && (
                <div className="flex items-center justify-between gap-2 py-1.5">
                  <span className="text-muted-foreground">تخفیف</span>
                  <span className="font-bold text-primary">{formatToman(discountAmount)}</span>
                </div>
              )}
            </div>

            <button
              type="button"
              disabled={!canConfirm}
              onClick={() => setConfirmed(true)}
              className="mt-5 w-full rounded-full bg-primary py-4 text-base font-black text-primary-foreground transition-transform enabled:hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-40 enabled:glow-green"
            >
              تأیید رزرو
            </button>

            {confirmed && (
              <div className="mt-4 flex items-center gap-3 rounded-2xl border border-primary/40 bg-primary/10 p-4 text-sm text-foreground">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Check className="h-5 w-5" />
                </span>
                <p className="leading-relaxed">
                  نوبت شما برای <b>{selectedService.title}</b> در{' '}
                  <b>
                    {selectedDay.weekday} {selectedDay.day} {selectedDay.month}
                  </b>{' '}
                  ساعت <b>{time}</b> با موفقیت ثبت شد.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
