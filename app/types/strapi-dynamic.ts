// Types to model Strapi dynamic zones and media shapes (Strapi v4/v5-friendly)
// Compatible with both REST API and GraphQL responses

export type StrapiDynamicComponentBase = {
  id?: number | string;
  // Strapi stores component uid under "__component" (v4) or sometimes "component" (v5).
  __component?: string;
  component?: string;
  // GraphQL returns __typename instead of __component
  __typename?: string;
};

// ------------------------------------------
// Media Types (GraphQL-compatible)
// ------------------------------------------

export type StrapiMediaFormat = {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path: null | string;
  size: number;
  width: number;
  height: number;
  sizeInBytes?: number;
};

export type StrapiMediaFormats = {
  large?: StrapiMediaFormat;
  small?: StrapiMediaFormat;
  medium?: StrapiMediaFormat;
  thumbnail?: StrapiMediaFormat;
};

export type StrapiUploadFile = {
  id?: number;
  documentId?: string;
  name: string;
  alternativeText?: string | null;
  caption?: string | null;
  width: number;
  height: number;
  formats?: StrapiMediaFormats | null;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl?: string | null;
  provider?: string;
  provider_metadata?: unknown;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  publishedAt?: Date | string;
  
};

// ------------------------------------------
// Image Item (for Gallery/Slider blocks)
// ------------------------------------------

export type ImageItem = {
  id: string | number;
  image: StrapiUploadFile;
  alternativeText?: string | null;
  caption?: string | null;
};

// ------------------------------------------
// Dynamic Zone Block Types
// ------------------------------------------

// Rich Text Block (ComponentSharedRichText)
export type RichTextBlock = StrapiDynamicComponentBase & {
  body?: string;
};

// Gallery Slider Block (ComponentSharedGalerySlider)
export type GalerySliderBlock = StrapiDynamicComponentBase & {
  title?: string | null;
  autoplay?: boolean | null;
  // Support both REST API format (images) and GraphQL format (image_item)
  images?: Array<{
    id?: number;
    image?: StrapiUploadFile | null;
    url?: string;
    alternativeText?: string | null;
    caption?: string | null;
  }>;
  image_item?: ImageItem[];
};

// ------------------------------------------
// Generic Dynamic Zone Types
// ------------------------------------------

// Union type for all known blocks
export type DynamicBlock = RichTextBlock | GalerySliderBlock;

// Generic dynamic zone array type
export type DynamicZone = Array<
  StrapiDynamicComponentBase & Record<string, unknown>
>;
