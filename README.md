# Ferrari — Fábrica de Calzados

Sitio catálogo en React + Vite.

## Cómo correrlo

Necesitás Node.js 20 o más nuevo.

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # genera /dist para subir al hosting
npm run preview    # prueba local del build
```

## Qué completar

| Qué | Dónde |
| --- | --- |
| WhatsApp, dirección, horario, teléfono, búsqueda del mapa | `src/config/negocio.js` |
| Productos (nombre, tipo, fotos, precio, talles, link a Mercado Libre) | `src/data/productos.js` |
| Fotos de producto | `public/productos/` (3:4, 1200×1600 px, WebP) |
| Mensajes que se precargan en WhatsApp | `src/utils/whatsapp.js` |

Los tipos de producto (`TIPOS` en `productos.js`) son los filtros del catálogo; un filtro sin productos no se muestra.

## Estructura

```
src/
  config/negocio.js     datos del negocio
  data/productos.js     catálogo hardcodeado
  components/           logo animado, header, pie, ficha de producto, íconos
  sections/             secciones de la home (hero, catálogo, cintos, mayorista, reparaciones, dónde estamos)
  pages/                Home, detalle de producto (/producto/:id), 404
  styles/               tokens de marca, base, layout, home, producto
public/
  fonts/                TeX Gyre Schola (licencia GUST)
  logos/                logo en SVG (completo, compacto, wordmark, isotipo)
  productos/            fotos
```

## Publicarlo

Usa rutas tipo `/producto/acordonado-vestir-suela`, así que el hosting tiene que devolver `index.html` para cualquier ruta:

- **Netlify**: agregar `public/_redirects` con `/*  /index.html  200`
- **Vercel**: agregar `vercel.json` con `{ "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }`

## Identidad

Colores, tipografías y movimiento salen de la guía de marca (`src/styles/tokens.css`). Las animaciones respetan la preferencia del sistema de reducir movimiento.
