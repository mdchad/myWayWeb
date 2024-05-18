import connectToDatabase from "@/lib/mongodb";
import Link from "next/link";

export const dynamic = "force-dynamic";
export const revalidate = false
export const fetchCache = 'force-no-store'

async function getData(bookId) {
  const db = await connectToDatabase();

  return await db.collection('Volumes').find({ book_id: bookId }).sort({ number: 1 }).toArray();
}

export default async function Book({ params }) {
  const volumes = await getData(params.bookId)

  return (
    <div className="mb-20">
      <div className="bg-royal-blue py-4 px-2">
        <p className="text-2xl font-bold text-white text-center py-4">{volumes[0]?.book_title}</p>
      </div>
      <div className="py-16 px-8 lg:px-40 bg-gray-100 grid gap-2">
        {volumes.map(vol => {
          const id = vol.id_
          return (
            <Link key={id} href={`/${params.bookId}/${vol.id}`}>
              <div key={vol.id} style={{ cursor: "pointer"}} className="w-full flex items-center justify-between space-x-4 p-4 bg-white shadow-sm rounded-lg">
                <div className="space-y-1 flex flex-col items-start text-left max-w-xs">
                  <p className="text-xl leading-5 font-sans capitalize">{vol.title.ms.toLowerCase().trim()}</p>
                  <p className="text-xs text-gray-500 capitalize font-sans">{vol.transliteration.ms.trim().toUpperCase()}</p>
                </div>
                <p lang="ar" className="text-2xl text-2xl max-w-xs text-right font-arabic">{vol.title.ar}</p>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}