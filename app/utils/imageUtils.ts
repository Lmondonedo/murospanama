import { getStrapiMediaUrl } from "../lib/strapi-media";
import { StrapiUploadFile } from "../types/strapi-dynamic";

export function getImageInfo(image: StrapiUploadFile) {
  const imageFormat = image?.formats?.medium || image?.formats?.large || image;
  const imageUrl = getStrapiMediaUrl(imageFormat?.url);
  const imageWidth = imageFormat?.width || 800;
  const imageHeight = imageFormat?.height || 1000;
  const imageAlt =
    image?.alternativeText || "Imagen de Producto de Muros Panamá";
  return { imageUrl, imageWidth, imageHeight, imageAlt };
}
