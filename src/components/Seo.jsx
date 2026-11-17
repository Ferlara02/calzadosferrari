import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { SITIO_URL, absoluta, seoDe } from "../config/seo";

function meta(atributo, clave, valor) {
  let el = document.head.querySelector(`meta[${atributo}="${clave}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(atributo, clave);
    document.head.appendChild(el);
  }
  el.setAttribute("content", valor);
}

/** Al navegar dentro del sitio, actualiza título, descripción y datos para compartir. */
export default function Seo() {
  const { pathname } = useLocation();
  useEffect(() => {
    const s = seoDe(pathname);
    document.title = s.titulo;
    meta("name", "description", s.descripcion);
    meta("property", "og:title", s.titulo);
    meta("property", "og:description", s.descripcion);
    meta("property", "og:type", s.tipo);
    meta("property", "og:image", absoluta(s.imagen));
    meta("name", "robots", s.noindex ? "noindex" : "index, follow");
    if (SITIO_URL) {
      meta("property", "og:url", SITIO_URL + s.ruta);
      let can = document.head.querySelector('link[rel="canonical"]');
      if (!can) {
        can = document.createElement("link");
        can.rel = "canonical";
        document.head.appendChild(can);
      }
      can.href = SITIO_URL + s.ruta;
    }
  }, [pathname]);
  return null;
}
