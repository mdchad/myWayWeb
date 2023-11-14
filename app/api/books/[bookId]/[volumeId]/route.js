import connectToDatabase from "@/lib/mongodb";
import {NextRequest, NextResponse} from "next/server";
import {ObjectId} from "mongodb";


export async function GET(req) {
  const params = req.params
  const db = await connectToDatabase();
  const bookId = params.bookId
  const volumeId = params.volumeId
  console.log('volumeId', volumeId)

  const data = await db.collection('Hadiths').find({ volume_id: new ObjectId(volumeId), book_id: new ObjectId(bookId) }).sort({ number: 1 }).toArray();

  return NextResponse.json({
    success: true,
    data: data
  })
}