import connectToDatabase from "@/lib/mongodb";
import VolumeContainer from "@/components/VolumeContainer";
import { mapBookId } from "@/data/slug";

export const dynamic = "force-dynamic";
export const revalidate = false;
export const fetchCache = "force-no-store";

async function getData(slug) {
  const db = await connectToDatabase();
  const bookId = mapBookId(slug);

  return await db
    .collection("Volumes")
    .find({ book_id: bookId })
    .sort({ number: 1 })
    .toArray();
}

export async function generateMetadata({ params, searchParams }) {
  // read route params
  const slug = params.slug
  const bookId = mapBookId(slug);
  const volumes = await getData(bookId)

  return {
    metadataBase: new URL('https://www.myway.my'),
    title: volumes[0].book_title,
    description: " Pelajari sunnah Nabi Muhammad SAW melalui koleksi hadis dari Kutub Sittah yang sahih dan dipercayai",
    openGraph: {
      images: process.env.NODE_ENV === 'production' ? `https://www.myway.my/api/og?book_title=${encodeURIComponent(volumes[0].book_title)}` : `http://localhost:3000/api/og?book_title=${encodeURIComponent(volumes[0].book_title)}`,
      title: volumes[0].book_title,
      description: 'Pelajari sunnah Nabi Muhammad SAW melalui koleksi hadis dari Kutub Sittah yang sahih dan dipercayai',
    },
  }
}

export default async function Book({ params }) {
  const slug = params.slug;
  const volumes = await getData(slug);

  return (
    <div className="mb-20">
      <div className="bg-royal-blue py-4 px-2">
        <p className="text-2xl font-bold text-white text-center py-4">
          {volumes[0]?.book_title}
        </p>
      </div>
      {volumes && (
        <VolumeContainer
          volumes={JSON.parse(JSON.stringify(volumes))}
          slug={slug}
        />
      )}
    </div>
  );
}
