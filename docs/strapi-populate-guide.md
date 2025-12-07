# 📚 Strapi v5 - Guía de Populate

## Sintaxis Correcta para Strapi v5

### Single Type con Dynamic Zone

```
GET /api/about?populate[details][populate]=*
```

### Collection Type con Dynamic Zone

```
GET /api/pages?filters[slug][$eq]=home&populate[blocks][populate]=*
```

### Poblar Campos Específicos Anidados

```
GET /api/about?populate[details][populate][image_item][populate][image]=*
```

### Múltiples Niveles

```
GET /api/about?populate[details][populate][image_item][populate][image][populate]=*
```

## Ejemplos en el Código

### Single Type (About)

```typescript
const response = await fetchStrapiData<AboutData>(
  "about?populate[details][populate]=*"
);
```

### Collection Type con Slug

```typescript
const entry = await getEntryBySlug({
  collection: "pages",
  slug: "home",
  populate: "[blocks][populate]=*",
});
```

## Verificación

### Browser/Postman

```
http://localhost:1337/api/about?populate[details][populate]=*
```

### Con Autenticación

```bash
curl -H "Authorization: Bearer YOUR_TOKEN" \
  "http://localhost:1337/api/about?populate[details][populate]=*"
```

## Documentación Oficial

https://docs.strapi.io/dev-docs/api/rest/populate-select
