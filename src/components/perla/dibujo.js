/**
 * Dibujo de Perla, la gata de la fábrica, en SVG.
 * Cada función devuelve el SVG como texto (se inserta con <Perla />).
 * Patas y cola son cadenas de segmentos que giran en cada articulación;
 * los movimientos están en src/styles/perla.css.
 */
const C = {
  crema: "#e9cba5",
  cremaSombra: "#d6b086",
  rayas: "#c4976a",
  blanco: "#fbf8f3",
  blancoSombra: "#e4ddd2",
  rosa: "#dd998b",
  rosaBorde: "#b97d70",
  orejaIn: "#efc4b7",
  iris1: "#e2dc9a",
  iris2: "#b6b065",
  pupila: "#121110",
  ojoBorde: "#3e3228",
  boca: "#9c7a6a",
};
const borde = (fondo) => (fondo === "oscuro" ? "#a8875f" : "#bfa483"); // contorno de silueta
const bordeBlanco = (fondo) => (fondo === "oscuro" ? "#cfc5b6" : "#d5ccbf");

// Cadena articulada: segs = [{len, ang, cls, forma(w), extra}] — cada segmento cuelga del anterior.
// Se dibuja dos veces (contorno y relleno) con la misma estructura para que no se vean costuras.
function cadena(segs, pinta) {
  const abrir = (i) => {
    if (i >= segs.length) return "";
    const s = segs[i];
    return `<g transform="translate(${s.x || 0} ${s.y || 0}) rotate(${s.ang})"><g class="${s.cls || ""}"${
      s.delay != null ? ` style="animation-delay:${s.delay}s"` : ""
    }>${pinta(s, i)}${abrir(i + 1)}</g></g>`;
  };
  return abrir(0);
}

// ---------- cola ----------
// Cola de pelo largo, tipo plumero: cada tramo es un mechón de puntas que apuntan
// hacia la punta de la cola. Los mechones se superponen y forman un contorno peludo.
const azar = (n) => {
  const v = Math.sin(n * 12.9898) * 43758.5453;
  return v - Math.floor(v);
}; // pseudoazar fijo: el dibujo sale igual en el servidor y en el navegador

function mechon(L, r, semilla, extra = 0) {
  const n = 28;
  const pts = [];
  for (let k = 0; k < n; k++) {
    const a = (k / n) * Math.PI * 2;
    const punta = k % 2 === 0;
    const rr = (punta ? r * (1.06 + azar(semilla * 31 + k) * 0.2) : r * (0.86 + azar(semilla * 17 + k) * 0.06)) + extra;
    let px = L / 2 + Math.cos(a) * (L / 2 + rr * 0.6);
    const py = Math.sin(a) * rr;
    if (punta) px += rr * 0.32; // las puntas se peinan hacia la punta de la cola
    pts.push([px, py]);
  }
  return "M" + pts.map(([px, py]) => `${px.toFixed(1)} ${py.toFixed(1)}`).join(" L") + " Z";
}

