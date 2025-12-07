"use client";

import { useState } from "react";
import {
  TestimonialPage,
  Testimonials as TestimonialList,
} from "../data/testimonialPage.queries";
import { StrapiRichText } from "./ui/StrapiRichText";
import Image from "next/image";
import { getImageInfo } from "../utils/imageUtils";

export default function Testimonials({
  testimonialPage,
  testimonials,
}: {
  testimonialPage: TestimonialPage;
  testimonials: TestimonialList[];
}) {
  const [activeIndex, setActiveIndex] = useState(0);

  /*
  const testimonials = [
    {
      id: 1,
      name: "María González",
      location: "Ciudad de Panamá",
      role: "Propietaria de vivienda",
      image: "👩‍💼",
      rating: 5,
      text: "Estoy encantada con mi cerca de PVC. El equipo de Muros Panamá fue muy profesional desde el inicio. La instalación fue rápida y el resultado superó mis expectativas. Mi patio ahora tiene total privacidad y se ve hermoso.",
    },
    {
      id: 2,
      name: "Roberto Martínez",
      location: "Coronado",
      role: "Administrador de finca",
      image: "👨‍💼",
      rating: 5,
      text: "Después de años luchando con cercas de madera que requerían mantenimiento constante, decidí cambiar a PVC con Muros Panamá. La mejor decisión que pude tomar. Cero mantenimiento y lucen como nuevas después de dos años.",
    },
    {
      id: 3,
      name: "Ana Lucía Pérez",
      location: "Arraijan",
      role: "Dueña de negocio",
      image: "👩‍🦰",
      rating: 5,
      text: "Contraté a Muros Panamá para cercar mi propiedad comercial. El servicio fue impecable, el precio justo y la calidad excepcional. Mis clientes siempre comentan lo bien que se ve el lugar. ¡Totalmente recomendados!",
    },
    {
      id: 4,
      name: "Roberto Martínez",
      location: "Coronado",
      role: "Administrador de finca",
      image: "👨‍💼",
      rating: 5,
      text: "Después de años luchando con cercas de madera que requerían mantenimiento constante, decidí cambiar a PVC con Muros Panamá. La mejor decisión que pude tomar. Cero mantenimiento y lucen como nuevas después de dos años.",
    },
    {
      id: 5,
      name: "Ana Lucía Pérez",
      location: "Arraijan",
      role: "Dueña de negocio",
      image: "👩‍🦰",
      rating: 5,
      text: "Contraté a Muros Panamá para cercar mi propiedad comercial. El servicio fue impecable, el precio justo y la calidad excepcional. Mis clientes siempre comentan lo bien que se ve el lugar. ¡Totalmente recomendados!",
    },
    {
      id: 6,
      name: "Ana Lucía Pérez",
      location: "Arraijan",
      role: "Dueña de negocio",
      image: "👩‍🦰",
      rating: 5,
      text: "Contraté a Muros Panamá para cercar mi propiedad comercial. El servicio fue impecable, el precio justo y la calidad excepcional. Mis clientes siempre comentan lo bien que se ve el lugar. ¡Totalmente recomendados!",
    },
  ];

  */
  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  return (
    <section
      id="testimonios"
      className="py-24 bg-gradient-to-br from-[#133f65]/5 via-white to-[#e37329]/5"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-4xl sm:text-5xl font-bold text-[#133f65]">
            {testimonialPage.title}
          </h2>
          {/* Render description from Strapi */}
          {testimonialPage?.description && (
            <StrapiRichText
              content={testimonialPage.description}
              className="space-y-6 text-primary/90 text-lg leading-relaxed"
            />
          )}
        </div>

        {/* Desktop Grid View */}
        <div className="hidden md:grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.documentId}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
            >
              {/* Avatar */}
                  <div className="w-50 h-50 rounded-full overflow-hidden flex-shrink-0 mx-auto mb-6">

                {testimonial.avatar ? (
                  <Image
                    src={getImageInfo(testimonial.avatar).imageUrl}
                    alt={
                      getImageInfo(testimonial.avatar).imageAlt ||
                      "Cercas de PVC de Alta Calidad"
                    }
                    width={getImageInfo(testimonial.avatar).imageWidth}
                    height={getImageInfo(testimonial.avatar).imageHeight}
                    priority={true}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  // Placeholder si no hay imagen en el CMS
                  <div className="absolute inset-0 bg-white/50 backdrop-blur-sm flex items-center justify-center">
                    <p className="text-gray-500 text-sm p-8 text-center">
                      [Imagen de cerca de PVC pendiente en CMS]
                    </p>
                  </div>
                )}
              </div>

              {/* Rating */}

              {/* <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div> */}

              {/* Quote */}
              <div className="relative">
                {/* <svg
                  className="absolute -top-2 -left-2 w-8 h-8 text-[#e37329]/20"
                  fill="currentColor"
                  viewBox="0 0 32 32"
                >
                  <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                </svg> */}
                <div className="mb-4">
                  <h3 className="font-bold text-[#133f65] text-lg">
                    {testimonial.authorName}
                  </h3>
                  <p className="text-sm text-[#133f65]/80">
                    {testimonial.titleOrLocation}
                  </p>
                </div>

                {/* Render description from Strapi */}
                {testimonial?.content && (
                  <StrapiRichText
                    content={testimonial.content}
                    className="space-y-6 text-primary/90 text-lg leading-relaxed"
                  />
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Carousel View */}
        <div className="md:hidden">
          <div className="relative bg-white rounded-2xl p-8 shadow-xl border border-gray-100 min-h-[400px]">
            {/* Avatar */}
            <div className="w-60 h-60 rounded-full overflow-hidden flex-shrink-0 mx-auto mb-6">
              {testimonials[activeIndex].avatar ? (
                <Image
                  src={getImageInfo(testimonials[activeIndex].avatar).imageUrl}
                  alt={
                    getImageInfo(testimonials[activeIndex].avatar).imageAlt ||
                    "Cercas de PVC de Alta Calidad"
                  }
                  width={
                    getImageInfo(testimonials[activeIndex].avatar).imageWidth
                  }
                  height={
                    getImageInfo(testimonials[activeIndex].avatar).imageHeight
                  }
                  priority={true}
                  className="object-cover w-full h-full"
                />
              ) : (
                // Placeholder si no hay imagen en el CMS
                <div className="absolute inset-0 bg-white/50 backdrop-blur-sm flex items-center justify-center">
                  <p className="text-gray-500 text-sm p-8 text-center">
                    [Imagen de cerca de PVC pendiente en CMS]
                  </p>
                </div>
              )}
            </div>

            {/* Rating */}
            {/* <div className="flex gap-1 mb-6">
              {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                <svg
                  key={i}
                  className="w-6 h-6 text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div> */}

            {/* Quote */}
            <div className="relative mb-8">
              {/* <svg
                className="absolute -top-2 -left-2 w-10 h-10 text-[#e37329]/20"
                fill="currentColor"
                viewBox="0 0 32 32"
              >
                <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
              </svg> */}

              <div className="mb-4">
                <h3 className="font-bold text-[#133f65] text-xl">
                  {testimonials[activeIndex].authorName}
                </h3>
                <p className="text-sm text-[#133f65]/80">
                  {testimonials[activeIndex].titleOrLocation}
                </p>
              </div>

              {testimonials[activeIndex]?.content && (
                <StrapiRichText
                  content={testimonials[activeIndex].content}
                  className="space-y-6 text-primary/90 text-lg leading-relaxed"
                />
              )}
            </div>

            {/* Navigation Arrows */}
            <div className="flex justify-between items-center">
              <button
                onClick={prevTestimonial}
                className="p-3 rounded-full bg-[#e37329]/20 text-[#e37329] hover:bg-[#e37329] hover:text-white transition-all duration-300 shadow-md"
                aria-label="Previous testimonial"
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

              {/* Dots Indicator */}
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === activeIndex
                        ? "bg-[#e37329] w-8"
                        : "bg-[#133f65]/30 hover:bg-[#133f65]/50"
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={nextTestimonial}
                className="p-3 rounded-full bg-[#e37329]/20 text-[#e37329] hover:bg-[#e37329] hover:text-white transition-all duration-300 shadow-md"
                aria-label="Next testimonial"
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
            </div>
          </div>
        </div>

        {/* Trust Badge */}
        {/* <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-3 bg-white px-8 py-4 rounded-full shadow-lg border border-gray-100">
            <svg
              className="w-8 h-8 text-[#e37329]"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <div className="text-left">
              <div className="font-bold text-[#133f65]">5.0 de 5 estrellas</div>
              <div className="text-sm text-[#133f65]/80">
                Basado en 50+ reseñas
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </section>
  );
}
