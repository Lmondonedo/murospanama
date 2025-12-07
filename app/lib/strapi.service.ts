// src/lib/strapi.service.ts

// Usar 'server-only' para prevenir que este código se ejecute en el cliente
// y exponer el token secreto.
import "server-only";
import { StrapiItem, StrapiResponse } from "../types/strapi";
import type { DynamicZone } from "../types/strapi-dynamic";

const API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL;
const API_TOKEN = process.env.STRAPI_API_TOKEN;

export async function fetchStrapiData<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<StrapiResponse<T>> {
  if (!API_URL) {
    throw new Error("STRAPI_API_URL no está definido.");
  }

  const url = `${API_URL}/${endpoint}`;

  const headers = {
    "Content-Type": "application/json",
    ...(API_TOKEN && { Authorization: `Bearer ${API_TOKEN}` }),
  };

  try {
    const response = await fetch(url, {
      ...options,
      headers: { ...headers, ...options.headers },
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      console.error(
        `Error al obtener ${url}: ${response.status} ${response.statusText}`
      );
      const errorBody = await response.text();
      throw new Error(
        `Fallo en la petición a Strapi. Status: ${response.status}. Detalle: ${errorBody}`
      );
    }

    const data = await response.json();
    console.log("Datos recibidos de Strapi:", data);
    return data;
  } catch (error) {
    console.error("Error en fetchStrapiData:", error);
    throw error;
  }
}

// Actualiza el tipo ArticleAttributes para que no incluya los campos base
type ArticleAttributes = {
  title: string;
  slug: string;
  description: string;
};

export async function getBlogArticles(): Promise<
  StrapiItem<ArticleAttributes>[]
> {
  // Actualiza el endpoint para usar los nuevos campos
  const endpoint =
    "articles?fields[0]=title&fields[1]=slug&fields[2]=description&fields[3]=publishedAt&sort=publishedAt:desc";

  const response = await fetchStrapiData<ArticleAttributes>(endpoint);
  return response.data;
}

// Función para obtener un artículo específico por documentId
export async function getBlogArticle(
  documentId: string
): Promise<StrapiItem<ArticleAttributes>> {
  const endpoint = `articles/${documentId}`;
  const response = await fetchStrapiData<ArticleAttributes>(endpoint);

  // Para respuesta de un solo ítem, Strapi devuelve { data: {...}, meta: {} }
  if (Array.isArray(response.data)) {
    throw new Error("Se esperaba un solo artículo, pero se recibió un array");
  }

  return response.data as StrapiItem<ArticleAttributes>;
}

// Generic fetcher to get an entry from any collection by slug.
// Keeps things flexible until the Strapi collection is created.
export type GetEntryBySlugParams = {
  collection: string; // e.g., 'pages'
  slug: string;
  slugField?: string; // default 'slug'
  populate?: string; // e.g., 'deep'
  fields?: string[]; // fields to request
};

export async function getEntryBySlug<T = Record<string, unknown>>({
  collection,
  slug,
  slugField = "slug",
  populate,
  fields,
}: GetEntryBySlugParams): Promise<StrapiItem<T> | null> {
  const qs: string[] = [];
  qs.push(
    `filters[${encodeURIComponent(slugField)}][$eq]=${encodeURIComponent(slug)}`
  );
  if (populate) qs.push(`populate=${encodeURIComponent(populate)}`);
  if (fields && fields.length) {
    fields.forEach((f, i) => qs.push(`fields[${i}]=${encodeURIComponent(f)}`));
  }
  const endpoint = `${collection}?${qs.join("&")}`;
  const response = await fetchStrapiData<T>(endpoint);
  const item = response.data?.[0] ?? null;
  return item ?? null;
}

// Example type helper for pages with dynamic zones
export type PageWithDynamicZone<TExtras = Record<string, unknown>> = TExtras & {
  title?: string;
  slug?: string;
  blocks?: DynamicZone; // dynamic zone field (name can vary on your Strapi model)
};
