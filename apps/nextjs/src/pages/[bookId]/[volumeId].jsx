import {appRouter} from "@acme/api";

import { createServerSideHelpers } from '@trpc/react-query/server';
import superjson from 'superjson';

export async function getServerSideProps(ctx) {
  const helpers = createServerSideHelpers({
    router: appRouter,
    ctx: {},
    transformer: superjson, // optional - adds superjson serialization
  });


  // prefetch `post.byId`
  // const book = await prisma.books.findUnique({ where: { id: ctx.params.bookId } })
  const hadiths = await prisma.hadiths.findMany(
    {
      orderBy: [
        {
          number: 'asc',
        }
      ],
      where: { volume_id: ctx.params.volumeId }
    }
  );

  return {
    props: {
      trpcState: helpers.dehydrate(),
      hadiths
    }
  };
}

export default function HadithsScreen({ hadiths }) {
  console.log(hadiths)
  let chapterId = ""

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-24 mb-20 py-4 sm:py-6 lg:py-12">
      <div className="bg-royal-blue py-4 px-2">
        <p className="text-2xl font-bold text-white text-center capitalize font-sans">{hadiths[0].volume_title.ms.toLowerCase()}</p>
        <p className="text-3xl font-bold text-white text-center">{hadiths[0].volume_title.ar}</p>
      </div>
      <div className="mt-12 p-4 bg-gray-100 grid gap-3">
        {hadiths.map(hadith => {
          if (chapterId !== hadith.chapter_id) {
            chapterId = hadith.chapter_id
            return (
              <div key={hadith.id}>
                <div style={{ gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "3rem"}} className="my-6 border-x-2 border-royal-blue grid px-4 py-2">
                  <div>
                    <p className="font-sans font-bold text-sm text-justify text-gray-500">{hadith?.chapter_title?.ms}</p>
                    <p className="font-sans font-normal text-sm text-justify text-gray-500">{hadith?.chapter_transliteration?.ms}</p>
                  </div>
                  <p dir="rtl" className="font-bold text-gray-500 text-lg text-justify ">{hadith?.chapter_title?.ar}</p>
                  {
                    hadith?.chapter_metadata.ms && (
                      <>
                        <p className="text-md text-justify whitespace-pre-line">{hadith?.chapter_metadata?.ms}</p>
                        <p dir="rtl" className="text-xl text-justify whitespace-pre-line">{hadith?.chapter_metadata?.ar}</p>
                      </>
                    )
                  }
                </div>
                {
                  hadith.content.map((content, i) => {
                    if (!content.ar) {
                      return
                    }

                    return (
                      <div key={i} style={{ gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))"}} className={`gap-12 grid p-8 bg-white shadow-sm`}>
                        <p className="text-md text-justify whitespace-pre-line">{content.ms}</p>
                        <p dir="rtl" className="text-xl text-justify whitespace-pre-line">{content.ar}</p>
                      </div>
                    )
                  })
                }
              </div>
            )
          }
          return (
            <div>
              {
                hadith.content.map((content, i, length) => {
                  if (!content.ar) {
                    return
                  }
                  return (
                    <div key={i} style={{ gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))"}} className={`gap-12 grid p-8 bg-white shadow-sm ${length < 2 && "rounded-lg"}`}>
                      <p className="text-md text-justify whitespace-pre-line">{content.ms}</p>
                      <p dir="rtl" className="text-xl text-justify whitespace-pre-line">{content.ar}</p>
                    </div>
                  )
                })
              }
            </div>
          )
        })}
      </div>
    </div>
  )
}