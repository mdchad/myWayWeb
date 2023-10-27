import { Head, Html, Main, NextScript } from 'next/document'
import {Header} from "../components/Header";

export default function Document() {
  return (
    <Html className="h-full bg-gray-50 antialiased" lang="en">
      <Head />
      <body className="flex h-full flex-col">
        <Header />
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
