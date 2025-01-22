import connectToDatabase from "@/lib/mongodb";
import Link from "next/link";
import { ObjectId } from "mongodb";
import { HadithForm } from "@/components/form";
import {SidebarProvider} from "@/components/ui/sidebar";
import {SidebarRight} from "@/components/sidebar-right";
import {SidebarLeft} from "@/components/sidebar-left";

async function getData(id: any, volumeId: any) {
  const db = await connectToDatabase();
  let volume = await db.collection("Hadiths").find({ volume_id: volumeId }).sort({ number: 1 })
    .toArray();
  let hadith = await db.collection("Hadiths").findOne({ _id: new ObjectId(id) });
  return { volume, hadith }
}

export default async function Book(props: any) {
  const searchParams = await props.searchParams;
  const volumeId = searchParams?.volume
  const params = await props.params;
  const { volume, hadith } = await getData(params.hadithId, volumeId);

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
