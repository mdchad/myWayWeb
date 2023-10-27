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
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-24 mb-20 py-4 sm:py-6 lg:py-12">
      <div className="bg-royal-blue w-1/2 py-4 px-2">
        <p className="text-2xl font-bold text-white text-center" style={{ fontFamily: 'Inter', textTransform: 'capitalize' }}>{hadiths[0].volume_title.ms.toLowerCase()}</p>
        <p className="text-3xl font-bold text-white text-center">{hadiths[0].volume_title.ar}</p>
      </div>
      <div className="mt-12 p-4 bg-gray-100 grid gap-2">
        {hadiths.map(hadith => {
          return (
            <div key={hadith.id} className="grid grid-cols-2 gap-8 p-8 bg-white shadow-sm rounded-lg">
              <p className="text-xl text-xl" style={{ whiteSpace: 'pre-line' }}>{hadith.content.ms}</p>
              <p dir="rtl" className="text-xl text-2xl"  style={{ whiteSpace: 'pre-line'}}>{hadith.content.ar}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}