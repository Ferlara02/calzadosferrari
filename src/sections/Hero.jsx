import { Link } from "react-router-dom";
import MapaIlustrado from "../components/MapaIlustrado";
import { IconoFlechaAbajo } from "../components/Iconos";
import { NEGOCIO } from "../config/negocio";

export default function Hero() {
  return (
    <section className="hero">
      {/* Óvalos de fondo: se dibujan al cargar */}
      <svg className="hero-fondo" viewBox="0 0 820 420" aria-hidden="true">
        <ellipse className="hero-ovalo" cx="410" cy="210" rx="400" ry="175" pathLength="1" />
        <ellipse className="hero-ovalo hero-ovalo--hilo" cx="430" cy="226" rx="330" ry="140" />
        <circle className="hero-punto" cx="742" cy="92" r="16" />
      </svg>

      <div className="contenedor hero-grid">
        <div className="hero-texto">
          <h1 className="titulo hero-titulo">Calzado de cuero, hecho en Córdoba.</h1>
          <p className="texto texto-2">
            Elegí tu modelo y compralo por Mercado Libre, o vení a probártelo a la fábrica.
          </p>
        </div>

        <Link to="/#local" className="ubic" aria-label="Dónde estamos: ver mapa, dirección y horarios">
          <div className="ubic-mapa" aria-hidden="true">
            <MapaIlustrado />
          </div>
          <div className="ubic-datos">
            <div className="ubic-textos">
              <span className="titulo ubic-titulo">Dónde estamos</span>
              <span className="meta">
                {NEGOCIO.direccion}, {NEGOCIO.ciudad}
              </span>
            </div>
            <span className="ubic-ir" aria-hidden="true">
              <IconoFlechaAbajo />
            </span>
          </div>
        </Link>
      </div>
    </section>
  );
}
