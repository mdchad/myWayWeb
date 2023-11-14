import connectToDatabase from "@/lib/mongodb";
import {NextRequest, NextResponse} from "next/server";


export async function GET() {
  const db = await connectToDatabase();

  const data = await db.collection('Books').find({}).sort({ _id: 1}).toArray();
  return NextResponse.json({
    success: true,
    data: data
  })
}