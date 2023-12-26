import './globals.css'
import {arabicFont, inter, arabicSymbolFont} from "@/app/font";
import {Footer} from "@/components/Footer";
import {Header} from "@/components/Header";
import NextTopLoader from 'nextjs-toploader';

export const metadata = {
  title: 'My Way',
  description: 'Hadiths of Prophet Muhammad',
}

export default function RootLayout({ children }) {
  return (
      <html lang="en" className={`${inter.variable} ${arabicFont.variable} ${arabicSymbolFont.variable}`} content="text/html; charset=utf-8">
        <body>
          <NextTopLoader />
          <Header />
          {children}
          <Footer />
        </body>
      </html>
  )
}
