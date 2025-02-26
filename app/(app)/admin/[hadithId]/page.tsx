import connectToDatabase from "@/lib/mongodb";
import Link from "next/link";
import { ObjectId } from "mongodb";
import { HadithForm } from "@/components/form";
import {SidebarProvider} from "@/components/ui/sidebar";
import {SidebarRight} from "@/components/sidebar-right";
import {SidebarLeft} from "@/components/sidebar-left";

async function getData(id: any, volumeId: any, bookId: any = "") {
  const db = await connectToDatabase();
  let volume
  let hadith

  if (
    bookId === "240360e4-50b4-47a9-9506-9850b0e3bfd7" &&
    volumeId !== "2b1bc287-cdea-4e51-b5d3-f6fa0ce31235"
  ) {
    console.log("hoi")
    //check for muslim because they have different way of sort
    hadith = await db.collection("Hadiths").findOne({ _id: new ObjectId(id) });

    volume = await db.collection("Hadiths").find({ volume_id: volumeId }).sort({ _id: 1 }).toArray();
  } else {
    volume = await db.collection("Hadiths").find({ volume_id: volumeId }).sort({ number: 1 })
      .toArray();

    hadith = await db.collection("Hadiths").findOne({ _id: new ObjectId(id) });
  }

  return { volume, hadith }
}

export default async function Admin(props: any) {
  const searchParams = await props.searchParams;
  const volumeId = searchParams?.volume
  const bookId = searchParams?.bookId
  const params = await props.params;
  const { volume, hadith } = await getData(params.hadithId, volumeId, bookId);

  return (
    <SidebarProvider>
      {/*<SidebarLeft />*/}
      {/*<div className="mx-auto max-w-7xl mb-20">*/}
      <SidebarLeft data={JSON.parse(JSON.stringify(volume))} hadith={params.hadithId}/>
      <HadithForm data={JSON.parse(JSON.stringify(hadith))} />
      {/*</div>*/}
      {/*<SidebarRight data={JSON.parse(JSON.stringify(volume))}/>*/}
    </SidebarProvider>
  );
}
