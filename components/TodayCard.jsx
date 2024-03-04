import React from 'react';
import Link from "next/link";
import {ArrowRight, ChevronRightSquare} from "lucide-react";
import { kv } from '@vercel/kv';
import { NextResponse } from 'next/server';

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
          <div className="flex flex-row flex-wrap mb-4 items-center">
            <p className="font-bold text-royal-blue mr-2">
              {data?.book_title.ms}
            </p>
            <ChevronRightSquare
              color="black"
              size={16}
              className={'mr-2'}
            />
            <p className="font-bold text-royal-blue">
              {data?.volume_title.ms}
            </p>
          </div>
          <p className="mb-4 text-xl line-clamp-5 font-arabic" lang="ar" dir="rtl">
            {data?.content[0].ar}
          </p>
          <p className="font-arabicSymbol line-clamp-5">
            {data?.content[0].ms}
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
      </div>
    </Link>
  );
};

export default TodayCard;