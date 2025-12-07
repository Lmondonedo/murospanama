// app/layout.tsx (Refactorizado)

import type { Metadata } from "next";
// Importar la función de fetching de Strapi
import { getGlobalConfig } from "@/app/data/global.queries";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "./components/Navigation";

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

  return {
    // Usar el nombre del sitio cargado de Strapi
    title: {
      default: siteName,
      template: `%s | ${siteName}`,
    },
    // Usar la descripción por defecto de Strapi (si la agregaste al Global Type)
    description:
      "Especialistas en la instalación de cercas de PVC de alta calidad.",
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // 1. Cargar la configuración Global
  const globalConfig = await getGlobalConfig();

  // 2. Extraer el logo (asumiendo que ya está pre-procesado con fullUrl)
  const siteName = globalConfig.siteName || "Muros Panamá";
  const mainLogo = globalConfig.mainLogo;

  //console.log("🌐 Global Config in Layout:", { siteName, mainLogo });

  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* 2. Pasar la data de Servidor (globalConfig) al componente de Cliente (Navigation) */}
        <Navigation siteName={siteName} logo={mainLogo} />

        <main>
          {/* Este es el contenido específico de cada página (About, Home, etc.) */}
          {children}
        </main>
      </body>
    </html>
  );
}
