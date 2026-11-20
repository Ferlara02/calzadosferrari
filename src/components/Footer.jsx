import { Link } from "react-router-dom";
import FerrariLogo from "./FerrariLogo";
import Perla, { usePausaFueraDePantalla } from "./perla/Perla";
import { SECCIONES } from "./Header";
import { NEGOCIO, comoLlegarUrl } from "../config/negocio";
import { linkWhatsApp, MENSAJES } from "../utils/whatsapp";

export default function Footer() {
  const [refPerla, perlaPausada] = usePausaFueraDePantalla();
  return (
    <footer className="pie-barra">
      <div className="contenedor pie">
        <div className="pie-marca">
          <div ref={refPerla} className={`pie-logo ${perlaPausada ? "is-pausada" : ""}`}>
            <Perla pose="dormida" className="pie-perla" />
            <FerrariLogo variante="completo" animar="vista" />
          </div>
          <p className="meta">Calzado de cuero, hecho en Córdoba.</p>
        </div>

        <div className="pie-col">
          <h2 className="pie-titulo">Visitanos</h2>
          <p>
            <a href={comoLlegarUrl()} target="_blank" rel="noreferrer">
              {NEGOCIO.direccion}, {NEGOCIO.ciudad}
            </a>
          </p>
          {NEGOCIO.horario.map((linea) => (
            <p key={linea} className="pie-dato">
              {linea}
            </p>
          ))}
        </div>

        <div className="pie-col">
          <h2 className="pie-titulo">Contacto</h2>
          <p>
            <a href={linkWhatsApp(MENSAJES.general)} target="_blank" rel="noreferrer">
              WhatsApp
            </a>
          </p>
          <p>
            <a href={NEGOCIO.telefonoLink}>{NEGOCIO.telefono}</a>
          </p>
        </div>

        <nav className="pie-col pie-nav" aria-label="Pie">
          <h2 className="pie-titulo">Secciones</h2>
          {SECCIONES.map((s) => (
            <Link key={s.id} to={`/#${s.id}`}>
              {s.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
