import { BlocksContent } from "@strapi/blocks-react-renderer";
import { graphqlFetch } from "../lib/strapi-graphql.service";
import type {
  StrapiUploadFile,
  RichTextBlock,
  GalerySliderBlock,
} from "../types/strapi-dynamic";
import { GET_ABOUT_QUERY } from "./const";
import { getStrapiMediaUrl } from "../lib/strapi-media";

// ------------------------------------------
// 1. Tipado de la Respuesta GraphQL
// ------------------------------------------

// Estructura de respuesta de GraphQL
export type AboutPageGraphQLResponse = {
  about: About;
};

export type About = {
  documentId: string;
  title: string;
  description: BlocksContent;
  keyStats: Array<{ id: string; value: string; label: string }>;
  images: StrapiUploadFile[];
};

// Detail es un tipo de unión de todos los posibles bloques dinámicos
export type Detail = RichTextBlock | GalerySliderBlock;

// ------------------------------------------
// 3. Función de Fetching (Clean Code)
// ------------------------------------------

/**
 * Obtiene los datos de la página 'About' usando GraphQL.
 * Incluye la galería de imágenes y rich text en el dynamic zone.
 *
 * @returns Los datos de About con sus bloques dinámicos, o null si hay error.
 *
 * @example
 * ```tsx
 * const aboutData = await getAboutPageData();
 * if (aboutData) {
 *   return <DynamicZone blocks={aboutData.details} />;
 * }
 * ```
 */
export async function getAboutPageData(): Promise<About> {
  try {
    const response = await graphqlFetch<AboutPageGraphQLResponse>(
      GET_ABOUT_QUERY,
      {}, // No variables needed for this query
      60 // Cache for 60 seconds
    );
    //console.log("🚀 GraphQL Response:", JSON.stringify(response, null, 2));
    // Devolvemos los atributos de manera plana y unificada
    return {
      documentId: response.about.documentId,
      title: response.about.title,
      description: response.about.description,
      images: response.about.images.map((image) => ({
        ...image,
        imageUrl: getStrapiMediaUrl(image.formats?.thumbnail?.url || image.url),
      })),
      keyStats: response.about.keyStats,
      // ... otros campos
    };
  } catch (error) {
    console.error("❌ Error fetching About page data:", error);
    throw error;
  }
}
