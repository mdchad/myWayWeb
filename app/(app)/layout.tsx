import {
  arabicFont,
  inter,
  arabicSymbolFont,
  hafs,
  surahFont,
} from "@/app/font";
import { Footer } from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster";
import NextTopLoader from "nextjs-toploader";
import { Suspense } from "react";
import SearchBar from "@/components/SearchBar";
import { headers } from "next/headers";
import "../globals.css";
import Navbar from "@/components/header";

export const metadata = {
  metadataBase: new URL("https://www.myway.my"),
  title: "My Way | Koleksi Hadis Sahih",
  description:
    " Pelajari sunnah Nabi Muhammad SAW melalui koleksi hadis dari Kutub Sittah yang sahih dan dipercayai",
  openGraph: {
    // images: process.env.NODE_ENV === 'production' ? 'https://www.tebuk.app/api/og' : 'http://localhost:3000/api/og',
    // images: '',
    title: "My Way | Koleksi Hadis Sahih ",
    description:
      "Pelajari sunnah Nabi Muhammad SAW melalui koleksi hadis dari Kutub Sittah yang sahih dan dipercayai",
  },
};

function SearchBarFallback() {
  return <>placeholder</>;
}

export default async function RootLayout({ children }: any) {
  const headersList = await headers();
  // @ts-ignore
  const maintenance = process.env.NEXT_PUBLIC_MAINTENANCE_MODE;

  const fullPath = headersList.get("referer:") || "";
  const fullUrl = headersList.get('x-url') || ''

  // Extract the last segment of the path
  const pathSegments = fullPath.split("/");
  const lastSegment = pathSegments[pathSegments.length - 1];

  // Check if the last segment is 'pdf'

  if (maintenance === 'maintain') {
    console.log("maintenance", maintenance)
    return (
      <html
        lang="en"
        className={`${inter.variable} ${arabicFont.variable} ${arabicSymbolFont.variable} ${hafs.variable} ${surahFont.variable}`}
        content="text/html; charset=utf-8"
      >
        <body>
          <div className="flex min-h-screen w-full flex-col">
            <main className="px-4 sm:px-6 lg:px-32 mb-20 py-4 sm:py-6 lg:py-16">
              <div className="text-center">
                <p>Maintenance mode</p>
                <p>Please contact the admin</p>
              </div>
            </main>
          </div>
        </body>
      </html>
    );
  } else {
    return (
      <html
        lang="en"
        className={`${inter.variable} ${arabicFont.variable} ${arabicSymbolFont.variable} ${hafs.variable} ${surahFont.variable}`}
        content="text/html; charset=utf-8"
      >
        <body>
        {children}
        </body>
      </html>
    );
  }
}
