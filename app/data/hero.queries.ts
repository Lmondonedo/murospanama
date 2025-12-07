// app/data/global.queries.ts

import { BlocksContent } from "@strapi/blocks-react-renderer";
import { graphqlFetch } from "../lib/strapi-graphql.service";
import { getStrapiMediaUrl } from "../lib/strapi-media";
import { StrapiUploadFile } from "../types/strapi-dynamic";
import { GET_HERO_QUERY } from "./const";

export type HeroPageGraphQLResponse = {
  homePage: HeroPageData;
};

export type HeroPageData = {
  description: BlocksContent;
  images: StrapiUploadFile[] | [];
};

export async function getHeroPageData(): Promise<HeroPageData> {
  const response = await graphqlFetch<HeroPageGraphQLResponse>(
    GET_HERO_QUERY,
    {}, // No variables needed for this query
    60 // Cache for 60 seconds
  );

  console.log("🚀 GraphQL Response:", JSON.stringify(response, null, 2));
  // Devolvemos los atributos de manera plana y unificada
  return {
    description: response.homePage.description,
    images: response.homePage.images.map((image) => ({
      ...image,
      imageUrl: getStrapiMediaUrl(
        image.formats?.thumbnail?.url || image.url
      ),
    })),
    // ... otros campos
  };
}
