import connectToDatabase from "@/lib/mongodb";
import {NextRequest, NextResponse} from "next/server";


export async function GET({ params }) {
  const db = await connectToDatabase();
  const bookId = params.bookId

  const data = await db.collection('Volumes').find({book_id: bookId}).toArray();

  return NextResponse.json({
    success: true,
    data: data
  })
}