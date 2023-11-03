'use client'

import React from 'react';
import Link from "next/link";

const Pagination = ({ currentPage, totalPages, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPages); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className='flex list-none'>
        {pageNumbers.map(number => (
          <li key={number} className='page-item'>
            <Link
              onClick={() => paginate(number)}
              href='!#'
              className={`page-link ${currentPage === number ? 'bg-blue-500 text-white' : 'text-blue-500'} px-4 py-2 mx-1 rounded`}
            >
              {number}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;