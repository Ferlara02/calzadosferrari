// Catálogo hardcodeado.
//
// Cada producto:
// - id: único, en minúsculas y con guiones (se usa en la URL: /producto/<id>)
// - tipo: uno de TIPOS (abajo); es el filtro del catálogo. Para que aparezca en más de un
//   filtro, una lista: tipo: ["Escolares", "Zapatillas"] (el primero es el principal)
// - detalle: línea corta que va debajo del nombre en la grilla
// - descripcion: texto del detalle
// - talles: lista de números, ej. [39, 40, 41]; vacía = muestra "Consultar por talle"
// - precio: número sin puntos (89900) o null para mostrar "Consultá el precio"
// - mercadoLibre: link a la publicación; vacío = solo aparece "Consultar por WhatsApp"
// - colores: una entrada por color, cada una con sus fotos (la primera es la principal).
//     { nombre: "Negro", fotos: ["/productos/modelo-negro-1.webp", "/productos/modelo-negro-2.webp"] }
//   Con un solo color no aparece el selector. Si un color tiene su propia publicación
//   en Mercado Libre, se puede agregar mercadoLibre dentro del color.
//   El nombre del color tiene que estar en COLORES (abajo) para que se vea su muestra.
//
// Fotos: van en public/productos/. Verticales 3:4 (ej. 1200×1600), .webp o .jpg, sin espacios ni tildes.
// Mientras un color no tenga fotos se muestra "Foto próximamente".
// Nombres sugeridos: <id>-<color>-1.webp, <id>-<color>-2.webp… (ej. mocasines-negro-1.webp)

export const TIPOS = ["Escolares", "Vestir", "Mocasines", "Zapatillas", "Sandalias", "Cintos"];

// Color de la muestra (el circulito del selector) para cada nombre de color.
export const COLORES = {
  Negro: "#000000",
  Marrón: "#5a3726",
  Blanco: "#ffffff",
  Gris: "#8c8c88",
  Chocolate: "#3d2418",
  Suela: "#a1643f",
  Habano: "#8a5634",
  Camel: "#b8875a",
  Natural: "#d9c3a0",
  Bordó: "#5c1f24",
  Azul: "#1f2f4d",
  Verde: "#3a4a33",
};

const rango = (desde, hasta) => Array.from({ length: hasta - desde + 1 }, (_, i) => desde + i);

