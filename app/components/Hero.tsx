"use client";
import { HeroPageData } from "@/app/data/hero.queries";
import { StrapiRichText } from "./ui/StrapiRichText";
import Image from "next/image";
import { useState, useEffect } from "react";
import { getImageInfo } from "../utils/imageUtils";

export default function Hero({ heroPageData }: { heroPageData: HeroPageData }) {
  // Slider state and logic
  const [currentSlide, setCurrentSlide] = useState(0);

  // Por ahora usaremos imágenes de placeholder, luego podrás agregar múltiples imágenes desde el CMS
  const sliderImages = [
    ...heroPageData.images.map((image) => {
      const imageInfo = getImageInfo(image);
      return {
        url: imageInfo.imageUrl,
        alt: imageInfo.imageAlt || "Cerca de PVC",
        width: imageInfo.imageWidth || 800,
        height: imageInfo.imageHeight || 600,
      };
    }),
  ];

  // Auto-slide functionality
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
    }, 5000); // Cambia cada 5 segundos

    return () => clearInterval(timer);
  }, [sliderImages.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + sliderImages.length) % sliderImages.length
    );
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

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
        <div className="relative lg:h-[600px] h-[400px] rounded-3xl overflow-hidden shadow-2xl group">
          {/* Slider Container */}
          <div className="relative w-full h-full">
            {sliderImages.map((image, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                  index === currentSlide ? "opacity-100" : "opacity-0"
                }`}
              >
                <Image
                  src={image.url}
                  alt={image.alt}
                  width={image.width}
                  height={image.height}
                  priority={index === 0}
                  className="object-cover w-full h-full"
                />
              </div>
            ))}
          </div>

          {/* Navigation Arrows - Hidden on mobile, visible on hover on desktop */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-primary p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hidden md:flex items-center justify-center"
            aria-label="Imagen anterior"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-primary p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hidden md:flex items-center justify-center"
            aria-label="Siguiente imagen"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          {/* Mobile Touch Controls */}
          <div className="absolute inset-0 md:hidden">
            <button
              onClick={prevSlide}
              className="absolute left-0 top-0 w-1/2 h-full z-10"
              aria-label="Imagen anterior"
            />
            <button
              onClick={nextSlide}
              className="absolute right-0 top-0 w-1/2 h-full z-10"
              aria-label="Siguiente imagen"
            />
          </div>

          {/* Dots Indicator */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
            {sliderImages.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? "bg-white shadow-lg"
                    : "bg-white/50 hover:bg-white/80"
                }`}
                aria-label={`Ir a imagen ${index + 1}`}
              />
            ))}
          </div>

          {/* Progress Bar */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/20">
            <div
              className="h-full bg-secondary transition-all duration-300 ease-out"
              style={{
                width: `${((currentSlide + 1) / sliderImages.length) * 100}%`,
              }}
            />
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent"></div>
    </section>
  );
}
