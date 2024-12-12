import connectToDatabase from "@/lib/mongodb";
import {NextRequest, NextResponse} from "next/server";
import { ObjectId } from "mongodb";

export async function PATCH(request: NextRequest) {
  const db = await connectToDatabase();
  const body = await request.json();

  // const data = await db.collection('Hadiths').updateOne({ _id: new ObjectId(id) }, { $set: { ...body }})
  const bulkOps = body.map((item: any) => {
    const key = Object.keys(item)[0];
    return {
      updateOne: {
        filter: { _id: new ObjectId(key) },
        update: { $set: { "chapter_transliteration.ms": item[key] } }, // Replace 'value' with the field you want to update
      },
    };
  });

  // Perform the bulk operation
  const result = await db.collection("Hadiths").bulkWrite(bulkOps);

  return NextResponse.json({
    success: true,
    data: result,
  });
}
