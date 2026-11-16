import useEnPantalla from "../hooks/useEnPantalla";
import {
  VIEWBOX,
  VIEWBOX_WORDMARK,
  OVALO_SUPERIOR,
  OVALO_INFERIOR,
  OVALO,
  LETRAS,
  BAJADA,
} from "./logoPaths";
import "./FerrariLogo.css";

/**
 * Logo de Ferrari — Fábrica de Calzados, en currentColor.
 *
 * @param {"completo"|"compacto"|"wordmark"} variante
 *   completo: óvalo + Ferrari + bajada (desde 280px de ancho).
 *   compacto: óvalo + Ferrari, sin bajada (para el header).
 *   wordmark: solo "Ferrari".
 * @param {false|"montaje"|"vista"} animar  Sin animación, al montar o al entrar en pantalla.
 */
export default function FerrariLogo({
  variante = "completo",
  animar = false,
  className = "",
  titulo = "Ferrari, Fábrica de Calzados",
  ...props
}) {
  const [ref, visto] = useEnPantalla({ threshold: 0.4 });
  const activo = animar === "montaje" || (animar === "vista" && visto);
  const estado = !animar ? "" : activo ? "fl--anim" : "fl--espera";

  const conOvalo = variante !== "wordmark";
  const conBajada = variante === "completo";
  const centro = (BAJADA.length - 1) / 2;
  const transformLetras =
    variante === "compacto" ? "translate(280 125) scale(0.97) translate(-269.5 -115.9)" : undefined;

  return (
    <svg
      ref={ref}
      viewBox={conOvalo ? VIEWBOX : VIEWBOX_WORDMARK}
      className={`fl ${estado} ${className}`}
      role="img"
      aria-label={titulo}
      {...props}
    >
      <g fill="currentColor">
        {conOvalo && (
          <g
            fill="none"
            stroke="currentColor"
            strokeWidth={variante === "compacto" ? OVALO.strokeWidth * 1.25 : OVALO.strokeWidth}
          >
            <path className="fl-ovalo" d={OVALO_SUPERIOR} pathLength="1" />
            <path className="fl-ovalo" d={OVALO_INFERIOR} pathLength="1" />
          </g>
        )}
        <g transform={transformLetras}>
          {LETRAS.map((l, i) => (
            <path
              key={l.id}
              d={l.d}
              className={l.id === "i-dot" ? "fl-punto" : "fl-letra"}
              style={{ "--i": i }}
            />
          ))}
        </g>
        {conBajada &&
          BAJADA.map((l, i) => (
            <path key={i} d={l.d} className="fl-bajada" style={{ "--d": i - centro }} />
          ))}
      </g>
    </svg>
  );
}
