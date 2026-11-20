import { Link } from "react-router-dom";
import Perla from "../components/perla/Perla";

export default function NoEncontrada() {
  return (
    <div className="contenedor perdida">
      <div className="perdida-texto">
        <h1 className="titulo perdida-titulo">Esta página se perdió.</h1>
        <p className="texto texto-2">
          Perla estuvo jugando con el hilo y se enredó todo. Volvé al catálogo, que ahí está todo en su lugar.
        </p>
        <div>
          <Link className="btn btn-blanco" to="/#catalogo">
            Ver el catálogo
          </Link>
        </div>
      </div>
      <div className="perdida-escena" aria-hidden="true">
        <svg className="perdida-hilo" viewBox="0 0 420 420">
          <path d="M300 392 C 360 410, 400 350, 360 320 S 270 360, 300 392 S 400 404, 392 360 S 330 300, 290 340 S 220 400, 170 396 S 60 380, 30 404" />
          <path className="perdida-hilo-2" d="M330 330 C 350 300, 380 310, 372 340 C 366 362, 330 366, 322 346 C 316 330, 340 316, 352 330" />
        </svg>
        <Perla pose="sentada" zarpazo className="perdida-gata" />
        <Perla pose="carretel" className="perdida-carretel" />
      </div>
    </div>
  );
}
