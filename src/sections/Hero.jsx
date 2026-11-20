import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MapaIlustrado from "../components/MapaIlustrado";
import { IconoFlechaAbajo } from "../components/Iconos";
import { NEGOCIO } from "../config/negocio";
import Perla, { usePausaFueraDePantalla } from "../components/perla/Perla";

// Globo "¡Hola, soy Perla!": aparece a los `primero` segundos y después cada `cada` segundos, durante `dura`.
const GLOBO = { primero: 2, cada: 12, dura: 5 };

export default function Hero() {
  const [ref, fueraDePantalla] = usePausaFueraDePantalla();
  const [segundos, setSegundos] = useState(0);

  // reloj del globo: corre solo mientras la portada está en pantalla
  useEffect(() => {
    if (fueraDePantalla) return;
    const id = setInterval(() => setSegundos((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, [fueraDePantalla]);

  const desde = segundos - GLOBO.primero;
  const globo = desde >= 0 && desde % GLOBO.cada < GLOBO.dura;

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

        <div className="ubic-caja">
          {/* Perla se asoma por detrás del adelanto al cargar la página. Cada tanto saluda;
              al tocarla lleva a "Dónde estamos", donde ella se presenta. */}
          <Link
            ref={ref}
            to="/#local"
            state={{ perlaSaluda: true }}
            className={`perla-inicio ${fueraDePantalla ? "is-pausada" : ""}`}
            aria-label="Hola, soy Perla, la gata de la fábrica. Vení a conocerme"
          >
            <span className={`perla-inicio-globo ${globo ? "is-visible" : ""}`} aria-hidden="true">
              ¡Hola, soy Perla!
            </span>
            <Perla pose="asomada" />
          </Link>
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
      </div>
    </section>
  );
}
