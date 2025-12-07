# 📸 Configuración de Imágenes

## Sistema de Archivos (Desarrollo Local)

Strapi guarda las imágenes en:

```
strapi-backend/
└── public/
    └── uploads/
```

Las imágenes se sirven desde:

```
http://localhost:1337/uploads/nombre-imagen.jpg
```

## Configuración Next.js

### Variables de Entorno (`.env.local`)

```env
NEXT_PUBLIC_STRAPI_API_URL=http://localhost:1337/api
```

### Helper de URLs (`app/lib/strapi-media.ts`)

```typescript
export function getStrapiMediaUrl(url?: string | null): string {
  if (!url) return "";
  if (/^https?:\/\//i.test(url)) return url;

  const apiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL || "";
  const base = apiUrl.replace(/\/api\/?$/, "");
  const baseTrim = base.endsWith("/") ? base.slice(0, -1) : base;
  const path = url.startsWith("/") ? url : `/${url}`;
  return `${baseTrim}${path}`;
}
```

### Next.js Config (`next.config.ts`)

```typescript
images: {
  remotePatterns: [
    {
      protocol: "http",
      hostname: "localhost",
      port: "1337",
      pathname: "/uploads/**",
    },
  ];
}
```

## Agregar Imágenes en Strapi

### 1. Content Manager

```
Content Manager → Single Types → About
```

### 2. Subir Imagen

1. Buscar el campo **"image"** (icono 🖼️)
2. Click en "Add new assets"
3. Seleccionar/subir archivo
4. Guardar y publicar

### 3. Verificar

```bash
curl "http://localhost:1337/api/about?populate[details][populate][image_item][populate][image]=*"
```

**Respuesta esperada:**

```json
"image": {
  "id": 1,
  "url": "/uploads/imagen_123abc.jpg",
  "alternativeText": "Descripción",
  "width": 800,
  "height": 600
}
```

## Troubleshooting

### ❌ Imágenes no se muestran

**Causa:** `NEXT_PUBLIC_STRAPI_API_URL` incorrecta

**Solución:**

```env
# ✅ Correcto
NEXT_PUBLIC_STRAPI_API_URL=http://localhost:1337/api

# ❌ Incorrecto
NEXT_PUBLIC_STRAPI_API_URL=http://localhost:1337
```

### ❌ Error 403 (Forbidden)

**Solución:** Configurar permisos en Strapi

```
Settings → Roles → Public
✅ upload → find, findOne
✅ about → find
```

### ❌ Campo image vacío

**Solución:** Verificar que la imagen fue subida correctamente en el Content Manager

## Producción

```typescript
// next.config.ts
{
  protocol: "https",
  hostname: "tu-dominio-strapi.com",
  pathname: "/uploads/**",
}
```

```env
# .env.production
NEXT_PUBLIC_STRAPI_API_URL=https://tu-dominio-strapi.com/api
```

## Providers Alternativos

Para producción, considerar:

- **Cloudinary**
- **AWS S3**
- **DigitalOcean Spaces**

Configurar en:

```
Strapi → Settings → Media Library → Configuration
```
