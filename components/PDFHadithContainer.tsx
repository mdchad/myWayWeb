// @ts-nocheck

"use client";

import SpecialText from "@/components/SpecialText";
import QuranText from "@/components/QuranText";
import { useRef, useState } from "react";
import Link from "next/link";
import PDFSpecialText from "@/components/PDFSpecialText";
import FootnoteReferenceNumber from "@/components/FootnoteReferenceNumber";
import FootnoteContainer from "@/components/FootnoteContainer";

function SurahContainer({ surahs = [], hadith }) {
  let surahData =
    surahs.filter((surah) => surah.hadith_number === hadith.number) || [];

  if (surahData.length > 0) {
    return surahData.map((val) => (
      <div key={val.number}>
        <div className="mt-10 rounded-xl bg-white flex flex-col items-center  p-6">
          <p className="font-surah text-6xl" dir="rtl">
            <span>{val.number.toString().padStart(3, "0")}</span>
            <span>{"surah".toString().padStart(3, "0")}</span>
          </p>
          <p className="text-lg font-serif">{val.title.ms}</p>
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

function PDFHadithContainer({ hadiths, volumes, surahs }) {
  const refs = useRef({});

  let chapterId;
  return (
    <>
      <div className="mb-20 flex flex-col gap-16">
        <div className="">
          <p
            lang="ar"
            className="text-4xl font-arabic font-bold text-center"
          >
            {hadiths[0]?.volume_title.ar}
          </p>
          <p className="text-3xl font-bold text-center capitalize font-serif">
            {hadiths[0]?.volume_title.ms.toLowerCase()}
          </p>
        </div>
        {volumes.metadata?.ms && (
          <div>
            <p
              className="text-2xl text-justify leading-relaxed"
              dir="rtl"
            >
              <QuranText text={volumes.metadata.ar} className="font-semibold" />
            </p>
            <p className="font-semibold text-lg text-justify">
              <SpecialText text={volumes.metadata.ms} font={"font-serif"}/>
            </p>
          </div>
        )}
        <div className="flex flex-col gap-16">
          {hadiths.map((hadith, index) => {
            if (chapterId !== hadith.chapter_id) {
              chapterId = hadith.chapter_id;
              return (
                <div key={hadith._id}>
                  {!!surahs.length > 0 && (
                    <SurahContainer hadith={hadith} surahs={surahs} />
                  )}
                  <div
                    className="flex flex-col gap-20"
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
                    className="flex flex-col gap-12"
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
    </>
  );
}

function renderChapter(hadith) {
  return (
    <div className="flex flex-col gap-4">
      <p
        lang="ar"
        dir="rtl"
        className="text-3xl text-justify font-arabic"
      >
        <QuranText text={hadith?.chapter_title?.ar} className="font-bold leading-loose" />
      </p>
      <div className="flex flex-col gap-4">
        <p className="font-serif font-normal text-lg text-justify text-gray-500 select-none">
          {hadith?.chapter_transliteration?.ms}
        </p>
        <p className="text-lg text-justify font-bold select-none">
          <FootnoteReferenceNumber footnotes={hadith.footnotes}>
            <SpecialText text={hadith?.chapter_title.ms} font="font-serif" />
          </FootnoteReferenceNumber>
        </p>
      </div>

      {hadith?.chapter_metadata.ms && (
        <>
          <p
            lang="ar"
            dir="rtl"
            className="text-2xl text-justify whitespace-pre-line font-arabic leading-relaxed select-none"
          >
            <QuranText text={hadith?.chapter_metadata?.ar} />
          </p>
          <p className="text-lg text-justify whitespace-pre-line font-arabicSymbol select-none">
            <QuranText
              text={hadith?.chapter_metadata?.ms}
              font="font-arabicSymbol"
            />
          </p>
        </>
      )}
      {/*<FootnoteContainer footnotes={hadith.footnotes} />*/}
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
            className="bg-white"
          >
            <div className="flex flex-col gap-10">
              <p
                lang="ar"
                dir="rtl"
                className="text-3xl text-justify whitespace-pre-line font-arabic leading-relaxed select-none"
              >
                <QuranText text={content.ar} />
              </p>
              <p className="text-xl text-justify whitespace-pre-line font-arabicSymbol select-none">
                <PDFSpecialText text={content.ms} font={"font-serif"} />
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default PDFHadithContainer;
