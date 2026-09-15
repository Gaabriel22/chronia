import localFont from 'next/font/local'

export const displayFont = localFont({
  src: './fonts/CormorantGaramond-Variable.ttf',
  variable: '--font-cormorant',
  weight: '300 700',
  display: 'swap',
  fallback: ['Georgia', 'serif'],
  adjustFontFallback: 'Times New Roman',
})

export const readingFont = localFont({
  src: './fonts/Manrope-Variable.ttf',
  variable: '--font-manrope',
  weight: '200 800',
  display: 'swap',
  fallback: ['Segoe UI', 'sans-serif'],
  adjustFontFallback: 'Arial',
})
