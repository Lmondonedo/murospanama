"use client";

import React, { useMemo, useRef } from "react";
import Image from "next/image";
import {
  GalerySliderBlock,
  StrapiUploadFile,
  ImageItem,
} from "@/app/types/strapi-dynamic";
import { getStrapiMediaUrl } from "@/app/lib/strapi-media";

export type GalerySliderProps = GalerySliderBlock;

type WithImage = { image?: StrapiUploadFile | null };
type WithUrl = { url?: string };
type WithAltCap = { alternativeText?: string | null; caption?: string | null };

// Type guards para verificar estructuras de datos
function hasImage(x: unknown): x is WithImage {
  // Verifica si el objeto tiene propiedad "image"
  return typeof x === "object" && x !== null && "image" in x;
}

function hasUrl(x: unknown): x is WithUrl {
  // Verifica si el objeto tiene propiedad "url"
  return typeof x === "object" && x !== null && "url" in x;
}

function hasAltCap(x: unknown): x is WithAltCap {
  // Verifica si tiene alternativeText o caption
  return (
    typeof x === "object" &&
    x !== null &&
    ("alternativeText" in x || "caption" in x)
  );
}

function isUploadFile(x: unknown): x is StrapiUploadFile {
  // Verifica si es un archivo de Strapi válido
  return typeof x === "object" && x !== null && "url" in x;
}

function isImageItem(x: unknown): x is ImageItem {
  // Verifica si es un ImageItem de GraphQL
  return (
    typeof x === "object" &&
    x !== null &&
    "image" in x &&
    typeof (x as ImageItem).image === "object"
  );
}

function normalizeItems(
  images?: GalerySliderProps["images"],
  imageItems?: ImageItem[]
) {
  // Determinar qué fuente de datos usar (REST API o GraphQL)
  const sourceData = imageItems || images || [];

  return sourceData
    .map((item, idx) => {
      // Variables para almacenar datos extraídos
      let media: StrapiUploadFile | undefined;
      let url: string | undefined;
      let alternativeText: string | null | undefined;
      let caption: string | null | undefined;

      // PASO 1: Si es un ImageItem de GraphQL (tiene image property)
      if (isImageItem(item)) {
        media = item.image;
        alternativeText = item.alternativeText ?? item.image.alternativeText;
        caption = item.caption ?? item.image.caption;
      }
      // PASO 2: Detectar si viene como { image: {...} } (REST format)
      else if (hasImage(item) && item.image) {
        media = item.image;
      }
      // PASO 3: Detectar si ES directamente un UploadFile
      else if (isUploadFile(item)) {
        media = item;
      }

      // PASO 4: Extraer URL si está en el objeto principal
      if (hasUrl(item) && typeof item.url === "string") url = item.url;

      // PASO 5: Extraer alternativeText y caption si no se han obtenido
      if (!alternativeText && !caption && hasAltCap(item)) {
        alternativeText = item.alternativeText ?? undefined;
        caption = item.caption ?? undefined;
      }

      // PASO 6: Si no hay URL, intentar sacarla de media
      if (!url) url = media?.url;

      // PASO 7: Si no hay alternativeText, sacarla de media
      if (!alternativeText && media) alternativeText = media.alternativeText;

      // PASO 8: Si no hay caption, sacarla de media
      if (!caption && media) caption = media.caption;

      // PASO 9: Fallback para imágenes faltantes (desarrollo)
      const finalUrl = url || `/placeholder-${idx + 1}.jpg`;

      // PASO 10: Devolver objeto normalizado
      return {
        url: getStrapiMediaUrl(finalUrl), // Convierte a URL completa
        alt: alternativeText || caption || `Image ${idx + 1}`,
        caption: caption || "",
      };
    })
    .filter((i) => Boolean(i.url)); // Quitar items sin URL
}

export default function GalerySlider(props: GalerySliderProps) {
  const { title, images, image_item } = props;

  // useMemo: Normaliza las imágenes solo cuando cambian
  // Prioriza image_item (GraphQL) sobre images (REST)
  const items = useMemo(
    () => normalizeItems(images, image_item),
    [images, image_item]
  );

  // useRef: Referencia al contenedor del carrusel (para scroll programático)
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Función para hacer scroll a una imagen específica
  const scrollToIndex = (idx: number) => {
    const el = containerRef.current;
    if (!el) return;
    const child = el.children[idx] as HTMLElement | undefined;
    child?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  };

  return (
    <section className="w-full">
      {/* Título del bloque (opcional) */}
      {title ? (
        <h3 className="mb-4 text-xl font-semibold tracking-tight text-gray-900">
          {title}
        </h3>
      ) : null}

      <div className="relative">
        {/* Contenedor del carrusel */}
        <div
          ref={containerRef}
          className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory no-scrollbar"
          aria-label={title || "Galería"}
        >
          {items.map((img, idx) => (
            <figure
              key={idx}
              className="snap-center shrink-0 w-[85vw] md:w-[60vw] lg:w-[40rem]"
            >
              {/* Contenedor de la imagen */}
              <div className="relative w-full h-64 md:h-80 lg:h-96 bg-gray-100 rounded-lg overflow-hidden">
                <Image
                  src={img.url} // URL completa desde normalizeItems
                  alt={img.alt} // Texto alternativo para accesibilidad
                  fill // La imagen llena todo el contenedor
                  unoptimized // Sin optimización (puedes quitarlo en producción)
                  priority={idx === 0} // Prioridad para la primera imagen
                  sizes="(max-width: 768px) 85vw, (max-width: 1024px) 60vw, 40rem"
                  className="object-cover" // La imagen cubre todo el área
                />
              </div>
              {/* Caption (opcional) */}
              {img.caption ? (
                <figcaption className="mt-2 text-sm text-gray-600 truncate">
                  {img.caption}
                </figcaption>
              ) : null}
            </figure>
          ))}
        </div>

        {/* Navegación por puntos (dots) */}
        {items.length > 1 ? (
          <div className="mt-3 flex justify-center gap-2">
            {items.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => scrollToIndex(i)}
                className="h-2 w-2 rounded-full bg-gray-300 hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
                aria-label={`Ir al slide ${i + 1}`}
              />
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}

// Hide scrollbars utility (Tailwind v4 doesn't include no-scrollbar by default). If needed, add this class to globals.
// .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
// .no-scrollbar::-webkit-scrollbar { display: none; }
