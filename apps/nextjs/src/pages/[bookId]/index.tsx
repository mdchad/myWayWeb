// @ts-nocheck
import {appRouter} from "@acme/api";
import { useRouter } from 'next/router'
import prisma from '@acme/db/index.ts";


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
  const volumes = await prisma.volumes.findMany({ where: { book_id: ctx.params.bookId } });

  return {
    props: {
      trpcState: helpers.dehydrate(),
      volumes
    }
  };
}

export default function BookScreen({ volumes }) {
  const router = useRouter()

  function goToVolume(e, vol) {
    const id = vol.id_

    e.preventDefault()
    router.push({ pathname: `${vol.book_id}/[volumeId]`, query: { volumeId: id} })
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-32 mb-20 py-4 sm:py-6 lg:py-12">
      <div className="bg-royal-blue w-1/2 py-4 px-2">
        <p className="text-2xl font-bold text-white text-center">{volumes[0]?.book_title}</p>
      </div>
      <div className="mt-12 p-4 bg-gray-100 grid gap-2">
        {volumes.map(vol => {
          const id = vol.id_
          return (
            <button key={id} onClick={(e) => goToVolume(e, vol)}>
              <div key={vol.id} style={{ cursor: "pointer"}} className="w-full flex items-center justify-between space-x-4 p-4 bg-white shadow-sm rounded-lg">
                <div className="flex flex-col items-start text-left max-w-xs">
                  <p className="text-xl" style={{ textTransform: 'capitalize', fontFamily: 'Inter' }}>{vol.title.ms.toLowerCase().trim()}</p>
                  <p className="text-xs text-gray-500" style={{ textTransform: 'capitalize', fontFamily: 'Inter'}}>{vol.transliteration.ms.trim()}</p>
                </div>
                <p className="text-xl text-2xl max-w-xs text-right" style={{ wordWrap: "break-word" }}>{vol.title.ar}</p>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}