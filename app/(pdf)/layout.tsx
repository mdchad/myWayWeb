// @ts-nocheck
'use client'

import "../globals.css"
import {arabicFont, arabicSymbolFont, hafs, inter, surahFont} from "@/app/font";

export default function PDFLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${arabicFont.variable} ${arabicSymbolFont.variable} ${hafs.variable} ${surahFont.variable}`}
      content="text/html; charset=utf-8"
    >
    <head>
    </head>
      <body>{children}</body>
    </html>
  );
}
