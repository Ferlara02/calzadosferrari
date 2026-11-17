// Íconos de línea (1.5px, extremos redondeados), en currentColor.
const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
  focusable: "false",
};

export const IconoChat = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...base}>
    <path d="M20 11.5a8 8 0 0 1-11.6 7.1L4 20l1.4-4.2A8 8 0 1 1 20 11.5z" />
    {/* tubo de teléfono relleno, centrado dentro del globo */}
    <path
      transform="translate(6.6 6.1) scale(0.45)"
      fill="currentColor"
      stroke="none"
      d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"
    />
  </svg>
);

export const IconoFlechaAbajo = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...base}>
    <path d="M12 5v14M6 13l6 6 6-6" />
  </svg>
);

export const IconoFlechaIzq = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...base}>
    <path d="M19 12H5M11 6l-6 6 6 6" />
  </svg>
);

export const IconoExterno = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...base}>
    <path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />
  </svg>
);

export const IconoFlecha = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...base} style={{ flexShrink: 0 }}>
    <path d="M7 17L17 7M8 7h9v9" />
  </svg>
);

export const IconoEscudo = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...base}>
    <path d="M12 3l7 3v5c0 5-3.5 8.5-7 10-3.5-1.5-7-5-7-10V6z" />
  </svg>
);

/**
 * Menú ⇄ cruz en un solo ícono. Las dos líneas están dibujadas en el centro y
 * el CSS (layout.css, .icono-menu) las separa o las gira según el
 * aria-expanded del botón, así la transición es continua.
 */
export const IconoMenuCruz = ({ size = 22 }) => (
  <svg className="icono-menu" width={size} height={size} viewBox="0 0 24 24" {...base}>
    <path className="icono-menu-linea icono-menu-linea--a" d="M4 12h16" />
    <path className="icono-menu-linea icono-menu-linea--b" d="M4 12h16" />
  </svg>
);
