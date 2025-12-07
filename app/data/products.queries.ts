import { BlocksContent } from "@strapi/blocks-react-renderer";
import { graphqlFetch } from "../lib/strapi-graphql.service";
import { StrapiUploadFile } from "../types/strapi-dynamic";
import { GET_PRODUCTS_QUERY } from "./const";

export type ProductsGraphQLResponse = {
  products: Products[];
};

export type Products = {
  documentId: string;  
  name: string;
  shortDescription: string;
  description: BlocksContent;
  images: StrapiUploadFile[] | [];
};

export async function getProducts(): Promise<Products[]> {
  const response = await graphqlFetch<ProductsGraphQLResponse>(
    GET_PRODUCTS_QUERY,
    {}, // No variables needed for this query
    60 // Cache for 60 seconds
  );

  console.log("🚀 GraphQL Response:", JSON.stringify(response, null, 2));
  // Devolvemos los atributos de manera plana y unificada
  return response.products.map((product: Products) => ({

    documentId: product.documentId,
    name: product.name,
    shortDescription: product.shortDescription,
    description: product.description,
    // Seleccionamos solo la primera imagen del array
    images: product.images
      ? product.images.map((image) => ({
          ...image
        })).slice(0, 1)
      : [],
  }));
}
