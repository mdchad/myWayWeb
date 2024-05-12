import connectToDatabase from "@/lib/mongodb";
import {NextResponse} from "next/server";
import {ObjectId} from "mongodb";

export async function PATCH(request ) {
  const db = await connectToDatabase();
  const body = await request.json()
  console.log(body)

  // const data = await db.collection('Hadiths').updateOne({ _id: new ObjectId(id) }, { $set: { ...body }})
  const bulkOps = body.map(item => {
    const key = Object.keys(item)[0];
    return {
      updateOne: {
        filter: { _id: new ObjectId(key) },
        update: { $set: { 'chapter_transliteration.ms': item[key] } } // Replace 'value' with the field you want to update
      }
    };
  });

  // Perform the bulk operation
  const result = await db.collection('Hadiths').bulkWrite(bulkOps);

  return NextResponse.json({
    success: true,
    data: result
  })
}

export async function GET(request) {
  const db = await connectToDatabase();
  const searchParams = request.nextUrl.searchParams

  const bookName = searchParams.get('bookName')
  const number = Number(searchParams.get('number'))

  // Perform the bulk operation
  const result = await db.collection('Hadiths').findOne({ book_name: bookName, number: number})

  return NextResponse.json({
    success: true,
    data: result
  })
}