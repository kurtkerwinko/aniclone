import Image from "next/image";
import { gql, UseSuspenseQueryResult } from "@apollo/client";
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { useEffect } from "react";

interface Media {
  id: number;
  title: {
    romaji: string;
    english: string;
    native: string;
  };
  description: string;
  coverImage: {
    large: string;
    medium: string;
    small: string;
  };
}

interface MediaListData {
  Page: {
    pageInfo: {
      perPage: number;
      currentPage: number;
      hasNextPage: boolean;
    };
    media: Array<Media>;
  };
}

const GET_MEDIA_LIST = gql`
  query GetMediaPage(
    $page: Int!
    $perPage: Int!
    $search: String
    $type: MediaType
  ) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        hasNextPage
      }
      media(
        sort: START_DATE_DESC
        search: $search
        type: $type
        isAdult: false
      ) {
        id
        title {
          romaji
          english
          native
        }
        description
        coverImage {
          extraLarge
          large
          medium
          color
        }
      }
    }
  }
`;

interface MediaListProps {
  page: number;
  perPage: number;
  setHasNextPage: any;
  searchParams: {
    search?: string;
    genres?: Array<string>;
    year?: string;
    season?: string;
    format?: Array<string>;
    status?: string;
    type?: string;
  };
}

export default function MediaList({
  page,
  perPage,
  setHasNextPage,
  searchParams,
}: MediaListProps) {
  const filteredSearchParams = Object.fromEntries(
    Object.entries(searchParams).filter(([_, v]) =>
      Array.isArray(v) ? v.length > 0 : v !== ""
    )
  );
  const { data, error }: UseSuspenseQueryResult<MediaListData> =
    useSuspenseQuery(GET_MEDIA_LIST, {
      variables: { page, perPage, ...filteredSearchParams },
    });

  useEffect(
    () => setHasNextPage(data.Page.pageInfo.hasNextPage),
    [setHasNextPage, data]
  );

  return (
    <div>
      {data.Page.media.map(
        ({
          id,
          title: { romaji, english, native },
          description,
          coverImage: { medium },
        }) => (
          <li key={id}>
            <Image
              src={medium}
              width={100}
              height={139}
              alt={english ?? native}
            />
            {id} - Title: {romaji}, English: {english}, Native: {native},{" "}
            {description}
          </li>
        )
      )}
    </div>
  );
}
