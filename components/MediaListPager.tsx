import { useState, Suspense } from "react";
import Pagination from "../components/Pagination";
import MediaList from "../components/MediaList";

interface MediaListPagerProps {
  searchParams: {
    search?: string;
    genres?: Array<string>;
    year?: string;
    season?: string;
    format?: Array<string>;
    status?: string;
    type?: string;
  };
  perPage: number;
  page: number;
  setPage: any;
}

export default function MediaListPager({
  searchParams,
  perPage,
  page,
  setPage,
}: MediaListPagerProps) {
  // TODO: Checkout useMemo to prevent re-renders (?)
  const [hasNextPage, setHasNextPage] = useState(false);

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <MediaList {...{ page, perPage, setHasNextPage, searchParams }} />
      </Suspense>
      <Pagination {...{ page, setPage, hasNextPage }} />
    </>
  );
}
