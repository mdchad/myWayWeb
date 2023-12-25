import connectToDatabase from "@/lib/mongodb";
import {FileEditIcon} from "lucide-react";
import {Button} from "@/components/Button";

export const dynamic = "force-dynamic";
export const revalidate = false
export const fetchCache = 'force-no-store'

async function getData(volumeId, bookId) {
  const db = await connectToDatabase();
  return await db.collection('Hadiths').find({ volume_id: volumeId, book_id: bookId }).sort({ number: 1 }).toArray();
}

export default async function Hadiths({ params }) {
  const hadiths = await getData(params.volumeId, params.bookId)
  let chapterId = ""

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-24 mb-20 py-4 sm:py-6 lg:py-12">
      <div className="bg-royal-blue py-4 px-2">
        <p className="text-2xl font-bold text-white text-center capitalize font-sans">{hadiths[0]?.volume_title.ms.toLowerCase()}</p>
        <p lang="ar" className="text-3xl font-arabic font-bold text-white text-center">{hadiths[0]?.volume_title.ar}</p>
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
                  <p lang="ar" dir="rtl" className="font-bold text-gray-500 text-lg text-justify font-arabic">{hadith?.chapter_title?.ar}</p>
                  {
                    hadith?.chapter_metadata.ms && (
                      <>
                        <p className="text-md text-justify whitespace-pre-line font-arabicSymbol">{hadith?.chapter_metadata?.ms}</p>
                        <p lang="ar" dir="rtl" className="text-xl text-justify whitespace-pre-line font-arabic">{hadith?.chapter_metadata?.ar}</p>
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
                      <div key={i} className="bg-white shadow-sm p-8 space-y-2">
                        <div id={hadith.number} className="grid-cols-1 lg:grid-cols-2 gap-12 grid">
                          <p className="order-2 lg:order-1 text-md text-justify whitespace-pre-line font-arabicSymbol">{content.ms}</p>
                          <p lang="ar" dir="rtl" className="order-1 lg:order-2 text-xl text-justify whitespace-pre-line font-arabic">{content.ar}</p>
                        </div>
                        <Button href={`/admin/${hadith._id}`} className="p-2 rounded-md">
                          <FileEditIcon size={16} color={'white'} />
                        </Button>
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
                    <div key={i} className={`p-8 bg-white shadow-sm ${length < 2 && "rounded-lg"}`}>
                      <div id={hadith.number} className={`grid-cols-1 lg:grid-cols-2 gap-12 grid`}>
                        <p className="order-2 lg:order-1 text-md text-justify whitespace-pre-line font-arabicSymbol">{content.ms}</p>
                        <p lang="ar" dir="rtl" className="order-1 lg:order-2 text-xl text-justify whitespace-pre-line font-arabic">{content.ar}</p>
                      </div>
                      <Button href={`/admin/${hadith._id}`} className="bg-gray-100 p-2 rounded-md hover:bg-gray-300">
                        <FileEditIcon size={16} color={'white'} />
                      </Button>
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