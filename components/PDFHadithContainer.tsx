// @ts-nocheck

"use client";

import SpecialText from "@/components/SpecialText";
import QuranText from "@/components/QuranText";
import { useEffect, useRef, useState } from "react";
import PDFSpecialText from "@/components/PDFSpecialText";
import FootnoteReferenceNumber from "@/components/FootnoteReferenceNumber";

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
                    className="text-xl text-justify whitespace-pre-line font-arabic text-gray-600 text-last-right"
                    dir="rtl"
                  >
                    <QuranText text={cnt?.ar} />
                  </p>
                  <p className="text-md text-justify whitespace-pre-line font-arabicSymbol text-gray-600 text-last-left">
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

function TextContent({ children, text, className, font }) {
  // If text prop is provided, use it directly
  if (text !== undefined) {
    return <span className={className}>{text}</span>;
  }
  // Otherwise, render children
  return children;
}

function PDFHadithContainer({ hadiths, volumes, surahs }) {
  const refs = useRef({});
  let currentVolumeId;
  return (
    <div
      className="custom-gap-16 book"
      data-book-name={hadiths[0]?.book_title.ms}
    >
      <div className="custom-gap-10">
        {hadiths.map((hadith, index, array) => {
          const showVolumeHeader = currentVolumeId !== hadith.volume_id;
          const isNewChapter =
            index === 0 || array[index - 1].chapter_id !== hadith.chapter_id;

          if (showVolumeHeader) {
            currentVolumeId = hadith.volume_id;
            const volume = volumes.find((v) => v.id === hadith.volume_id);

            return (
              <div key={hadith._id}>
                {/* Volume Header */}
                <div
                  className="mb-16 text-center volume"
                  data-volume-name={hadith.volume_title.ms.toLowerCase()}
                >
                  <p
                    lang="ar"
                    className="text-3xl font-arabic font-bold text-center mb-4"
                  >
                    {hadith.volume_title.ar}
                  </p>
                  <FootnoteReferenceNumber
                    footnotes={hadith.footnotes}
                    type={"volume_title.ms"}
                  >
                    <TextContent
                      className="text-xl font-bold text-center capitalize font-serif title"
                      text={hadith.volume_title.ms.toLowerCase()}
                    />
                  </FootnoteReferenceNumber>

                  {/* Volume Metadata */}
                  {volume?.metadata?.ms && (
                    <div className="mt-16">
                      <p
                        className="text-xl text-justify leading-relaxed"
                        dir="rtl"
                      >
                        <QuranText
                          text={volume.metadata.ar}
                          className="font-semibold"
                        />
                      </p>
                      <p className="font-semibold text-justify">
                        <SpecialText
                          text={volume.metadata.ms}
                          font={"font-serif"}
                        />
                      </p>
                    </div>
                  )}
                </div>
                <div className="custom-gap-16">
                  {isNewChapter ? (
                    <div key={hadith._id}>
                      {!!surahs.length > 0 && (
                        <SurahContainer hadith={hadith} surahs={surahs} />
                      )}
                      <div
                        className="custom-gap-12"
                        key={hadith._id}
                        id={index + 1}
                        ref={(el) => (refs.current[index + 1] = el)}
                      >
                        {renderChapter(hadith)}
                        {renderHadith(hadith)}
                      </div>
                    </div>
                  ) : (
                    <div
                      className="custom-gap-8"
                      key={hadith._id}
                      id={index + 1}
                      ref={(el) => (refs.current[index + 1] = el)}
                    >
                      {renderHadith(hadith)}
                    </div>
                  )}
                </div>
              </div>
            );
          }

          return (
            <div className="custom-gap-16" key={hadith._id}>
              {isNewChapter ? (
                <div key={hadith._id}>
                  {!!surahs.length > 0 && (
                    <SurahContainer hadith={hadith} surahs={surahs} />
                  )}
                  <div
                    className="custom-gap-12"
                    key={hadith._id}
                    id={index + 1}
                    ref={(el) => (refs.current[index + 1] = el)}
                  >
                    {renderChapter(hadith)}
                    {renderHadith(hadith)}
                  </div>
                </div>
              ) : (
                <div
                  className="custom-gap-8"
                  key={hadith._id}
                  id={index + 1}
                  ref={(el) => (refs.current[index + 1] = el)}
                >
                  {renderHadith(hadith)}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function renderChapter(hadith) {
  return (
    <div className="custom-gap-4">
      <div className="chapter">
        <p lang="ar" dir="rtl" className="text-xl text-justify font-arabic">
          <QuranText
            text={hadith?.chapter_title?.ar}
            className="custom-chapter-arabic"
          />
        </p>
        <div className="custom-gap-1">
          <p className="font-serif font-normal text-justify text-gray-500 select-none">
            {hadith?.chapter_transliteration?.ms}
          </p>
          <p className="custom-chapter-malay select-none">
            <FootnoteReferenceNumber
              footnotes={hadith.footnotes}
              type={"chapter_title.ms"}
            >
              <SpecialText text={hadith?.chapter_title.ms} font="font-serif" />
            </FootnoteReferenceNumber>
          </p>
        </div>
      </div>

      {hadith?.chapter_metadata.ms && (
        <div>
          <p
            lang="ar"
            dir="rtl"
            className="text-xl text-justify whitespace-pre-line font-arabic leading-relaxed"
          >
            <QuranText text={hadith?.chapter_metadata?.ar} />
          </p>
          {/* Check if content contains multiple definitions (line breaks) */}
          {hadith?.chapter_metadata?.ms.split("\n").length > 3 &&
          hadith?.chapter_metadata?.ms.includes("﴾") &&
          hadith?.chapter_metadata?.ms.includes("﴿") ? (
            <p className="whitespace-pre-line font-arabicSymbol">
              <FootnoteReferenceNumber
                footnotes={hadith.footnotes}
                type={"chapter_metadata.ms"}
              >
                <QuranText
                  text={hadith?.chapter_metadata?.ms}
                  font="font-arabicSymbol"
                />
              </FootnoteReferenceNumber>
            </p>
          ) : (
            // Regular justified paragraph for normal content
            <p className="text-justify whitespace-pre-line font-arabicSymbol">
              <FootnoteReferenceNumber
                footnotes={hadith.footnotes}
                type={"chapter_metadata.ms"}
              >
                <QuranText
                  text={hadith?.chapter_metadata?.ms}
                  font="font-arabicSymbol"
                />
              </FootnoteReferenceNumber>
            </p>
          )}
        </div>
      )}
    </div>
  );
}

function renderHadith(hadith) {
  return hadith.content.map((content, i) => {
    if (!content.ar) {
      return null;
    }

    return (
      <div id={hadith.number} key={i} className="custom-gap-2">
        <div>
          <p
            lang="ar"
            dir="rtl"
            className="font-arabic hadith-arabic select-none"
          >
            <FootnoteReferenceNumber
              footnotes={hadith.footnotes}
              type={"content.ar"}
              index={i + 1}
            >
              <QuranText text={content.ar} />
            </FootnoteReferenceNumber>
          </p>
          <p className="hadith-malay">
            <FootnoteReferenceNumber
              footnotes={hadith.footnotes}
              type={"content.ms"}
              index={i + 1}
            >
              <PDFSpecialText text={content.ms} />
            </FootnoteReferenceNumber>
          </p>
        </div>
      </div>
    );
  });
}

export default PDFHadithContainer;
