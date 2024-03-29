import connectToDatabase from "@/lib/mongodb";
import {FileEditIcon} from "lucide-react";
import {Button} from "@/components/Button";
import EditModal from "@/components/EditModal";

export const dynamic = "force-dynamic";
export const revalidate = false
export const fetchCache = 'force-no-store'

async function getData(volumeId, bookId) {
  const db = await connectToDatabase();
  if (bookId === "240360e4-50b4-47a9-9506-9850b0e3bfd7" && volumeId !== "2b1bc287-cdea-4e51-b5d3-f6fa0ce31235") { //check for muslim because they have different way of sort
    return await db.collection('Hadiths').find({ volume_id: volumeId, book_id: bookId }).sort({ _id: 1 }).toArray();
  }
  return await db.collection('Hadiths').find({ volume_id: volumeId, book_id: bookId }).sort({ number: 1 }).toArray();
}

export default async function Hadiths({ params }) {
  const hadiths = await getData(params.volumeId, params.bookId)
  let chapterId = ""

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-24 mb-20 py-4 sm:py-6 lg:py-12">
      <EditModal chapterId={chapterId} hadiths={hadiths} />
      <div className="bg-royal-blue py-4 px-2">
        <p className="text-2xl font-bold text-white text-center capitalize font-sans">{hadiths[0]?.volume_title.ms.toLowerCase()}</p>
        <p lang="ar" className="text-3xl font-arabic font-bold text-white text-center">{hadiths[0]?.volume_title.ar}</p>
      </div>
      <div className="mt-12 p-2 lg:p-4 bg-gray-100 grid gap-3">
        {hadiths.map(hadith => {
          if (chapterId !== hadith.chapter_id) {
            chapterId = hadith.chapter_id
            return (
              <div key={hadith.id}>
                <div className="gap-6 grid-cols-[repeat(auto-fit,minmax(220px,1fr))] lg:gap-12 md:grid-cols-[repeat(auto-fit,minmax(320px,1fr))] my-6 border-x-2 border-royal-blue grid px-2 lg:px-4 py-2">
                  <div className="order-2 sm:order-1">
                    <p className="font-sans font-bold text-sm text-justify text-gray-500">{hadith?.chapter_title?.ms}</p>
                    <p className="font-sans font-normal text-sm text-justify text-gray-500">{hadith?.chapter_transliteration?.ms}</p>
                  </div>
                  <p lang="ar" dir="rtl" className="order-1 sm:order-2 font-bold text-gray-500 text-lg text-justify font-arabic">{hadith?.chapter_title?.ar}</p>
                  {
                    hadith?.chapter_metadata.ms && (
                      <>
                        <p className="order-4 sm:order-3 text-md text-justify whitespace-pre-line font-arabicSymbol">{hadith?.chapter_metadata?.ms}</p>
                        <p lang="ar" dir="rtl" className="order-3 sm:order-4 text-xl text-justify whitespace-pre-line font-arabic">{hadith?.chapter_metadata?.ar}</p>
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
                      <div key={i} className="bg-white shadow-sm px-4 py-8 sm:py-8 sm:px-8 space-y-2">
                        <div id={hadith.number} className="grid-cols-1 lg:grid-cols-2 gap-12 grid">
                          <p className="order-2 lg:order-1 text-md text-justify whitespace-pre-line font-arabicSymbol">{content.ms}</p>
                          <p lang="ar" dir="rtl" className="order-1 lg:order-2 text-xl text-justify whitespace-pre-line font-arabic">{content.ar}</p>
                        </div>
                      </div>
                    )
                  })
                }
                <div className="mt-2 flex gap-2">
                  <Button href={`/admin/${hadith._id}`}>
                    Edit
                    <FileEditIcon size={16} color={'white'} />
                  </Button>
                  {/*<EditBracketButton hadith={hadith}/>*/}
                </div>
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
                    <div key={i} className={`px-4 py-8 sm:py-8 sm:px-8 bg-white shadow-sm ${length < 2 && "rounded-lg"}`}>
                      <div id={hadith.number} className={`grid-cols-1 lg:grid-cols-2 gap-12 grid`}>
                        <p className="order-2 lg:order-1 text-md text-justify whitespace-pre-line font-arabicSymbol">{content.ms}</p>
                        <p lang="ar" dir="rtl" className="order-1 lg:order-2 text-xl text-justify whitespace-pre-line font-arabic">{content.ar}</p>
                      </div>
                    </div>
                  )
                })
              }
              <div className="mt-2 flex gap-2">
                <Button href={`/admin/${hadith._id}`}>
                  Edit
                  <FileEditIcon size={16} color={'white'} />
                </Button>
                {/*<EditBracketButton hadith={hadith} />*/}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}