function cola(fondo, { x = 226, y = 304, angs = [-6, -12, -18, -22, -24, -22, -18, -10], clase = "t-ola" } = {}) {
  const radios = [14, 17, 19, 21, 22, 22, 21, 19];
  const L = 19;
  const segs = angs.map((a, i) => ({ x: i === 0 ? x : L, y: i === 0 ? y : 0, ang: a, cls: clase, delay: i * 0.13, r: radios[i] }));
  const b = borde(fondo);
  const ultimo = segs.length - 1;
  // la punta termina en un abanico de pelos
  const abanico = (extra) => mechon(L + 22, radios[ultimo] * 0.9, 99, extra);
  const contorno = cadena(
    segs,
    (s, i) =>
      `<path d="${mechon(L, s.r, i, 1.8)}" fill="${b}" stroke="${b}" stroke-width="1.6" stroke-linejoin="round"/>` +
      (i === ultimo ? `<path d="${abanico(1.8)}" transform="translate(10 0)" fill="${b}" stroke="${b}" stroke-width="1.6" stroke-linejoin="round"/>` : "")
  );
  const relleno = cadena(
    segs,
    (s, i) =>
      `<path d="${mechon(L, s.r, i)}" fill="${C.crema}"/>` +
      (i === ultimo ? `<path d="${abanico(0)}" transform="translate(10 0)" fill="${C.crema}"/>` : "") +
      // anillos suaves de atigrado y algunos pelos sueltos
      (i % 2 === 1 ? `<path d="M${L / 2 + 2} ${-s.r * 0.8} q 5 ${s.r * 0.8} 0 ${s.r * 1.6}" stroke="${C.rayas}" stroke-width="4" fill="none" stroke-linecap="round" opacity=".28"/>` : "") +
      `<path d="M${-2} ${-s.r * 0.45} q ${L * 0.6} -3 ${L + 6} -${s.r * 0.25} M0 ${s.r * 0.4} q ${L * 0.6} 3 ${L + 6} ${s.r * 0.3}" stroke="${C.cremaSombra}" stroke-width="1.4" fill="none" stroke-linecap="round" opacity=".7"/>`
  );
  return `<g class="p-cola">${contorno}${relleno}</g>`;
}

// ---------- pata delantera articulada ----------
// hombro → codo → muñeca → mano. pose: ángulos base [hombro, codo, muñeca]
function pata(fondo, { x, y, base = [3, -5, 4], clases = ["", "", ""], lado = 1 } = {}) {
  const formas = {
    brazo: "M-15 -8 C-17 16 -14 34 -12 50 L12 50 C14 34 17 16 15 -8 Z",
    ante: "M-13 -2 C-13 20 -12.5 40 -11 56 L11 56 C12.5 40 13 20 13 -2 Z",
    mano: "M-16 -1 C-19 10 -12 20 0 20 C12 20 19 10 16 -1 C10 -6 -10 -6 -16 -1 Z",
  };
  const segs = [
    { x, y, ang: base[0], cls: clases[0], forma: formas.brazo, junta: 0 },
    { x: 0, y: 50, ang: base[1], cls: clases[1], forma: formas.ante, junta: 12 },
    { x: 0, y: 56, ang: base[2], cls: clases[2], forma: formas.mano, junta: 10 },
  ];
  // la rotación se hace en Y: reemplazo translate(x y) — cadena usa translate(x y) con y del segmento
  const b = bordeBlanco(fondo);
  const pintar = (relleno) => (s, i) =>
    `${s.junta ? `<circle r="${s.junta + (relleno ? 0 : 1.6)}" fill="${relleno ? C.blanco : b}"/>` : ""}<path d="${s.forma}" fill="${
      relleno ? C.blanco : b
    }" ${relleno ? "" : `stroke="${b}" stroke-width="3.2" stroke-linejoin="round"`}/>` +
    (relleno && i === 2
      ? `<path d="M-6 11 v6 M0 12 v6.5 M6 11 v6" stroke="${C.blancoSombra}" stroke-width="1.6" stroke-linecap="round"/>`
      : "") +
    (relleno && i === 1 ? `<path d="M${-9 * lado} 14 q${-3 * lado} 14 ${-1 * lado} 30" stroke="${C.blancoSombra}" stroke-width="1.6" fill="none" stroke-linecap="round"/>` : "");
  return cadena(segs, pintar(false)) + cadena(segs, pintar(true));
}

