import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Vazirmatn } from 'next/font/google'
import './globals.css'

const vazirmatn = Vazirmatn({
  variable: '--font-vazirmatn',
  subsets: ['arabic', 'latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'آرایشگاه مردانه مهدی خوش‌قدم | رزرو آنلاین نوبت',
  description:
    'رزرو آنلاین نوبت آرایشگاه مردانه مهدی خوش‌قدم؛ کوتاهی کلاسیک، اصلاح و فرم‌دهی ریش، شیو لوکس و اصلاح داماد با انتخاب خدمت و ساعت دلخواه.',
  generator: 'v0.app',
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#0b0f0c',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fa" dir="rtl" className={`dark ${vazirmatn.variable}`}>
      <body className="bg-background font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
