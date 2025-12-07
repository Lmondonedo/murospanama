# 🎨 Integración con Strapi CMS

## Descripción General

Este proyecto utiliza Strapi v5 como CMS headless para gestionar contenido dinámico a través de Dynamic Zones.

## Configuración Inicial

### Variables de Entorno

Crear archivo `.env.local`:

```env
NEXT_PUBLIC_STRAPI_API_URL=http://localhost:1337/api
STRAPI_API_TOKEN=tu-token-de-strapi
REVALIDATION_TOKEN=tu-secret-token
```

### Permisos en Strapi

```
Settings → Users & Permissions → Roles → Public
☑ about → find
☑ upload → find, findOne
```

### Token de API (Opcional)

```
Settings → API Tokens → Create new API Token
Type: Read-only
```

## Estructura de Datos

### Single Type: About

```json
{
  "data": {
    "id": 1,
    "documentId": "xxx",
    "details": [
      {
        "__component": "blocks.galery-slider",
        "id": 1,
        "title": "Galería",
        "autoplay": true,
        "image_item": [
          {
            "id": 1,
            "image": {
              "url": "/uploads/image.jpg",
              "alternativeText": "Descripción"
            }
          }
        ]
      }
    ]
  }
}
```

## Dynamic Zones

### Agregar Nuevos Componentes

1. Crear componente en `app/components/strapi/blocks/`
2. Definir tipos en `app/types/strapi-dynamic.ts`
3. Registrar en `app/components/strapi/block-registry.tsx`
4. Agregar en Strapi Content-Type Builder

## Revalidación

El endpoint `/api/revalidate` permite actualizar el caché cuando el contenido cambia en Strapi.

**Webhook en Strapi:**

```
URL: https://tu-dominio.com/api/revalidate?secret=tu-secret-token
Events: Entry Create, Update, Delete
```

## Troubleshooting

### Datos no se actualizan

- Verificar permisos públicos en Strapi
- Revisar `NEXT_PUBLIC_STRAPI_API_URL`
- Comprobar que el contenido está publicado

### Error 401/403

- Verificar `STRAPI_API_TOKEN`
- Comprobar permisos del rol Public

### Imágenes no se muestran

Ver [Guía de Configuración de Imágenes](./images-setup.md)