// ---------- cabeza ----------
function cabeza(fondo, { ojos = "abiertos", mirar = true } = {}) {
  const b = borde(fondo);
  const bigote = fondo === "oscuro" ? "rgba(255,255,255,.85)" : "#c3b6a3";
  // ojos y orejas como la primera Perla (almendrados y simétricos, orejas medianas)
  const ojo = (lado) => {
    const cx = 25 * lado;
    if (ojos === "cerrados")
      return `<path d="M${cx - 13} -11 Q${cx} -3 ${cx + 13} -11" fill="none" stroke="${C.ojoBorde}" stroke-width="2.6" stroke-linecap="round"/>`;
    return `<g class="p-ojo" style="transform-origin:${cx}px -12px">
      <path d="M${cx - 14} -12 Q${cx} -27 ${cx + 14} -12 Q${cx} 0.6 ${cx - 14} -12 Z" fill="#cfc57a" stroke="${C.ojoBorde}" stroke-width="2.2" stroke-linejoin="round"/>
      <g class="${mirar ? "p-mirada" : ""}"><ellipse cx="${cx}" cy="-12" rx="2.2" ry="8.4" fill="${C.pupila}"/>
      <circle cx="${cx + 3.7}" cy="-17" r="1.8" fill="#fff"/></g>
    </g>`;
  };
  const oreja = (s) => `<g class="p-oreja ${s > 0 ? "p-oreja-der" : "p-oreja-izq"}" style="transform-origin:${32 * s}px -38px">
              <path d="M${50 * s} -24 L${60 * s} -74 Q${58 * s} -80 ${52 * s} -77 L${14 * s} -47 Z" fill="${C.crema}" stroke="${b}" stroke-width="2.2" stroke-linejoin="round"/>
      <path d="M${46 * s} -34 L${54 * s} -69 L${26 * s} -49 Z" fill="${C.orejaIn}"/>
      <path d="M${48 * s} -44 l${-7 * s} 3 M${50 * s} -54 l${-8 * s} 4" stroke="${C.blanco}" stroke-width="1.4" fill="none" stroke-linecap="round" opacity=".85"/>
    </g>`;
  return `<g class="p-cabeza">
    ${oreja(-1)}${oreja(1)}
    <path d="M-40 -44 C-24 -54 24 -54 40 -44 C52 -36 58 -20 58 -6 C66 -2 74 6 78 14 L68 16 L74 24 L62 24 L66 32 L54 30 C44 44 22 54 0 54 C-22 54 -44 44 -54 30 L-66 32 L-62 24 L-74 24 L-68 16 L-78 14 C-74 6 -66 -2 -58 -6 C-58 -20 -52 -36 -40 -44 Z"
          fill="${C.crema}" stroke="${b}" stroke-width="2.2" stroke-linejoin="round"/>
    <path d="M-3 -46 C-1 -48 1 -48 3 -46 C5 -30 6 -18 9 -8 C22 -2 34 10 34 24 C34 40 18 50 0 50 C-18 50 -34 40 -34 24 C-34 10 -22 -2 -9 -8 C-6 -18 -5 -30 -3 -46 Z" fill="${C.blanco}"/>
    <path d="M-16 -44 C-14 -36 -14 -30 -12 -24 M16 -44 C14 -36 14 -30 12 -24 M-8 -48 C-7 -42 -7 -36 -6 -30 M8 -48 C7 -42 7 -36 6 -30 M-32 -38 C-28 -32 -26 -28 -25 -22 M32 -38 C28 -32 26 -28 25 -22"
          stroke="${C.rayas}" stroke-width="2.4" fill="none" stroke-linecap="round" opacity=".75"/>
    <path d="M-50 4 q10 6 22 4 M50 4 q-10 6 -22 4 M-56 18 q10 4 20 2 M56 18 q-10 4 -20 2" stroke="${C.cremaSombra}" stroke-width="2" fill="none" stroke-linecap="round" opacity=".8"/>
    ${ojo(-1)}${ojo(1)}
    <path d="M-7.5 6 Q0 1 7.5 6 L0 15 Z" fill="${C.rosa}" stroke="${C.rosaBorde}" stroke-width="1.3" stroke-linejoin="round"/>
    <path d="M0 15 v4.6 M0 19.6 q-5.7 5.2 -10.9 1.2 M0 19.6 q5.7 5.2 10.9 1.2" stroke="${C.boca}" stroke-width="1.6" fill="none" stroke-linecap="round"/>
    <g class="p-bigotes" stroke="${bigote}" stroke-width="1.15" fill="none" stroke-linecap="round">
      <path d="M-14 12 C-40 6 -64 6 -92 10 M-14 15 C-42 15 -66 18 -92 26 M-13 18 C-38 23 -58 31 -80 44"/>
      <path d="M14 12 C40 6 64 6 92 10 M14 15 C42 15 66 18 92 26 M13 18 C38 23 58 31 80 44"/>
    </g>
  </g>`;
}

