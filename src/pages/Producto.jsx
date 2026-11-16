import { useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import BotonMercadoLibre from "../components/BotonMercadoLibre";
import FotoPendiente from "../components/FotoPendiente";
import ProductoCard from "../components/ProductoCard";
import { IconoFlechaIzq } from "../components/Iconos";
import { PRODUCTOS, buscarProducto, esDeTipo, tiposDe } from "../data/productos";
import { formatoPrecio } from "../utils/formato";
import { fotosDeColor, muestraColor, variantes } from "../utils/colores";
import { linkWhatsApp, MENSAJES } from "../utils/whatsapp";
import NoEncontrada from "./NoEncontrada";

export default function Producto() {
  const { id } = useParams();
  const [params, setParams] = useSearchParams();
  const producto = buscarProducto(id);
  const [fotoActiva, setFotoActiva] = useState(0);

  const colores = producto ? variantes(producto) : [];
  // El color elegido vive en la URL (?color=marron) para poder compartir el link
  const color = colores.find((c) => c.slug === params.get("color")) ?? colores[0];
  // Si el color elegido no tiene fotos propias, se muestran todas las del producto
  const fotos = producto ? fotosDeColor(producto, color) : [];
  const conSelector = colores.filter((c) => c.nombre).length > 1;
  const mercadoLibre = color?.mercadoLibre || producto?.mercadoLibre;

  useEffect(() => {
    if (producto) document.title = `${producto.nombre} — Ferrari Calzados`;
    return () => {
      document.title = "Ferrari — Fábrica de Calzados";
    };
  }, [producto]);

  // Al cambiar de producto o de color, vuelve a la primera foto
  useEffect(() => setFotoActiva(0), [id, color?.slug]);

  if (!producto) return <NoEncontrada />;

  const elegirColor = (c) => {
    const nuevos = new URLSearchParams(params);
    if (c === colores[0]) nuevos.delete("color");
    else nuevos.set("color", c.slug);
    setParams(nuevos, { replace: true, preventScrollReset: true });
  };

  const cambiarFoto = (paso) => setFotoActiva((i) => (i + paso + fotos.length) % fotos.length);

  const otros = [
    ...PRODUCTOS.filter((p) => p.id !== producto.id && tiposDe(producto).some((t) => esDeTipo(p, t))),
    ...PRODUCTOS.filter((p) => p.id !== producto.id && !tiposDe(producto).some((t) => esDeTipo(p, t))),
  ].slice(0, 3);

  return (
    <div className="contenedor prod">
      <Link to="/#catalogo" className="volver">
        <IconoFlechaIzq /> Volver al catálogo
      </Link>

      <article className="prod-grid">
        <div className="prod-galeria">
          <div className="prod-foto">
            {fotos.length ? (
              <img
                key={fotos[fotoActiva]}
                src={fotos[fotoActiva]}
                alt={`${producto.nombre}${color.nombre && color.fotos.length ? `, color ${color.nombre.toLowerCase()}` : ""}, foto ${fotoActiva + 1} de ${fotos.length}`}
                width="1200"
                height="1600"
              />
            ) : (
              <FotoPendiente tipo={tiposDe(producto)[0]} />
            )}
            {fotos.length > 1 && (
              <>
                <button type="button" className="prod-flecha prod-flecha--izq" aria-label="Foto anterior" onClick={() => cambiarFoto(-1)}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M15 5l-7 7 7 7" />
                  </svg>
                </button>
                <button type="button" className="prod-flecha prod-flecha--der" aria-label="Foto siguiente" onClick={() => cambiarFoto(1)}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M9 5l7 7-7 7" />
                  </svg>
                </button>
                <span className="prod-contador" aria-hidden="true">
                  {fotoActiva + 1} / {fotos.length}
                </span>
              </>
            )}
          </div>
          {fotos.length > 1 && (
            <div className="prod-miniaturas" role="group" aria-label="Fotos del producto">
              {fotos.map((f, i) => (
                <button
                  key={f}
                  type="button"
                  className={`prod-mini ${i === fotoActiva ? "is-activa" : ""}`}
                  aria-label={`Ver foto ${i + 1}`}
                  aria-pressed={i === fotoActiva}
                  onClick={() => setFotoActiva(i)}
                >
                  <img src={f} alt="" loading="lazy" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="prod-info">
          <p className="meta">{tiposDe(producto).join(", ")}</p>
          <h1 className="titulo prod-nombre">{producto.nombre}</h1>
          <p className="precio prod-precio">{formatoPrecio(producto.precio)}</p>
          <p className="texto texto-2">{producto.descripcion}</p>

          {conSelector ? (
            <fieldset className="prod-colores">
              <legend className="meta">
                Color: <strong>{color.nombre}</strong>
              </legend>
              <div className="colores">
                {colores.map((c) => (
                  <button
                    key={c.slug}
                    type="button"
                    className={`color ${c === color ? "is-activo" : ""}`}
                    aria-pressed={c === color}
                    onClick={() => elegirColor(c)}
                  >
                    <span className="muestra" style={{ "--muestra": muestraColor(c.nombre) }} aria-hidden="true" />
                    {c.nombre}
                  </button>
                ))}
              </div>
            </fieldset>
          ) : (
            color?.nombre && (
              <p className="meta">
                Color: <strong className="prod-color-unico">{color.nombre}</strong>
              </p>
            )
          )}

          <div className="prod-talles">
            <h2 className="meta">{esDeTipo(producto, "Cintos") ? "Medidas" : "Talles"}</h2>
            {producto.talles.length > 0 ? (
              <ul className="talles">
                {producto.talles.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            ) : (
              <a
                className="talle-consulta"
                href={linkWhatsApp(MENSAJES.talle_producto(producto.nombre, color?.nombre))}
                target="_blank"
                rel="noreferrer"
              >
                {producto.textoTalle ?? "Consultar por talle"}
              </a>
            )}
          </div>

          <div className="prod-acciones">
            {mercadoLibre && <BotonMercadoLibre href={mercadoLibre} />}
            <a
              className={`btn ${mercadoLibre ? "btn-linea" : "btn-blanco"}`}
              href={linkWhatsApp(MENSAJES.producto(producto.nombre, color?.nombre))}
              target="_blank"
              rel="noreferrer"
            >
              Consultar por WhatsApp
            </a>
          </div>
          <p className="meta">
            También podés verlo en el local, en la fábrica de Córdoba. <Link to="/#local">Cómo llegar</Link>
          </p>
        </div>
      </article>

      {otros.length > 0 && (
        <section className="prod-otros" aria-labelledby="otros-titulo">
          <h2 id="otros-titulo" className="titulo h3">
            Otros modelos
          </h2>
          <div className="grilla grilla--otros is-vista">
            {otros.map((p, i) => (
              <ProductoCard key={p.id} producto={p} indice={i} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
