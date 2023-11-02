import connectToDatabase from "@/lib/mongodb";
import Link from "next/link";

async function getData() {
  const db = await connectToDatabase();

  return await db.collection('Books').find({}).toArray();
}

export default async function Home() {
  const books = await getData()

  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-32 mb-20 py-4 sm:py-6 lg:py-16 bg-gray-100">
      {/*<input onChange={(e) => setSearch(e.target.value)} value={search} />*/}
      {/*<button onClick={handleSubmit}>Submit</button>*/}
      <div className="bg-royal-blue mb-12 py-4 px-2 rounded-md">
        <p className="text-2xl font-bold text-white text-center py-4 font-sans">My Way: Hadiths of Prophet Muhammad</p>
      </div>
      <div className="grid lg:grid-cols-2 gap-20 ">
        { books.map(book => {
          return (
            <Link key={book.id} href={`/${book.id}`}>
              <div className="bg-white">
                <div className="flex justify-center py-16 px-2">
                  <p className="text-2xl text-royal-blue font-semibold" style={{fontFamily: 'Inter'}}>{book.title}</p>
                </div>
                <div className="bg-royal-blue flex justify-end px-4 py-0.5">
                  <p className="text-white">View more</p>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </main>
  )
}
