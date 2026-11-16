import useEnPantalla from "../hooks/useEnPantalla";
import { IconoEscudo } from "../components/Iconos";
import { linkWhatsApp, MENSAJES } from "../utils/whatsapp";

const RUBROS = ["Zapatillas", "Zapatos", "Botas", "Sandalias"];

export default function Mayorista() {
  const [ref, visto] = useEnPantalla({ threshold: 0.3 });
  return (
    <section id="mayorista" className="sec sec--sin-arriba" aria-labelledby="mayorista-titulo">
      <div className="contenedor may">
        <div className="pila may-texto">
          <h2 id="mayorista-titulo" className="titulo h2">
            Mayorista
          </h2>
          <p className="texto texto-2">
            ¿Tenés una tienda? Fabricamos calzado a pedido para que lo revendas, incluso modelos que no están en
            nuestro catálogo.
          </p>
          <p className="texto texto-2">
            Contanos qué modelo necesitás, cantidades y talles, y te pasamos precio y plazo.
          </p>
          <div>
            <a className="btn btn-blanco btn-chico" href={linkWhatsApp(MENSAJES.mayorista)} target="_blank" rel="noreferrer">
              Pedí una cotización
            </a>
          </div>
        </div>

        <div>
          <div ref={ref} className={`may-fichas ${visto ? "is-visto" : ""}`}>
            <div className="may-marco" aria-hidden="true" />
            <ul className="fichas">
              {RUBROS.map((r, i) => (
                <li key={r} className="ficha" style={{ "--n": i }}>
                  <h3 className="titulo ficha-titulo">{r}</h3>
                  {r === "Zapatos" && (
                    <span className="seguridad">
                      <IconoEscudo />
                      De seguridad, a medida
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
          <p className="meta may-nota">Todos los modelos se fabrican a pedido, en las cantidades que necesites.</p>
        </div>
      </div>
    </section>
  );
}
