// components/sections/Location.tsx (Server Component)

import Link from "next/link";
import Image from "next/image";
import { StrapiUploadFile } from "../types/strapi-dynamic";
import { getImageInfo } from "../utils/imageUtils";

interface LocationProps {
  title: string;
  description: string;
  fullAddress: string;
  mapLink: string;
  map: StrapiUploadFile | null;
}

export default function Location({
  title,
  description,
  fullAddress,
  mapLink,
  map,
}: LocationProps) {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
        {/* Section Header */}
        <h2 className="text-4xl sm:text-5xl font-bold text-[#133f65] mb-16">
          {title}
        </h2>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="text-left space-y-6">
            <h3 className="text-3xl font-bold text-[#133f65]">{description}</h3>

            <div className="flex items-center space-x-2 text-gray-600">
              {/* Icono de Ubicación */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-[secondary] flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <p className="text-lg font-medium text-[#133f65]">
                {fullAddress}
              </p>
            </div>

            {/* Button: Get Directions */}
            <Link
              href={mapLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-[secondary] text-white font-semibold rounded-lg hover:bg-[#133f65] transition-all duration-300 shadow-lg mt-4"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
              Get Directions
            </Link>
          </div>

          {/* Right Content - Map Image */}
          <div className="overflow-hidden flex-shrink-0 mx-auto mb-6">
            {map && (
              <Image
                src={getImageInfo(map)?.imageUrl || "/placeholder-map.png"}
                alt="Mapa de la ubicación de la oficina en Panamá"
                width={getImageInfo(map)?.imageWidth || 100}
                height={getImageInfo(map)?.imageHeight || 100}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
