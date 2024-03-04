import { useEffect, useState, useRef } from "react";

interface MediaFilterProps {
  searchParams: {
    search?: string;
    genres?: Array<string>;
    year?: string;
    season?: string;
    format?: Array<string>;
    status?: string;
    type?: string;
  };
  setSearchParams: any;
  setPage: any;
}

export default function MediaFilter({
  searchParams,
  setSearchParams,
  setPage,
}: MediaFilterProps) {
  const [searchTerm, setSearchTerm] = useState(searchParams.search ?? "");
  const searchInput = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (searchTerm === searchParams.search) {
      return;
    }
    const timeOutId = setTimeout(() => {
      searchInput.current?.blur();
      setPage(1);
      setSearchParams({ ...searchParams, search: searchTerm });
    }, 500);
    return () => clearTimeout(timeOutId);
  }, [searchTerm, setSearchTerm, searchParams, setSearchParams, setPage]);

  return (
    <div>
      <label htmlFor="search">Search:</label>
      <input
        ref={searchInput}
        name="search"
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <label htmlFor="type">Type:</label>
      <select
        name="type"
        defaultValue={searchParams.type ?? ""}
        id="type"
        onChange={(e) =>
          setSearchParams({ ...searchParams, type: e.target.value })
        }
      >
        <option value="">Any</option>
        <option value="ANIME">Anime</option>
        <option value="MANGA">Manga</option>
      </select>
    </div>
  );
}
