# 🎯 Landing Page - Muros Panamá

## Descripción

Landing page moderna y minimalista para Muros Panamá, empresa especializada en instalación de cercas de PVC.

## Características de Diseño

### Paleta de Colores

- **Primarios**: `#133f65` (Azul), `secondary` (Naranja)
- **Neutrales**: Blanco, Grises
- **Tema**: Profesional y limpio

### Tipografía

- Fuentes sans-serif del sistema
- Jerarquía clara de headings
- Textos legibles con espaciado amplio

## Secciones

### 1. Navigation

- Barra fija con scroll suave
- Menú responsive (hamburger en móvil)
- Active state en secciones visibles

### 2. Hero

- Headline impactante
- Dual CTAs (Ver Productos, Solicitar Cotización)
- Indicadores de confianza

### 3. Products (`#productos`)

Cuatro modelos de cercas:

- **Privacidad Total**
- **Estilo Picket**
- **Rancher**
- **Semi-Privacidad**

### 4. About (`#nosotros`)

- Historia de la empresa
- Estadísticas (10+ años, 500+ proyectos)
- Galería dinámica desde Strapi

### 5. Mission & Vision (`#mision-vision`)

- Misión y visión de la empresa
- Valores corporativos

### 6. Testimonials (`#testimonios`)

- Grid en desktop (3 columnas)
- Carrusel en móvil
- Calificaciones 5 estrellas

### 7. Contact (`#contacto`)

- Formulario de contacto
- Información de contacto
- Beneficios destacados

### 8. Footer

- Enlaces rápidos
- Información de contacto
- Copyright

## Stack Técnico

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS v4
- **Language**: TypeScript
- **CMS**: Strapi v5

## Optimizaciones

- Responsive (mobile-first)
- Smooth scrolling
- Efectos hover/transitions
- SEO-ready
- Performance optimizado

## Personalización

### Actualizar Contenido

Los componentes están en `app/components/`:

- `Hero.tsx`
- `Products.tsx`
- `About.tsx`
- `MissionVision.tsx`
- `Testimonials.tsx`
- `Contact.tsx`

### Estilos Globales

`app/globals.css`

- Variables CSS
- Smooth scroll
- Scrollbar personalizado
