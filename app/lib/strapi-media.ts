/**
 * Convierte una URL relativa de Strapi en una URL completa
 *
 * @param url - Ruta del archivo (ej: "/uploads/image.jpg")
 * @returns URL completa (ej: "http://localhost:1337/uploads/image.jpg")
 *
 * Ejemplos:
 * - "/uploads/photo.jpg" → "http://localhost:1337/uploads/photo.jpg"
 * - "https://cdn.com/image.jpg" → "https://cdn.com/image.jpg" (sin cambios)
 * - null/undefined → "" (string vacío)
 */
export function getStrapiMediaUrl(url?: string | null): string {
  // 1. Si no hay URL, devolver vacío
  if (!url) return "";

  // 2. Si ya es una URL completa (http/https), devolverla sin cambios
  if (/^https?:\/\//i.test(url)) return url;

  // 3. Obtener la URL base de Strapi desde variables de entorno
  const apiUrl = process.env.NEXT_PUBLIC_STRAPI_GRAPHQL_API_URL || "";
  // Ejemplo: "http://localhost:1337/api"

  // 4. Remover "/graphql" del final para obtener la base
  const base = apiUrl.replace(/\/graphql\/?$/, "");
  // Resultado: "http://localhost:1337"

  // 5. Quitar "/" final si existe
  const baseTrim = base.endsWith("/") ? base.slice(0, -1) : base;

  // 6. Asegurar que la ruta empiece con "/"
  const path = url.startsWith("/") ? url : `/${url}`;

  // 7. Combinar base + path
  return `${baseTrim}${path}`;
  // Resultado: "http://localhost:1337/uploads/image.jpg"
}
