import { useEffect, useRef, useState } from "react";

/**
 * Devuelve [ref, visto]: `visto` pasa a true la primera vez que el elemento
 * entra en pantalla y ya no vuelve a false (las animaciones corren una vez).
 */
export default function useEnPantalla({ threshold = 0.25, rootMargin = "0px" } = {}) {
  const ref = useRef(null);
  const [visto, setVisto] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || visto) return;
    if (!("IntersectionObserver" in window)) {
      setVisto(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entrada]) => {
        if (entrada.isIntersecting) {
          setVisto(true);
          io.disconnect();
        }
      },
      { threshold, rootMargin }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold, rootMargin, visto]);

  return [ref, visto];
}
