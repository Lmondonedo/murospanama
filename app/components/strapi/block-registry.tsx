import type { ComponentType, ReactNode } from "react";
import React from "react";
import GalerySlider from "./blocks/GalerySlider";

// Registry maps Strapi component uids to React components.
// Add new mappings here as you create more blocks.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const defaultBlockRegistry: Record<string, ComponentType<any>> = {
  // Common forms Strapi might send for this component
  galery_slider: GalerySlider,
  "shared.galery_slider": GalerySlider,
  "shared.galery-slider": GalerySlider,
  "blocks.galery_slider": GalerySlider,
  "blocks.galery-slider": GalerySlider,
};

export type UnknownRenderer = (params: {
  name: string;
  block: unknown;
  index: number;
}) => ReactNode;

export const defaultUnknownRenderer: UnknownRenderer = ({ name }) => {
  if (process.env.NODE_ENV !== "production") {
    return (
      <div className="border border-dashed border-yellow-400 p-4 text-yellow-700 text-sm rounded">
        Bloque desconocido en DynamicZone: <code>{name || "(sin nombre)"}</code>
      </div>
    );
  }
  return null;
};
