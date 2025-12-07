import Hero from "./components/Hero";
import Products from "./components/Products";
import About from "./components/About";
import MissionVision from "./components/MissionVision";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import Location from "./components/Location";
import { getHeroPageData } from "./data/hero.queries";
import { getAboutPageData } from "./data/about.queries";
import { getProductPageData } from "./data/productPage.queries";
import { getProducts } from "./data/products.queries";
import {
  getTestimonialPageData,
  prioritizeTestimonials,
} from "./data/testimonialPage.queries";
import { getLocationPageData } from "./data/location.queries";

export default async function Home() {
  const [
    heroPageData,
    aboutPageData,
    productPageData,
    testimonialPageData,
    locationPageData,
    products,
  ] = await Promise.all([
    getHeroPageData(),
    getAboutPageData(),
    getProductPageData(),
    getTestimonialPageData(),
    getLocationPageData(),
    getProducts(),
  ]);

  const { testimonialPage, testimonials } = testimonialPageData;
  const { title, description, fullAddress, mapLink, map } = locationPageData;
  const finalTestimonials = prioritizeTestimonials(
    testimonials,
    testimonialPage.isRandom
  );

  return (
    <div className="min-h-screen bg-white">
      <Hero heroPageData={heroPageData} />
      <Products productPageData={productPageData} products={products} />
      <About aboutData={aboutPageData} />
      <MissionVision />
      <Testimonials
        testimonialPage={testimonialPage}
        testimonials={finalTestimonials}
      />
      <Contact />
      <Location
        title={title}
        description={description}
        fullAddress={fullAddress}
        mapLink={mapLink}
        map={map}
      />

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {/* Company Info */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-secondary">
                Muros Panamá
              </h3>
              <p className="text-gray-400">
                Especialistas en cercas de PVC de alta calidad. Tu tranquilidad
                es nuestra prioridad.
              </p>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold">Enlaces Rápidos</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a
                    href="#productos"
                    className="hover:text-secondary transition-colors"
                  >
                    Productos
                  </a>
                </li>
                <li>
                  <a
                    href="#nosotros"
                    className="hover:text-secondary transition-colors"
                  >
                    Nosotros
                  </a>
                </li>
                <li>
                  <a
                    href="#mision-vision"
                    className="hover:text-secondary transition-colors"
                  >
                    Misión y Visión
                  </a>
                </li>
                <li>
                  <a
                    href="#testimonios"
                    className="hover:text-secondary transition-colors"
                  >
                    Testimonios
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold">Contacto</h4>
              <div className="space-y-3 text-gray-400">
                <div className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-secondary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  <span>+507 1234-5678</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-secondary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <span>info@murospanama.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-secondary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span>Panamá, República de Panamá</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>
              &copy; {new Date().getFullYear()} Muros Panamá. Todos los derechos
              reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
