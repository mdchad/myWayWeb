import connectToDatabase from "@/lib/mongodb";
import Link from "next/link";
import { ChevronRightSquare } from "lucide-react";
import Pagination from "@/components/Pagination";

async function getData(terms, page, limit = 10) {
  const db = await connectToDatabase();

  const skip = (page - 1) * limit;

  const cursor = await db.collection('Hadiths').aggregate([
    {
      $search: {
        index: "content",
        text: {
          query: terms,
          path: ['content.ms', 'content.ar']
        },
        highlight: {
          path: ['content.ms', 'content.ar'],
        }
      }
    },
    {
      $facet: {
        documents: [
          { $skip: skip }, // Skip documents for previous pages
          { $limit: limit }, // Limit to 'limit' number of documents for the current page
          // Include additional $project here if you want to shape the results
        ],
        totalCount: [
          { $count: "count" } // Count the total number of matching documents
        ]
      }
    }
    // {
    //   $project: {
    //     "content.ms": 1,
    //     "_id": 0,
    //     "highlights": { "$meta": "searchHighlights" }
    //   }
    // }
  ]);

  return await cursor.toArray();
}

export default async function Search({ searchParams }) {
  const result = await getData(searchParams.term, searchParams.page)
  const [{ documents, totalCount: [{count}] } ] = result

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-32 mb-20 py-4 sm:py-6 lg:py-12">
      <div className="bg-royal-blue py-6 px-4">
        <p className="text-xl font-bold text-white">Search Result: {searchParams.term}</p>
      </div>
      <div className="mt-8 grid grid-cols-1 justify-items-end">
        <Pagination count={count}/>
      </div>
      <div className="mt-2 p-4 bg-gray-100 grid gap-2">
        {documents.map(data => {
          const id = data._id
          return (
            // <Link key={id} href={`/${params.bookId}/${vol.id}`}>
              <div key={id} className="grid">
                <div className="flex flex-wrap items-center gap-1 pt-4 pb-2">
                  <Link href={`/${data.book_id}`}><p className="text-royal-blue hover:underline font-sans text-sm font-semibold">{data.book_title?.ms}</p></Link>
                  <span className="text-xs"><ChevronRightSquare color="black" size={18} /></span>
                  <Link href={`/${data.book_id}/${data.volume_id}`}><p className="text-royal-blue hover:underline font-sans text-sm font-semibold">{data.volume_title?.ms}</p></Link>
                  <span className="text-xs"><ChevronRightSquare color="black" size={18} /></span>
                  <Link href={`/${data.book_id}/${data.volume_id}#${data.number}`}><p className="text-royal-blue hover:underline font-sans text-sm font-semibold">{data.number}</p></Link>
                </div>
                {
                  data.content?.map((content, i) => {
                    return (
                      <div key={i} className="grid-cols-1 lg:grid-cols-2 gap-12 grid p-8 bg-white shadow-sm">
                        <p className="order-2 lg:order-1 text-md text-justify whitespace-pre-line font-arabicSymbol">{content.ms}</p>
                        <p lang="ar" dir="rtl" className="order-1 lg:order-2 text-xl text-justify whitespace-pre-line font-arabic">{content.ar}</p>
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