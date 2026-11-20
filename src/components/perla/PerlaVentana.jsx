import { useEffect, useRef, useState } from "react";
import Perla from "./Perla";
import { PERLA } from "../../config/perla";
import { comoLlegarUrl } from "../../config/negocio";

/**
 * Ventana "Conocé a Perla": sus fotos (se pasan deslizando, con flechas o con los puntos)
 * y su historia. En compu es una tarjeta chica centrada; en celular sube desde abajo.
 */
export default function PerlaVentana({ abierta, onCerrar }) {
  const ref = useRef(null);
  const carrusel = useRef(null);
  const [foto, setFoto] = useState(0);
  const total = PERLA.fotos.length;

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (abierta && !d.open) {
      setFoto(0);
      if (carrusel.current) carrusel.current.scrollLeft = 0;
      d.showModal();
      document.documentElement.classList.add("sin-scroll");
    } else if (!abierta && d.open) {
      d.close();
    }
  }, [abierta]);

  const alCerrar = () => {
    document.documentElement.classList.remove("sin-scroll");
    onCerrar();
  };

  const irA = (i) => {
    const n = (i + total) % total;
    const c = carrusel.current;
    if (c) c.scrollTo({ left: n * c.clientWidth, behavior: "smooth" });
    setFoto(n);
  };

  // al deslizar con el dedo, actualiza el punto activo
  const alDeslizar = () => {
    const c = carrusel.current;
    if (!c) return;
    const n = Math.round(c.scrollLeft / c.clientWidth);
    if (n !== foto) setFoto(n);
  };

  const teclas = (e) => {
    if (e.key === "ArrowRight") irA(foto + 1);
    if (e.key === "ArrowLeft") irA(foto - 1);
  };

  return (
    <dialog
      ref={ref}
      className="pv"
      aria-labelledby="pv-titulo"
      onClose={alCerrar}
      onKeyDown={teclas}
      // tocar afuera de la tarjeta la cierra
      onClick={(e) => e.target === e.currentTarget && ref.current.close()}
    >
      <div className="pv-tarjeta">
        <div className="pv-fotos">
          <div ref={carrusel} className="pv-carrusel" onScroll={alDeslizar}>
            {PERLA.fotos.map((f, i) => (
              <img
                key={f.src}
                src={f.src}
                alt={f.alt}
                width="800"
                height="1000"
                loading={i === 0 ? "eager" : "lazy"}
                aria-hidden={i === foto ? undefined : "true"}
              />
            ))}
          </div>
          <button type="button" className="pv-flecha pv-flecha--izq" aria-label="Foto anterior" onClick={() => irA(foto - 1)}>
            <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M15 5 L8 12 L15 19" />
            </svg>
          </button>
          <button type="button" className="pv-flecha pv-flecha--der" aria-label="Foto siguiente" onClick={() => irA(foto + 1)}>
            <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M9 5 L16 12 L9 19" />
            </svg>
          </button>
          <div className="pv-puntos">
            {PERLA.fotos.map((f, i) => (
              <button
                key={f.src}
                type="button"
                className={`pv-punto ${i === foto ? "is-activo" : ""}`}
                aria-label={`Foto ${i + 1} de ${total}`}
                aria-current={i === foto ? "true" : undefined}
                onClick={() => irA(i)}
              />
            ))}
          </div>
        </div>

        <div className="pv-texto">
          <h2 id="pv-titulo" className="titulo pv-titulo">
            Conocé a Perla
          </h2>
          <p className="pv-sub">La gata de la fábrica.</p>
          {PERLA.historia.map((p) => (
            <p key={p} className="texto pv-parrafo">
              {p}
            </p>
          ))}
          <div className="pv-acciones">
            <a className="btn btn-blanco btn-chico" href={comoLlegarUrl()} target="_blank" rel="noreferrer">
              Vení a visitarla
            </a>
          </div>
          <Perla pose="dormida" className="pv-dibujo" />
        </div>

        <button type="button" className="pv-cerrar" aria-label="Cerrar" onClick={() => ref.current.close()}>
          <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M5 5 L19 19 M19 5 L5 19" />
          </svg>
        </button>
      </div>
    </dialog>
  );
}
