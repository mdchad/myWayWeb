import connectToDatabase from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

export async function PATCH(request, { params }) {
  const db = await connectToDatabase();
  const id = params.id;
  const body = await request.json();

  const data = await db.collection("Volumes").updateOne(
    { id: id },
    {
      $set: {
        title: { ar: body.volume_title.ar, ms: body.volume_title.ms, en: "" },
      },
    },
  );
  const hadithVolume = await db
    .collection("Hadiths")
    .updateMany({ volume_id: id }, { $set: { ...body } });

  return NextResponse.json({
    success: true,
    data: body,
  });
}

export async function GET(request, { params }) {
  const db = await connectToDatabase();
  const id = params.id;
  console.log(id);

  const data = await db.collection("Volumes").find({ id: id }).toArray();

  return NextResponse.json({
    success: true,
    data,
  });
}
