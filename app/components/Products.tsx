import { ProductPageData } from "@/app/data/productPage.queries";
import { Products as ProductsList } from "@/app/data/products.queries";
import { StrapiRichText } from "./ui/StrapiRichText";
import Image from "next/image";
import { getImageInfo } from "../utils/imageUtils";

type ProductPageInfo = {
  productPageData: ProductPageData;
  products: ProductsList[];
};

export default function Products({
  productPageData,
  products,
}: ProductPageInfo) {
  // Metodo para retornar la imagen

  /*
  const strapiImage = aboutData?.image;
  const imageFormat =
    strapiImage?.formats?.medium || strapiImage?.formats?.large || strapiImage;
  const imageUrl = getStrapiMediaUrl(imageFormat?.url);
  const imageWidth = imageFormat?.width || 800;
  const imageHeight = imageFormat?.height || 1000;
  const imageAlt = strapiImage?.alternativeText || "Imagen de Muros Panamá";
*/

  /*
  const products = [
    {
      id: 1,
      name: "Privacidad Total",
      description:
        "Cercas sólidas que ofrecen máxima privacidad y protección. Perfectas para patios y jardines residenciales.",
      features: [
        "Sin espacios",
        "Máxima privacidad",
        "Reducción de ruido",
        "Fácil limpieza",
      ],
      icon: (
        <svg
          className="w-12 h-12"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
          />
        </svg>
      ),
    },
    {
      id: 2,
      name: "Estilo Picket",
      description:
        "Diseño clásico y elegante con espaciado vertical. Ideal para delimitar propiedades con estilo tradicional.",
      features: [
        "Diseño clásico",
        "Ventilación natural",
        "Estética tradicional",
        "Versátil",
      ],
      icon: (
        <svg
          className="w-12 h-12"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
          />
        </svg>
      ),
    },
    {
      id: 3,
      name: "Rancher",
      description:
        "Cercas horizontales modernas y minimalistas. Perfectas para espacios contemporáneos y grandes áreas.",
      features: [
        "Diseño moderno",
        "Vista panorámica",
        "Instalación rápida",
        "Bajo mantenimiento",
      ],
      icon: (
        <svg
          className="w-12 h-12"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
          />
        </svg>
      ),
    },
    {
      id: 4,
      name: "Semi-Privacidad",
      description:
        "Balance perfecto entre privacidad y ventilación. Diseño versátil para diversos entornos.",
      features: [
        "Privacidad parcial",
        "Buena ventilación",
        "Iluminación natural",
        "Decorativo",
      ],
      icon: (
        <svg
          className="w-12 h-12"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      ),
    },
  ];
*/
  return (
    <section id="productos" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-4xl sm:text-5xl font-bold text-[#133f65]">
            {productPageData.title || "Nuestros Productos"}
          </h2>
          {/* Render description from Strapi */}
          {productPageData?.description && (
            <StrapiRichText
              content={productPageData.description}
              className="space-y-6 text-primary/90 text-lg leading-relaxed"
            />
          )}
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {products.map((product) => (
            <div
              key={product.documentId}
              className="group bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border border-gray-100 hover:border-[#e37329]/50 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 flex flex-col"
            >
              {/* Solo renderizar si tenemos una URL válida */}
              {product.images.length > 0 ? (
                <div className="rounded-xl shadow-2xl overflow-hidden transform transition-transform duration-500">
                  <Image
                    src={getImageInfo(product.images[0]).imageUrl}
                    alt={getImageInfo(product.images[0]).imageAlt}
                    width={getImageInfo(product.images[0]).imageWidth}
                    height={getImageInfo(product.images[0]).imageHeight}
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

              {/* Product Name */}
              <h3 className="text-2xl font-bold text-[#133f65] mb-3">
                {product.name}
              </h3>

              {/* Description */}
              <p className="text-[#133f65]/80 mb-6 leading-relaxed">
                {product.shortDescription}
              </p>

              {/* Features */}

              {/* <ul className="space-y-2 mb-6">
                {product.features.map((feature, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-2 text-sm text-[#133f65]"
                  >
                    <svg
                      className="w-4 h-4 text-[#e37329] flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul> */}

              {/* CTA Button */}
              <button className="w-full py-3 bg-secondary text-white font-semibold rounded-lg hover:bg-secondary-hover transition-colors duration-300 mt-auto">
                Más Información
              </button>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="text-[#133f65]/80 mb-4">
            ¿No encuentras lo que buscas?
          </p>
          <a
            href="#contacto"
            className="inline-block px-8 py-4 bg-primary text-white font-semibold rounded-full hover:bg-primary-hover transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Solicita una Cotización Personalizada
          </a>
        </div>
      </div>
    </section>
  );
}