// ---------- poses ----------
// Sentada de frente. zarpazo: la pata derecha (del lado del espectador) le pega a algo.
function sentada(fondo = "claro", { zarpazo = false, mirar = true } = {}) {
  const b = borde(fondo), bb = bordeBlanco(fondo);
  return `<svg class="perla perla2${zarpazo ? " perla--zarpazo" : ""}" viewBox="0 0 320 332" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    ${cola(fondo)}
    <g class="p-cuerpo">
      <path d="M64 246 C48 262 48 302 70 318 C86 326 110 324 118 312 C114 284 94 252 64 246 Z" fill="${C.crema}" stroke="${b}" stroke-width="2.2"/>
      <path d="M236 246 C252 262 252 302 230 318 C214 326 190 324 182 312 C186 284 206 252 236 246 Z" fill="${C.crema}" stroke="${b}" stroke-width="2.2"/>
      <path d="M96 128 C74 160 62 210 64 262 C66 300 86 318 116 320 L184 320 C214 318 234 300 236 262 C238 210 226 160 204 128 Z" fill="${C.crema}" stroke="${b}" stroke-width="2.2"/>
      <path d="M76 214 q-6 12 -4 26 M224 214 q6 12 4 26 M82 176 q-5 10 -4 20 M218 176 q5 10 4 20" stroke="${C.cremaSombra}" stroke-width="2.2" fill="none" stroke-linecap="round"/>
      <path d="M58 314 C56 304 84 300 98 309 C102 318 92 323 76 323 C64 323 58 320 58 314 Z" fill="${C.blanco}" stroke="${bb}" stroke-width="2"/>
      <path d="M242 314 C244 304 216 300 202 309 C198 318 208 323 224 323 C236 323 242 320 242 314 Z" fill="${C.blanco}" stroke="${bb}" stroke-width="2"/>
      <path d="M100 122 C122 142 178 142 200 122 C210 160 204 200 192 232 L184 222 L178 240 L170 226 L162 246 L154 230 L146 246 L138 226 L130 240 L122 222 L114 232 C102 200 92 160 100 122 Z" fill="${C.blanco}"/>
      <path d="M120 178 q6 10 4 22 M180 178 q-6 10 -4 22 M150 196 v16" stroke="${C.blancoSombra}" stroke-width="1.8" fill="none" stroke-linecap="round"/>
      ${pata(fondo, { x: 128, y: 196, base: [5, -8, 6], lado: 1 })}
      ${pata(fondo, {
        x: 172, y: 196, base: [-4, 6, -5], lado: -1,
        clases: ["j-hombro", "j-codo", "j-muneca"],
      })}
      <path d="M108 176 C124 192 176 192 192 176 C196 198 194 216 190 236 L182 226 L176 244 L168 230 L160 250 L152 234 L144 250 L136 230 L128 244 L122 226 L112 236 C106 216 104 198 108 176 Z" fill="${C.blanco}"/>
      <path d="M128 214 q4 8 2 18 M172 214 q-4 8 -2 18 M150 222 v14" stroke="${C.blancoSombra}" stroke-width="1.8" fill="none" stroke-linecap="round"/>
    </g>
    <g transform="translate(150 96)"><g class="p-cabeza-mueve">
      <path d="M-62 30 C-54 64 54 64 62 30 L70 46 L56 50 L60 62 L44 60 L40 72 L26 66 L18 76 L6 68 L-6 76 L-14 66 L-28 72 L-34 60 L-48 62 L-46 50 L-62 46 Z" fill="${C.blanco}"/>
      ${cabeza(fondo, { mirar })}
    </g></g>
  </svg>`;
}

