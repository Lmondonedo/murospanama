// components/sections/Location.tsx (Server Component)

import Link from "next/link";
import Image from "next/image";
import { StrapiUploadFile } from "../types/strapi-dynamic";
import { getImageInfo } from "../utils/imageUtils";
import MapSection from "./MapSection";

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
    <section className="py-24 bg-gradient-to-br from-primary/5 via-white to-secondary/5">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold text-[#133f65] mb-4">
            {title}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="bg-white rounded-2xl shadow-lg p-8 space-y-6">
              <h3 className="text-3xl font-bold text-[#133f65]">{description}</h3>

              {/* Dirección */}
              <div className="flex items-start space-x-4 p-4 bg-secondary/5 rounded-xl">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-7 h-7 text-secondary flex-shrink-0 mt-1"
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
                <div>
                  <p className="text-sm font-semibold text-primary/70 mb-1">Dirección</p>
                  <p className="text-lg font-medium text-[#133f65]">
                    {fullAddress}
                  </p>
                </div>
              </div>

              {/* Horario */}
              <div className="flex items-start space-x-4 p-4 bg-primary/5 rounded-xl">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-7 h-7 text-primary flex-shrink-0 mt-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <div>
                  <p className="text-sm font-semibold text-primary/70 mb-2">Horario de Atención</p>
                  <p className="text-base text-[#133f65]">
                    <span className="font-semibold">Lunes a Viernes:</span> 8:00 AM - 5:00 PM
                  </p>
                  <p className="text-base text-[#133f65]">
                    <span className="font-semibold">Sábados:</span> 8:00 AM - 12:00 PM
                  </p>
                  <p className="text-base text-[#133f65] mt-1">
                    <span className="font-semibold">Domingos:</span> Cerrado
                  </p>
                </div>
              </div>

              {/* Contacto */}
              <div className="flex items-start space-x-4 p-4 bg-secondary/5 rounded-xl">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-7 h-7 text-secondary flex-shrink-0 mt-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-primary/70 mb-2">Contáctanos</p>
                  <div className="space-y-2">
                    <a 
                      href="https://wa.link/kzwr6o"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-lg font-medium text-secondary hover:text-primary transition-colors"
                    >
                      WhatsApp
                    </a>
                    <a 
                      href="tel:+50768256073"
                      className="block md:hidden text-lg font-medium text-secondary hover:text-primary transition-colors"
                    >
                      +507 6825-6073
                    </a>
                    
                  </div>
                </div>
              </div>

              {/* Botón */}
              <a
                href={mapLink}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center px-8 py-4 bg-secondary text-white font-semibold rounded-full hover:bg-primary transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Ver en Google Maps
              </a>
            </div>
          </div>

          {/* Right Content - Map */}
          <div className="lg:sticky lg:top-24">
            <MapSection />
          </div>
        </div>
      </div>
    </section>
  );
}
