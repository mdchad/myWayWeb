// @ts-nocheck

import connectToDatabase from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET(request, props) {
  const params = await props.params;
  const db = await connectToDatabase();
  const bookId = params.bookId;
  const volumeId = params.volumeId;

  let data = null;
  if (
    bookId === "240360e4-50b4-47a9-9506-9850b0e3bfd7" &&
    volumeId !== "2b1bc287-cdea-4e51-b5d3-f6fa0ce31235"
  ) {
    //check for sahih muslim because the data was inserted in a different way. this excludes the introduction/pengantar volume.
    data = await db
      .collection("Hadiths")
      .aggregate([
        {
          $match: {
            volume_id: volumeId,
            book_id: bookId,
          },
        },
        {
          $sort: {
            _id: 1,
          },
        },
        {
          $lookup: {
            from: "Volumes",
            let: { volumeId: "$volume_id" },
            pipeline: [
              { $match: { $expr: { $eq: ["$id", "$$volumeId"] } } },
              { $project: { metadata: 1 } }
            ],
            as: "volume_details"
          }
        },
        {
          $unwind: "$volume_details",
        },
      ])
      .toArray();
  } else {
    data = await db
      .collection("Hadiths")
      .aggregate([
        {
          $match: {
            volume_id: volumeId,
            book_id: bookId,
          },
        },
        {
          $sort: {
            number: 1,
          },
        },
        {
          $lookup: {
            from: "Volumes",
            let: { volumeId: "$volume_id" },
            pipeline: [
              { $match: { $expr: { $eq: ["$id", "$$volumeId"] } } },
              { $project: { metadata: 1 } }
            ],
            as: "volume_details"
          }
        },
        {
          $unwind: "$volume_details",
        },
      ])
      .toArray();
  }

  return NextResponse.json({
    success: true,
    data: data,
  });
}
export const dynamic = "force-dynamic";
export const revalidate = false;
export const fetchCache = "force-no-store";
