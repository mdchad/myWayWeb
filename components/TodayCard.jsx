import React from 'react';
import Link from "next/link";
import {ArrowRight, ChevronRightSquare} from "lucide-react";
import { kv } from '@vercel/kv';
import { NextResponse } from 'next/server';
import QuranText from "@/components/QuranText";
import SeeMoreBar from "@/components/SeeMoreBar";

async function getData(){
  const hadith = await kv.get('todayHadith');
  return hadith
}

export const dynamic = "force-dynamic";

async function TodayCard() {
  const data =  await getData()

  return (
    <Link
      href={{ pathname: `/${data?.book_id}/${data.volume_id}`, hash: data.number }}
    >
      <div className="bg-white border border-royal-blue rounded-md overflow-hidden">
        <div className="p-3">
          <p className="font-bold text-royal-blue text-xl">Hadis Hari Ini</p>
          <div className="flex flex-row flex-wrap mb-4 items-center">
            <p className="text-royal-blue mr-2">
              {data?.book_title.ms}
            </p>
            <ChevronRightSquare
              color="black"
              size={16}
              className={'mr-2'}
            />
            <p className="text-royal-blue capitalize">
              {data?.volume_title.ms.toLowerCase()}
            </p>
          </div>
          <p className="mb-4 text-xl line-clamp-5 font-arabic leading-relaxed" lang="ar" dir="rtl">
            <QuranText text={data?.content[0].ar} />
          </p>
          <p className="font-arabicSymbol line-clamp-5">
            <QuranText text={data?.content[0].ms} font="font-arabicSymbol" />
          </p>
        </div>
        <SeeMoreBar />
      </div>
    </Link>
  );
};

export default TodayCard;