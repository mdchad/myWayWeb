import connectToDatabase from "@/lib/mongodb";
import {NextRequest, NextResponse} from "next/server";
import {ObjectId} from "mongodb";


export async function GET(req) {
  const params = req.params

  const db = await connectToDatabase();
  const bookId = params.bookId
  console.log('bookId', bookId)

  const data = await db.collection('Volumes').find({book_id: new bookId}).toArray();

  return NextResponse.json({
    success: true,
    data: data
  })
}