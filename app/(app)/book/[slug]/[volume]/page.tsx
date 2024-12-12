// @ts-nocheck

import connectToDatabase from "../../../../../lib/mongodb";
import HadithContainer from "../../../../../components/HadithContainer";
import { mapBookId } from "../../../../../data/slug";
import { titleCase } from "title-case";

export const dynamic = "force-dynamic";
export const revalidate = false;
export const fetchCache = "force-no-store";

async function getData(volume: any, slug: any) {
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

async function getVolume(volume: any, slug: any) {
  const bookId = mapBookId(slug);

  const db = await connectToDatabase();
  return await db.collection("Volumes").findOne({ ...volume, book_id: bookId });
}

async function getSurah(volume: any) {
  const db = await connectToDatabase();

  if (volume.id === "be728413-131c-43a6-8481-d7c4704fa228") {
    return await db.collection("Surah").find({}).toArray();
  } else {
    return [];
  }
}

export async function generateMetadata(props: any) {
  const params = await props.params;
  const volumeValue = {
    number: 0,
    name: {
      ms: "",
    },
  };

  if (!isNaN(params.volume)) {
    volumeValue.number = parseInt(params.volume);
    // @ts-ignore
    delete volumeValue.name;
  } else {
    volumeValue.name.ms = params.volume;
    // @ts-ignore
    delete volumeValue.number;
  }
  // read route params
  const volume = await getVolume(volumeValue, params.slug);
  const title = volume.title.ms.toLowerCase();

  return {
    metadataBase: new URL("https://www.myway.my"),
    title: `${titleCase(title)} | ${titleCase(volume.book_title)}`,
    description:
      "My Way - Koleksi Hadis Sahih | Pelajari sunnah Nabi Muhammad SAW melalui koleksi hadis dari Kutub Sittah yang sahih dan dipercayai",
    openGraph: {
      images:
        process.env.NODE_ENV === "production"
          ? `https://www.myway.my/api/og?title=${encodeURIComponent(titleCase(title))}&subtitle=${encodeURIComponent(titleCase(volume.book_title))}`
          : `http://localhost:3000/api/og?title=${encodeURIComponent(titleCase(title))}&subtitle=${encodeURIComponent(titleCase(volume.book_title))}`,
      title: `${titleCase(title)} | ${titleCase(volume.book_title)}`,
      description:
        "My Way - Koleksi Hadis Sahih | Pelajari sunnah Nabi Muhammad SAW melalui koleksi hadis dari Kutub Sittah yang sahih dan dipercayai",
    },
  };
}

export default async function Hadiths(props: any) {
  const params = await props.params;
  const volumeValue = {
    number: 0,
    name: {
      ms: "",
    },
  };

  if (!isNaN(params.volume)) {
    volumeValue.number = parseInt(params.volume);
    // @ts-ignore
    delete volumeValue.name;
  } else {
    volumeValue.name.ms = params.volume;
    // @ts-ignore
    delete volumeValue.number;
  }

  const volume = await getVolume(volumeValue, params.slug);
  const hadiths = await getData(volume, params.slug);
  const surah = await getSurah(volume);

  return (
    <HadithContainer
      hadiths={JSON.parse(JSON.stringify(hadiths))}
      volumes={JSON.parse(JSON.stringify(volume))}
      surahs={JSON.parse(JSON.stringify(surah))}
    />
  );
}
