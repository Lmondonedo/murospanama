// Tipo base para campos comunes de Strapi v5
export type StrapiBaseFields = {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
};

// Tipo genérico para un ítem devuelto por Strapi v5
export type StrapiItem<T = Record<string, unknown>> = StrapiBaseFields & T;

// Tipo genérico para la respuesta de una lista
export type StrapiResponse<T = Record<string, unknown>> = {
  data: StrapiItem<T>[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
};

// Tipo genérico para respuesta de un solo ítem
export type StrapiSingleResponse<T = Record<string, unknown>> = {
  data: StrapiItem<T>;
  meta: object;
};
