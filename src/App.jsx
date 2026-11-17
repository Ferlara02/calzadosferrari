import { useEffect, useRef } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import WhatsAppFlotante from "./components/WhatsAppFlotante";
import Seo from "./components/Seo";
import Home from "./pages/Home";
import Producto from "./pages/Producto";
import NoEncontrada from "./pages/NoEncontrada";

/**
 * Al cambiar de página vuelve arriba; con un #ancla baja a esa sección.
 * Depende también de `key` para que tocar de nuevo un link al mismo #ancla
 * (la dirección no cambia) vuelva a bajar. Si solo cambian los parámetros
 * (?color= en la ficha), no se mueve.
 */
function Desplazamiento() {
  const { pathname, hash, key } = useLocation();
  const anterior = useRef(null);
  useEffect(() => {
    const mismaVista = anterior.current === pathname + hash;
    anterior.current = pathname + hash;
    if (hash) {
      // espera a que la página nueva esté pintada
      requestAnimationFrame(() => {
        document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    } else if (!mismaVista) {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash, key]);
  return null;
}

export default function App() {
  return (
    <>
      <Seo />
      <Desplazamiento />
      <a className="saltar" href="#contenido">
        Saltar al contenido
      </a>
      <Header />
      <main id="contenido">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/producto/:id" element={<Producto />} />
          <Route path="*" element={<NoEncontrada />} />
        </Routes>
      </main>
      <Footer />
      <WhatsAppFlotante />
    </>
  );
}
