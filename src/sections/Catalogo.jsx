import { useEffect, useMemo, useRef, useState } from "react";
import ProductoCard from "../components/ProductoCard";
import useEnPantalla from "../hooks/useEnPantalla";
import { PRODUCTOS, TIPOS, esDeTipo } from "../data/productos";
import { linkWhatsApp, MENSAJES } from "../utils/whatsapp";

const POR_PAGINA = 12;

export default function Catalogo() {
  const [filtro, setFiltro] = useState("Todos");
  const [visibles, setVisibles] = useState(POR_PAGINA);
  const [refGrilla, vista] = useEnPantalla({ threshold: 0.05 });
  // En celular los filtros se deslizan de costado: un degradé avisa de qué lado hay más
  const refFiltros = useRef(null);
  const [bordes, setBordes] = useState({ izq: false, der: false });
  const medirBordes = () => {
    const el = refFiltros.current;
    if (!el) return;
    const izq = el.scrollLeft > 4;
    const der = el.scrollLeft + el.clientWidth < el.scrollWidth - 4;
    setBordes((b) => (b.izq === izq && b.der === der ? b : { izq, der }));
  };
  useEffect(() => {
    medirBordes();
    window.addEventListener("resize", medirBordes);
    return () => window.removeEventListener("resize", medirBordes);
  }, []);

  // Solo se muestran como filtro los tipos que tienen al menos un producto.
  const filtros = useMemo(
    () => ["Todos", ...TIPOS.filter((t) => PRODUCTOS.some((p) => esDeTipo(p, t)))],
    []
  );
  const lista = filtro === "Todos" ? PRODUCTOS : PRODUCTOS.filter((p) => esDeTipo(p, filtro));
  const mostrados = lista.slice(0, visibles);

  const elegir = (t) => {
    setFiltro(t);
    setVisibles(POR_PAGINA);
  };

  return (
    <div className="capas" id="catalogo">
      <div className="capa-atras" aria-hidden="true" />
      <section className="hoja" aria-labelledby="catalogo-titulo">
        <div className="cat">
          <aside className="cat-side">
            <h2 id="catalogo-titulo" className="titulo cat-titulo">
              Catálogo
            </h2>
            <ul
              ref={refFiltros}
              className={`filtros ${bordes.izq ? "hay-izq" : ""} ${bordes.der ? "hay-der" : ""}`}
              aria-label="Filtrar por tipo"
              onScroll={medirBordes}
            >
              {filtros.map((t) => (
                <li key={t}>
                  <button
                    type="button"
                    className={`filtro ${t === filtro ? "is-activo" : ""}`}
                    aria-pressed={t === filtro}
                    onClick={(e) => {
                      elegir(t);
                      e.currentTarget.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
                    }}
                  >
                    {t}
                  </button>
                </li>
              ))}
            </ul>
            <p className="meta">
              ¿No está tu talle?{" "}
              <a href={linkWhatsApp(MENSAJES.talle)} target="_blank" rel="noreferrer">
                Preguntanos
              </a>
            </p>
          </aside>

          <div>
            <div ref={refGrilla} className={`grilla ${vista ? "is-vista" : ""}`} key={filtro}>
              {mostrados.map((p, i) => (
                <ProductoCard key={p.id} producto={p} indice={i} />
              ))}
              <div className="consulta" style={{ "--n": mostrados.length }}>
                <h3 className="titulo consulta-titulo">¿Buscás otro modelo o talle?</h3>
                <p className="meta">En el local hay más de lo que ves acá. Escribinos y te contamos.</p>
                <a
                  className="btn btn-negro btn-chico"
                  href={linkWhatsApp(MENSAJES.talle)}
                  target="_blank"
                  rel="noreferrer"
                >
                  Escribinos
                </a>
              </div>
            </div>

            <div className="mas">
              <p className="meta" aria-live="polite">
                Mostrando {mostrados.length} de {lista.length} {lista.length === 1 ? "modelo" : "modelos"}
              </p>
              {visibles < lista.length && (
                <button
                  type="button"
                  className="btn btn-blanco btn-chico"
                  onClick={() => setVisibles((v) => v + POR_PAGINA)}
                >
                  Ver más modelos
                </button>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
