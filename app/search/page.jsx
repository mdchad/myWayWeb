import connectToDatabase from "@/lib/mongodb";
import Link from "next/link";
import { ChevronRightSquare } from "lucide-react";
import Pagination from "@/components/Pagination";
import React from "react";
import QuranText from "@/components/QuranText";

async function getData(terms, page, selectedBooks = [], limit = 10) {
  const db = await connectToDatabase();

  const skip = (page - 1) * limit;

  let pagination = {
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

  let searchQuery = {
    $search: {
      index: 'content',
      compound: {
        must: [
          {
            text: {
              query: terms,
              // path: ['content', 'volumeTitle'] // Search in both content and volume title
              path: ['content.ms', 'content.ar']
            }
          }
        ],
        filter: [],
        // minimumShouldMatch: 1 // Adjust based on your filtering logic
      }
    }
  };

// Dynamically add filters for selected books
  if (selectedBooks.length > 0) {
    selectedBooks.forEach(book => {
      searchQuery.$search.compound.filter.push({
        text: {
          path: 'book_name', // Assuming 'title' is the field with the book title
          query: book
        }
      });
    });
  } else {
    // If no specific books are selected, adjust minimumShouldMatch
    delete searchQuery.$search.compound.filter;
  }

  // console.log(JSON.stringify({ ...searchQuery, ...pagination }, null , 2))
  const cursor = await db.collection('Hadiths').aggregate([searchQuery, pagination])

  // const cursor = await db.collection('Hadiths').aggregate([
  //   {
  //     $search: {
  //       index: "content",
  //       text: {
  //         query: terms,
  //         path: ['content.ms', 'content.ar']
  //       },
  //       highlight: {
  //         path: ['content.ms', 'content.ar'],
  //       }
  //     }
  //   },
  //   {
  //     $facet: {
  //       documents: [
  //         { $skip: skip }, // Skip documents for previous pages
  //         { $limit: limit }, // Limit to 'limit' number of documents for the current page
  //         // Include additional $project here if you want to shape the results
  //       ],
  //       totalCount: [
  //         { $count: "count" } // Count the total number of matching documents
  //       ]
  //     }
  //   }
  //   // {
  //   //   $project: {
  //   //     "content.ms": 1,
  //   //     "_id": 0,
  //   //     "highlights": { "$meta": "searchHighlights" }
  //   //   }
  //   // }
  // ]);

  return await cursor.toArray();
}

export default async function Search({ searchParams }) {
  const selectedBooks = searchParams?.books ? searchParams.books.split(',') : []
  const result = await getData(searchParams.term, searchParams.page, selectedBooks)
  const [{ documents = [], totalCount = [{}] } = {}] = result || [{}];
  const [{ count = 0 } = {}] = totalCount;

  return (
    <div className="mb-20">
      <div className="bg-royal-blue p-8 px-40">
        <p className="text-2xl font-bold text-white">Hasil carian: "{searchParams.term}"</p>
      </div>
      <div className="py-8 px-8 lg:px-40 grid grid-cols-1 md:grid-cols-2">
        <div className="flex flex-wrap flex-col md:flex-row gap-2">
          <Link
            className={`text-sm rounded-md border border-royal-blue p-2 ${searchParams.books === 'sahih_bukhari' ? 'bg-royal-blue text-white' : ''}`}
            href={`/search?term=${encodeURIComponent(searchParams.term)}&page=${1}&books=sahih_bukhari`}
          >
            Sahih al-Bukhari
          </Link>
          <Link
            className={`text-sm rounded-md border border-royal-blue p-2 ${searchParams.books === 'sahih_muslim' ? 'bg-royal-blue text-white' : ''}`}
            href={`/search?term=${encodeURIComponent(searchParams.term)}&page=${1}&books=sahih_muslim`}
          >
            Sahih Muslim
          </Link>
          <Link
            className={`text-sm rounded-md border border-royal-blue p-2 ${searchParams.books === 'sunan_abi_daud' ? 'bg-royal-blue text-white' : ''}`}
            href={`/search?term=${encodeURIComponent(searchParams.term)}&page=${1}&books=sunan_abi_daud`}
          >
            Sunan Abu Dawud
          </Link>
          <Link
            className={`text-sm rounded-md border border-royal-blue p-2 ${searchParams.books === 'jami_al_tirmidhi' ? 'bg-royal-blue text-white' : ''}`}
            href={`/search?term=${encodeURIComponent(searchParams.term)}&page=${1}&books=jami_al_tirmidhi`}
          >
            Jami’ Al-Tirmidhi
          </Link>
          <Link
            className={`text-sm rounded-md border border-royal-blue p-2 ${searchParams.books === 'sunan_ibnu_majah' ? 'bg-royal-blue text-white' : ''}`}
            href={`/search?term=${encodeURIComponent(searchParams.term)}&page=${1}&books=sunan_ibnu_majah`}
          >
            Sunan Ibn Majah
          </Link>
          <Link
            className={`text-sm rounded-md border border-royal-blue p-2 ${searchParams.books === 'sunan_an_nasai' ? 'bg-royal-blue text-white' : ''}`}
            href={`/search?term=${encodeURIComponent(searchParams.term)}&page=${searchParams.page}&books=sunan_an_nasai`}
          >
            Sunan Al-Nasa’i
          </Link>
        </div>
        <Pagination count={count} />
      </div>
      <div className="py-16 px-8 lg:px-40 bg-gray-100 grid gap-2">
        {!! documents.length ? documents.map(data => {
          const id = data._id
          return (
            // <Link key={id} href={`/${params.bookId}/${vol.id}`}>
              <div key={id} className="grid">
                <div className="flex flex-wrap items-center gap-1 pt-4 pb-2">
                  <Link href={`/${data.book_id}`}><p className="text-royal-blue hover:underline font-sans text-sm font-semibold">{data.book_title?.ms}</p></Link>
                  <span className="text-xs"><ChevronRightSquare color="black" size={18} /></span>
                  <Link href={`/${data.book_id}/${data.volume_id}`}><p className="text-royal-blue hover:underline font-sans text-sm font-semibold capitalize">{data.volume_title?.ms.toLowerCase()}</p></Link>
                  <span className="text-xs"><ChevronRightSquare color="black" size={18} /></span>
                  <Link href={`/${data.book_id}/${data.volume_id}#${data.number}`}><p className="text-royal-blue hover:underline font-sans text-sm font-semibold">{data.number}</p></Link>
                </div>
                {
                  data.content?.map((content, i) => {
                    return (
                      <Link href={`/${data.book_id}/${data.volume_id}#${data.number}`} key={i} className="grid-cols-1 lg:grid-cols-2 gap-12 grid p-8 bg-white shadow-sm">
                        <p className="order-2 lg:order-1 text-md text-justify whitespace-pre-line font-arabicSymbol">
                          <QuranText text={content.ms} font="font-arabicSymbol" />
                        </p>
                        <p lang="ar" dir="rtl" className="order-1 lg:order-2 text-xl text-justify whitespace-pre-line font-arabic leading-relaxed">
                          <QuranText text={content.ar} />
                        </p>
                      </Link>
                    )
                  })
                }
              </div>
          )
        }) : <p>Tiada carian dijumpai</p>}
        <div className="mt-10">
          <Pagination count={count} />
        </div>
      </div>
    </div>
  )
}