import Head from 'next/head'

import { Faqs } from '@/components/Faqs'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { Hero } from '@/components/Hero'
import { Reviews } from '@/components/Reviews'

export default function Home() {
  return (
    <>
      <Head>
        <title>My Way</title>
        <meta
          name="description"
          content="With this app, you can easily access a wide range of hadith in three languages, Arabic, Malay and English, making it easier for you to understand and benefit from the wisdom of the Prophet Muhammad (peace be upon him)."
        />
      </Head>
      <Header />
      <main>
        <Hero />
        {/*<PrimaryFeatures />*/}
        {/*<SecondaryFeatures />*/}
        {/*<CallToAction />*/}
        <Reviews />
        {/*<Pricing />*/}
        <Faqs />
      </main>
      <Footer />
    </>
  )
}
