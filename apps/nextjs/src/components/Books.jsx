// @ts-nocheck
import { useRouter } from 'next/router'

export function Books({ books }) {
  const router = useRouter()

  function goToBook(e, id) {
    e.preventDefault()
    router.push({ pathname: '/[bookId]', query: { bookId: id} })
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-32 mb-20 py-4 sm:py-6 lg:py-24 bg-gray-100">
      <div className="grid lg:grid-cols-2 gap-20">
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