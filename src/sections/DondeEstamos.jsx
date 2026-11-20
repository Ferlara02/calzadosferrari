import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { NEGOCIO, comoLlegarUrl, mapaEmbedUrl } from "../config/negocio";
import Perla, { usePausaFueraDePantalla } from "../components/perla/Perla";
import PerlaVentana from "../components/perla/PerlaVentana";

export default function DondeEstamos() {
  const [ventana, setVentana] = useState(false);
  const [refPerla, perlaPausada] = usePausaFueraDePantalla();
  const [saludando, setSaludando] = useState(false);
  const { state, key } = useLocation();

  // si llegan desde el globo del inicio, Perla los recibe saludando con la pata
  useEffect(() => {
    if (!state?.perlaSaluda) return;
    const empieza = setTimeout(() => setSaludando(true), 700);
    const termina = setTimeout(() => setSaludando(false), 700 + 3000);
    return () => {
      clearTimeout(empieza);
      clearTimeout(termina);
    };
  }, [state, key]);
  return (
    <section id="local" className="sec" aria-labelledby="local-titulo">
      <div className="contenedor">
        <div className="local">
          <button
            ref={refPerla}
            type="button"
            className={`local-perla ${perlaPausada ? "is-pausada" : ""} ${saludando ? "is-saludando" : ""}`}
            aria-haspopup="dialog"
            onClick={() => setVentana(true)}
          >
            <span className="globo">
              <span className="globo-titulo">¡Vení a conocerme!</span>
              <span className="globo-nota">Tocame y te cuento mi historia</span>
            </span>
            <Perla pose="sentada" className="local-perla-gata" />
            <span className="visually-hidden">Conocé a Perla, la gata de la fábrica</span>
          </button>
          <div className="local-info">
            <h2 id="local-titulo" className="titulo local-titulo">
              Dónde estamos
            </h2>
            <p className="texto texto-2">Vení a la fábrica a probarte los modelos o a traer tu calzado para arreglar.</p>
            <dl className="datos">
              <dt>Dirección</dt>
              <dd>
                {NEGOCIO.direccion}, {NEGOCIO.ciudad}
              </dd>
              <dt>Horario</dt>
              <dd>
                {NEGOCIO.horario.map((linea) => (
                  <span key={linea} className="datos-linea">
                    {linea}
                  </span>
                ))}
              </dd>
              <dt>Teléfono</dt>
              <dd>
                <a href={NEGOCIO.telefonoLink}>{NEGOCIO.telefono}</a>
              </dd>
            </dl>
            <div>
              <a className="btn btn-blanco btn-chico" href={comoLlegarUrl()} target="_blank" rel="noreferrer">
                Cómo llegar
              </a>
            </div>
          </div>
          <div className="local-mapa">
            <iframe
              title="Mapa con la ubicación del local en Google Maps"
              src={mapaEmbedUrl()}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </div>
      <PerlaVentana abierta={ventana} onCerrar={() => setVentana(false)} />
    </section>
  );
}
