// @ts-nocheck
import {appRouter} from "@acme/api";
import { useRouter } from 'next/router'

import { createServerSideHelpers } from '@trpc/react-query/server';
import superjson from 'superjson';

export async function getServerSideProps(ctx) {
  const helpers = createServerSideHelpers({
    router: appRouter,
    ctx: {},
    transformer: superjson, // optional - adds superjson serialization
  });


  // prefetch `post.byId`
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
      <div className="bg-royal-blue py-4 px-2">
        <p className="text-2xl font-bold text-white text-center py-4">{volumes[0]?.book_title}</p>
      </div>
      <div className="mt-12 p-4 bg-gray-100 grid gap-2">
        {volumes.map(vol => {
          const id = vol.id_
          return (
            <button key={id} onClick={(e) => goToVolume(e, vol)}>
              <div key={vol.id} style={{ cursor: "pointer"}} className="w-full flex items-center justify-between space-x-4 p-4 bg-white shadow-sm rounded-lg">
                <div className="space-y-1 flex flex-col items-start text-left max-w-xs">
                  <p className="text-xl leading-5 font-sans capitalize">{vol.title.ms.toLowerCase().trim()}</p>
                  <p className="text-xs text-gray-500 capitalize font-sans">{vol.transliteration.ms.trim().toUpperCase()}</p>
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