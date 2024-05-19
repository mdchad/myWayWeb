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

async function getVolume(volumeId) {
  const db = await connectToDatabase();
  return await db.collection('Volumes').findOne({ id: volumeId });
}

async function getSurah(volumeId) {
  const db = await connectToDatabase();

  if (volumeId === "be728413-131c-43a6-8481-d7c4704fa228") {
    return await db.collection('Surah').find({}).toArray();
  }
}

export default async function Hadiths({ params }) {
  const hadiths = await getData(params.volumeId, params.bookId)
  const volumes = await getVolume(params.volumeId)
  const surah = await getSurah(params.volumeId)

  return (
    <HadithContainer hadiths={JSON.parse(JSON.stringify(hadiths))} volumes={JSON.parse(JSON.stringify(volumes))} surahs={JSON.parse(JSON.stringify(surah))} />
  )
}