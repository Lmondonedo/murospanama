"use client";

import { useState, useEffect, type MouseEvent } from "react";
import Image from "next/image"; // Necesitas importar Image para el logo
import { StrapiUploadFile } from "../types/strapi-dynamic";

// Define los tipos de las props que vienen del servidor (adaptados a tu GlobalData)
interface NavigationProps {
  siteName: string;
  // Simplificamos el tipo de logo a lo que necesitas para renderizar
  logo: (StrapiUploadFile & { mainLogoUrl: string }) | null;
}

export default function Navigation({ siteName, logo }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);

  // Click handler to set active section immediately and smooth-scroll
  const handleNavClick =
    (id: string, closeMenu = false) =>
    (e: MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      setActiveId(id);
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      if (closeMenu) setIsMobileMenuOpen(false);
      if (typeof history !== "undefined" && history.replaceState) {
        history.replaceState(null, "", `#${id}`);
      } else if (typeof window !== "undefined") {
        window.location.hash = id;
      }
    };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Observe sections and mark the corresponding nav link as active (bold)
  useEffect(() => {
    const sectionIds = [
      "productos",
      "nosotros",
      "mision-vision",
      "testimonios",
      "contacto",
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0)
          )[0];
        if (visible && visible.target && (visible.target as HTMLElement).id) {
          setActiveId((visible.target as HTMLElement).id);
        }
      },
      {
        root: null,
        threshold: [0.3, 0.5, 0.7],
        rootMargin: "-20% 0px -55% 0px",
      }
    );

    const observed = new Set<Element>();
    const tryObserve = () => {
      sectionIds.forEach((id) => {
        const el = document.getElementById(id);
        if (el && !observed.has(el)) {
          observer.observe(el);
          observed.add(el);
        }
      });
    };

    // Observe any sections currently in the DOM
    tryObserve();

    // Also observe sections that mount later
    const mo = new MutationObserver(() => {
      tryObserve();
    });
    mo.observe(document.body, { childList: true, subtree: true });

    // Set an initial active section on load if one is already in view
    const setInitialActive = () => {
      const candidates = sectionIds
        .map((id) => {
          const el = document.getElementById(id);
          if (!el) return null;
          const rect = el.getBoundingClientRect();
          return { id, rect };
        })
        .filter(Boolean) as { id: string; rect: DOMRect }[];
      if (candidates.length) {
        const viewportCenter = window.innerHeight * 0.4;
        // Pick the section whose top is closest to the viewport center above
        const best = candidates
          .filter((c) => c.rect.top < viewportCenter && c.rect.bottom > 0)
          .sort(
            (a, b) =>
              Math.abs(a.rect.top - viewportCenter) -
              Math.abs(b.rect.top - viewportCenter)
          )[0];
        if (best) setActiveId(best.id);
      }
    };
    // Defer to next frame to allow layout to settle
    requestAnimationFrame(setInitialActive);

    return () => {
      observed.forEach((el) => observer.unobserve(el));
      mo.disconnect();
      observer.disconnect();
    };
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-lg py-4" : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group">
            {logo?.mainLogoUrl ? (
              <div className="flex items-center transition-transform md:scale-150">
                <Image
                  src={logo.mainLogoUrl}
                  alt={logo.alternativeText || siteName}
                  width={100}
                  height={100}
                  priority={true} // Se renderiza en el cliente, pero es el logo
                />
              </div>
            ) : (
              // Opción 2: Fallback (Tu SVG estático + Nombre)
              <>
                <div className="w-10 h-10 bg-gradient-to-br from-[#133f65] to-[#e37329] rounded-lg flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                  {/* Tu SVG */}
                </div>
                <span
                  className={`font-bold text-xl ${
                    isScrolled ? "text-[#133f65]" : "text-[#133f65]"
                  }`}
                >
                  {siteName}
                  {/* Usamos el siteName de la prop en el fallback */}
                </span>
              </>
            )}
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <a
              href="#productos"
              aria-current={activeId === "productos" ? "page" : undefined}
              className={`transition-colors ${
                activeId === "productos" ? "font-bold" : "font-medium"
              } ${
                isScrolled
                  ? "text-[#133f65] hover:text-[#e37329]"
                  : "text-[#133f65] hover:text-[#e37329]"
              }`}
              onClick={handleNavClick("productos")}
            >
              Productos
            </a>
            <a
              href="#nosotros"
              aria-current={activeId === "nosotros" ? "page" : undefined}
              className={`transition-colors ${
                activeId === "nosotros" ? "font-bold" : "font-medium"
              } ${
                isScrolled
                  ? "text-[#133f65] hover:text-[#e37329]"
                  : "text-[#133f65] hover:text-[#e37329]"
              }`}
              onClick={handleNavClick("nosotros")}
            >
              Nosotros
            </a>
            <a
              href="#mision-vision"
              aria-current={activeId === "mision-vision" ? "page" : undefined}
              className={`transition-colors ${
                activeId === "mision-vision" ? "font-bold" : "font-medium"
              } ${
                isScrolled
                  ? "text-[#133f65] hover:text-[#e37329]"
                  : "text-[#133f65] hover:text-[#e37329]"
              }`}
              onClick={handleNavClick("mision-vision")}
            >
              Misión y Visión
            </a>
            <a
              href="#testimonios"
              aria-current={activeId === "testimonios" ? "page" : undefined}
              className={`transition-colors ${
                activeId === "testimonios" ? "font-bold" : "font-medium"
              } ${
                isScrolled
                  ? "text-[#133f65] hover:text-[#e37329]"
                  : "text-[#133f65] hover:text-[#e37329]"
              }`}
              onClick={handleNavClick("testimonios")}
            >
              Testimonios
            </a>
            <a
              href="https://wa.link/kzwr6o"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2.5 bg-[#e37329] text-white font-semibold rounded-full hover:bg-[#133f65] transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Escribenos
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden p-2 rounded-lg ${
              isScrolled ? "text-gray-900" : "text-gray-900"
            }`}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
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
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 py-4 bg-white rounded-2xl shadow-xl border border-gray-100">
            <div className="flex flex-col space-y-4 px-6">
              <a
                href="#productos"
                onClick={handleNavClick("productos", true)}
                aria-current={activeId === "productos" ? "page" : undefined}
                className={`transition-colors py-2 ${
                  activeId === "productos" ? "font-bold" : "font-medium"
                } text-[#133f65] hover:text-[#e37329]`}
              >
                Productos
              </a>
              <a
                href="#nosotros"
                onClick={handleNavClick("nosotros", true)}
                aria-current={activeId === "nosotros" ? "page" : undefined}
                className={`transition-colors py-2 ${
                  activeId === "nosotros" ? "font-bold" : "font-medium"
                } text-[#133f65] hover:text-[#e37329]`}
              >
                Nosotros
              </a>
              <a
                href="#mision-vision"
                onClick={handleNavClick("mision-vision", true)}
                aria-current={activeId === "mision-vision" ? "page" : undefined}
                className={`transition-colors py-2 ${
                  activeId === "mision-vision" ? "font-bold" : "font-medium"
                } text-[#133f65] hover:text-[#e37329]`}
              >
                Misión y Visión
              </a>
              <a
                href="#testimonios"
                onClick={handleNavClick("testimonios", true)}
                aria-current={activeId === "testimonios" ? "page" : undefined}
                className={`transition-colors py-2 ${
                  activeId === "testimonios" ? "font-bold" : "font-medium"
                } text-[#133f65] hover:text-[#e37329]`}
              >
                Testimonios
              </a>
              <a
                href="https://wa.link/kzwr6o"
                target="_blank"
                rel="noopener noreferrer"
                className="text-center px-6 py-3 bg-[#e37329] text-white font-semibold rounded-full hover:bg-[#133f65] transition-all duration-300 shadow-md"
              >
                Contactar
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
