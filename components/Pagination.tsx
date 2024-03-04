interface PaginationProps {
  page: number;
  setPage: any;
  hasNextPage: boolean;
}

export default function Pagination({
  page,
  setPage,
  hasNextPage,
}: PaginationProps) {
  // TODO: Convert to infinite scroll

  return (
    <div>
      <button disabled={page === 1} onClick={() => setPage(page - 1)}>
        Previous
      </button>
      -{page}-
      <button disabled={!hasNextPage} onClick={() => setPage(page + 1)}>
        Next
      </button>
    </div>
  );
}
