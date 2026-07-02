'use client'

import Image from 'next/image'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Star, Clock } from 'lucide-react'

export function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(true)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')

    const syncMotionPreference = () => {
      setPrefersReducedMotion(mediaQuery.matches)
    }

    syncMotionPreference()
    mediaQuery.addEventListener('change', syncMotionPreference)

    return () => {
      mediaQuery.removeEventListener('change', syncMotionPreference)
    }
  }, [])

  useEffect(() => {
    const video = videoRef.current

    if (!video) {
      return
    }

    if (prefersReducedMotion) {
      video.pause()
      return
    }

    video.play().catch(() => {
      // Some browsers may block autoplay; the poster remains visible as fallback.
    })
  }, [prefersReducedMotion])

  const replayHeroVideo = useCallback(() => {
    const video = videoRef.current

    if (!video || prefersReducedMotion) {
      return
    }

    video.currentTime = 0
    video.play().catch(() => {
      // Keep the current/poster frame if playback is blocked.
    })
  }, [prefersReducedMotion])

  return (
    <section id="home" className="relative overflow-hidden pt-16">
      <div className="relative min-h-[92vh] w-full">
        <Image
          src="/videos/hero-barber-poster.webp"
          alt="مهدی خوش‌قدم، آرایشگر حرفه‌ای در سالن آرایش مردانه"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_45%]"
        />

        <video
          ref={videoRef}
          className={`hero-motion-video absolute inset-0 h-full w-full scale-100 object-cover object-[center_45%] ${
            prefersReducedMotion ? 'hidden' : ''
          }`}
          autoPlay={!prefersReducedMotion}
          muted
          playsInline
          preload="metadata"
          poster="/videos/hero-barber-poster.webp"
          aria-hidden="true"
          onClick={replayHeroVideo}
        >
          <source src="/videos/hero-barber-av1.webm" type='video/webm; codecs="av01"' />
          <source src="/videos/hero-barber-vp9.webm" type='video/webm; codecs="vp9"' />
          <source src="/videos/hero-barber-hevc.mp4" type='video/mp4; codecs="hvc1"' />
          <source src="/videos/hero-barber-h264.mp4" type="video/mp4" />
        </video>

        {/* overlays for cinematic depth + readability */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/30" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-l from-background/80 via-transparent to-background/40" />

        <div className="absolute inset-0 flex items-end">
          <div className="mx-auto w-full max-w-6xl px-4 pb-14 sm:pb-20">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-background/60 px-4 py-1.5 text-xs font-medium text-primary backdrop-blur">
              <Star className="h-3.5 w-3.5 fill-primary" />
              آرایشگاه مردانه مهدی خوش‌قدم
            </span>

            <h1 className="mt-5 max-w-xl text-balance text-4xl font-black leading-tight text-foreground sm:text-6xl">
              استایل حرفه‌ای،
              <span className="block text-primary text-glow">اصلاح بی‌نقص</span>
            </h1>

            <p className="mt-4 max-w-md text-pretty text-sm leading-relaxed text-muted-foreground sm:text-base">
              رزرو آنلاین نوبت آرایشگاه مردانه مهدی خوش‌قدم با انتخاب خدمت و ساعت
              دلخواه.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a
                href="/booking"
                className="inline-flex items-center justify-center rounded-full bg-primary px-7 py-3.5 text-sm font-bold text-primary-foreground transition-transform hover:scale-[1.03] glow-green"
              >
                رزرو نوبت
              </a>
              <a
                href="#services"
                className="inline-flex items-center justify-center rounded-full border border-border bg-background/60 px-7 py-3.5 text-sm font-bold text-foreground backdrop-blur transition-colors hover:border-primary hover:text-primary"
              >
                مشاهده خدمات
              </a>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <Star className="h-4 w-4 fill-primary text-primary" />
                امتیاز ۴.۹ از ۵
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-primary" />
                رزرو آنلاین و سریع
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
