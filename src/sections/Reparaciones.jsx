import { Link } from "react-router-dom";
import useEnPantalla from "../hooks/useEnPantalla";
import { linkWhatsApp, MENSAJES } from "../utils/whatsapp";
import Perla, { usePausaFueraDePantalla } from "../components/perla/Perla";

const ARREGLOS = ["Suelas despegadas", "Costuras abiertas", "Tacos gastados", "Cierres y abrojos", "Plantillas", "Cuero roto"];

// Rotura en zigzag y sus puntadas en cruz, calculadas una sola vez.
const PUNTOS = (() => {
  const pts = [];
  for (let x = 0, i = 0; x <= 1440; x += 72, i++) {
    pts.push([x, 100 + (i % 2 ? 36 : -36) + (i % 3 === 0 ? 14 : 0)]);
  }
  return pts;
})();
const ROTURA = "M" + PUNTOS.map(([x, y]) => `${x} ${y}`).join(" L");
const CRUCES = PUNTOS.slice(1).map(([x2, y2], i) => {
  const [x1, y1] = PUNTOS[i];
  const mx = (x1 + x2) / 2, my = (y1 + y2) / 2;
  const dx = x2 - x1, dy = y2 - y1, L = Math.hypot(dx, dy);
  const nx = -dy / L, ny = dx / L, tx = dx / L, ty = dy / L, s = 22, t = 9;
  const linea = (g) =>
    `M${(mx + nx * s + tx * t * g).toFixed(1)} ${(my + ny * s + ty * t * g).toFixed(1)} L${(mx - nx * s - tx * t * g).toFixed(1)} ${(my - ny * s - ty * t * g).toFixed(1)}`;
  return `${linea(1)} ${linea(-1)}`;
});

export default function Reparaciones() {
  const [refParches, parchesVistos] = useEnPantalla({ threshold: 0.3 });
  const [refRotura, roturaVista] = useEnPantalla({ threshold: 0.4 });
  const [refPerla, perlaPausada] = usePausaFueraDePantalla();

  return (
    <section id="reparaciones" className="rep" aria-labelledby="rep-titulo">
      <svg className="rep-hilo" viewBox="0 0 720 560" aria-hidden="true">
        <defs>
          <mask id="rep-hilo-mascara" maskUnits="userSpaceOnUse">
            <path className="rep-hilo-avance" d="M700 20 C 520 60, 380 10, 300 120 S 360 330, 200 380 S 20 470, 40 560" pathLength="1" />
          </mask>
        </defs>
        <path
          className="rep-hilo-trazo"
          mask="url(#rep-hilo-mascara)"
          d="M700 20 C 520 60, 380 10, 300 120 S 360 330, 200 380 S 20 470, 40 560"
        />
      </svg>

      <div className="contenedor rep-contenido">
        <div className="rep-grid">
          <div className="pila pila--amplia">
            <h2 id="rep-titulo" className="titulo rep-titulo">
              <span className="rep-abre">¿</span>Se rompió?
              <br />
              Lo cosemos.
            </h2>
            <p className="texto rep-bajada">
              Reparamos todo tipo de roturas, en cualquier calzado, sea o no de nuestra fábrica.
            </p>
            <ul className="arreglos" aria-label="Algunos arreglos que hacemos">
              {ARREGLOS.map((a) => (
                <li key={a}>{a}</li>
              ))}
            </ul>
          </div>

          <div ref={refParches} className={`parches ${parchesVistos ? "is-visto" : ""}`}>
            <div className="parche parche--1">
              <h3 className="titulo parche-titulo">Mandanos una foto</h3>
              <p>Por WhatsApp te decimos cómo lo arreglamos.</p>
              <a className="btn btn-blanco btn-chico" href={linkWhatsApp(MENSAJES.reparacion)} target="_blank" rel="noreferrer">
                Consultar por WhatsApp
              </a>
            </div>
            <div className="parche parche--2">
              <h3 className="titulo parche-titulo">O traelo al local</h3>
              <p>Lo vemos ahí mismo, en la fábrica.</p>
              <Link className="btn btn-linea btn-chico" to="/#local">
                Cómo llegar
              </Link>
            </div>
          </div>
        </div>

        {/* Perla le pega al carretel y el hilo suelto llega hasta la costura */}
        <div ref={refPerla} className={`rep-perla ${perlaPausada ? "is-pausada" : ""}`}>
          <svg className="rep-perla-hilo" viewBox="0 0 260 40" aria-hidden="true">
            <path d="M8 22 C 38 36, 56 10, 88 24 S 134 50, 168 36 S 218 22, 252 40" />
          </svg>
          <Perla pose="sentada" fondo="claro" zarpazo className="rep-perla-gata" />
          <Perla pose="carretel" fondo="claro" className="rep-perla-carretel" />
        </div>
      </div>

      <svg
        ref={refRotura}
        className={`rotura ${roturaVista ? "is-visto" : ""}`}
        viewBox="0 0 1440 200"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <path className="rotura-linea" d={ROTURA} pathLength="1" />
        {CRUCES.map((d, i) => (
          <path key={i} className="rotura-cruz" d={d} style={{ "--n": i }} />
        ))}
      </svg>
    </section>
  );
}
