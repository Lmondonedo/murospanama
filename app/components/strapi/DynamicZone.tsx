import React from "react";
import {
  defaultBlockRegistry,
  defaultUnknownRenderer,
  UnknownRenderer,
} from "./block-registry";
import type {
  DynamicZone as DynamicZoneType,
  StrapiDynamicComponentBase,
} from "@/app/types/strapi-dynamic";

export type DynamicZoneProps = {
  blocks?: DynamicZoneType | null;
  registry?: typeof defaultBlockRegistry;
  unknownRenderer?: UnknownRenderer;
  wrapper?: (
    children: React.ReactNode,
    name: string,
    index: number
  ) => React.ReactNode;
};

function getBlockName(block: StrapiDynamicComponentBase): string {
  // GraphQL uses __typename (e.g., "ComponentSharedGalerySlider")
  // REST API uses __component (e.g., "shared.galery-slider")
  const typename = block.__typename;
  const component = block.__component || block.component;

  if (typename) {
    // Convert "ComponentSharedGalerySlider" to "shared.galery-slider"
    // 1. Remove "Component" prefix
    // 2. Insert a dot after the first capitalized word group
    // 3. Convert camelCase to kebab-case
    const withoutPrefix = typename.replace(/^Component/, "");

    // Split on capital letters to get word boundaries
    const words: string[] = [];
    let currentWord = "";

    for (let i = 0; i < withoutPrefix.length; i++) {
      const char = withoutPrefix[i];
      if (char === char.toUpperCase() && currentWord) {
        words.push(currentWord);
        currentWord = char.toLowerCase();
      } else {
        currentWord += char.toLowerCase();
      }
    }
    if (currentWord) words.push(currentWord);

    // Join first word with dot, rest with hyphens
    if (words.length > 0) {
      const namespace = words[0];
      const rest = words.slice(1).join("-");
      return rest ? `${namespace}.${rest}` : namespace;
    }
  }

  return (component || "").toString();
}

export default function DynamicZone({
  blocks = [],
  registry = defaultBlockRegistry,
  unknownRenderer = defaultUnknownRenderer,
  wrapper,
}: DynamicZoneProps) {
  if (!Array.isArray(blocks) || blocks.length === 0) return null;

  return (
    <>
      {blocks.map((block, index) => {
        const name = getBlockName(block);
        const Comp = registry[name];
        const b = block as StrapiDynamicComponentBase & { documentId?: string };
        const key = `${name}-${b.id ?? b.documentId ?? index}`;
        const node = Comp ? (
          <Comp {...(block as Record<string, unknown>)} />
        ) : (
          unknownRenderer({ name, block, index })
        );
        return wrapper ? (
          <React.Fragment key={key}>
            {wrapper(node, name, index)}
          </React.Fragment>
        ) : (
          <React.Fragment key={key}>{node}</React.Fragment>
        );
      })}
    </>
  );
}
