// @ts-nocheck
import { useRouter } from 'next/router'
import {useState} from "react";

export function Books({ books }) {
  const router = useRouter()

  function goToBook(e, id) {
    e.preventDefault()
    router.push({ pathname: '/[bookId]', query: { bookId: id} })
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-32 mb-20 py-4 sm:py-6 lg:py-16 bg-gray-100">
      {/*<input onChange={(e) => setSearch(e.target.value)} value={search} />*/}
      {/*<button onClick={handleSubmit}>Submit</button>*/}
      <div className="bg-royal-blue mb-12 py-4 px-2 rounded-md">
        <p className="text-2xl font-bold text-white text-center py-4 font-sans">My Way: Hadiths of Prophet Muhammad</p>
      </div>
      <div className="grid lg:grid-cols-2 gap-20 ">
      { books.map(book => {
        const id = book.id_
        return (
          <button key={book.id} onClick={(e) => goToBook(e, id)}>
            <div className="bg-white">
              <div className="flex justify-center py-16 px-2">
                <p className="text-2xl text-royal-blue font-semibold" style={{fontFamily: 'Inter'}}>{book.title}</p>
              </div>
              <div className="bg-royal-blue flex justify-end px-4 py-0.5">
                <p className="text-white">View more</p>
              </div>
            </div>
          </button>
        )
      })}
      </div>
    </div>
  );
}