export const PRODUCTOS = [
  // ── Escolares ─────────────────────────────────────────
  {
    id: "guillerminas-escolares",
    nombre: "Guillerminas escolares",
    tipo: "Escolares",
    detalle: "Cuero",
    descripcion: "Guillerminas escolares hechas en cuero.",
    talles: rango(27, 38),
    precio: null,
    mercadoLibre: "https://www.mercadolibre.com.ar/zapato-escolar-ferrari-guillermina-nina-cuero/up/MLAU5237967813?pdp_filters=item_id%3AMLA3981540114",
    colores: [
      { nombre: "Negro", fotos: ["/productos/guillerminas-escolares-negro-1.webp"] },
      { nombre: "Marrón", fotos: ["/productos/guillerminas-escolares-marron-1.webp", "/productos/guillerminas-escolares-marron-2.webp"] },
    ],
  },
  {
    id: "colegial-cuero",
    nombre: "Colegial de cuero",
    tipo: "Escolares",
    detalle: "Cuero, con abrojo o cordón",
    descripcion: "Colegial hecho en cuero. Se puede pedir con abrojo o con cordón.",
    talles: rango(27, 34),
    precio: null,
    mercadoLibre: "",
    colores: [
      { nombre: "Marrón", fotos: ["/productos/colegial-cuero-1.webp"] },
      { nombre: "Negro", fotos: ["/productos/colegial-cuero-1.webp"] },
    ],
  },
  {
    id: "nauticos-escolares",
    nombre: "Náuticos escolares",
    tipo: "Escolares",
    detalle: "Cuero, goma pegada y cosida",
    descripcion: "Náuticos hechos en cuero con goma pegada y cosida. Para todo el año escolar.",
    talles: rango(34, 45),
    precio: null,
    mercadoLibre: "https://articulo.mercadolibre.com.ar/MLA-1182257635-zapato-nautico-escolar-ferrari-para-hombre-y-mujer-_JM",
    colores: [
      { nombre: "Negro", fotos: ["/productos/nauticos-escolares-negro-1.webp", "/productos/nauticos-escolares-negro-2.webp"] },
      { nombre: "Marrón", fotos: ["/productos/nauticos-escolares-marron-1.webp", "/productos/nauticos-escolares-marron-2.webp", "/productos/nauticos-escolares-marron-3.webp"] },
    ],
  },

  {
    id: "zapatillas-escolares-blancas",
    nombre: "Zapatillas escolares de cuero",
    tipo: ["Escolares", "Zapatillas"],
    detalle: "Cuero blanco",
    descripcion: "Zapatillas escolares de cuero blanco.",
    talles: rango(34, 38),
    precio: null,
    mercadoLibre: "https://www.mercadolibre.com.ar/zapatillas-escolares-de-cuero-blancas/up/MLAU4053155734?pdp_filters=item_id%3AMLA3416776908",
    colores: [
      {
        nombre: "Blanco",
        fotos: [
          "/productos/zapatillas-escolares-blanco-1.webp",
          "/productos/zapatillas-escolares-blanco-2.webp",
          "/productos/zapatillas-escolares-blanco-3.webp",
          "/productos/zapatillas-escolares-blanco-4.webp",
        ],
      },
    ],
  },

  // ── Vestir ────────────────────────────────────────────
  {
    id: "zapatos-vestir",
    nombre: "Zapatos de vestir",
    tipo: "Vestir",
    detalle: "Acordonados, forrados, suela de cuero",
    descripcion: "Zapatos acordonados hechos en cuero, forrados y con suela de cuero.",
    talles: [],
    precio: null,
    mercadoLibre: "",
    colores: [{ nombre: "Negro", fotos: ["/productos/zapatos-vestir-negro-1.webp", "/productos/zapatos-vestir-negro-2.webp"] }],
  },
  {
    id: "zapatos-vestir-suela-goma",
    nombre: "Zapatos de vestir con suela de goma",
    tipo: "Vestir",
    detalle: "Cuero, base de goma",
    descripcion: "Zapatos de vestir hechos en cuero con base de goma.",
    talles: [],
    precio: null,
    mercadoLibre: "",
    colores: [
      { nombre: "Marrón", fotos: ["/productos/zapatos-vestir-suela-goma-marron-1.webp"] },
      { nombre: "Negro", fotos: ["/productos/zapatos-vestir-suela-goma-negro-1.webp"] },
    ],
  },

  // ── Mocasines ─────────────────────────────────────────
  {
    id: "mocasines",
    nombre: "Mocasines",
    tipo: "Mocasines",
    detalle: "Cuero, base de goma cosida",
    descripcion: "Mocasines hechos en cuero con base de goma cosida.",
    talles: [],
    precio: null,
    mercadoLibre: "",
    colores: [
      { nombre: "Marrón", fotos: ["/productos/mocasines-marron-1.webp", "/productos/mocasines-marron-2.webp", "/productos/mocasines-marron-3.webp", "/productos/mocasines-marron-4.webp"] },
      { nombre: "Negro", fotos: [] },
    ],
  },

  // ── Zapatillas ────────────────────────────────────────
  {
    id: "zapatillas-cuero",
    nombre: "Zapatillas de cuero",
    tipo: "Zapatillas",
    detalle: "Cuero, base liviana",
    descripcion: "Zapatillas de cuero con base liviana.",
    talles: [],
    precio: null,
    mercadoLibre: "",
    colores: [{ nombre: "Negro", fotos: ["/productos/zapatillas-cuero-negro-1.webp", "/productos/zapatillas-cuero-negro-2.webp"] }],
  },

  // ── Sandalias ─────────────────────────────────────────
  {
    id: "sandalia-franciscana",
    nombre: "Sandalia franciscana",
    tipo: "Sandalias",
    detalle: "Cuero, forrada, base de goma",
    descripcion: "Sandalias franciscanas hechas en cuero, forradas y con base de goma.",
    talles: [],
    precio: null,
    mercadoLibre: "",
    colores: [{ nombre: "Negro", fotos: ["/productos/sandalia-franciscana-negro-1.webp", "/productos/sandalia-franciscana-negro-2.webp", "/productos/sandalia-franciscana-negro-3.webp"] }],
  },

  // ── Cintos ────────────────────────────────────────────
  {
    id: "cinto-cuero",
    nombre: "Cinto de cuero",
    tipo: "Cintos",
    detalle: "Consultá colores y medidas",
    descripcion: "Cinto de cuero con hebilla de metal. Consultanos por colores y medidas disponibles.",
    talles: [],
    textoTalle: "Consultar por medida", // en vez de "Consultar por talle"
    precio: null,
    mercadoLibre: "",
    // Sin nombre de color: la foto muestra varios cintos y no aparece selector
    colores: [{ nombre: "", fotos: ["/productos/cinto-cuero-1.webp"] }],
  },
];

export const buscarProducto = (id) => PRODUCTOS.find((p) => p.id === id);

/** Tipos del producto como lista (acepta tipo: "X" o tipo: ["X", "Y"]). */
export const tiposDe = (producto) => [].concat(producto.tipo);
export const esDeTipo = (producto, tipo) => tiposDe(producto).includes(tipo);
