'use client'

import EditModal from "@/components/EditModal";
import EditVolumeModal from "@/components/EditVolumeModal";
import SpecialText from "@/components/SpecialText";
import QuranText from "@/components/QuranText";
import {Button} from "@/components/Button";
import {FileEditIcon} from "lucide-react";
import ScrollTopButton from "@/components/ScrollTopButton";
import {Toaster} from "@/components/ui/toaster";
import {useRef, useState} from "react";


function HadithContainer({ hadiths }) {
  const [currentId, setCurrentId] = useState({ id: 1, number: hadiths[1].number});
  const refs = useRef({});

  let chapterId = ""

  return (
    <>
      <div className="mb-20">
        {/*<EditModal chapterId={chapterId} hadiths={hadiths} />*/}
        {/*<EditVolumeModal chapterId={chapterId} hadiths={hadiths} />*/}
        <div className="bg-royal-blue py-4 px-2">
          <p className="text-2xl font-bold text-white text-center capitalize font-sans">{hadiths[0]?.volume_title.ms.toLowerCase()}</p>
          <p lang="ar" className="mt-2 text-3xl font-arabic font-bold text-white text-center">{hadiths[0]?.volume_title.ar}</p>
        </div>
        <div className="py-16 px-4 lg:px-16 xl:px-48 bg-gray-100 grid gap-3">
          {hadiths.map((hadith, index) => {
            if (chapterId !== hadith.chapter_id) {
              chapterId = hadith.chapter_id
              return (
                <div key={hadith._id} id={index + 1} ref={(el) => (refs.current[index + 1] = el)}>
                  <div className="gap-6 grid-cols-[repeat(auto-fit,minmax(280px,1fr))] lg:gap-12 md:grid-cols-[repeat(auto-fit,minmax(320px,1fr))] my-6 border-x-2 border-royal-blue grid px-2 lg:px-4 py-2">
                    <div className="order-2 sm:order-1">
                      <SpecialText text={hadith?.chapter_title?.ms} />
                      <p className="font-sans font-normal text-sm text-justify text-gray-500">{hadith?.chapter_transliteration?.ms}</p>
                    </div>
                    <p lang="ar" dir="rtl" className="order-1 sm:order-2 font-bold text-royal-blue text-lg text-justify font-arabic">
                      <QuranText text={hadith?.chapter_title?.ar} />
                    </p>
                    {
                      hadith?.chapter_metadata.ms && (
                        <>
                          <p className="order-4 sm:order-3 text-md text-justify whitespace-pre-line font-arabicSymbol text-gray-600">
                            <QuranText text={hadith?.chapter_metadata?.ms} font="font-arabicSymbol"/>
                          </p>
                          <p lang="ar" dir="rtl" className="order-3 sm:order-4 text-xl text-justify whitespace-pre-line font-arabic text-gray-600 leading-relaxed">
                            <QuranText text={hadith?.chapter_metadata?.ar} />
                          </p>
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
                        <div id={hadith.number} key={i} className="bg-white shadow-sm px-4 py-8 sm:py-8 sm:px-8 space-y-2">
                          <div className="grid-cols-1 lg:grid-cols-2 gap-12 grid">
                            <p className="order-2 lg:order-1 text-md text-justify whitespace-pre-line font-arabicSymbol">
                              <QuranText text={content.ms} font="font-arabicSymbol" />
                            </p>
                            <p lang="ar" dir="rtl" className="order-1 lg:order-2 text-xl text-justify whitespace-pre-line font-arabic leading-relaxed">
                              <QuranText text={content.ar} />
                            </p>
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
                  </div>
                </div>
              )
            }
            return (
              <div key={hadith._id} id={index + 1} ref={(el) => (refs.current[index + 1] = el)}>
                {
                  hadith.content.map((content, i, length) => {
                    if (!content.ar) {
                      return
                    }
                    return (
                      <div id={hadith.number}
                           key={i}
                           className={`px-4 py-8 sm:py-8 sm:px-8 bg-white shadow-sm ${length < 2 && "rounded-lg"}`}>
                        <div className={`grid-cols-1 lg:grid-cols-2 gap-12 grid`}>
                          <p className="order-2 lg:order-1 text-md text-justify whitespace-pre-line font-arabicSymbol">
                            <QuranText text={content.ms} font="font-arabicSymbol" />
                          </p>
                          <p lang="ar" dir="rtl" className="order-1 lg:order-2 text-xl text-justify whitespace-pre-line font-arabic leading-relaxed">
                            <QuranText text={content.ar} />
                          </p>
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
      <ScrollTopButton divRef={refs} hadiths={hadiths} setCurrentId={setCurrentId} currentId={currentId}/>
      <Toaster />
    </>
  )
}

export default HadithContainer