import connectToDatabase from "@/lib/mongodb";
import {NextResponse} from "next/server";

export async function GET(request, { params }) {
  const db = await connectToDatabase();
  const bookId = params.bookId
  console.log('bookId', bookId)

  const data = await db.collection('Volumes').find({ book_id: bookId }).toArray();

  return NextResponse.json({
    success: true,
    data: data
  })
}