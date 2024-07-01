import connectToDatabase from "@/lib/mongodb";
import Link from "next/link";
import { ObjectId } from "mongodb";
import { HadithForm } from "@/components/form";

async function getData(id) {
  const db = await connectToDatabase();

  return await db.collection("Hadiths").findOne({ _id: new ObjectId(id) });
}

export default async function Book({ params }) {
  const hadith = await getData(params.hadithId);

  return (
    <div className="mx-auto max-w-7xl mb-20">
      <HadithForm data={hadith} />
    </div>
  );
}
