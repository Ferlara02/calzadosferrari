import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import WhatsAppFlotante from "./components/WhatsAppFlotante";
import Seo from "./components/Seo";
import Home from "./pages/Home";
import Producto from "./pages/Producto";
import NoEncontrada from "./pages/NoEncontrada";

/** Al cambiar de página vuelve arriba; con un #ancla baja a esa sección. */
function Desplazamiento() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      // espera a que la página nueva esté pintada
      requestAnimationFrame(() => {
        document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);
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
