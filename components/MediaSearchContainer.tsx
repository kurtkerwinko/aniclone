import { useState } from "react";
import MediaListPager from "./MediaListPager";
import MediaFilter from "./MediaFilter";

const defaultPerPage = 20;

export default function MediaSearchContainer() {
  const [searchParams, setSearchParams] = useState({});
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(defaultPerPage);

  // TODO: Add dropdown to adjust number of entries per page

  return (
    <div className="search-section">
      <MediaFilter {...{ searchParams, setSearchParams, setPage }} />
      <MediaListPager {...{ searchParams, perPage, page, setPage }} />
    </div>
  );
}
