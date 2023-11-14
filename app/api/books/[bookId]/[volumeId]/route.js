import connectToDatabase from "@/lib/mongodb";
import {NextResponse} from "next/server";

export async function GET(req) {
  const db = await connectToDatabase();
  const { searchParams } = new URL(req.url)
  const bookId = searchParams.get('bookId')
  const volumeId = searchParams.get('volumeId')
  console.log('volumeId', volumeId)

  const data = await db.collection('Hadiths').find({ volume_id: volumeId, book_id: bookId }).sort({ number: 1 }).toArray();

  return NextResponse.json({
    success: true,
    data: data
  })
}