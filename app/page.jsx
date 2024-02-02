import connectToDatabase from "@/lib/mongodb";
import Link from "next/link";
import TodayCard from "@/components/TodayCard";
import Card from "@/components/Card";
import IntroCard from "@/components/IntroCard";

export default async function Home() {
  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-32 mb-20 py-4 sm:py-6 lg:py-16 bg-gray-100">
      {/*<input onChange={(e) => setSearch(e.target.value)} value={search} />*/}
      {/*<button onClick={handleSubmit}>Submit</button>*/}
      <div className="bg-royal-blue mb-12 py-4 px-2 rounded-md">
        <p className="text-2xl font-bold text-white text-center py-4 font-sans">My Way</p>
      </div>
      <div className="space-y-8">
        <TodayCard />
        <div className="grid grid-cols-2 flex-row space-x-2">
          <Card title="Hadis 40" description={"Imam Nawawi"} path="/hadis40" />
          <Card title="Kutub Sittah" path="/books" description={"Enam buku hadis utama"} gradient={true}/>
        </div>
        <IntroCard />
      </div>
    </main>
  )
}
