import useEnPantalla from "../hooks/useEnPantalla";
import { linkWhatsApp, MENSAJES } from "../utils/whatsapp";

const TIRA = "M-20 150 C 180 150, 260 70, 480 80 S 760 120, 800 110";

export default function Cintos() {
  const [ref, visto] = useEnPantalla({ threshold: 0.35 });
  return (
    <section className="sec sec-cintos tema-blanco" aria-labelledby="cintos-titulo">
      <div className="contenedor cintos">
        <div className="pila">
          <h2 id="cintos-titulo" className="titulo h2">
            Cintos de cuero
          </h2>
          <p className="texto cintos-bajada">
            Además de calzado, vendemos cintos de cuero. Consultá modelos, colores y medidas.
          </p>
          <div>
            <a className="btn btn-negro btn-chico" href={linkWhatsApp(MENSAJES.cintos)} target="_blank" rel="noreferrer">
              Consultar por cintos
            </a>
          </div>
        </div>

        {/* El cinto se dibuja, después se cose y al final se le pone la hebilla */}
        <svg ref={ref} className={`cinto ${visto ? "is-visto" : ""}`} viewBox="0 0 900 220" aria-hidden="true">
          <defs>
            <filter id="cinto-sombra" x="-10%" y="-40%" width="120%" height="180%">
              <feGaussianBlur stdDeviation="7" />
            </filter>
          </defs>
          {/* sombra sobre el fondo blanco */}
          <path className="cinto-sombra" d={TIRA} pathLength="1" filter="url(#cinto-sombra)" />
          {/* cuero: canto negro, cara apenas más clara y un brillo fino */}
          <path className="cinto-cuero" d={TIRA} pathLength="1" />
          <path className="cinto-cara" d={TIRA} pathLength="1" />
          <path className="cinto-brillo" d="M-20 143 C 180 143, 258 63, 480 73 S 760 113, 800 103" pathLength="1" />
          {/* costuras a los dos lados */}
          <g className="cinto-costura">
            <path d="M-20 135 C 180 135, 257 55, 480 65 S 760 105, 800 95" />
            <path d="M-20 165 C 180 165, 263 85, 480 95 S 760 135, 800 125" />
          </g>
          {/* agujeros con su ojalillo */}
          <g className="cinto-agujeros">
            {[
              [575, 86.2],
              [605, 89],
              [635, 92.3],
              [665, 96.2],
            ].map(([x, y]) => (
              <g key={x}>
                <ellipse className="cinto-ojalillo" cx={x} cy={y} rx="7" ry="7.5" />
                <ellipse className="cinto-agujero" cx={x} cy={y} rx="4" ry="4.5" />
              </g>
            ))}
          </g>
          {/* presilla que sujeta la punta */}
          <g className="cinto-presilla" transform="translate(742 108) rotate(8.8)">
            <rect x="-9" y="-31" width="18" height="62" rx="3" />
            <path d="M-4 -26 V26 M4 -26 V26" />
          </g>
          {/* hebilla: marco, pasador y lengüeta */}
          <g className="cinto-hebilla">
            <path className="cinto-doblez" d="M786 86 Q 800 84 806 92 V128 Q 800 136 786 134 Z" />
            <rect className="hebilla-marco" x="800" y="56" width="66" height="108" rx="14" />
            <rect className="hebilla-reflejo" x="800" y="56" width="66" height="108" rx="14" pathLength="100" />
            <path className="hebilla-lengueta" d="M803 110 H848" />
          </g>
        </svg>
      </div>
    </section>
  );
}
