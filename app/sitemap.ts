// @ts-nocheck

import connectToDatabase from "../lib/mongodb";

const staticPaths = ["/terms", "/privacy", "/hadis40"];

async function getDynamicPaths() {
  const db = await connectToDatabase();

  try {
    const books = await db
      .collection("Books")
      .find({})
      .sort({ _id: 1 })
      .toArray();

    // Process the results
    const bookPaths = books?.map((book) => ({
      path: `/${book.slug}`,
      lastModified: new Date(),
    }));

    // Combine all paths
    return [...(bookPaths || [])];
  } catch (e) {
    console.error("Error fetching dynamic paths:", e);
    return []; // Return an empty array to handle errors gracefully
  }
}

export default async function sitemap() {
  const lastModifiedGlobal = new Date().toISOString();
  const baseUrl = "https://www.myway.my";

  // Fetch dynamic paths (when you have them in the future)
  const dynamicPaths = await getDynamicPaths();

  // Combine static and dynamic paths
  const allPaths = [...staticPaths, ...dynamicPaths];

  // Generate URL objects, handling both strings and objects with path and lastModified
  const urls = allPaths.map((item) => {
    // Check if the item is a string (static path) or an object (dynamic path)
    if (typeof item === "string") {
      return {
        url: `${baseUrl}${item}`,
        lastModified: lastModifiedGlobal, // Use the global last modified date for static paths
        chargeFrequency: 'monthly',
        priority: 0.5
      };
    } else {
      // For dynamic paths, use the specific lastModified date if available
      return {
        url: `${baseUrl}${item.path}`,
        lastModified: item.lastModified || lastModifiedGlobal, // Fallback to the global date if not specified
        chargeFrequency: 'weekly',
        priority: 0.7
      };
    }
  });

  return [
    {
      url: "https://www.myway.my",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    ...urls,
  ];
}
