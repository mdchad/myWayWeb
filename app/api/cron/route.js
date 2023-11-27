import connectToDatabase from "@/lib/mongodb";
import {NextResponse} from "next/server";
import { kv } from '@vercel/kv'

export async function GET(request) {
  const db = await connectToDatabase();

  const hadith = await db.collection('Hadiths').aggregate([{ $sample: { size: 1 } }]).toArray();

  // Cache the Hadith in Vercel KV
  await kv.set('hadithOfTheDay', JSON.stringify(hadith[0]));

  return NextResponse.json({
    success: true
  })
}