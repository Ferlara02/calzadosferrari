import { COLORES } from "../data/productos";

/** "Marrón oscuro" → "marron-oscuro" (para la URL: /producto/x?color=marron-oscuro) */
export const slugColor = (nombre = "") =>
  nombre
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

/** Color de la muestra; si el nombre no está en COLORES, un gris neutro. */
export const muestraColor = (nombre) => COLORES[nombre] ?? "#8c8c88";

/** Colores del producto con sus fotos. Siempre devuelve al menos una entrada. */
export function variantes(producto) {
  const lista = (producto.colores ?? []).filter((c) => c && Array.isArray(c.fotos));
  if (lista.length) return lista.map((c) => ({ ...c, slug: slugColor(c.nombre) }));
  // Producto sin colores cargados (o con el formato viejo de `fotos`)
  return [{ nombre: "", slug: "", fotos: producto.fotos ?? [] }];
}

/** Todas las fotos del producto (de todos los colores), sin repetir. */
export const todasLasFotos = (producto) => [...new Set(variantes(producto).flatMap((c) => c.fotos))];

/** Fotos para mostrar de un color: las suyas o, si no tiene, todas las del producto. */
export const fotosDeColor = (producto, color) => (color?.fotos?.length ? color.fotos : todasLasFotos(producto));
