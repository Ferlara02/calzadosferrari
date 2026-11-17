// Solo para el build: arma el HTML fijo de cada página (ver scripts/prerender.mjs).
import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import App from "./App";

export function render(url) {
  return renderToString(
    <StrictMode>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </StrictMode>
  );
}

export { seoDe, RUTAS, SITIO_URL, absoluta } from "./config/seo";
