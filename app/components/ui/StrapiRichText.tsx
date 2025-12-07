/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import {
  BlocksRenderer,
  type BlocksContent,
} from "@strapi/blocks-react-renderer";
import React from "react";

interface StrapiRichTextProps {
  // Usa el tipo BlocksContent exportado por la librería
  content: BlocksContent;
  className?: string;
}

/**
 * Componente que procesa el JSON de Strapi Rich Text y lo renderiza como HTML/React.
 * @param content El array de bloques de contenido de Strapi.
 */
export function StrapiRichText({ content, className }: StrapiRichTextProps) {
  if (!content || content.length === 0) {
    return null;
  }

  return (
    <div className={className}>
      <BlocksRenderer
        content={content}
        // 🔑 Opcional: Personalización de los componentes de salida
        blocks={{
          // Renderiza párrafos como el elemento <p> estándar
          paragraph: ({ children }) => (
            <p className="mb-4 leading-relaxed">{children}</p>
          ),
          // Renderiza títulos H2 (si los hubieras en el contenido)
          heading: ({ children, level }) => {
            if (level === 2)
              return (
                <h2 className="text-3xl font-semibold mt-8 mb-4">{children}</h2>
              );
            if (level === 3)
              return (
                <h3 className="text-2xl font-medium mt-6 mb-3">{children}</h3>
              );
            // Usa un elemento por defecto si no se especifica
            return React.createElement(
              `h${level}`,
              { className: "mt-6 mb-3" },
              children
            );
          },
          // Añade soporte para listas, citas, imágenes, etc.
          list: ({ children }) => (
            <ul className="list-disc ml-6 space-y-2">{children}</ul>
          ),
          link: ({ children, url }) => (
            <a href={url} className="text-blue-600 hover:underline">
              {children}
            </a>
          ),
          // Puedes añadir lógica para renderizar imágenes, etc.
        }}
        // 🎨 Personalización del formato de texto (negrita, cursiva)
        modifiers={{
          bold: ({ children }) => <strong>{children}</strong>,
          italic: ({ children }) => <em>{children}</em>,
        }}
      />
    </div>
  );
}
