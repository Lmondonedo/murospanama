import { BlocksContent } from "@strapi/blocks-react-renderer";
import { graphqlFetch } from "../lib/strapi-graphql.service";
import { GET_TESTIMONIAL_PAGE_QUERY } from "./const";
import { StrapiUploadFile } from "../types/strapi-dynamic";
import { getStrapiMediaUrl } from "../lib/strapi-media";

export type TestimonialPageData = {
  testimonialPage: TestimonialPage;
  testimonials: Testimonials[];
};

export type TestimonialPage = {
  title: string;
  description: BlocksContent;
  isRandom: boolean;
};

export type Testimonials = {
  documentId: string;
  authorName: string;
  titleOrLocation: string;
  content: BlocksContent;
  avatar: StrapiUploadFile | null;
  order: number | null;
  isFeatured: boolean;
};

const SAMPLE_SIZE = 6; // Mostrar 6 testimonios en la landing

export async function getTestimonialPageData(): Promise<TestimonialPageData> {
  const response = await graphqlFetch<TestimonialPageData>(
    GET_TESTIMONIAL_PAGE_QUERY
  );
  return {
    testimonialPage: {
      title: response.testimonialPage.title,
      description: response.testimonialPage.description,
      isRandom: response.testimonialPage.isRandom,
    },
    testimonials: response.testimonials.map((testimonial) => ({
      documentId: testimonial.documentId,
      authorName: testimonial.authorName,
      titleOrLocation: testimonial.titleOrLocation,
      content: testimonial.content,
      avatar: testimonial.avatar
        ? {
            ...testimonial.avatar,
          }
        : null,
      order: testimonial.order,
      isFeatured: testimonial.isFeatured,
    })) as Testimonials[],
  };
}

/**
 * Aplica la lógica de priorización y aleatorización a los testimonios.
 */
export function prioritizeTestimonials(
  allTestimonials: Testimonials[],
  isRandom: boolean
): Testimonials[] {
  // 1. Si el interruptor global es 'Random', prioriza la aleatorización
  if (isRandom) {
    // Trae 6 registros aleatorios de toda la lista
    return getRandomSample(allTestimonials, SAMPLE_SIZE);
  }

  // --- Lógica de Curación Manual (si isRandom es false) ---

  // Ordenar los testimonios según tus reglas:
  const sortedTestimonials = [...allTestimonials].sort((a, b) => {
    const aAttr = a;
    const bAttr = b;

    // 2. Prioriza isFeatured: Los destacados van primero
    if (aAttr.isFeatured && !bAttr.isFeatured) return -1;
    if (!aAttr.isFeatured && bAttr.isFeatured) return 1;

    // 3. Luego prioriza el campo order: Orden manual (menor valor primero)
    if (aAttr.isFeatured && bAttr.isFeatured) {
      // Si ambos son featured, ordena por 'order'
      return (aAttr.order || Infinity) - (bAttr.order || Infinity);
    }

    // 4. Si nada de lo anterior se cumple (ninguno es featured), usa 'order' si existe,
    //    sino mantiene el orden de Strapi (0 o por ID)
    return (aAttr.order || Infinity) - (bAttr.order || Infinity);
  });

  // 5. Finalmente, retorna la muestra de 6 registros ya ordenados/priorizados
  return sortedTestimonials.slice(0, SAMPLE_SIZE);
}
