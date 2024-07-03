import "./globals.css";
import {
  arabicFont,
  inter,
  arabicSymbolFont,
  hafs,
  surahFont,
} from "@/app/font";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Toaster } from "@/components/ui/toaster";
import NextTopLoader from "nextjs-toploader";
import { Suspense } from 'react'

export const metadata = {
  title: "My Way",
  description: "Hadiths of Prophet Muhammad",
};

function SearchBarFallback() {
  return <>placeholder</>
}

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${arabicFont.variable} ${arabicSymbolFont.variable} ${hafs.variable} ${surahFont.variable}`}
      content="text/html; charset=utf-8"
    >
      <body>
        <NextTopLoader />
        <div className="flex min-h-screen w-full flex-col">
          <Suspense fallback={<SearchBarFallback />}>
            <Header />
          </Suspense>
          {children}
          <Footer />
          <Toaster />
        </div>
      </body>
    </html>
  );
}
