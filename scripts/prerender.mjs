// Después del build: genera una página HTML fija por ruta (inicio y cada producto),
// con su título, descripción, imagen para compartir y datos para Google ya escritos.
// Así buscadores y vistas previas de WhatsApp/Facebook ven el contenido sin ejecutar JavaScript.
import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const raiz = join(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(raiz, "dist");
const ssr = join(raiz, "dist-ssr");
const { render, seoDe, RUTAS, SITIO_URL: URL_CONFIG } = await import(pathToFileURL(join(ssr, "entry-server.js")).href);

const BASE = (process.env.SITIO_URL || URL_CONFIG || "").replace(/\/$/, "");
const plantilla = readFileSync(join(dist, "index.html"), "utf8");

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const abs = (r) => (BASE ? BASE + r : r);

function head(s) {
  const t = [
    `<title>${esc(s.titulo)}</title>`,
    `<meta name="description" content="${esc(s.descripcion)}" />`,
    `<meta name="robots" content="${s.noindex ? "noindex" : "index, follow"}" />`,
    `<meta property="og:title" content="${esc(s.titulo)}" />`,
    `<meta property="og:description" content="${esc(s.descripcion)}" />`,
    `<meta property="og:type" content="${s.tipo}" />`,
    `<meta property="og:image" content="${esc(abs(s.imagen))}" />`,
    `<meta name="twitter:title" content="${esc(s.titulo)}" />`,
    `<meta name="twitter:description" content="${esc(s.descripcion)}" />`,
    `<meta name="twitter:image" content="${esc(abs(s.imagen))}" />`,
  ];
  if (BASE && !s.noindex) {
    t.push(`<link rel="canonical" href="${esc(BASE + s.ruta)}" />`);
    t.push(`<meta property="og:url" content="${esc(BASE + s.ruta)}" />`);
  }
  for (const j of s.jsonld) t.push(`<script type="application/ld+json">${JSON.stringify(j).replace(/</g, "\\u003c")}</script>`);
  return t.join("\n    ");
}

function pagina(ruta, archivo) {
  const s = seoDe(ruta, BASE);
  const html = render(ruta);
  const out = plantilla
    .replace(/<!--seo-->[\s\S]*?<!--\/seo-->/, head(s))
    .replace('<div id="root"></div>', `<div id="root">${html}</div>`);
  const destino = join(dist, archivo);
  mkdirSync(dirname(destino), { recursive: true });
  writeFileSync(destino, out);
  console.log(`  ${ruta.padEnd(42)} → dist/${archivo}`);
}

console.log("Páginas fijas:");
for (const ruta of RUTAS) {
  // /producto/x se guarda como producto/x.html: Cloudflare Pages lo sirve en /producto/x sin redirigir
  pagina(ruta, ruta === "/" ? "index.html" : ruta.slice(1) + ".html");
}
pagina("/pagina-inexistente", "404.html");

// robots.txt y sitemap.xml
const robots = ["User-agent: *", "Allow: /"];
if (BASE) {
  const hoy = new Date().toISOString().slice(0, 10);
  const urls = RUTAS.map(
    (r) => `  <url><loc>${BASE + r}</loc><lastmod>${hoy}</lastmod><priority>${r === "/" ? "1.0" : "0.8"}</priority></url>`
  ).join("\n");
  writeFileSync(
    join(dist, "sitemap.xml"),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
  );
  robots.push("", `Sitemap: ${BASE}/sitemap.xml`);
  console.log("  sitemap.xml generado para " + BASE);
} else {
  console.log("  (sin SITIO_URL: no se generan sitemap ni direcciones canónicas)");
}
writeFileSync(join(dist, "robots.txt"), robots.join("\n") + "\n");
rmSync(ssr, { recursive: true, force: true });
