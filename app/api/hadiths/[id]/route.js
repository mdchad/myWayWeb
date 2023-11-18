import connectToDatabase from "@/lib/mongodb";
import {NextResponse} from "next/server";
import {ObjectId} from "mongodb";

export async function GET(request, { params }) {
  const db = await connectToDatabase();
  const id = params.id

  const data = await db.collection('Hadiths').findOne({ _id: new ObjectId(id) })

  return NextResponse.json({
    success: true,
    data: data
  })
}