import connectToDatabase from "@/lib/mongodb";
import {NextResponse} from "next/server";


export async function GET(request) {
  const db = await connectToDatabase();
  const searchParams = request.nextUrl.searchParams

  const page = Number(searchParams.get('page'))
  const limit = Number(searchParams.get('limit'))
  const query = searchParams.get('query')

  const skip = (page - 1) * limit;

  const cursor = await db.collection('Hadiths').aggregate([
    {
      $search: {
        index: "content",
        text: {
          query,
          path: ['content.ms', 'content.ar']
        },
        highlight: {
          path: ['content.ms', 'content.ar'],
        }
      }
    },
    {
      $facet: {
        documents: [
          { $skip: skip }, // Skip documents for previous pages
          { $limit: limit }, // Limit to 'limit' number of documents for the current page
          // Include additional $project here if you want to shape the results
        ],
        totalCount: [
          { $count: "count" } // Count the total number of matching documents
        ]
      }
    }
    // {
    //   $project: {
    //     "content.ms": 1,
    //     "_id": 0,
    //     "highlights": { "$meta": "searchHighlights" }
    //   }
    // }
  ]);

  const data = await cursor.toArray();

  return NextResponse.json({
    success: true,
    data: data
  })
}