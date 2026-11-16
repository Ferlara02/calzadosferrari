// Ilustración para productos sin foto (por ahora, los cintos).
export default function IlustracionCinto() {
  return (
    <svg viewBox="0 0 300 400" className="ilus-cinto" aria-hidden="true">
      <rect width="300" height="400" fill="#363733" />
      <g transform="rotate(-18 150 200)">
        <rect x="-30" y="176" width="300" height="48" fill="#000000" />
        <path d="M-30 184 H270 M-30 216 H270" stroke="#a8a79f" strokeWidth="1.5" strokeDasharray="6 6" />
        <circle cx="150" cy="200" r="4" fill="#363733" />
        <circle cx="180" cy="200" r="4" fill="#363733" />
        <circle cx="210" cy="200" r="4" fill="#363733" />
        <rect x="250" y="164" width="44" height="72" rx="6" fill="none" stroke="#ffffff" strokeWidth="5" />
        <path d="M272 200 H232" stroke="#ffffff" strokeWidth="5" strokeLinecap="round" />
      </g>
    </svg>
  );
}
