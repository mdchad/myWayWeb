import React from 'react'
import hadiths from '../../data/hadith40.json'

export default function Hadith40() {
  function Items({ item }) {
    return (
      <div id={item.number} key={item.number} className="flex flex-col space-y-8 break-words p-4 border border-royal-blue mb-4 bg-white">
        <div className="flex flex-row gap-2 items-center mb-6">
          <div className="flex flex-col items-center bg-royal-blue rounded-lg p-2 text-center">
            <p className="text-white text-xl">Hadis</p>
            <p className="text-white text-xl">{item.number}</p>
          </div>
          <div className="flex-shrink">
            <p className="text-2xl">{item.hadith_title.ms}</p>
          </div>
        </div>
        {
          item.content.map((cnt, index, arr) => {
            const uriAr = arr.length > 1 ? `${item.number}_content_ar_${index + 1}` : `${item.number}_content_ar`
            const uriMs = arr.length > 1 ? `${item.number}_content_ms_${index + 1}` : `${item.number}_content_ms`
            return (
              <div key={index} className="mb-4">
                <p className="mb-4">{item.narrators[index].ms}</p>
                <div className="bg-gray-200 rounded-md px-2 py-4">
                  <p className="text-2xl text-right font-arabic" lang="ar" dir="rtl">{cnt.ar}</p>
                  <p className="text-slate-500 text-md font-arabic mt-4" lang="ar" dir="rtl">{item.narratedBy[index].ar}</p>
                  {/*<Audio url={item.number === 5 && index === 1 ?  `${item.number}_content_ar`: uriAr } />*/}
                </div>
                <div className="mt-12">
                  <p className="text-lg mb-2 font-arabicSymbol">{cnt.ms}</p>
                  <p className="text-slate-500 text-xs text-right font-arabicSymbol mt-4">{item.narratedBy[index].ms}</p>
                  {/*<Audio url={item.number === 5 && index === 1 ?  `${item.number}_content_ms`: uriMs } />*/}
                </div>
              </div>
            )
          })
        }
        <div className="bg-royal-blue p-4">
          <p className="text-white text-xl mb-2 font-semibold">Pengajaran</p>
          {
            item.lesson.map((l, i) => {
              return (
                <div key={i}>
                  <p className="text-white text-lg">{`\u2022 ${l.ms}`}</p>
                </div>
              )
            })
          }
          {/*<Audio url={`${item.number}_lesson`} />*/}
        </div>
      </div>
    )
  }

  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-32 mb-20 py-4 sm:py-6 lg:py-16 bg-gray-100">
      <div className="bg-royal-blue mb-12 py-4 px-2 rounded-md">
        <p className="text-2xl font-bold text-white text-center py-4 font-sans">Hadis 40</p>
      </div>
      <div className="flex-1">
        <div className="flex-1">
          {/* Render list using map */}
          <div style={{ padding: '6px' }}>
            {hadiths.map((item) => (
              <Items key={item.number} item={item} />
            ))}
          </div>
        </div>

        {/*<FlashList*/}
        {/*  data={hadiths}*/}
        {/*  renderItem={Items}*/}
        {/*  contentContainerStyle={{ paddingHorizontal: 6, paddingVertical: 6 }}*/}
        {/*  // style={{ paddingRight: 5, marginRight: -10 }}*/}
        {/*  estimatedItemSize={42}*/}
        {/*/>*/}
      </div>
    </main>
  )
}