import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import FerrariLogo from "./FerrariLogo";
import { IconoCerrar, IconoMenu } from "./Iconos";
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

  useEffect(() => setAbierto(false), [pathname]);

  return (
    <header className="hdr contenedor">
      <Link to="/" className="hdr-logo" aria-label="Ferrari, ir al inicio">
        <FerrariLogo variante="compacto" animar="montaje" titulo="Ferrari" />
      </Link>

      <nav className={`hdr-nav ${abierto ? "is-abierto" : ""}`} aria-label="Principal">
        {SECCIONES.map((s) => (
          <Link key={s.id} to={`/#${s.id}`} onClick={() => setAbierto(false)}>
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
          {abierto ? <IconoCerrar /> : <IconoMenu />}
        </button>
      </div>
    </header>
  );
}
