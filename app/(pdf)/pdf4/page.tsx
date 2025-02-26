// @ts-nocheck
import connectToDatabase from "@/lib/mongodb";
import { mapBookId } from "@/data/slug";
import PDFHadithContainer from "@/components/PDFHadithContainer";
import MultiPagePDFContainer from "@/components/A4Container";
import BookViewer from "@/app/(pdf)/pdf4/BookViewer";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

async function getData(volumes, slug) {
  const bookId = mapBookId(slug);
  const db = await connectToDatabase();

  // Get all hadiths for the given volume IDs
  const volumeIds = volumes.map((vol) => vol.id);

  if (bookId === "240360e4-50b4-47a9-9506-9850b0e3bfd7") {
    const volumeWithoutPengantar = volumeIds.filter((vol) => vol !== "2b1bc287-cdea-4e51-b5d3-f6fa0ce31235");
    let pengantar = [];

    if (volumeIds[0] === "2b1bc287-cdea-4e51-b5d3-f6fa0ce31235") {
      pengantar = await db
        .collection("Hadiths")
        .find({ volume_id: "2b1bc287-cdea-4e51-b5d3-f6fa0ce31235", book_id: bookId })
        .sort({ number: 1 })
        .toArray();
    }

    let hadiths = await db.collection("Hadiths")
      .aggregate([
        { $match: { volume_id: {$in: volumeWithoutPengantar}, book_id: bookId }},
        { $lookup: {
            from: "Volumes",
            localField: "volume_id",
            foreignField: "id",
            as: "volume"
          }},
        { $sort: { "volume.number": 1, _id: 1 }},
        { $project: { volume: 0 }} // Remove joined volume data
      ]).toArray();

    return [...pengantar, ...hadiths];
  } else {
    return await db
      .collection("Hadiths")
      .find({ volume_id: { $in: volumeIds }, book_id: bookId })
      .sort({ number: 1 })
      .toArray();
  }
}

async function getVolumes(volumeRange, slug) {
  const bookId = mapBookId(slug);
  const db = await connectToDatabase();

  // If volume range is a number string (e.g., "1,6")
  const [start, end] = volumeRange.split(",").map(Number);

  // Get volumes within the range
  const volumes = [];
  for (let i = start; i <= end; i++) {
    const volumeValue = {
      number: i,
      book_id: bookId,
    };
    const volume = await db.collection("Volumes").findOne(volumeValue);
    if (volume) {
      volumes.push(volume);
    }
  }

  return volumes;
}

async function getSurah(volumes) {
  const db = await connectToDatabase();

  // Check if any volume has the specific ID
  if (
    volumes.some((vol) => vol.id === "be728413-131c-43a6-8481-d7c4704fa228")
  ) {
    return await db.collection("Surah").find({}).toArray();
  }
  return [];
}

export default async function PDF(props) {
  const searchParams = await props.searchParams;
  const volumeParams = searchParams?.volume;
  const slug = searchParams?.slug;

  // Get all volumes in the range
  const volumes = await getVolumes(volumeParams, slug);
  const hadiths = await getData(volumes, slug);
  const surah = await getSurah(volumes);

  return (
    <div>
      <div id="pagedjsdocroot" style={{ display: "none" }}>
        <PDFHadithContainer
          hadiths={JSON.parse(JSON.stringify(hadiths))}
          volumes={JSON.parse(JSON.stringify(volumes))} // Keep original volume structure
          surahs={JSON.parse(JSON.stringify(surah))}
        />
      </div>
      <div id="preview"></div>
      <BookViewer></BookViewer>
    </div>
  );
}
