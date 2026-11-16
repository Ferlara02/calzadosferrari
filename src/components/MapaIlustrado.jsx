// Mapa dibujado para el adelanto de "Dónde estamos" (el mapa real está en la sección del final).
export default function MapaIlustrado() {
  return (
    <svg viewBox="0 0 640 420" preserveAspectRatio="xMidYMid slice" className="mapa-ilustrado" aria-hidden="true">
      <rect width="640" height="420" fill="#1c1c1a" />
      <g fill="none" stroke="#363733" strokeWidth="14" strokeLinecap="round">
        <path d="M-20 300 L660 180" />
        <path d="M180 -20 L260 440" />
        <path d="M420 -20 C 400 120, 470 260, 440 440" />
      </g>
      <g fill="none" stroke="#2a2a27" strokeWidth="6">
        <path d="M-20 90 L660 60" />
        <path d="M-20 380 L660 330" />
        <path d="M80 -20 L120 440" />
        <path d="M560 -20 L590 440" />
        <path d="M330 -20 L345 440" />
      </g>
      <ellipse className="mapa-anillo" cx="350" cy="210" rx="44" ry="20" fill="none" stroke="#ffffff" strokeWidth="2" />
      <circle cx="350" cy="210" r="7" fill="#c58474" />
    </svg>
  );
}
