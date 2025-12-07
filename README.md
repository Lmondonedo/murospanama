# 🏠 Muros Panamá - Sitio Web

Landing page moderna para Muros Panamá, empresa líder en instalación de cercas de PVC en Panamá.

## 🚀 Inicio Rápido

### Instalación

```bash
npm install
```

### Desarrollo

```bash
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000)

### Producción

```bash
npm run build
npm start
```

## 🛠️ Stack Tecnológico

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS v4
- **Language**: TypeScript
- **CMS**: Strapi v5
- **Deployment**: Vercel

## 📁 Estructura del Proyecto

```
mp_site/
├── app/
│   ├── components/       # Componentes React
│   │   ├── strapi/      # Componentes para Strapi
│   │   └── *.tsx        # Componentes de la landing
│   ├── lib/             # Utilidades y servicios
│   ├── types/           # Definiciones TypeScript
│   └── api/             # API Routes
├── docs/                # Documentación
├── public/              # Archivos estáticos
└── package.json
```

## 📚 Documentación

- [Integración con Strapi](./docs/strapi-integration.md)
- [Guía de Populate (Strapi v5)](./docs/strapi-populate-guide.md)
- [Configuración de Imágenes](./docs/images-setup.md)
- [Información de la Landing Page](./docs/landing-page.md)

## ⚙️ Configuración

### Variables de Entorno

Crear `.env.local`:

```env
NEXT_PUBLIC_STRAPI_API_URL=http://localhost:1337/api
STRAPI_API_TOKEN=tu-token-opcional
REVALIDATION_TOKEN=tu-secret-token
```

### Next.js Config

Ver `next.config.ts` para configuración de imágenes remotas.

## 🎨 Características

- ✅ Diseño responsive (mobile-first)
- ✅ Navegación smooth scroll con active states
- ✅ Integración con Strapi CMS
- ✅ Dynamic Zones para contenido flexible
- ✅ Optimización de imágenes con Next.js Image
- ✅ SEO-friendly
- ✅ TypeScript para type-safety

## 🤝 Contribuir

1. Fork el proyecto
2. Crear rama (`git checkout -b feature/AmazingFeature`)
3. Commit cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir Pull Request

## 📄 Licencia

Copyright © 2025 Muros Panamá. Todos los derechos reservados.

## 🔗 Enlaces

- [Documentación de Next.js](https://nextjs.org/docs)
- [Documentación de Strapi](https://docs.strapi.io)
- [Documentación de Tailwind CSS](https://tailwindcss.com/docs)
