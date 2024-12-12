import connectToDatabase from "../../../../lib/mongodb";
import {NextRequest, NextResponse} from "next/server";

export async function GET(request: NextRequest) {
  const db = await connectToDatabase();
  const searchParams = request.nextUrl.searchParams;

  const page = Number(searchParams.get("page"));
  const limit = Number(searchParams.get("limit"));
  const query = searchParams.get("query");
  const books = searchParams.get("books");
  const selectedBooks = books ? books.split(",") : [];

  const skip = (page - 1) * limit;

  let searchQuery = {
    $search: {
      index: "content",
      compound: {
        must: [
          {
            text: {
              query: query,
              path: ["content.ms", "content.ar"],
            },
          },
        ],
        filter: {
          compound: {
            should: selectedBooks.map((book) => ({
              text: {
                path: "book_name",
                query: book,
              },
            })),
          },
        },
      },
    },
  };

  if (selectedBooks.length < 1) {
    // @ts-ignore
    delete searchQuery.$search.compound.filter;
  }

  const cursor = await db.collection("Hadiths").aggregate([
    searchQuery,
    {
      $facet: {
        documents: [
          { $skip: skip }, // Skip documents for previous pages
          { $limit: limit }, // Limit to 'limit' number of documents for the current page
          // Include additional $project here if you want to shape the results
        ],
        totalCount: [
          { $count: "count" }, // Count the total number of matching documents
        ],
      },
    },
    {
      $addFields: {
        currentPage: page, // Add the current page number to the result
      },
    },
  ]);

  const data = await cursor.toArray();

  return NextResponse.json({
    success: true,
    data: data[0],
  });
}
