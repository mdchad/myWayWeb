import connectToDatabase from "@/lib/mongodb";
import {NextResponse} from "next/server";


export async function GET(request) {
  const db = await connectToDatabase();
  const searchParams = request.nextUrl.searchParams

  const page = Number(searchParams.get('page'))
  const limit = Number(searchParams.get('limit'))
  const query = searchParams.get('query')
  const books = searchParams.get('books')

  const skip = (page - 1) * limit;

  let searchQuery = {
    $search: {
      index: 'content',
      compound: {
        must: [
          {
            text: {
              query: query,
              // path: ['content', 'volumeTitle'] // Search in both content and volume title
              path: ['content.ms', 'content.ar']
            }
          }
        ],
        filter: [],
        // minimumShouldMatch: 1 // Adjust based on your filtering logic
      }
    }
  };

  if (books.length > 0) {
    books.forEach(book => {
      searchQuery.$search.compound.filter.push({
        text: {
          path: 'book_name', // Assuming 'title' is the field with the book title
          query: book
        }
      });
    });
  } else {
    // If no specific books are selected, adjust minimumShouldMatch
    delete searchQuery.$search.compound.filter;
  }

  const cursor = await db.collection('Hadiths').aggregate([
    searchQuery,
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
    },
    {
      $addFields: {
        currentPage: page // Add the current page number to the result
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
    data: data[0]
  })
}