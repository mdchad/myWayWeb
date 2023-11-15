import connectToDatabase from "@/lib/mongodb";
import {NextResponse} from "next/server";

export async function GET(request, context) {
  const db = await connectToDatabase();
  const bookId = context.params.bookId
  const volumeId = context.params.volumeId
  console.log('volumeId', volumeId)

  const data = await db.collection('Hadiths').find({ volume_id: volumeId, book_id: bookId }).sort({ number: 1 }).toArray();

  return NextResponse.json({
    success: true,
    data: data
  })
}