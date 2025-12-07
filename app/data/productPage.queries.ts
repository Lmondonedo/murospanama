// app/data/global.queries.ts

import { BlocksContent } from "@strapi/blocks-react-renderer";
import { graphqlFetch } from "../lib/strapi-graphql.service";
import { getStrapiMediaUrl } from "../lib/strapi-media";
import { StrapiUploadFile } from "../types/strapi-dynamic";
import { GET_PRODUCT_PAGE_QUERY } from "./const";

export type ProductPageGraphQLResponse = {
  productPage: ProductPageData;
};

export type ProductPageData = {
  title: string;
  description: BlocksContent;
  image: (StrapiUploadFile & { imageUrl: string }) | null;
};

export async function getProductPageData(): Promise<ProductPageData> {
  const response = await graphqlFetch<ProductPageGraphQLResponse>(
    GET_PRODUCT_PAGE_QUERY,
    {}, // No variables needed for this query
    60 // Cache for 60 seconds
  );

  console.log("🚀 GraphQL Response:", JSON.stringify(response, null, 2));
  // Devolvemos los atributos de manera plana y unificada
  return {
    title: response.productPage.title,
    description: response.productPage.description,
    image: response.productPage.image
      ? {
          ...response.productPage.image,
          // Pre-calculamos la URL completa del logo para simplificar el componente
          imageUrl: getStrapiMediaUrl(
            response.productPage.image.formats?.thumbnail?.url ||
              response.productPage.image.url
          ),
        }
      : null,
    // ... otros campos
  };
}
