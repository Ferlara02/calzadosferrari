import { Link } from "react-router-dom";
import FotoPendiente from "./FotoPendiente";
import { formatoPrecio } from "../utils/formato";
import { tiposDe } from "../data/productos";
import { fotosDeColor, muestraColor, variantes } from "../utils/colores";

export default function ProductoCard({ producto, indice = 0 }) {
  const colores = variantes(producto);
  const [foto, fotoHover] = fotosDeColor(producto, colores[0]);
  const conColores = colores.filter((c) => c.nombre);
  const carga = indice > 5 ? "lazy" : "eager";

  return (
    <Link to={`/producto/${producto.id}`} className="card" style={{ "--n": indice }}>
      <div className={`card-foto ${fotoHover ? "card-foto--doble" : ""}`}>
        {foto ? (
          <>
            <img src={foto} alt={producto.nombre} loading={carga} width="600" height="800" />
            {/* Segunda foto del primer color: aparece al pasar el mouse */}
            {fotoHover && <img className="card-foto-2" src={fotoHover} alt="" loading="lazy" width="600" height="800" />}
          </>
        ) : (
          <FotoPendiente tipo={tiposDe(producto)[0]} />
        )}
      </div>
      <div className="card-textos">
        <h3 className="titulo card-nombre">{producto.nombre}</h3>
        <p className="meta">{producto.detalle}</p>
      </div>
      <div className="card-pie">
        {conColores.length > 1 && (
          <ul className="card-colores" aria-label={`Disponible en ${conColores.length} colores: ${conColores.map((c) => c.nombre).join(", ")}`}>
            {conColores.slice(0, 5).map((c) => (
              <li key={c.slug} className="muestra muestra--chica" style={{ "--muestra": muestraColor(c.nombre) }} />
            ))}
            {conColores.length > 5 && <li className="card-colores-mas">+{conColores.length - 5}</li>}
          </ul>
        )}
        <p className="precio">{formatoPrecio(producto.precio)}</p>
      </div>
    </Link>
  );
}
