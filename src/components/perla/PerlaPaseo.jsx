import { useEffect, useRef } from "react";
import Perla from "./Perla";

const VELOCIDAD = 46; // px por segundo

/**
 * Perla chiquita caminando por abajo de una sección: cruza de punta a punta, sale por un
 * costado y vuelve a entrar por el otro. Cada tanto se para a lamerse la pata o a mirar.
 * El paseo se arma con JavaScript (posición y paradas al azar); las patas, con CSS.
 */
export default function PerlaPaseo() {
  const caja = useRef(null);
  const gata = useRef(null);

  useEffect(() => {
    const c = caja.current;
    const g = gata.current;
    if (!c || !g) return;

    // sin animaciones: se queda quieta de un costado
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      g.style.transform = `translateX(${Math.round(c.clientWidth * 0.75)}px)`;
      return;
    }

    let x = -g.offsetWidth - 10;
    let estado = "";
    let hasta = 0;
    let proximaParada = 160 + Math.random() * 320;
    let ultimo = null;
    let raf = null;

    const poner = (e) => {
      estado = e;
      g.classList.toggle("es-camina", e === "camina");
      g.classList.toggle("es-lame", e === "lame");
    };
    poner("camina");

    const paso = (t) => {
      if (ultimo == null) ultimo = t;
      const dt = Math.min(0.05, (t - ultimo) / 1000);
      ultimo = t;
      const ancho = c.clientWidth;

      if (estado === "camina") {
        x += VELOCIDAD * dt;
        proximaParada -= VELOCIDAD * dt;
        if (x > ancho + 10) {
          // salió por la derecha: espera un rato y vuelve a entrar por la izquierda
          x = -g.offsetWidth - 10;
          poner("afuera");
          hasta = t + 1500 + Math.random() * 2500;
          proximaParada = 140 + Math.random() * 340;
        } else if (proximaParada <= 0 && x > 0 && x < ancho - g.offsetWidth) {
          const lame = Math.random() < 0.6;
          poner(lame ? "lame" : "quieta");
          hasta = t + (lame ? 3200 : 1300 + Math.random() * 1200);
          proximaParada = 220 + Math.random() * 420;
        }
      } else if (t >= hasta) {
        poner("camina");
      }

      g.style.transform = `translateX(${x.toFixed(1)}px)`;
      raf = requestAnimationFrame(paso);
    };

    // solo camina mientras la sección se ve
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !raf) {
        ultimo = null;
        raf = requestAnimationFrame(paso);
      } else if (!e.isIntersecting && raf) {
        cancelAnimationFrame(raf);
        raf = null;
      }
    });
    io.observe(c);
    return () => {
      io.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={caja} className="perla-paseo" aria-hidden="true">
      <div ref={gata} className="perla-paseo-gata">
        <Perla pose="caminando" fondo="claro" />
      </div>
    </div>
  );
}
