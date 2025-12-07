import { About as AboutData } from "@/app/data/about.queries";
import { StrapiRichText } from "./ui/StrapiRichText";
import { getStrapiMediaUrl } from "../lib/strapi-media";
import Image from "next/image";
import { FaStar } from "@react-icons/all-files/fa/FaStar";
import { HiLightBulb } from "@react-icons/all-files/hi/HiLightBulb";

export default function About({ aboutData }: { aboutData: AboutData }) {
  const strapiImage = aboutData?.image;
  const imageFormat =
    strapiImage?.formats?.medium || strapiImage?.formats?.large || strapiImage;
  const imageUrl = getStrapiMediaUrl(imageFormat?.url);
  const imageWidth = imageFormat?.width || 800;
  const imageHeight = imageFormat?.height || 1000;
  const imageAlt = strapiImage?.alternativeText || "Imagen de Muros Panamá";

  return (
    <section
      id="nosotros"
      className="py-24 bg-gradient-to-br from-primary/5 via-white to-secondary/5"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl sm:text-5xl font-bold text-primary">
                {aboutData?.title || "Sobre Muros Panamá"}
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary rounded-full"></div>
            </div>

            {/* Render description from Strapi */}
            {aboutData?.description && (
              <StrapiRichText
                content={aboutData.description}
                className="space-y-6 text-primary/90 text-lg text-justify leading-relaxed"
              />
            )}

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-16">
              {aboutData?.keyStats &&
                aboutData.keyStats.map((stat) => (
                  <div
                    key={stat.id}
                    className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 text-center shadow-sm hover:shadow-md transition-shadow duration-300"
                  >
                    {/* Icono decorativo */}
                    <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                      {stat.label?.toLowerCase().includes("experiencia") ? (
                        <HiLightBulb className="w-15 h-15 text-primary" />
                      ) : (
                        <FaStar className="w-15 h-15 text-primary" />
                      )}
                    </div>

                    {/* El número/texto grande */}
                    <p className="text-4xl md:text-5xl font-bold text-primary mb-3">
                      {stat.value}
                    </p>

                    {/* La descripción */}
                    <p className="text-sm md:text-base text-primary/80 font-medium">
                      {stat.label}
                    </p>
                  </div>
                ))}
            </div>
          </div>

          {/* Right Content - Image */}
          <div className="relative">
            {/* Solo renderizar si tenemos una URL válida */}
            {imageUrl ? (
              <div className="rounded-xl shadow-2xl overflow-hidden transform transition-transform duration-500">
                <Image
                  src={imageUrl}
                  alt={imageAlt} // Accesibilidad/SEO
                  width={imageWidth}
                  height={imageHeight}
                  priority={true} // Performance
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="w-full h-auto object-cover"
                />
              </div>
            ) : (
              // Fallback visual si no hay imagen configurada
              <div className="h-[500px] w-full bg-gray-100 rounded-xl flex items-center justify-center text-gray-500 border border-dashed">
                [Image Placeholder]
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