// Asomada detrás de un borde: cabeza y manos que se enganchan
function asomada(fondo = "oscuro") {
  const bb = bordeBlanco(fondo);
  const mano = (x, cls) => `<g transform="translate(${x} 128)"><g class="${cls}">
      <path d="M-17 -2 C-19 9 -12 18 0 18 C12 18 19 9 17 -2 C10 -8 -10 -8 -17 -2 Z" fill="${C.blanco}" stroke="${bb}" stroke-width="2.2"/>
      <path d="M-7 8 v7 M0 9 v7 M7 8 v7" stroke="${C.blancoSombra}" stroke-width="1.6" stroke-linecap="round"/></g></g>`;
  return `<svg class="perla perla2 perla--asomada" viewBox="50 -6 200 156" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <g class="p-asoma">
      <g transform="translate(150 98)"><g class="p-cabeza-mueve">${cabeza(fondo)}</g></g>
    </g>
    ${mano(112, "p-mano-izq")}${mano(188, "p-mano-der")}
  </svg>`;
}

// Durmiendo enroscada (de costado), respira y mueve la punta de la cola
function dormida(fondo = "oscuro") {
  const b = borde(fondo), bb = bordeBlanco(fondo);
  const ojoC = (x) => `<path d="M${x - 9} -4 C${x - 4} 2 ${x + 4} 2 ${x + 9} -4" fill="none" stroke="${C.ojoBorde}" stroke-width="2.4" stroke-linecap="round"/>`;
  return `<svg class="perla perla2 perla--dormida" viewBox="0 0 280 150" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <g class="p-respira" style="transform-origin:150px 140px">
      <path d="M44 126 C28 88 70 46 140 44 C210 42 252 80 248 112 C246 132 226 140 196 140 L80 140 C58 140 48 136 44 126 Z" fill="${C.crema}" stroke="${b}" stroke-width="2.2"/>
      <path d="M130 52 q8 14 4 30 M162 50 q8 16 4 32 M194 60 q6 14 0 28 M220 74 q4 12 -2 22" stroke="${C.rayas}" stroke-width="2.6" fill="none" stroke-linecap="round" opacity=".6"/>
      <path d="M200 132 C230 132 250 116 244 98" stroke="${C.cremaSombra}" stroke-width="2" fill="none"/>
    </g>
    ${cola(fondo, { x: 236, y: 128, angs: [168, 6, 4, 3, 2, 0, -6, -14], clase: "t-ola-suave" })}
    <path d="M70 136 C64 126 92 120 112 126 C118 134 108 142 90 142 C78 142 72 140 70 136 Z" fill="${C.blanco}" stroke="${bb}" stroke-width="2"/>
    <path d="M100 138 C96 128 126 122 144 128 C150 136 140 144 122 144 C110 144 102 142 100 138 Z" fill="${C.blanco}" stroke="${bb}" stroke-width="2"/>
    <g transform="translate(86 90) rotate(-10) scale(.76)"><g class="p-cabeza-dormida">
      ${cabeza(fondo, { ojos: "cerrados", mirar: false })}
    </g></g>
    <g class="p-zzz" fill="${fondo === "oscuro" ? "#fff" : "#000"}" font-family="TeX Gyre Schola, Georgia, serif" font-style="italic" font-weight="700">
      <text class="z z1" x="40" y="44" font-size="16">z</text><text class="z z2" x="52" y="30" font-size="20">z</text><text class="z z3" x="68" y="14" font-size="25">z</text>
    </g>
  </svg>`;
}

