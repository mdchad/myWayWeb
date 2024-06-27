import connectToDatabase from "@/lib/mongodb";
import Link from "next/link";
import {ArrowRight} from "lucide-react";
import SeeMoreBar from "@/components/SeeMoreBar";

async function getData() {
  const db = await connectToDatabase();

  return await db.collection('Books').find({}).sort({ _id: 1}).toArray();
}

export default async function Home() {
  const books = await getData()

  return (
    <main className="px-4 sm:px-6 lg:px-20 mb-20 py-4 sm:py-6 lg:py-16 bg-gray-100">
      {/*<input onChange={(e) => setSearch(e.target.value)} value={search} />*/}
      {/*<button onClick={handleSubmit}>Submit</button>*/}
      <div className="grid lg:grid-cols-2 lg:gap-20 gap-10">
        { books.map(book => {
          return (
            <Link key={book.id} href={`/${book.id}`}>
              <div key={book.id} className="hover:shadow-lg bg-white rounded-md">
                <div className="flex justify-center py-16 px-2">
                  <p className="text-2xl text-royal-blue font-semibold">{book.title}</p>
                </div>
                <SeeMoreBar />
              </div>
            </Link>
          )
        })}
      </div>
    </main>
  )
}
