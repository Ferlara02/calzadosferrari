import { Link } from "react-router-dom";
import FerrariLogo from "./FerrariLogo";
import { SECCIONES } from "./Header";

export default function Footer() {
  return (
    <footer className="contenedor pie">
      <div className="pie-logo">
        <FerrariLogo variante="completo" animar="vista" />
      </div>
      <nav className="pie-nav" aria-label="Pie">
        {SECCIONES.map((s) => (
          <Link key={s.id} to={`/#${s.id}`}>
            {s.label}
          </Link>
        ))}
      </nav>
      <p className="meta pie-lugar">Córdoba, Argentina</p>
    </footer>
  );
}
