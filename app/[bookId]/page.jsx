import connectToDatabase from "@/lib/mongodb";
import Link from "next/link";
import VolumeContainer from "@/components/VolumeContainer";

export const dynamic = "force-dynamic";
export const revalidate = false
export const fetchCache = 'force-no-store'

async function getData(bookId) {
  const db = await connectToDatabase();

  return await db.collection('Volumes').find({ book_id: bookId }).sort({ number: 1 }).toArray();
}

export default async function Book({ params }) {
  const bookId = params.bookId
  const volumes = await getData(bookId)

  return (
    <div className="mb-20">
      <div className="bg-royal-blue py-4 px-2">
        <p className="text-2xl font-bold text-white text-center py-4">{volumes[0]?.book_title}</p>
      </div>
      { volumes && <VolumeContainer volumes={volumes}/> }
    </div>
  )
}