// @ts-nocheck

import connectToDatabase from "@/lib/mongodb";
import { mapBookId } from "@/data/slug";
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

export default async function PDF(props) {
  const searchParams = await props.searchParams;
  const volumeParams = searchParams?.volume
  const slug = searchParams?.slug
  console.log(volumeParams)
  console.log(slug)

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
    <>
      <style>{`
        @page {
        size: A4;
        margin: 20mm;

        @footnote {
        float: bottom;
        border-top: 0.5px solid #ddd;
        padding-top: 8px;
        margin-top: 8px;
      }
      }

        /* Style for footnote calls in the text */
        .footnote-call {
        float: footnote;
        counter-increment: footnote;
      }

        .footnote-call::footnote-call {
        content: '[' attr(data-footnote-number) ']';
        font-size: 0.8em;
        vertical-align: super;
        line-height: none;
      }

        /* Style for the footnote marker in the footnote area */
        .footnote-call::footnote-marker {
        content: '[' attr(data-footnote-number) ']';
        font-size: 0.8em;
        margin-right: 4px;
      }

        /* Reset footnote counter for each page */
        .page {
        counter-reset: footnote;
      }

        /* Ensure content wrapper takes full height minus footnote area */
        .content-wrapper {
        height: 100%;
      }`}
      </style>
      <MultiPagePDFContainer>
        <PDFHadithContainer
          hadiths={JSON.parse(JSON.stringify(hadiths))}
          volumes={JSON.parse(JSON.stringify(volume))}
          surahs={JSON.parse(JSON.stringify(surah))}
        />
      </MultiPagePDFContainer>
    </>
  );
}
