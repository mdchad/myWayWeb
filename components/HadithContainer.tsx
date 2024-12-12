// @ts-nocheck

"use client";

import SpecialText from "@/components/SpecialText";
import QuranText from "@/components/QuranText";
import { Button } from "@/components/ui/button";
import { FileEditIcon, Link as LinkIcon } from "lucide-react";
import ScrollTopButton from "@/components/ScrollTopButton";
import { Toaster } from "@/components/ui/toaster";
import { useRef, useState } from "react";
import Link from "next/link";

function SurahContainer({ surahs = [], hadith }) {
  let surahData =
    surahs.filter((surah) => surah.hadith_number === hadith.number) || [];

  if (surahData.length > 0) {
    return surahData.map((val) => (
      <div key={val.number}>
        <div className="mt-10 rounded-xl bg-white flex flex-col items-center border border-royal-blue p-6">
          <p className="font-surah text-6xl" dir="rtl">
            <span>{val.number.toString().padStart(3, "0")}</span>
            <span>{"surah".toString().padStart(3, "0")}</span>
          </p>
          <p className="text-lg font-sans">{val.title.ms}</p>
          {!!val.content[0].ms &&
            val.content.map((cnt, i) => {
              return (
                <div key={i} className="flex flex-col gap-12 mt-16">
                  <p
                    className="text-xl text-justify whitespace-pre-line font-arabic text-gray-600"
                    dir="rtl"
                  >
                    <QuranText text={cnt?.ar} />
                  </p>
                  <p className="text-md text-justify whitespace-pre-line font-arabicSymbol text-gray-600">
                    <QuranText text={cnt?.ms} font="font-arabicSymbol" />
                  </p>
                </div>
              );
            })}
        </div>
      </div>
    ));
  }
}

function HadithContainer({ hadiths, volumes, surahs }) {
  const [currentId, setCurrentId] = useState({
    id: 1,
    number: hadiths[1].number,
  });
  const refs = useRef({});

  let chapterId;
  return (
    <>
      <div className="mb-20">
        {/*<EditVolumeModal chapterId={chapterId} hadiths={hadiths} />*/}
        <div className="bg-royal-blue py-4 px-2">
          <p className="text-2xl font-bold text-white text-center capitalize font-sans">
            {hadiths[0]?.volume_title.ms.toLowerCase()}
          </p>
          <p
            lang="ar"
            className="mt-2 text-3xl font-arabic font-bold text-white text-center"
          >
            {hadiths[0]?.volume_title.ar}
          </p>
        </div>
        {volumes.metadata?.ms && (
          <div className="bg-royal-blue/20 gap-20 text-royal-blue/90 md:py-16 md:px-20 px-4 py-8 grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))]">
            <p className="order-2 sm:order-1 font-semibold text-md text-justify">
              <SpecialText text={volumes.metadata.ms} />
            </p>
            <p
              className="text-xl order-1 sm:order-2 text-justify leading-relaxed"
              dir="rtl"
            >
              <QuranText text={volumes.metadata.ar} className="font-semibold" />
            </p>
          </div>
        )}
        <div className="py-16 px-4 md:px-12 lg:px-36 xl:px-48 bg-gray-100 grid gap-3">
          {hadiths.map((hadith, index) => {
            if (chapterId !== hadith.chapter_id) {
              chapterId = hadith.chapter_id;
              return (
                <div key={hadith._id}>
                  {!!surahs.length > 0 && (
                    <SurahContainer hadith={hadith} surahs={surahs} />
                  )}
                  <div
                    key={hadith._id}
                    id={index + 1}
                    ref={(el) => (refs.current[index + 1] = el)}
                  >
                    {renderChapter(hadith)}
                    {renderHadith(hadith)}
                  </div>
                </div>
              );
            } else {
              return (
                <div key={hadith._id}>
                  <div
                    key={hadith._id}
                    id={index + 1}
                    ref={(el) => (refs.current[index + 1] = el)}
                  >
                    {renderHadith(hadith)}
                  </div>
                </div>
              );
            }
          })}
        </div>
      </div>
      <ScrollTopButton
        divRef={refs}
        hadiths={hadiths}
        setCurrentId={setCurrentId}
        currentId={currentId}
      />
      <Toaster />
    </>
  );
}

function renderChapter(hadith) {
  return (
    <div className="gap-6 grid-cols-[repeat(auto-fit,minmax(280px,1fr))] lg:gap-12 md:grid-cols-[repeat(auto-fit,minmax(320px,1fr))] my-6 border-x-2 border-royal-blue grid px-2 lg:px-4 py-2">
      <div className="order-2 sm:order-1">
        <p className="text-sm text-justify text-royal-blue font-bold select-none">
          <SpecialText text={hadith?.chapter_title?.ms} />
        </p>
        <p className="font-sans font-normal text-sm text-justify text-gray-500 select-none">
          {hadith?.chapter_transliteration?.ms}
        </p>
      </div>

      <p
        lang="ar"
        dir="rtl"
        className="order-1 sm:order-2 text-xl text-royal-blue text-lg text-justify font-arabic"
      >
        <QuranText text={hadith?.chapter_title?.ar} className="font-bold" />
      </p>
      {hadith?.chapter_metadata.ms && (
        <>
          <p className="order-4 sm:order-3 text-md text-justify whitespace-pre-line font-arabicSymbol text-gray-600 select-none">
            <QuranText
              text={hadith?.chapter_metadata?.ms}
              font="font-arabicSymbol"
            />
          </p>
          <p
            lang="ar"
            dir="rtl"
            className="order-3 sm:order-4 text-xl text-justify whitespace-pre-line font-arabic text-gray-600 leading-relaxed select-none"
          >
            <QuranText text={hadith?.chapter_metadata?.ar} />
          </p>
        </>
      )}
    </div>
  );
}

function renderHadith(hadith) {
  return (
    <div>
      {hadith.content.map((content, i) => {
        if (!content.ar) {
          return;
        }

        return (
          <div
            id={hadith.number}
            key={i}
            className="bg-white shadow-sm px-4 py-8 sm:py-8 sm:px-8 space-y-6 scroll-my-[30vh] target:animate-brief-highlight"
          >
            <div className="grid-cols-1 lg:grid-cols-2 gap-12 grid">
              <p className="order-2 lg:order-1 text-md text-justify whitespace-pre-line font-arabicSymbol select-none">
                <QuranText text={content.ms} font="font-arabicSymbol" />
              </p>
              <p
                lang="ar"
                dir="rtl"
                className="order-1 lg:order-2 text-xl text-justify whitespace-pre-line font-arabic leading-relaxed select-none"
              >
                <QuranText text={content.ar} />
              </p>
            </div>
            {/*<div className="flex justify-end">*/}
            {/*  <Button variant="ghost" size="sm">*/}
            {/*    <LinkIcon size={18}/>*/}
            {/*  </Button>*/}
            {/*</div>*/}
          </div>
        );
      })}
      {
        process.env.NEXT_PUBLIC_ENV_RUNTIME === 'development' || process.env.NEXT_PUBLIC_ENV_RUNTIME === 'localhost' && (
          <div className="mt-2 flex gap-2">
            <Button asChild>
              <Link href={`/admin/${hadith._id}`}>
                Edit
                <FileEditIcon size={16} color={"white"} />
              </Link>
            </Button>
          </div>
        )
      }
    </div>
  );
}

export default HadithContainer;