function carretel(fondo = "claro") {
  const fg = fondo === "oscuro" ? "#fff" : "#1b1712";
  return `<svg class="carretel" viewBox="0 0 72 84" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <g class="c-gira" style="transform-origin:36px 80px">
      <rect x="14" y="14" width="44" height="56" fill="#a16459"/>
      <path d="M14 22 H58 M14 30 H58 M14 38 H58 M14 46 H58 M14 54 H58 M14 62 H58" stroke="rgba(0,0,0,.22)" stroke-width="1.6"/>
      <path d="M18 18 L52 66" stroke="rgba(255,255,255,.18)" stroke-width="3"/>
      <rect x="4" y="4" width="64" height="11" rx="3" fill="#d9b48a" stroke="${fg}" stroke-width="2"/>
      <rect x="4" y="69" width="64" height="11" rx="3" fill="#d9b48a" stroke="${fg}" stroke-width="2"/>
      <rect x="14" y="14" width="44" height="56" fill="none" stroke="${fg}" stroke-width="2"/>
    </g>
  </svg>`;
}

// Ovillo hecho con el hilo blanco de la costura de la página
function ovillo() {
  return `<svg class="carretel ovillo" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <g class="c-gira" style="transform-origin:30px 56px">
      <circle cx="30" cy="32" r="24" fill="#ece8e0" stroke="#b9b2a5" stroke-width="2"/>
      <path d="M10 26 C20 14 40 12 52 24 M8 36 C22 22 42 22 54 34 M12 46 C24 32 44 32 52 44 M22 10 C16 26 18 44 28 56 M38 10 C30 24 32 44 40 54" stroke="#c9c2b5" stroke-width="1.6" fill="none"/>
    </g>
  </svg>`;
}

