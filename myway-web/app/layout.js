import './globals.css'
import {arabicFont, inter} from "@/app/font";
import {Footer} from "@/components/Footer";
import {Header} from "@/components/Header";

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${arabicFont.variable}`}>
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
