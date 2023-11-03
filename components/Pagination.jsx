'use client'

import React from 'react';
import Link from "next/link";
import {useSearchParams} from "next/navigation";

const Pagination = ({ count }) => {
  const searchParams = useSearchParams();
  const term = searchParams.get('term');
  const currentPage = parseInt(searchParams.get("page"), 10) || 1;

  const totalCount = count; // Replace with the actual total count of collections
  const itemsPerPage = 10;
  const totalPages = Math.ceil(totalCount / itemsPerPage);
  const maxPageNumberWindow = 5;
  const startIndex = (currentPage - 1) * itemsPerPage + 1;
  const endIndex = Math.min(startIndex + itemsPerPage - 1, totalCount);

  let pageNumbers = [];
  let startPage = Math.max(1, currentPage - Math.floor(maxPageNumberWindow / 2));
  let endPage = Math.min(totalPages, startPage + maxPageNumberWindow - 1);

  if (endPage - startPage + 1 < maxPageNumberWindow) {
    startPage = Math.max(1, endPage - maxPageNumberWindow + 1);
  }

  if (startPage > 1) {
    pageNumbers = [1, '...'];
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  if (endPage < totalPages) {
    pageNumbers.push('...');
    pageNumbers.push(totalPages);
  }

  return (
    <nav>
      <p className="text-right my-2 font-sans text-sm">Showing {startIndex} - {endIndex} of {totalCount}</p>
      <ul className='flex list-none'>
        {pageNumbers.map((number, i) => (
          <li key={i}>
            {number === '...' ? (
              <span className="px-4 py-2 mx-1">{number}</span>
            ) : (
              <Link
                href={`/search?term=${encodeURIComponent(term)}&page=${number}`}
                className={`${currentPage === number ? 'bg-royal-blue text-white' : 'hover:bg-gray-100 text-black'} shadow-md text-sm px-2 py-1 mx-1 rounded`}
              >
                {number}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;