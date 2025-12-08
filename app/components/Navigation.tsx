"use client";

import { useState, useEffect, type MouseEvent } from "react";
import Image from "next/image"; // Necesitas importar Image para el logo
import { StrapiUploadFile } from "../types/strapi-dynamic";
import Schedule from "./Schedule";

type ScheduleItem = {
  day: string;
  open: string;
  close: string;
  isOpen: boolean;
};

type ScheduleException = {
  id: string;
  date: string;
  state: string;
  reason: string;
  open: string;
  close: string;
};

// Define los tipos de las props que vienen del servidor (adaptados a tu GlobalData)
interface NavigationProps {
  siteName: string;
  // Simplificamos el tipo de logo a lo que necesitas para renderizar
  logo: (StrapiUploadFile & { mainLogoUrl: string }) | null;
  schedule: ScheduleItem[];
  scheduleExceptions: ScheduleException[];
}

export default function Navigation({ siteName, logo, schedule, scheduleExceptions }: NavigationProps) {
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
              <div className="flex items-center w-32 md:w-48 transition-all">
                <Image
                  className="w-full h-auto"
                  src={logo.mainLogoUrl}
                  alt={logo.alternativeText || siteName}
                  width={500}
                  height={200}
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

          {/* Schedule - Mobile (between logo and burger) */}
          <div className="md:hidden">
            <Schedule schedule={schedule} scheduleExceptions={scheduleExceptions} />
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex flex-col items-end">
              <div className="flex items-center gap-8">
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
                  aria-current={
                    activeId === "mision-vision" ? "page" : undefined
                  }
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
                  aria-current={
                    activeId === "testimonios" ? "page" : undefined
                  }
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
                  className="px-4 py-2 bg-[#25D366] text-white font-medium rounded-full hover:bg-[#128C7E] transition-all duration-300 shadow-md hover:shadow-lg flex items-center gap-1.5"
                >
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                  WhatsApp
                </a>
              </div>
              <div className="mt-2">
                <Schedule schedule={schedule} scheduleExceptions={scheduleExceptions} />
              </div>
            </div>
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
