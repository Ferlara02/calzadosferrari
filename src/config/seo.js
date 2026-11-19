// SEO: títulos, descripciones, imagen para compartir y datos para Google de cada página.
// Lo usan el navegador (al cambiar de página) y el armado de páginas fijas (scripts/prerender.mjs).
import { NEGOCIO } from "./negocio";
import { PRODUCTOS, buscarProducto, tiposDe } from "../data/productos";
import { todasLasFotos } from "../utils/colores";

// Dirección pública del sitio, sin barra al final. Completar cuando esté el dominio,
// ej. "https://calzadosferrari.com.ar". Con eso se generan solos el sitemap, las
// direcciones canónicas y los links absolutos de las imágenes para compartir.
// También se puede cargar como variable de entorno SITIO_URL en Cloudflare Pages.
export const SITIO_URL = "https://calzadosferrari.com.ar";

const MARCA = "Ferrari Calzados";

export const SEO_INICIO = {
  titulo: "Ferrari — Fábrica de calzado de cuero en Córdoba",
  descripcion:
    "Fábrica de calzado de cuero en Córdoba: escolares, zapatos de vestir, mocasines, zapatillas, sandalias y cintos. Venta mayorista a pedido y reparación de calzado.",
  imagen: "/og.jpg",
};

const recortar = (texto, max = 158) => {
  if (texto.length <= max) return texto;
  const corte = texto.slice(0, max - 1);
  return corte.slice(0, corte.lastIndexOf(" ")) + "…";
};

const absoluta = (ruta, base = SITIO_URL) => (base ? base.replace(/\/$/, "") + ruta : ruta);

function datosNegocio(base) {
  return {
    "@context": "https://schema.org",
    "@type": "ShoeStore",
    name: NEGOCIO.nombre,
    description: SEO_INICIO.descripcion,
    image: absoluta("/og.jpg", base),
    logo: absoluta("/logos/ferrari-logo-negro.svg", base),
    ...(base ? { url: base + "/" } : {}),
    telephone: "+54 351 800-1868",
    address: {
      "@type": "PostalAddress",
      streetAddress: NEGOCIO.direccion,
      addressLocality: "Córdoba",
      addressRegion: "Córdoba",
      postalCode: "X5009EJY",
      addressCountry: "AR",
    },
    hasMap: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(NEGOCIO.mapa)}`,
    openingHoursSpecification: [
      { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "09:00", closes: "12:30" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "14:30", closes: "19:00" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "09:00", closes: "13:00" },
    ],
    makesOffer: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Reparación de calzado" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Fabricación de calzado para mayoristas" } },
    ],
  };
}

function datosProducto(p, base) {
  const fotos = todasLasFotos(p).map((f) => absoluta(f, base));
  const datos = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.nombre,
    description: p.descripcion,
    image: fotos,
    brand: { "@type": "Brand", name: "Ferrari" },
    category: tiposDe(p).join(", "),
    material: "Cuero",
  };
  // Google solo muestra la ficha de producto si tiene precio
  if (p.precio) {
    datos.offers = {
      "@type": "Offer",
      price: p.precio,
      priceCurrency: "ARS",
      availability: "https://schema.org/InStock",
      ...(base ? { url: `${base}/producto/${p.id}` } : {}),
    };
  }
  return datos;
}

/** Todo lo que va en el <head> de una página. */
export function seoDe(pathname, base = SITIO_URL) {
  if (pathname === "/" || pathname === "") {
    return { ...SEO_INICIO, ruta: "/", tipo: "website", jsonld: [datosNegocio(base)] };
  }
  const m = pathname.match(/^\/producto\/([^/]+)\/?$/);
  const p = m && buscarProducto(decodeURIComponent(m[1]));
  if (p) {
    const talles = p.talles?.length ? ` Talles del ${p.talles[0]} al ${p.talles[p.talles.length - 1]}.` : "";
    const colores = p.colores.filter((c) => c.nombre).map((c) => c.nombre.toLowerCase());
    const enColores = colores.length > 1 ? ` En ${colores.slice(0, -1).join(", ")} y ${colores.at(-1)}.` : "";
    return {
      titulo: `${p.nombre} — ${MARCA}, Córdoba`,
      descripcion: recortar(`${p.descripcion}${enColores}${talles} Fábrica de calzado Ferrari, Córdoba.`),
      imagen: todasLasFotos(p)[0] ?? SEO_INICIO.imagen,
      ruta: `/producto/${p.id}`,
      tipo: "product",
      jsonld: [datosProducto(p, base)],
    };
  }
  return {
    titulo: `Página no encontrada — ${MARCA}`,
    descripcion: SEO_INICIO.descripcion,
    imagen: SEO_INICIO.imagen,
    ruta: pathname,
    tipo: "website",
    noindex: true,
    jsonld: [],
  };
}

export const RUTAS = ["/", ...PRODUCTOS.map((p) => `/producto/${p.id}`)];
export { absoluta };
