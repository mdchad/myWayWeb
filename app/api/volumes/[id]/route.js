import connectToDatabase from "@/lib/mongodb";
import {NextResponse} from "next/server";
import {ObjectId} from "mongodb";

export async function PATCH(request, { params }) {
  const db = await connectToDatabase();
  const id = params.id
  const body = await request.json()
  console.log(body)
  console.log(id)

  const data = await db.collection('Volumes').updateOne({ id: id }, { $set: { ...body }})
  const hadithVolume = await db.collection('Hadiths').updateMany({ volume_id: id }, { $set: { ...body }})

  return NextResponse.json({
    success: true,
    data: body
  })
}