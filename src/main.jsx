import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "@fontsource-variable/archivo";
import "./styles/fonts.css";
import "./styles/tokens.css";
import "./styles/base.css";
import "./styles/layout.css";
import "./styles/home.css";
import "./styles/producto.css";
import App from "./App";

const raiz = document.getElementById("root");
const app = (
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);

// En producción cada página llega ya armada (scripts/prerender.mjs): React la retoma.
// Si el HTML fijo no coincide (ej. un link con ?color=), React vuelve a dibujar la página sin avisar.
if (raiz.hasChildNodes()) hydrateRoot(raiz, app, { onRecoverableError: () => {} });
else createRoot(raiz).render(app);
