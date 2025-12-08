"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { getImageInfo } from "@/app/utils/imageUtils";
import { StrapiUploadFile } from "@/app/types/strapi-dynamic";

interface ImageSliderProps {
  images: StrapiUploadFile[];
  className?: string;
  autoSlideInterval?: number; // en milisegundos, default 5000
  showControls?: boolean; // mostrar controles de navegación
  showDots?: boolean; // mostrar indicadores de puntos
  showProgressBar?: boolean; // mostrar barra de progreso
}

export default function ImageSlider({
  images,
  className = "relative lg:h-[600px] h-[400px] rounded-3xl overflow-hidden shadow-2xl group",
  autoSlideInterval = 5000,
  showControls = true,
  showDots = true,
  showProgressBar = true,
}: ImageSliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Convertir imágenes de Strapi a formato del slider
  const sliderImages = images.map((image) => {
    const imageInfo = getImageInfo(image);
    return {
      url: imageInfo.imageUrl,
      alt: imageInfo.imageAlt || "Imagen",
      width: imageInfo.imageWidth || 800,
      height: imageInfo.imageHeight || 600,
    };
  });

  const isMultipleImages = sliderImages.length > 1;

  // Auto-slide functionality solo si hay múltiples imágenes
  useEffect(() => {
    if (!isMultipleImages) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
    }, autoSlideInterval);

    return () => clearInterval(timer);
  }, [sliderImages.length, autoSlideInterval, isMultipleImages]);

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

  // Si no hay imágenes, no renderizar nada
  if (sliderImages.length === 0) {
    return null;
  }

  // Si solo hay una imagen, mostrar imagen simple sin controles
  if (!isMultipleImages) {
    const singleImage = sliderImages[0];
    return (
      <div className={className}>
        <Image
          src={singleImage.url}
          alt={singleImage.alt}
          width={singleImage.width}
          height={singleImage.height}
          priority
          className="object-cover w-full h-full"
        />
      </div>
    );
  }

  // Slider completo con múltiples imágenes
  return (
    <div className={className}>
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

      {/* Navigation Controls */}
      {showControls && (
        <>
          {/* Desktop Navigation Arrows */}
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
        </>
      )}

      {/* Dots Indicator */}
      {showDots && (
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
      )}

      {/* Progress Bar */}
      {showProgressBar && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/20">
          <div
            className="h-full bg-secondary transition-all duration-300 ease-out"
            style={{
              width: `${((currentSlide + 1) / sliderImages.length) * 100}%`,
            }}
          />
        </div>
      )}
    </div>
  );
}
