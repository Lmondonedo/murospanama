// app/data/global.queries.ts

import { graphqlFetch } from "../lib/strapi-graphql.service";
import { StrapiUploadFile } from "../types/strapi-dynamic";
import { GET_LOCATION_PAGE_QUERY } from "./const";

export type LocationPageGraphQLResponse = {
  locationPage: LocationData;
};

type LocationData = {
  title: string;
  description: string;
  fullAddress: string;
  mapLink: string;
  mapCoordinates: {
    latitude: number;
    longitude: number;
  };
  map: StrapiUploadFile | null;
};

export async function getLocationPageData(): Promise<LocationData> {
  const response = await graphqlFetch<LocationPageGraphQLResponse>(
    GET_LOCATION_PAGE_QUERY
  );

  console.log("🚀 GraphQL Response:", JSON.stringify(response, null, 2));
  // Devolvemos los atributos de manera plana y unificada
  return {
    title: response.locationPage.title,
    description: response.locationPage.description,
    fullAddress: response.locationPage.fullAddress,
    mapLink: response.locationPage.mapLink,
    mapCoordinates: response.locationPage.mapCoordinates,
    map: response.locationPage.map
  };
}
