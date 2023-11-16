import connectToDatabase from "@/lib/mongodb";
import {NextResponse} from "next/server";

export async function GET(request, { params }) {
  const db = await connectToDatabase();
  const bookId = params.bookId

  const data = await db.collection('Volumes').find({ book_id: bookId }).sort({ _id: 1 }).toArray();

  return NextResponse.json({
    success: true,
    data: data
  })
}