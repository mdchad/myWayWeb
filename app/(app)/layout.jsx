import "../globals.css";
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
import { Suspense } from "react";
import SearchBar from "@/components/SearchBar";
import { headers } from "next/headers";

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

export default function RootLayout({ children }) {
  const headersList = headers();

  const fullPath =
   headersList.get("referrer") || "";

  // Extract the last segment of the path
  const pathSegments = fullPath.split("/");
  const lastSegment = pathSegments[pathSegments.length - 1];

  // Check if the last segment is 'pdf'
  const isPdfRoute = lastSegment === "pdf";

  // if (isPdfRoute) {
  //   return (
  //     <html
  //       lang="en"
  //       className={`${inter.variable} ${arabicFont.variable} ${arabicSymbolFont.variable} ${hafs.variable} ${surahFont.variable}`}
  //       content="text/html; charset=utf-8"
  //     >
  //       <body>
  //         {children}
  //       </body>
  //     </html>
  //   );
  // } else {
    return (
      <html
        lang="en"
        className={`${inter.variable} ${arabicFont.variable} ${arabicSymbolFont.variable} ${hafs.variable} ${surahFont.variable}`}
        content="text/html; charset=utf-8"
      >
        <body>
          <NextTopLoader />
          <div className="flex min-h-screen w-full flex-col">
            <Suspense fallback={<Header />}>
              <Header>
                <SearchBar />
              </Header>
            </Suspense>
            {children}
            <Footer />
            <Toaster />
          </div>
        </body>
      </html>
    );
  // }
}
