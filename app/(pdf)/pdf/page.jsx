import connectToDatabase from "@/lib/mongodb";
import HadithContainer from "@/components/HadithContainer";
import { mapBookId } from "@/data/slug";
import { titleCase } from "title-case";
import PDFHadithContainer from "@/components/PDFHadithContainer";
import MultiPagePDFContainer from "@/components/A4Container";

export const dynamic = "force-dynamic";
export const revalidate = false;
export const fetchCache = "force-no-store";

async function getData(volume, slug) {
  const bookId = mapBookId(slug);

  const db = await connectToDatabase();
  if (
    bookId === "240360e4-50b4-47a9-9506-9850b0e3bfd7" &&
    volume.id !== "2b1bc287-cdea-4e51-b5d3-f6fa0ce31235"
  ) {
    //check for muslim because they have different way of sort
    return await db
      .collection("Hadiths")
      .find({ volume_id: volume.id, book_id: bookId })
      .sort({ _id: 1 })
      .toArray();
  }
  return await db
    .collection("Hadiths")
    .find({ volume_id: volume.id, book_id: bookId })
    .sort({ number: 1 })
    .toArray();
}

async function getVolume(volume, slug) {
  const bookId = mapBookId(slug);

  const db = await connectToDatabase();
  return await db.collection("Volumes").findOne({ ...volume, book_id: bookId });
}

async function getSurah(volume) {
  const db = await connectToDatabase();

  if (volume.id === "be728413-131c-43a6-8481-d7c4704fa228") {
    return await db.collection("Surah").find({}).toArray();
  } else {
    return [];
  }
}

export async function generateMetadata({ params }) {
  // read route params
  return {
    metadataBase: new URL('https://www.myway.my'),
    title: `My Way - Koleksi Hadis Sahih`,
    description: " Pelajari sunnah Nabi Muhammad SAW melalui koleksi hadis dari Kutub Sittah yang sahih dan dipercayai",
  }
}

export default async function PDF({ searchParams }) {
  const volumeParams = searchParams?.volume
  const slug = searchParams?.slug

  const volumeValue = {
    number: "",
    name: {
      ms: "",
    },
  };

  if (!isNaN(volumeParams)) {
    volumeValue.number = parseInt(volumeParams);
    delete volumeValue.name;
  } else {
    volumeValue.name.ms = volumeParams;
    delete volumeValue.number;
  }

  const volume = await getVolume(volumeValue, slug);
  const hadiths = await getData(volume, slug);
  const surah = await getSurah(volume);

  return (
    <MultiPagePDFContainer>
      <PDFHadithContainer
        hadiths={JSON.parse(JSON.stringify(hadiths))}
        volumes={JSON.parse(JSON.stringify(volume))}
        surahs={JSON.parse(JSON.stringify(surah))}
      />
    </MultiPagePDFContainer>
  );
}
