// app/data/global.queries.ts

import { graphqlFetch } from "../lib/strapi-graphql.service";
import { getStrapiMediaUrl } from "../lib/strapi-media";
import { StrapiUploadFile } from "../types/strapi-dynamic";
import { GET_COMPANY_QUERY } from "./const";

export type CompanyDetailsGraphQLResponse = {
  company: CompanyDetails;
};

type Schedule ={
    day: string;
    open: string;
    close: string;
    isOpen: boolean;
}

type ScheduleException = {
  id: string;
  date: string;
  state: string;
  reason: string;
  open: string;
  close: string;
}

type CompanyDetails = {
  name: string;
  instagram: string;
  email: string;
  phone: string;
  telephone: string;
  address: string;
  mapLocation:string;
  schedule: Schedule[];
  scheduleExceptions: ScheduleException[];
  logo: (StrapiUploadFile & { mainLogoUrl: string }) | null;
};

export async function getCompanyDetails(): Promise<CompanyDetails> {
  const response = await graphqlFetch<CompanyDetailsGraphQLResponse>(
    GET_COMPANY_QUERY,
    {}, // No variables needed for this query
    60 // Cache for 60 seconds
  );

  //console.log("🚀 GraphQL Response:", JSON.stringify(response, null, 2));
  // Devolvemos los atributos de manera plana y unificada
  return {
    name: response.company.name,
    instagram: response.company.instagram,
    email: response.company.email,
    phone: response.company.phone,
    telephone: response.company.telephone,
    address: response.company.address,
    mapLocation: response.company.mapLocation,
    schedule: response.company.schedule,
    scheduleExceptions: response.company.scheduleExceptions,
    logo: response.company.logo
      ? {
          ...response.company.logo,
          // Pre-calculamos la URL completa del logo para simplificar el componente
          mainLogoUrl: getStrapiMediaUrl(
            response.company.logo.formats?.thumbnail?.url ||
              response.company.logo.url
          ),
        }
      : null,
    // ... otros campos
  };
}
