export const BARBER_NAME = 'شهاب'
export const PHONE = '۰۲۱-۷۷۸۸۹۹۰۰'
export const PHONE_TEL = '02177889900'
export const ADDRESS = 'تهران شهرک نفت'
export const MAP_URL = 'https://www.google.com/maps/search/?api=1&query=Tabriz%20El%20Goli'

export type Service = {
  id: string
  title: string
  duration: string
  durationMin: number
  price: string
  description: string
}

export const services: Service[] = [
  {
    id: 'classic',
    title: 'کوتاهی کلاسیک',
    duration: '۴۵ دقیقه',
    durationMin: 45,
    price: '۴۵۰ هزار تومان',
    description: 'تمیز، خوش‌فرم و مناسب استفاده روزمره.',
  },
  {
    id: 'beard',
    title: 'اصلاح و فرم‌دهی ریش',
    duration: '۳۰ دقیقه',
    durationMin: 30,
    price: '۳۵۰ هزار تومان',
    description: 'مرتب‌سازی خط ریش و فرم بهتر چهره.',
  },
  {
    id: 'shave',
    title: 'اصلاح کامل و شیو لوکس',
    duration: '۶۰ دقیقه',
    durationMin: 60,
    price: '۵۵۰ هزار تومان',
    description: 'شیو دقیق با حس تمیزی و مراقبت کامل.',
  },
  {
    id: 'groom',
    title: 'اصلاح داماد',
    duration: '۹۰ دقیقه',
    durationMin: 90,
    price: '۹۵۰ هزار تومان',
    description: 'پکیج کامل برای ظاهر مرتب روزهای خاص.',
  },
]

export const galleryItems = [
  { src: '/gallery/portfolio-work-01.webp', label: 'کوتاهی پسرانه' },
  { src: '/gallery/portfolio-work-02.webp', label: 'استایل کلاسیک حرفه‌ای' },
  { src: '/gallery/classic-fade.webp', label: 'فید کلاسیک' },
  { src: '/gallery/beard-trim.webp', label: 'اصلاح ریش' },
  { src: '/gallery/groom-style.webp', label: 'استایل داماد' },
  { src: '/gallery/modern-cut.webp', label: 'کوتاهی مدرن' },
]

export const testimonials = [
  {
    name: 'آرش رضایی',
    initials: 'آر',
    text: 'بهترین آرایشگاهی که تا حالا رفتم. مهدی دقیقاً همون مدلی که می‌خواستم رو زد و محیط هم فوق‌العاده تمیز و حرفه‌ای بود.',
  },
  {
    name: 'سامان محمدی',
    initials: 'سم',
    text: 'رزرو آنلاین خیلی راحت بود و سر ساعت پذیرش شدم. کیفیت اصلاح ریش واقعاً بی‌نظیر بود. حتماً دوباره میام.',
  },
  {
    name: 'کیان احمدی',
    initials: 'کا',
    text: 'برای اصلاح داماد رفتم و نتیجه عالی شد. سلیقه و ظرافت مهدی توی کارش کاملاً مشخصه. پیشنهاد می‌کنم.',
  },
]

export const workingHours = [
  { day: 'شنبه تا پنجشنبه', time: '۱۰ صبح تا ۹ شب' },
  { day: 'جمعه', time: 'با هماهنگی قبلی' },
]

export const navLinks = [
  { href: '/#home', label: 'خانه' },
  { href: '/#services', label: 'خدمات' },
  { href: '/#gallery', label: 'نمونه‌کارها' },
  { href: '/booking', label: 'رزرو نوبت' },
  { href: '/#contact', label: 'تماس' },
]
