import { Link } from "react-router-dom";

/**
 * Cinta de anuncios con forma de cinto: corre de costado en loop y cada tanto
 * pasa la hebilla abrochada (sin texto). Se frena al tocarla o pasar el mouse.
 * Para cambiar los anuncios, editá esta lista (texto y a qué sección lleva).
 */
const ANUNCIOS = [
  { texto: "¡Escolares para todo el año!", a: "/#catalogo" },
  { texto: "Hacemos reparaciones", a: "/#reparaciones" },
  { texto: "Calzado a medida", a: "/#mayorista" },
  { texto: "Cintos de cuero a buen precio", a: "/#cintos" },
  { texto: "Ventas por mayor", a: "/#mayorista" },
  { texto: "Más de 20 años fabricando", a: "/#catalogo" },
  { texto: "Fábrica en Córdoba", a: "/#local" },
];

// "clara": cinto blanco con detalles en negro · "oscura": cinto negro con detalles en blanco
const TONO = "oscura";

// true: el cinto cruza la portada levemente en diagonal
const INCLINADO = false;

// true: el cuero tiene un brillo arriba y se oscurece abajo, como un cinto con volumen
const VOLUMEN = true;

// Copias del tramo + hebilla: alcanza para cubrir pantallas anchas sin que se vea el final
const COPIAS = 3;

export default function CintaAnuncios() {
  return (
    <div
      className={`cinta cinta--${TONO} ${INCLINADO ? "cinta--inclinada" : ""} ${VOLUMEN ? "cinta--volumen" : ""}`}
      role="region"
      aria-label="Anuncios"
    >
      {/* degradé del cuero, compartido por todas las hebillas (colores en home.css) */}
      <svg className="cinta-defs" width="0" height="0" aria-hidden="true" focusable="false">
        <linearGradient id="cinta-volumen" gradientUnits="userSpaceOnUse" x1="0" y1="16" x2="0" y2="44">
          <stop offset="0" className="cinta-vol-1" />
          <stop offset="0.28" className="cinta-vol-2" />
          <stop offset="0.6" className="cinta-vol-3" />
          <stop offset="1" className="cinta-vol-4" />
        </linearGradient>
      </svg>
      <div className="cinta-giro">
      <div className="cinta-pista">
        {Array.from({ length: COPIAS }, (_, c) => (
          // Solo la primera copia la leen los lectores de pantalla y el teclado
          <div className="cinta-modulo" key={c} aria-hidden={c > 0 ? "true" : undefined}>
            <ul className="cinta-tramo">
              {ANUNCIOS.map((anuncio) => (
                <li key={anuncio.texto}>
                  <Link to={anuncio.a} tabIndex={c > 0 ? -1 : undefined}>
                    {anuncio.texto}
                  </Link>
                </li>
              ))}
            </ul>
            <Hebilla />
          </div>
        ))}
      </div>
      </div>
    </div>
  );
}

/*
 * Hebilla abrochada, de izquierda a derecha: el cuero llega y se dobla en el
 * pasador; la punta con agujeros pasa por el marco, la lengüeta entra en un
 * agujero, y una presilla sujeta la punta encima del tramo que sigue.
 * El cuero mide 34 de alto (de y=13 a y=47), igual que .cinta-tramo. Los tramos
 * de los extremos se pasan 3 unidades del borde para que la unión no se note.
 */
function Hebilla() {
  return (
    <svg className="cinta-hebilla" viewBox="0 0 200 60" aria-hidden="true" focusable="false">
      {/* tramo que sigue después de la punta (queda abajo) */}
      <path className="c-canto" d="M150 13H203V16H150Z M150 44H203V47H150Z" />
      <rect className="c-cara" x="150" y="16" width="53" height="28" />
      <path className="c-hilo" d="M150 20H200M150 40H200" />

      {/* punta con agujeros, con su sombra sobre el tramo de abajo */}
      <path className="c-sombra" d="M40 16 H174 L192 32 L174 49 H40 Z" />
      <path className="c-canto" d="M40 13 H172 L189 30 L172 47 H40 Z" />
      <path className="c-cara" d="M40 16 H171 L185 30 L171 44 H40 Z" />
      <path className="c-hilo" d="M46 20H168M46 40H168" />
      {[96, 114, 132].map((x) => (
        <g key={x}>
          <ellipse className="c-ojalillo" cx={x} cy="30" rx="4.2" ry="4.6" />
          <ellipse className="c-agujero" cx={x} cy="30" rx="2.4" ry="2.8" />
        </g>
      ))}

      {/* presilla: abraza la punta y el tramo de abajo */}
      <rect className="c-canto" x="142" y="9" width="14" height="42" rx="2.5" />
      <rect className="c-cara" x="144" y="11" width="10" height="38" rx="1.5" />
      <path className="c-hilo" d="M146.5 14V46M151.5 14V46" />

      {/* tramo que llega a la hebilla y se dobla en el pasador */}
      <path className="c-canto" d="M-3 13H38V16H-3Z M-3 44H38V47H-3Z" />
      <rect className="c-cara" x="-3" y="16" width="41" height="28" />
      <path className="c-hilo" d="M0 20H32M0 40H32" />
      <path className="c-doblez" d="M33 13 Q45 13 45 23 V37 Q45 47 33 47 Z" />

      {/* lengüeta metida en el primer agujero, y el marco encima
          (cada pieza de metal lleva un borde fino abajo para que se lea sobre cualquier fondo) */}
      <path className="c-metal-borde" d="M35 30 H96" />
      <path className="c-metal" d="M35 30 H96" />
      <rect className="c-marco-borde" x="31" y="4" width="36" height="52" rx="9" />
      <rect className="c-marco" x="31" y="4" width="36" height="52" rx="9" />
      <rect className="c-reflejo" x="31" y="4" width="36" height="52" rx="9" pathLength="100" />
    </svg>
  );
}
