import connectToDatabase from "@/lib/mongodb";
import HadithContainer from "@/components/HadithContainer";

export const dynamic = "force-dynamic";
export const revalidate = false
export const fetchCache = 'force-no-store'

async function getData(volumeId, bookId) {
  const db = await connectToDatabase();
  if (bookId === "240360e4-50b4-47a9-9506-9850b0e3bfd7" && volumeId !== "2b1bc287-cdea-4e51-b5d3-f6fa0ce31235") { //check for muslim because they have different way of sort
    return await db.collection('Hadiths').find({ volume_id: volumeId, book_id: bookId }).sort({ _id: 1 }).toArray();
  }
  return await db.collection('Hadiths').find({ volume_id: volumeId, book_id: bookId }).sort({ number: 1 }).toArray();
}

export default async function Hadiths({ params }) {
  const hadiths = await getData(params.volumeId, params.bookId)

  return (
    <HadithContainer hadiths={hadiths} />
  )
}