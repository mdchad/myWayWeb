import connectToDatabase from "@/lib/mongodb";
import Link from "next/link";
import { ObjectId } from "mongodb";
import { HadithForm } from "@/components/form";

async function getData(id: any) {
  const db = await connectToDatabase();

  return await db.collection("Hadiths").findOne({ _id: new ObjectId(id) });
}

export default async function Book(props: any) {
  const params = await props.params;
  const hadith = await getData(params.hadithId);

  return (
    <div className="mx-auto max-w-7xl mb-20">
      <HadithForm data={JSON.parse(JSON.stringify(hadith))} />
    </div>
  );
}
