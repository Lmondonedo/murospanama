"use client";
import { HeroPageData } from "@/app/data/hero.queries";
import { StrapiRichText } from "./ui/StrapiRichText";
import ImageSlider from "./ui/ImageSlider";

export default function Hero({ heroPageData }: { heroPageData: HeroPageData }) {

  return (
    <section className="relative bg-gradient-to-br from-white via-secondary/10 to-primary/10 min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-20 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div className="space-y-8 text-center lg:text-left">
          <div className="space-y-4">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-primary leading-tight">
              Cercas de PVC de{" "}
              <span className="text-secondary">Alta Calidad</span>
            </h1>
            <p className="text-xl sm:text-2xl text-primary/80 font-light">
              en Panamá
            </p>
          </div>

          {/* Render description from Strapi */}
          {heroPageData?.description && (
            <StrapiRichText
              content={heroPageData.description}
              className="space-y-6 text-primary/90 text-lg leading-relaxed"
            />
          )}

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <a
              href="#productos"
              className="px-8 py-4 bg-secondary text-white font-semibold rounded-full hover:bg-primary transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Ver Productos
            </a>
            {/* <a
              href="#contacto"
              className="px-8 py-4 bg-white text-secondary font-semibold rounded-full border-2 border-secondary hover:bg-primary/10 transition-all duration-300"
            >
              Solicitar Cotización
            </a> */}
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap gap-6 justify-center lg:justify-start pt-8 text-sm text-primary/80">
            <div className="flex items-center gap-2">
              <svg
                className="w-5 h-5 text-secondary"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Garantía extendida</span>
            </div>
            <div className="flex items-center gap-2">
              <svg
                className="w-5 h-5 text-secondary"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Instalación profesional</span>
            </div>
            <div className="flex items-center gap-2">
              <svg
                className="w-5 h-5 text-secondary"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Sin mantenimiento</span>
            </div>
          </div>
        </div>

        {/* Right Content - Image Slider */}
        <ImageSlider images={heroPageData.images} />
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent"></div>
    </section>
  );
}
