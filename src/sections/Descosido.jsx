import { Link } from "react-router-dom";
import { usePausaFueraDePantalla } from "../components/perla/Perla";
import { ovillo, sentada } from "../components/perla/dibujo";

/**
 * Sorpresa al final de la página: Perla está descosiendo el borde de la página.
 * La costura se abre hacia la derecha, las puntadas saltan una por una y el hilo
 * suelto termina en un ovillo con el que ella juega. Lleva a la página perdida.
 */
const ANCHO = 1440;
const arriba = (x) => 74 + 3 * Math.sin(x / 170);
const abajo = (x) => {
  const t = Math.max(0, (x - 520) / (ANCHO - 520));
  return arriba(x) + 4 + 92 * t * t;
};
const f = (n) => n.toFixed(1);
const azar = (n) => {
  const v = Math.sin(n * 91.7) * 43758.5453;
  return v - Math.floor(v);
};

const DESDE_SALTA = 880; // desde acá las puntadas saltan
const DESDE_ROTA = 1150; // desde acá ya están cortadas

function dibujar() {
  let p = "";
  // borde de arriba y abertura (el forro asoma por la costura abierta)
  const xs = Array.from({ length: 37 }, (_, i) => i * 40);
  const bordeArriba = xs.map((x) => `${x} ${f(arriba(x))}`).join(" L");
  const bordeAbajo = [...xs].reverse().map((x) => `${x} ${f(abajo(x))}`).join(" L");
  const abertura = `M${bordeArriba} L${bordeAbajo} Z`;
  p += `<defs><clipPath id="dc-abertura"><path d="${abertura}"/></clipPath></defs>`;
  p += `<path class="dc-forro" d="${abertura}"/>`;
  // trama del forro, solo adentro de la abertura
  p += `<g clip-path="url(#dc-abertura)">`;
  for (let k = -20; k < 60; k++) p += `<path class="dc-trama" d="M${k * 22} 60 l 90 120"/>`;
  p += `</g>`;
  // canto de la tela de abajo, que se separa
  p += `<path class="dc-canto" d="M${xs.map((x) => `${x} ${f(abajo(x))}`).join(" L")}"/>`;
  // pespunte a lo largo de los dos bordes
  p += `<path class="dc-pespunte" d="M${xs.map((x) => `${x} ${f(arriba(x) - 14)}`).join(" L")}"/>`;
  p += `<path class="dc-pespunte" d="M${xs.filter((x) => x <= DESDE_SALTA).map((x) => `${x} ${f(abajo(x) + 14)}`).join(" L")}"/>`;
  // puntadas que cruzan la costura
  let n = 0;
  for (let x = 20; x < ANCHO; x += 44, n++) {
    const a = arriba(x), b = abajo(x);
    if (x < DESDE_SALTA) {
      p += `<path class="dc-puntada" d="M${x - 7} ${f(a - 10)} L${x + 7} ${f(b + 10)}"/>`;
    } else if (x < DESDE_ROTA) {
      const demora = ((DESDE_ROTA - x) / 44) * 0.55;
      p += `<path class="dc-puntada dc-salta" style="animation-delay:${demora.toFixed(2)}s" d="M${x - 7} ${f(a - 10)} L${x + 7} ${f(b + 10)}"/>`;
    } else {
      // cortada: una mitad cuelga del borde de arriba y la otra queda en el de abajo
      const l1 = 14 + azar(n) * 14, l2 = 10 + azar(n + 7) * 12;
      p += `<path class="dc-punta dc-punta--arriba" style="animation-delay:${(azar(n) * 2).toFixed(2)}s" d="M${x - 7} ${f(a - 10)} q 6 ${f(l1 * 0.5)} 2 ${f(l1)}"/>`;
      p += `<path class="dc-punta dc-punta--abajo" style="animation-delay:${(azar(n + 3) * 2).toFixed(2)}s" d="M${x + 7} ${f(b + 10)} q -6 ${f(-l2 * 0.5)} -1 ${f(-l2)}"/>`;
    }
  }
  // hilachas en los bordes abiertos
  for (let i = 0; i < 26; i++) {
    const x = 760 + i * 26 + azar(i) * 12;
    const lado = i % 2 ? arriba(x) + 1 : abajo(x) - 1;
    const dir = i % 2 ? 1 : -1;
    p += `<path class="dc-hilacha" style="animation-delay:${(azar(i + 40) * 3).toFixed(2)}s" d="M${f(x)} ${f(lado)} l ${f(azar(i + 9) * 6 - 3)} ${f(dir * (4 + azar(i + 2) * 7))}"/>`;
  }
  // hilo suelto: sale del frente de la costura y termina en el ovillo de Perla
  p += `<path class="dc-hilo" d="M${DESDE_ROTA - 20} ${f(arriba(DESDE_ROTA - 20) + 6)} C 1190 200, 1240 168, 1236 230 S 1330 312, 1372 270"/>`;
  // Perla sentada, dándole zarpazos al ovillo
  p += sentada("oscuro", { zarpazo: true }).replace("<svg ", '<svg x="1244" y="150" width="134" height="139" ');
  p += ovillo().replace("<svg ", '<svg x="1350" y="244" width="46" height="46" ');
  return p;
}
const DIBUJO = dibujar();

export default function Descosido() {
  const [ref, pausada] = usePausaFueraDePantalla();
  return (
    <section ref={ref} className={`descosido ${pausada ? "is-pausada" : ""}`} aria-labelledby="descosido-titulo">
      <div className="contenedor descosido-texto">
        <h2 id="descosido-titulo" className="titulo descosido-titulo">
          Ups, Perla descoció el final de la página.
        </h2>
        <Link className="descosido-link" to="/se-descosio" rel="nofollow">
          ¿Qué hay más abajo?
        </Link>
      </div>
      <svg
        className="descosido-dibujo"
        viewBox="0 0 1440 300"
        preserveAspectRatio="xMaxYMax slice"
        aria-hidden="true"
        dangerouslySetInnerHTML={{ __html: DIBUJO }}
      />
    </section>
  );
}
