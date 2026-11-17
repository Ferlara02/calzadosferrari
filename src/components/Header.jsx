import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import FerrariLogo from "./FerrariLogo";
import { IconoMenuCruz } from "./Iconos";
import { linkWhatsApp, MENSAJES } from "../utils/whatsapp";

export const SECCIONES = [
  { id: "catalogo", label: "Catálogo" },
  { id: "mayorista", label: "Mayorista" },
  { id: "reparaciones", label: "Reparaciones" },
  { id: "local", label: "Dónde estamos" },
];

export default function Header() {
  const [abierto, setAbierto] = useState(false);
  const { pathname } = useLocation();

  const [oculto, setOculto] = useState(false);
  const [despegado, setDespegado] = useState(false);

  useEffect(() => setAbierto(false), [pathname]);

  useEffect(() => {
    let ultimo = window.scrollY;
    let pendiente = false;
    const medir = () => {
      pendiente = false;
      const y = window.scrollY;
      setDespegado(y > 8);
      // Solo se esconde pasado el inicio y si el gesto fue claro (evita parpadeos)
      if (y < 120) setOculto(false);
      else if (y > ultimo + 6) setOculto(true);
      else if (y < ultimo - 6) setOculto(false);
      ultimo = y;
    };
    const alScrollear = () => {
      if (!pendiente) {
        pendiente = true;
        requestAnimationFrame(medir);
      }
    };
    window.addEventListener("scroll", alScrollear, { passive: true });
    return () => window.removeEventListener("scroll", alScrollear);
  }, []);

  // Avisa a lo que queda pegado arriba (filtros, ficha del producto) si la barra está a la vista
  useEffect(() => {
    document.documentElement.dataset.barra = despegado && (!oculto || abierto) ? "visible" : "oculta";
  }, [oculto, despegado, abierto]);

  const clases = ["hdr-barra", oculto && !abierto ? "is-oculto" : "", despegado ? "is-despegado" : ""].join(" ");

  return (
    <div className={clases}>
      <header className="hdr contenedor">
        <Link to="/" className="hdr-logo" aria-label="Ferrari, ir al inicio">
          <FerrariLogo variante="compacto" animar="montaje" titulo="Ferrari" />
        </Link>

        <nav className={`hdr-nav ${abierto ? "is-abierto" : ""}`} aria-label="Principal">
          {SECCIONES.map((s, i) => (
            <Link key={s.id} to={`/#${s.id}`} onClick={() => setAbierto(false)} style={{ "--i": i }}>
              {s.label}
            </Link>
          ))}
        </nav>

        <div className="hdr-acciones">
          <a className="btn btn-linea btn-chico" href={linkWhatsApp(MENSAJES.general)} target="_blank" rel="noreferrer">
            Escribinos
          </a>
          <button
            type="button"
            className="hdr-menu"
            aria-expanded={abierto}
            aria-label={abierto ? "Cerrar menú" : "Abrir menú"}
            onClick={() => setAbierto((v) => !v)}
          >
            <IconoMenuCruz />
          </button>
        </div>
      </header>
    </div>
  );
}
