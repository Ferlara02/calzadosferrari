import useEnPantalla from "../hooks/useEnPantalla";
import { linkWhatsApp, MENSAJES } from "../utils/whatsapp";

const TIRA = "M-20 150 C 180 150, 260 70, 480 80 S 760 120, 800 110";

export default function Cintos() {
  const [ref, visto] = useEnPantalla({ threshold: 0.35 });
  return (
    <section className="sec" aria-labelledby="cintos-titulo">
      <div className="contenedor cintos">
        <div className="pila">
          <h2 id="cintos-titulo" className="titulo h2">
            Cintos de cuero
          </h2>
          <p className="texto texto-2">
            Además de calzado, vendemos cintos de cuero. Consultá modelos, colores y medidas.
          </p>
          <div>
            <a className="btn btn-linea btn-chico" href={linkWhatsApp(MENSAJES.cintos)} target="_blank" rel="noreferrer">
              Consultar por cintos
            </a>
          </div>
        </div>

        {/* El cinto se dibuja y después se cose */}
        <svg ref={ref} className={`cinto ${visto ? "is-visto" : ""}`} viewBox="0 0 900 220" aria-hidden="true">
          <path className="cinto-borde" d={TIRA} pathLength="1" />
          <path className="cinto-cuero" d={TIRA} pathLength="1" />
          <g className="cinto-costura">
            <path d="M-20 137 C 180 137, 258 57, 480 67 S 760 107, 800 97" />
            <path d="M-20 163 C 180 163, 262 83, 480 93 S 760 133, 800 123" />
          </g>
          <g className="cinto-agujeros">
            <circle cx="560" cy="85" r="5" />
            <circle cx="600" cy="90" r="5" />
            <circle cx="640" cy="96" r="5" />
          </g>
          <g className="cinto-hebilla">
            <rect x="794" y="58" width="70" height="104" rx="10" />
            <path d="M830 110 H776" />
          </g>
        </svg>
      </div>
    </section>
  );
}
