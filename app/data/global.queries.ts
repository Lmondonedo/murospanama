// app/data/global.queries.ts

import { graphqlFetch } from "../lib/strapi-graphql.service";
import { GET_GLOBAL_QUERY } from "./const";

export type GlobalPageGraphQLResponse = {
  global: GlobalData;
};

type defaultSeo = {
  metaTitle: string;
  metaDescription: string;
}

type GlobalData = {
  siteName: string;
  siteDescription?: string;
  defaultSeo?: defaultSeo;
};

export async function getGlobalConfig(): Promise<GlobalData> {
  const response = await graphqlFetch<GlobalPageGraphQLResponse>(
    GET_GLOBAL_QUERY,
    {}, // No variables needed for this query
    60 // Cache for 60 seconds
  );

  console.log("🚀 GraphQL Response:", JSON.stringify(response, null, 2));
  // Devolvemos los atributos de manera plana y unificada
  return {
    siteName: response.global.siteName
    
    // ... otros campos
  };
}
