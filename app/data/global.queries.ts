// app/data/global.queries.ts

import { graphqlFetch } from "../lib/strapi-graphql.service";
import { getStrapiMediaUrl } from "../lib/strapi-media";
import { StrapiUploadFile } from "../types/strapi-dynamic";
import { GET_GLOBAL_QUERY } from "./const";

export type GlobalPageGraphQLResponse = {
  global: GlobalData;
};

type GlobalData = {
  siteName: string;
  mainLogo: (StrapiUploadFile & { mainLogoUrl: string }) | null;
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
    siteName: response.global.siteName,
    mainLogo: response.global.mainLogo
      ? {
          ...response.global.mainLogo,
          // Pre-calculamos la URL completa del logo para simplificar el componente
          mainLogoUrl: getStrapiMediaUrl(
            response.global.mainLogo.formats?.thumbnail?.url ||
              response.global.mainLogo.url
          ),
        }
      : null,
    // ... otros campos
  };
}
