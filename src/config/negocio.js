// Datos del negocio: completar acá y se actualizan en todo el sitio.

export const NEGOCIO = {
  nombre: "Ferrari — Fábrica de Calzados",

  // Número de WhatsApp en formato internacional, solo dígitos.
  // Ejemplo para Córdoba: 549351 + número sin el 15 → "5493511234567"
  whatsapp: "5493518001868",

  direccion: "La Cordillera 4536",
  ciudad: "Córdoba",
  // Una línea por renglón
  horario: ["Lunes a viernes de 9 a 12:30 y de 14:30 a 19 h", "Sábados de 9 a 13 h"],
  telefono: "351 800-1868",
  telefonoLink: "tel:+543518001868",

  // Lo que se busca en Google Maps. Con la dirección real queda exacto;
  // también sirve el nombre del local tal como figura en Google Maps.
  mapa: "Fábrica de calzados Ferrari, La Cordillera 4536, X5009EJY Córdoba, Argentina",
};

const q = () => encodeURIComponent(NEGOCIO.mapa);

export const mapaEmbedUrl = () => `https://www.google.com/maps?q=${q()}&z=16&output=embed`;
export const comoLlegarUrl = () => `https://www.google.com/maps/dir/?api=1&destination=${q()}`;
