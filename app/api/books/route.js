import connectToDatabase from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET(request) {
  console.log(request.url);
  const db = await connectToDatabase();

  const data = await db.collection("Books").find({}).sort({ _id: 1 }).toArray();
  return NextResponse.json({
    success: true,
    data: data,
  });
}
