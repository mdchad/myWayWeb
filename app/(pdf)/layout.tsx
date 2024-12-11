import "../globals.css"
import {arabicFont, arabicSymbolFont, hafs, inter, surahFont} from "@/app/font";

export const metadata = {
  title: "Hasil Carian | My Way - Koleksi Hadis Sahih",
  description: "Koleksi Hadith Sahih",
};

export default function PDFLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${arabicFont.variable} ${arabicSymbolFont.variable} ${hafs.variable} ${surahFont.variable}`}
      content="text/html; charset=utf-8"
    >
      <body>{children}</body>
    </html>
  );
}
