// app/layout.tsx (Refactorizado)

import type { Metadata } from "next";
// Importar la función de fetching de Strapi
import { getGlobalConfig } from "@/app/data/global.queries";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "./components/Navigation";
import { getCompanyDetails } from "./data/company.queries";

// Importar los componentes de layout (asume que los creaste)

// --- Configuración de Fuentes (Tu código original) ---
const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// --- Carga Dinámica de Metadata (SEO) ---
// Usa la función asíncrona generateMetadata para cargar la data global
export async function generateMetadata(): Promise<Metadata> {
  const globalConfig = await getGlobalConfig();
  const siteName = globalConfig.siteName || "Muros Panamá";
  const description = globalConfig.siteDescription ||
    "Especialistas en la instalación de cercas de PVC de alta calidad.";
    
  return {
    // Usar el nombre del sitio cargado de Strapi
    title: {
      default: siteName,
      template: `%s | ${siteName}`,
    },
    // Usar la descripción por defecto de Strapi (si la agregaste al Global Type)
    description: description,
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // 1. Cargar la configuración Global del site
  const globalConfig = await getGlobalConfig();
  const companyDetails = await getCompanyDetails();

  // 2. Extraer el logo (asumiendo que ya está pre-procesado con fullUrl)
  const siteName = globalConfig.siteName || "Muros Panamá";
  const logo = companyDetails.logo;

  //console.log("🌐 Global Config in Layout:", { siteName, logo });

  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* 2. Pasar la data de Servidor (globalConfig) al componente de Cliente (Navigation) */}
        <Navigation siteName={siteName} logo={logo} />

        <main>
          {/* Este es el contenido específico de cada página (About, Home, etc.) */}
          {children}
        </main>
      </body>
    </html>
  );
}
