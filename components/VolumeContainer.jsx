'use client'

import Link from "next/link";
import {useState} from "react";
import {Input} from "@/components/ui/input";
import {useFuzzySearchList} from "@nozbe/microfuzz/react";

function VolumeContainer({ volumes }) {
  const [queryText, setQueryText] = useState('')

  function onFilter(e) {
    setQueryText(e.target.value)
  }

  const filteredList = useFuzzySearchList({
    list: volumes,
    // If `queryText` is blank, `list` is returned in whole
    queryText,
    // optional `getText` or `key`, same as with `createFuzzySearch`
    getText: (item) => [item.title.ms],
    // arbitrary mapping function, takes `FuzzyResult<T>` as input
    mapResultItem: ({ item, score, matches: [highlightRanges] }) => ({ ...item, highlightRanges })
  })

  return (
    <div className="py-16 px-4 lg:px-40 bg-gray-100 grid gap-2">
      <Input onChange={onFilter} className="mb-6" placeholder="Search Chapter"/>
      {filteredList.map(vol => {
        const id = vol._id
        return (
          <Link key={id} href={`/${vol.book_id}/${vol.id}`}>
            <div key={vol.id} style={{ cursor: "pointer"}} className="w-full grid grid-cols-2 md:grid-cols-[1fr_1fr_150px] gap-10 space-x-4 p-4 bg-white shadow-sm rounded-lg">
              <div className="space-y-1 flex flex-col items-start text-left max-w-xs">
                <p className="text-xl leading-5 font-sans capitalize">{vol.title.ms.toLowerCase().trim()}</p>
                <p className="text-xs text-gray-500 capitalize font-sans">{vol.transliteration.ms.trim().toUpperCase()}</p>
              </div>
              <div className="text-right flex flex-col items-end">
                <p lang="ar" className="text-2xl text-right font-arabic">{vol.title.ar}</p>
                <div className="md:hidden grid grid-cols-3 gap-2 text-center mt-4 w-28">
                  <p className="text-sm text-[#31498B] font-sans">{vol?.hadith?.first}</p>
                  <p className="text-sm text-[#31498B] font-sans">to</p>
                  <p className="text-sm text-[#31498B] font-sans">{vol?.hadith?.last}</p>
                </div>
              </div>
              <div className="hidden md:grid grid-cols-3 gap-2 text-center">
                <p className="text-sm text-[#31498B] font-sans">{vol?.hadith?.first}</p>
                <p className="text-sm text-[#31498B] font-sans">to</p>
                <p className="text-sm text-[#31498B] font-sans">{vol?.hadith?.last}</p>
              </div>
            </div>
          </Link>
        )
      })}
    </div>
  )
}

export default VolumeContainer