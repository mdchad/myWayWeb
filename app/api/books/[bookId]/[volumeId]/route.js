import connectToDatabase from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  console.log(request.url);
  const db = await connectToDatabase();
  const bookId = params.bookId;
  const volumeId = params.volumeId;

  let data = null;
  if (
    bookId === "240360e4-50b4-47a9-9506-9850b0e3bfd7" &&
    volumeId !== "2b1bc287-cdea-4e51-b5d3-f6fa0ce31235"
  ) {
    //check for sahih muslim because the data was inserted in a different way. this excludes the introduction/pengantar volume.
    data = await db
      .collection("Hadiths")
      .find({ volume_id: volumeId, book_id: bookId })
      .sort({ _id: 1 })
      .toArray();
  } else {
    data = await db
      .collection("Hadiths")
      .find({ volume_id: volumeId, book_id: bookId })
      .sort({ number: 1 })
      .toArray();
  }

  return NextResponse.json({
    success: true,
    data: data,
  });
}
export const dynamic = "force-dynamic";
export const revalidate = false;
export const fetchCache = "force-no-store";
