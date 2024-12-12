import connectToDatabase from "../../../../../lib/mongodb";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

export async function GET(request: any, props: any) {
  const params = await props.params;
  const db = await connectToDatabase();
  const id = params.id;

  const data = await db
    .collection("Hadiths")
    .findOne({ _id: new ObjectId(id) });

  return NextResponse.json({
    success: true,
    data: data,
  });
}

export async function PUT(request: any, props: any) {
  const params = await props.params;
  const db = await connectToDatabase();
  const id = params.id;
  const body = await request.json();
  delete body._id;

  const data = await db
    .collection("Hadiths")
    .updateOne({ _id: new ObjectId(id) }, { $set: { ...body } });

  return NextResponse.json({
    success: true,
    data: body,
  });
}
