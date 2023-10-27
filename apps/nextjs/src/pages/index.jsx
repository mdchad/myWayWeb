import Head from 'next/head'

import { Faqs } from '@/components/Faqs'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { Hero } from '@/components/Hero'
import { Reviews } from '@/components/Reviews'
import {trpc} from "../utils/trpc";
import {Books} from "../components/Books";

import { createServerSideHelpers } from '@trpc/react-query/server';
import {appRouter} from "@acme/api";
import superjson from 'superjson';


export async function getStaticProps() {
  const helpers = createServerSideHelpers({
    router: appRouter,
    ctx: {},
    transformer: superjson, // optional - adds superjson serialization
  });

  // prefetch `post.byId`
  const books = await prisma.books.findMany()

  return {
    props: {
      trpcState: helpers.dehydrate(),
      books
    }
  };
}

export default function Home(props) {
  const { books } = props

  return (
    <>
      <Head>
        <title>My Way</title>
        <meta
          name="description"
          content="With this app, you can easily access a wide range of hadith in three languages, Arabic, Malay and English, making it easier for you to understand and benefit from the wisdom of the Prophet Muhammad (peace be upon him)."
        />
      </Head>
      <main>
        <Books books={books}/>
        {/*<Hero />*/}
        {/*<PrimaryFeatures />*/}
        {/*<SecondaryFeatures />*/}
        {/*<CallToAction />*/}
        {/*<Reviews />*/}
        {/*<Pricing />*/}
        {/*<Faqs />*/}
      </main>
      <Footer />
    </>
  )
}
