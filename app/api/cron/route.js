import connectToDatabase from "@/lib/mongodb";
import {NextResponse} from "next/server";
import { kv } from '@vercel/kv'

export const revalidate = 0
export async function GET() {
  console.log('hit cron')
  const db = await connectToDatabase();

  console.log('hit cron')
  const hadith = await db.collection('Hadiths').aggregate([
    { $match: { "content.ms": { $ne: "" } } },
    { $sample: { size: 1 } }
  ]).toArray();
  console.log('hadith', hadith)

  // Cache the Hadith in Vercel KV
  await kv.set('todayHadith', hadith[0]);

  return NextResponse.json({
    success: true
  })
}