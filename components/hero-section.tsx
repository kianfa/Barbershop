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
          <div className="mx-auto w-full max-w-6xl px-4 pb-6 sm:pb-20">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/40 bg-background/60 px-3 py-1 text-[11px] font-medium text-primary backdrop-blur sm:gap-2 sm:px-4 sm:py-1.5 sm:text-xs">
              <Star className="h-3 w-3 fill-primary sm:h-3.5 sm:w-3.5" />
              آرایشگاه مردانه مهدی خوش‌قدم
            </span>

            <h1 className="mt-3 max-w-xl text-balance text-3xl font-black leading-[1.12] text-foreground sm:mt-5 sm:text-6xl sm:leading-tight">
              استایل حرفه‌ای،
              <span className="block text-primary text-glow">اصلاح بی‌نقص</span>
            </h1>

            <p className="mt-2.5 max-w-[19rem] text-pretty text-sm leading-6 text-muted-foreground sm:mt-4 sm:max-w-md sm:text-base sm:leading-relaxed">
              رزرو آنلاین نوبت آرایشگاه مردانه مهدی خوش‌قدم با انتخاب خدمت و ساعت
              دلخواه.
            </p>

            <div className="mt-4 grid grid-cols-2 gap-2 sm:mt-7 sm:flex sm:flex-row sm:gap-3">
              <a
                href="/booking"
                className="inline-flex min-h-11 items-center justify-center rounded-full bg-primary px-4 py-3 text-xs font-bold text-primary-foreground transition-transform hover:scale-[1.03] sm:min-h-0 sm:px-7 sm:py-3.5 sm:text-sm glow-green"
              >
                رزرو نوبت
              </a>
              <a
                href="#services"
                className="inline-flex min-h-11 items-center justify-center rounded-full border border-border bg-background/60 px-4 py-3 text-xs font-bold text-foreground backdrop-blur transition-colors hover:border-primary hover:text-primary sm:min-h-0 sm:px-7 sm:py-3.5 sm:text-sm"
              >
                مشاهده خدمات
              </a>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] text-muted-foreground sm:mt-8 sm:gap-x-6 sm:gap-y-3 sm:text-xs">
              <span className="inline-flex items-center gap-1.5">
                <Star className="h-3.5 w-3.5 fill-primary text-primary sm:h-4 sm:w-4" />
                امتیاز ۴.۹ از ۵
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 text-primary sm:h-4 sm:w-4" />
                رزرو آنلاین و سریع
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