// De perfil, caminando hacia la derecha (para el paseo de la sección Cintos).
// Patas de 3 tramos que se dibujan como una sola silueta (contorno y relleno aparte,
// así las articulaciones no muestran línea), cuerpo con volumen y pelo largo.
function caminando(fondo = "claro") {
  const b = "#c9ab86"; // contorno suave
  const lejos = { piel: "#dcc19c", blanco: "#e7e0d4" };
  const cerca = { piel: C.crema, blanco: C.blanco };

  // forma de cada tramo (apunta hacia abajo desde su articulación)
  const T = {
    muslo: { d: "M-12 -4 C-15 8 -10 17 -6 21 L6 21 C11 15 14 5 11 -7 C5 -14 -7 -12 -12 -4 Z", j: 0 },
    tibia: { d: "M-5.2 0 C-5.6 7 -4.6 13 -3.8 19 L3.8 19 C4.6 13 5.6 7 5.2 0 Z", j: 5.2 },
    tarso: { d: "M-3.8 0 C-3.9 5 -3.6 9 -3.4 12 L3.4 12 C3.6 9 3.9 5 3.8 0 Z", j: 3.8, pie: 12 },
    brazo: { d: "M-8 2 C-10 -12 10 -12 8 2 C7 9 6 13 5.5 17 L-5.5 17 C-6 13 -7 9 -8 2 Z", j: 0 },
    ante: { d: "M-5 0 C-5.2 8 -4.6 15 -4 21 L4 21 C4.6 15 5.2 8 5 0 Z", j: 5 },
    mano: { d: "M-4 0 L-4 3 L4 3 L4 0 Z", j: 4, pie: 0 },
  };
  // la patita va en la punta del último tramo (t.pie = largo del tramo hasta el apoyo)
  const pie = (rx, y) => `<ellipse cx="2.6" cy="${y + (y ? 0 : 4)}" rx="${rx}" ry="3.5"/>`;

  // cadena de 3 tramos; cada uno tiene su clase para animarlo
  const pata = (x, y, clase, angs, tramos, color, colorPie) => {
    const segs = tramos.map((t, k) => ({
      x: k === 0 ? x : 0,
      y: k === 0 ? y : tramos[k - 1] === "muslo" ? 20 : tramos[k - 1] === "brazo" ? 16 : tramos[k - 1] === "tibia" ? 18 : 21,
      ang: angs[k],
      cls: `${clase}-${k + 1}`,
      t: T[t],
      ultimo: k === tramos.length - 1,
    }));
    const pinta = (relleno) => (sg) => {
      const c = relleno ? color : b;
      const extra = relleno ? "" : ` stroke="${b}" stroke-width="3" stroke-linejoin="round"`;
      return (
        (sg.t.j ? `<circle r="${sg.t.j + (relleno ? 0 : 1.5)}" fill="${c}"/>` : "") +
        `<path d="${sg.t.d}" fill="${c}"${extra}/>` +
        (sg.ultimo ? `<g fill="${relleno ? colorPie : b}"${extra}>${pie(6.4, sg.t.pie)}</g>` : "") +
        (sg.ultimo && relleno ? `<path transform="translate(0 ${sg.t.pie ? sg.t.pie - 4 : 0})" d="M2 3.5 v3 M5.5 3 v3" stroke="#d9d0c2" stroke-width="1" stroke-linecap="round"/>` : "")
      );
    };
    return cadena(segs, pinta(false)) + cadena(segs, pinta(true));
  };
  const trasera = (x, cls, col) => pata(x, 82, cls, [-24, 54, -30], ["muslo", "tibia", "tarso"], col.piel, col.blanco);
  const delantera = (x, cls, col, blancaEntera) => pata(x, 86, cls, [4, -4, 0], ["brazo", "ante", "mano"], blancaEntera ? col.blanco : col.piel, col.blanco);

  return `<svg class="perla perla2 perla-camina" viewBox="-14 -14 236 150" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <defs>
      <linearGradient id="pc-piel" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#f1d8b6"/><stop offset=".55" stop-color="${C.crema}"/><stop offset="1" stop-color="#d7b087"/>
      </linearGradient>
      <linearGradient id="pc-blanco" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#fffdf9"/><stop offset="1" stop-color="#e9e2d6"/>
      </linearGradient>
      <radialGradient id="pc-sombra"><stop offset="0" stop-color="rgba(0,0,0,.18)"/><stop offset="1" stop-color="rgba(0,0,0,0)"/></radialGradient>
    </defs>
    <ellipse class="pc-sombra" cx="104" cy="133" rx="74" ry="5" fill="url(#pc-sombra)"/>
    <g class="pc-cuerpo">
      ${cola(fondo, { x: 46, y: 66, angs: [-150, 18, 16, 12, 6, -2, -8, -10], clase: "t-ola" }).replace('class="p-cola"', 'class="p-cola pc-cola" transform="scale(.62)" style="transform-origin:46px 66px"')}
      ${delantera(132, "pc-dl", lejos, true)}
      ${trasera(74, "pc-tl", lejos)}
      <path d="M44 74 C40 56 56 46 78 46 C98 45 116 50 132 50 C146 50 156 56 160 66 C166 80 163 95 151 101 Q146 101 143 106 Q140 101 136 102 Q132 107 128 106 Q125 101 120 102 C110 103 96 104 86 102 Q81 107 77 106 Q74 101 70 102 Q66 106 62 103 Q61 99 58 98 C47 94 42 86 44 74 Z"
            fill="url(#pc-piel)" stroke="${b}" stroke-width="1.6" stroke-linejoin="round"/>
      <path d="M58 52 q-6 4 -8 10 M80 49 q5 10 3 21 M98 48 q5 11 2 22 M116 50 q4 10 1 20" stroke="${C.rayas}" stroke-width="2.6" fill="none" stroke-linecap="round" opacity=".5"/>
      <path d="M150 60 C164 70 164 92 152 102 L146 99 L141 105 L136 99 C134 88 140 72 150 60 Z" fill="url(#pc-blanco)"/>
      <path d="M96 103 L102 99 L108 104 L114 99 L120 103 C112 98 102 98 96 103 Z" fill="${C.blanco}" opacity=".9"/>
      ${trasera(60, "pc-tc", cerca)}
      ${delantera(142, "pc-dc", cerca, true)}
      <path d="M134 82 C138 76 150 76 155 82 C157 89 154 95 151 98 Q149 95 146 99 Q144 95 141 99 Q139 95 136.5 97 C134.5 93 133 87 134 82 Z" fill="url(#pc-blanco)"/>
    </g>
    <g transform="translate(150 60)"><g class="pc-cabeza"><g transform="translate(-150 -60)">
      <path d="M172 30 C175 22 179 15 183 12 C185 20 186 27 184 34 Z" fill="${lejos.piel}" stroke="${b}" stroke-width="1.4" stroke-linejoin="round"/>
      <path d="M148 54 C146 40 156 30 170 30 C182 30 190 36 193 43 C196 46 198 49 197 51 C196 55 192 57 188 57 C188 61 184 64 178 64 C170 66 162 66 156 62 L150 65 L152 60 L145 60 Z"
            fill="url(#pc-piel)" stroke="${b}" stroke-width="1.6" stroke-linejoin="round"/>
      <g class="pc-oreja" style="transform-origin:166px 32px">
        <path d="M160 34 C158 24 159 16 162 10 C168 16 174 24 176 31 Z" fill="${C.crema}" stroke="${b}" stroke-width="1.4" stroke-linejoin="round"/>
        <path d="M162.5 30 C161.5 23 162.5 18 164 15 C168 20 170.5 25 171.5 29.5 Z" fill="${C.orejaIn}"/>
        <path d="M164 29 q1 -5 3 -8 M167 30 q2 -4 4 -6" stroke="${C.blanco}" stroke-width="1" fill="none" stroke-linecap="round"/>
      </g>
      <path d="M168 33 q2 4 1.5 8 M163 35 q1.5 3 1 7" stroke="${C.rayas}" stroke-width="1.7" fill="none" stroke-linecap="round" opacity=".7"/>
      <path d="M184 46 C190 46 197 49 197 52 C196 56 190 58 186 60 C184 63 178 64 176 61 C176 55 179 49 184 46 Z" fill="${C.blanco}"/>
      <path d="M187 39 C190 40 192 42 193.5 44.5 L187 46 Z" fill="${C.blanco}"/>
      <g class="pc-ojo" style="transform-origin:180.5px 40px">
        <path d="M175 40.5 Q180 35 186 40 Q180.5 44 175 40.5 Z" fill="#cfc57a" stroke="${C.ojoBorde}" stroke-width="1.3" stroke-linejoin="round"/>
        <ellipse cx="181.5" cy="40" rx="1.1" ry="3.3" fill="${C.pupila}"/>
        <circle cx="182.6" cy="38.4" r=".7" fill="#fff"/>
      </g>
      <path d="M194.5 46.5 L198 48.2 L196.5 51 Z" fill="${C.rosa}" stroke="${C.rosaBorde}" stroke-width=".8" stroke-linejoin="round"/>
      <path d="M196 52.5 q-2 3 -7 3.5" stroke="${C.boca}" stroke-width="1.1" fill="none" stroke-linecap="round"/>
      <ellipse class="pc-lengua" cx="193.5" cy="58.5" rx="2.4" ry="3.2" fill="#e58f8f"/>
      <path d="M154 58 l-6 4 M157 61 l-5 5" stroke="${C.cremaSombra}" stroke-width="1.4" stroke-linecap="round"/>
      <g stroke="${fondo === "oscuro" ? "rgba(255,255,255,.8)" : "#c3b6a3"}" stroke-width=".9" fill="none" stroke-linecap="round">
        <path d="M189 52 C200 49 210 49 216 51 M189 54 C200 54 210 56 214 59"/>
      </g>
    </g></g></g>
  </svg>`;
}

export { sentada, asomada, dormida, carretel, ovillo, caminando };
