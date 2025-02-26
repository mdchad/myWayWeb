import connectToDatabase from "@/lib/mongodb";
import { NextResponse } from "next/server";
import {headers} from "next/headers";
import {auth} from "@/lib/auth";

const emptyData = {
  "success": true,
  "data": [
    {
      "_id": "65377edf87c0a6c62eec8b92",
      "name": "access_denied",
      "title": "Access Denied",
      "id": "ad6a2cc8-f34b-476b-9b7e-6756a3b7d43f",
      "slug": "denied"
    }
  ]
}

export async function GET() {
  const session = await auth.api.getSession({
    headers: await headers() // you need to pass the headers object.
  })
  const maintenance = process.env.NEXT_PUBLIC_MAINTENANCE_MODE;

  const db = await connectToDatabase();

  // if (!session) {
  //   return NextResponse.json({
  //     ok: false,
  //     data: emptyData
  //   });
  // }

  if (maintenance === "maintain") {
      return NextResponse.json({
        ok: false,
        data: emptyData
      });
  }

  const data = await db.collection("Books").find({}).sort({ _id: 1 }).toArray();
  return NextResponse.json({
    success: true,
    data: data,
  });
}
