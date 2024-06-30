import { kv } from "@vercel/kv";
import { NextResponse } from "next/server";

export async function GET() {
  console.log("this is today");
  const hadith = await kv.get("todayHadith");
  console.log(hadith);
  return NextResponse.json(hadith);
}
export const dynamic = "force-dynamic";
