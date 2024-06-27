import React from 'react';
import Link from "next/link";
import {ArrowRight, ChevronRightSquare} from "lucide-react";
import { kv } from '@vercel/kv';
import { NextResponse } from 'next/server';

async function IntroCard() {

  return (
      <div className="bg-white border border-royal-blue rounded-md overflow-hidden">
        <Link
          href="/intro-malay.pdf"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="p-3">
            <div className="flex flex-row flex-wrap mb-4 items-center">
              <p className="font-semibold text-royal-blue mr-2 underline">
                Pengenalan
              </p>
            </div>
            <p className="">
              Allah berfirman:

              Maksudnya: "Sesungguhnya Kamilah yang menurunkan al-Quran, dan Kamilah yang memelihara dan menjaganya."
              [Surah al-Hijr: 15:9]

              Justeru, Allah telah menjamin pemeliharaan dan penjagaan al-Quran.

              Allah juga telah mengamanahkan kepada NabiNya tugas memperjelas al-Quran sebagaiman dalam firmanNya:

              "...dan kami pula turunkan kepadamu (wahai Muhammad) Al-Quran yang memberi peringatain, supaya engkau menerangkan kepada umat manusia akan apa yang telah diturunkan kepada mereka, dan supaya mereka memikirkannya."
              [Surah an-Nahl: 16:44]
            </p>
          </div>
          <div className="flex flex-row justify-between items-center bg-royal-blue">
            <div className="flex flex-row items-center">
            </div>
            <div className="flex flex-row items-center space-x-2">
              <p className="text-white">
                Lihat Lagi
              </p>
              <ArrowRight size={18} color={'white'} />
            </div>
          </div>
        </Link>
      </div>
  );
};

export default IntroCard;