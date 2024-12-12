import { kv } from "@vercel/kv";
import { NextResponse } from "next/server";
import {auth} from "@/lib/auth";
import {headers} from "next/headers";

const emptyData = {
  _id: "6",
  footnotes: [
    {}
  ],
  number: 704,
  content: [
    {
      "en": "",
      "ms": "We are relaunching the app. Stay tuned for the new app",
      "ar": ""
    }
  ],
  chapter_id: "41e80452-dc44-4622-bada-34a181f342f9",
  chapter_name: "",
  chapter_title: {
    "en": "",
    "ms": "Access Denied - Contact the administrator",
    "ar": ""
  },
  volume_id: "f136d3e1-9b8e-40c6-9a64-0ca0a5f77e5a",
  volume_name: {
    "ms": "bab-bab-puasa-daripada-rasulullah"
  },
  volume_title: {
    "en": "",
    "ms": "Access Denied - Contact the administrator",
    "ar": ""
  },
  book_id: "c4d5ea38-2090-4f28-8ca3-40bb2639d502",
  book_name: "Access Denied",
  book_title: {
    "en": "",
    "ms": "Access Denied",
    "ar": ""
  },
  chapter_transliteration: {
    "en": "",
    "ms": ""
  },
  chapter_metadata: {
    "en": "",
    "ms": "",
    "ar": ""
  },
  book_details: {
    "_id": "65377edf87c0a6c62eec8b94",
    "name": "jami_al_tirmidhi",
    "slug": "tirmidhi"
  }
}

export async function GET() {
  console.log("this is today");
  const session = await auth.api.getSession({
    headers: await headers() // you need to pass the headers object.
  })

  if (!session) {
    return NextResponse.json({
      success: false,
      data: emptyData
    });
  }

  const hadith = await kv.get("todayHadith");

  console.log(hadith);
  return NextResponse.json({
    success: true,
    data: hadith
  });
}
export const dynamic = "force-dynamic";
