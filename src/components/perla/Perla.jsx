import { useEffect, useMemo, useRef, useState } from "react";
import { asomada, caminando, carretel, dormida, ovillo, sentada } from "./dibujo";

const DIBUJOS = { sentada, asomada, dormida, carretel, ovillo, caminando };

/**
 * Pausa las animaciones de lo que está adentro mientras no se ve en pantalla,
 * para no gastar batería moviendo algo que nadie mira.
 */
export function usePausaFueraDePantalla() {
  const ref = useRef(null);
  const [pausada, setPausada] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(([e]) => setPausada(!e.isIntersecting), { rootMargin: "80px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, pausada];
}

/**
 * Un dibujo de Perla (o su carretel). Decorativo: los lectores de pantalla lo saltean.
 * pose: "sentada" | "asomada" | "dormida" | "carretel" | "ovillo" | "caminando"
 * fondo: "claro" | "oscuro" (ajusta el contorno)
 * zarpazo: en "sentada", le pega con la pata a algo que tiene al lado
 */
export default function Perla({ pose = "sentada", fondo = "oscuro", zarpazo = false, className = "" }) {
  const svg = useMemo(() => DIBUJOS[pose](fondo, { zarpazo }), [pose, fondo, zarpazo]);
  return <span className={`perla-caja ${className}`} aria-hidden="true" dangerouslySetInnerHTML={{ __html: svg }} />;
}
