import connectToDatabase from "@/lib/mongodb";
import {NextResponse} from "next/server";

export async function GET(request, { params }) {
  console.log(request.url)
  const db = await connectToDatabase();
  const bookId = params.bookId
  const volumeId = params.volumeId

  const data = await db.collection('Hadiths').find({ volume_id: volumeId, book_id: bookId }).sort({ number: 1 }).toArray();

  return NextResponse.json({
    success: true,
    data: data
  })
}
export const dynamic = "force-dynamic";
export const revalidate = false
