import { NEGOCIO } from "../config/negocio";

/** Link a WhatsApp con un mensaje ya escrito. */
export function linkWhatsApp(mensaje = "") {
  const base = `https://wa.me/${NEGOCIO.whatsapp}`;
  return mensaje ? `${base}?text=${encodeURIComponent(mensaje)}` : base;
}

export const MENSAJES = {
  general: "Hola, quería hacer una consulta.",
  talle: "Hola, quería consultar por un modelo o talle que no vi en la web.",
  mayorista:
    "Hola, tengo una tienda y quería pedir una cotización mayorista. Necesito: (modelo, cantidades y talles)",
  reparacion: "Hola, quería consultar por una reparación. Les mando una foto del calzado.",
  cintos: "Hola, quería consultar por los cintos de cuero (modelos, colores y medidas).",
  talle_producto: (nombre, color) =>
    `Hola, quería consultar qué talles tienen del modelo "${nombre}"${color ? ` en color ${color.toLowerCase()}` : ""}.`,
  producto: (nombre, color) =>
    `Hola, quería consultar por el modelo "${nombre}"${color ? ` en color ${color.toLowerCase()}` : ""}.`,
};
