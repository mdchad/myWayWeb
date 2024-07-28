'use client'

import React from "react";
import {InfiniteHits, InstantSearch, SearchBox, Highlight} from "react-instantsearch";
import {instantMeiliSearch} from "@meilisearch/instant-meilisearch";
import SpecialText from "@/components/SpecialText";
import 'instantsearch.css/themes/satellite.css';

const { searchClient } = instantMeiliSearch(
  'https://meilisearch-production-298f.up.railway.app/',
  'EDTf980MdurBpqlmXzUPwQWcLL6EC3b7z9u+X6qLumfjnYRcf5bRLUjCA9G7C6Bx'
);

const Hit = ({ hit }) => {
  console.log(hit)
  return (
    <div className="" key={hit._id}>
      <h1 className="mb-8 font-bold">
        <SpecialText text={hit.chapter_title.ms} />
        {/*<Highlight attribute="chapter_title.ms" hit={hit} />*/}
      </h1>
      <p className="text-lg font-arabic mb-4"><Highlight attribute="content.0.ar" hit={hit} /></p>
      <p className="font-arabicSymbol"><Highlight attribute="content.0.ms" hit={hit} /></p>
    </div>
  )
}

export default function NewSearch() {
  return (
    <div className="px-4 sm:px-6 lg:px-32 mb-20 py-4 sm:py-6 lg:py-16 bg-gray-100">
      <InstantSearch
        indexName="hadith"
        searchClient={searchClient}
      >
        <SearchBox />
        <InfiniteHits translations={{ showMoreButtonText: 'Tunjuk lagi'}} hitComponent={Hit} />
      </InstantSearch>
    </div>
  );
}
