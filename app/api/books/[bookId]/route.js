import connectToDatabase from "@/lib/mongodb";
import {NextRequest, NextResponse} from "next/server";
import {ObjectId} from "mongodb";


export async function GET(req) {
  const params = req.params

  const db = await connectToDatabase();
  const bookId = params.bookId

  const data = await db.collection('Volumes').find({book_id: new ObjectId(bookId)}).toArray();

  return NextResponse.json({
    success: true,
    data: data
  })
}