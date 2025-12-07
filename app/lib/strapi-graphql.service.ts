/* eslint-disable @typescript-eslint/no-explicit-any */
// Usar 'server-only' para proteger el token y usar las capacidades de fetch de Next.js
import "server-only";
import * as fs from "fs/promises";
import * as path from "path";
// ------------------------------------------
// 1. Configuración y Utilidades Base
// ------------------------------------------

const API_URL = process.env.NEXT_PUBLIC_STRAPI_GRAPHQL_API_URL;
const API_TOKEN = process.env.STRAPI_READONLY_API_TOKEN;
const CACHE_DURATION_SECONDS = Number(process.env.CACHE_DURATION_SECONDS) || 60;

const QUERIES_DIR = path.join(process.cwd(), "app", "lib", "queries");
/**
 * Define el tipo de la respuesta estándar de un servidor GraphQL
 * @template T - El tipo de datos esperado bajo la clave 'data'
 */
type GraphQLResponse<T> = {
  data: T;
  errors?: Array<{ message: string; extensions: Record<string, any> }>;
};

/**
 * Lee el contenido de un archivo .graphql de manera asíncrona.
 * @param filename El nombre del archivo (ej: 'about.query.graphql').
 * @returns El contenido de la query como un string.
 */
async function loadGraphQLQuery(filename: string): Promise<string> {
  const filePath = path.join(QUERIES_DIR, filename);
  //console.log(`Cargando consulta GraphQL desde: ${filePath}`);
  try {
    // Usamos utf-8 para leer el contenido como texto
    const content = await fs.readFile(filePath, "utf-8");
    return content;
  } catch (error) {
    console.error(`Error loading GraphQL query from ${filename}:`, error);
    throw new Error(`Failed to load necessary GraphQL query: ${filename}`);
  }
}

/**
 * Función genérica para ejecutar cualquier consulta GraphQL contra Strapi.
 * Utiliza fetch nativo de Next.js para Server Components.
 *
 * @param query La cadena de consulta GraphQL (GQL).
 * @param variables Objeto con variables para la consulta.
 * @param cacheTime Tiempo de revalidación en segundos (default 60s).
 * @returns Los datos tipados de la respuesta.
 */
export async function graphqlFetch<T>(
  queryName: string,
  variables: Record<string, any> = {},
  cacheTime: number = CACHE_DURATION_SECONDS
): Promise<T> {
  if (!API_URL) {
    throw new Error(
      "❌ Error: NEXT_PUBLIC_STRAPI_GRAPHQL_API_URL no está definido."
    );
  }

  // 🔑 Manejo del token de autenticación para API privada/preview
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (API_TOKEN) {
    headers.Authorization = `Bearer ${API_TOKEN}`;
  }
  // Obtenemos el query desde el archivo .graphql
  const query = await loadGraphQLQuery(queryName);
  console.log("🚀 GraphQL Fetch - Endpoint:", API_URL);
  //console.log("🚀 Ejecutando consulta GraphQL:", query, variables);
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: headers,
      body: JSON.stringify({ query, variables }),
      // ✅ Caching de Next.js: Revalida en el servidor cada 'cacheTime' segundos
      next: { revalidate: cacheTime },
    });

    if (!response.ok) {
      // Intenta leer el cuerpo de error si la respuesta HTTP falla
      const errorBody = await response.text();
      console.error(`HTTP Error en GraphQL: ${response.status}`, errorBody);
      throw new Error(
        `Fallo en la petición GraphQL. Status: ${response.status}`
      );
    }

    const result: GraphQLResponse<T> = await response.json();

    // 🚨 Manejo de Errores de GraphQL (e.g., sintaxis incorrecta, permisos de campo)
    if (result.errors) {
      const firstError = result.errors[0];
      const detail = firstError.message || JSON.stringify(firstError);
      console.error("❌ Errores GQL:", result.errors);
      throw new Error(`Error de GraphQL: ${detail}`);
    }

    return result.data;
  } catch (error) {
    console.error("🚨 Error en graphqlFetch:", error);
    // Re-lanza el error para que Next.js lo maneje (e.g., Boundary Error)
    throw error;
  }
}
