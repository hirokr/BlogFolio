import type { QueryParams } from "@sanity/client";
import { client } from "./client";

export async function sanityFetch<QueryResponse>({
  query,
  params = {} as QueryParams,
  tags = [] as string[],
}: {
  query: string;
  params?: QueryParams;
  tags?: string[];
}): Promise<QueryResponse> {
  // Normalize params: convert "all" or "" to null
  const normalizedParams: QueryParams = {};
  for (const key in params) {
    const value = params[key];
    if (value === "all" || value === "") {
      normalizedParams[key] = null;
    } else {
      normalizedParams[key] = value;
    }
  }

  return client.fetch<QueryResponse>(query, normalizedParams, {
    next: { revalidate: 3600 }, // revalidate every 1 hour
  });
}
