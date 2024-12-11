"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {useRouter, useSearchParams} from "next/navigation";
import {useEffect, useState} from "react";

function SearchBar() {
    const searchParams = useSearchParams();
    const term = searchParams.get("term");

    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState(term ? term : "");

    useEffect(() => {
        setSearchTerm(term ? term : "");
    }, [term]);

    function handleChange(e) {
        setSearchTerm(e.target.value);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        await router.push(`/search?term=${encodeURIComponent(searchTerm)}&page=1`);
    }

  return (
    <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
      <form onSubmit={handleSubmit} className="ml-auto flex-1 sm:flex-initial">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            value={searchTerm}
            onChange={handleChange}
            type="search"
            placeholder="Carian..."
            className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
          />
        </div>
      </form>
    </div>
  );
}

export default SearchBar