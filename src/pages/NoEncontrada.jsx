import { Link } from "react-router-dom";

export default function NoEncontrada() {
  return (
    <div className="contenedor vacio">
      <h1 className="titulo h2">No encontramos esta página.</h1>
      <p className="texto texto-2">Puede que el modelo ya no esté en el catálogo.</p>
      <Link className="btn btn-blanco btn-chico" to="/#catalogo">
        Ver el catálogo
      </Link>
    </div>
  );
}
