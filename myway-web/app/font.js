import { Inter } from 'next/font/google'
import localFont from 'next/font/local'

export const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter'
})

export const arabicFont = localFont(
  {
    src: '../public/fonts/KFGQPC-Regular.ttf',
    display: 'swap',
    variable: '--font-arabic'
  }
)