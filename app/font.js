import { Inter } from 'next/font/google'
import localFont from 'next/font/local'

export const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter'
})

export const arabicFont = localFont(
  {
    src: [{ path: '../public/fonts/KFGQPC-Regular.ttf', weight: '400' }, { path: '../public/fonts/KFGQPC-Bold.ttf', weight: '700' }],
    display: 'swap',
    variable: '--font-arabic'
  }
)

export const arabicSymbolFont = localFont(
  {
    src: '../public/fonts/kfgqpc-arabic-symbols.ttf',
    display: 'swap',
    variable: '--font-arabic-symbol'
  }
)