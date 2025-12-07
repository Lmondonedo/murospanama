import DynamicZone from "./DynamicZone";
import { getEntryBySlug, PageWithDynamicZone } from "@/app/lib/strapi.service";
import type { DynamicZone as DynamicZoneType } from "@/app/types/strapi-dynamic";

// Server component example to render a dynamic zone from Strapi (or a fallback)
export default async function ExampleDynamicZoneUsage({
  collection = "pages", // replace later with your collection uid
  slug = "home", // replace with your slug
  dzFieldName = "blocks", // replace with your dynamic zone field name
}: {
  collection?: string;
  slug?: string;
  dzFieldName?: string;
}) {
  let blocks: DynamicZoneType | null = null;
  try {
    const entry = await getEntryBySlug<PageWithDynamicZone>({
      collection,
      slug,
      populate: "deep",
    });
    if (entry) {
      const rec = entry as unknown as Record<string, unknown>;
      blocks = (rec[dzFieldName] as DynamicZoneType) ?? null;
    } else {
      blocks = null;
    }
  } catch (err) {
    // Swallow errors to allow local render without Strapi
    if (process.env.NODE_ENV !== "production") {
      console.debug(
        "ExampleDynamicZoneUsage: Strapi not reachable or not configured",
        err
      );
    }
    blocks = null;
  }

  // Fallback data while Strapi collection and DB are not ready
  const fallback: DynamicZoneType = [
    {
      __component: "galery_slider",
      title: "Ejemplo de galería",
      images: [
        { url: "/vercel.svg", caption: "Ejemplo 1" },
        { url: "/next.svg", caption: "Ejemplo 2" },
        { url: "/globe.svg", caption: "Ejemplo 3" },
      ],
    },
  ];

  return <DynamicZone blocks={blocks ?? fallback} />;
}
