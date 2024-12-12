// @ts-nocheck

import connectToDatabase from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET(request, props) {
  const params = await props.params;
  const db = await connectToDatabase();
  const bookId = params.bookId;

  const data = await db
    .collection("Volumes")
    .find({ book_id: bookId })
    .sort({ number: 1 })
    .toArray();

  return NextResponse.json({
    success: true,
    data: data,
  });
}
