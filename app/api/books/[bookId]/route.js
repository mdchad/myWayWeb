import connectToDatabase from "@/lib/mongodb";
import {NextResponse} from "next/server";

export async function GET(req) {
  const db = await connectToDatabase();
  const params = req.params
  console.log('params', params)

  const bookId = params.bookId
  console.log('bookId', bookId)

  const data = await db.collection('Volumes').find({book_id: new bookId}).toArray();

  return NextResponse.json({
    success: true,
    data: data
  })
}