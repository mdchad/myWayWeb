import connectToDatabase from "@/lib/mongodb";
import Link from "next/link";
import {ObjectId} from "mongodb";

async function getData(id) {
  const db = await connectToDatabase();

  return await db.collection('Hadiths').findOne({ _id: new ObjectId(id) })
}

export default async function Book({ params }) {
  const hadith = await getData(params.hadithId)

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-32 mb-20 py-4 sm:py-6 lg:py-12">
      <p>{hadith.number}</p>
    </div>
  )
}