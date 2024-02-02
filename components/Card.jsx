import React from 'react';
import Link from "next/link";
import {ArrowRight, ChevronRightSquare} from "lucide-react";
import { kv } from '@vercel/kv';
import { NextResponse } from 'next/server';

async function Card({ path, title, description , gradient = false }) {
  return (
    <Link
      href={{ pathname: path }}
      className={`${gradient ? 'text-white bg-gradient-to-b from-[#22276E] to-[#008080]' : ''} flex-grow from-[#22276E] to-[#008080] border border-royal-blue rounded-md overflow-hidden`}
    >
      <div className="p-4">
        <p className="text-lg">{title}</p>
        <p className="text-sm">{description}</p>
      </div>
      <div className="bg-royal-blue w-full h-[20px]">
      </div>
    </Link>
  );
};

export default Card;