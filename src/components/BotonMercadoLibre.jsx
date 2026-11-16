import { useState } from "react";
import { IconoExterno } from "./Iconos";

// Logo oficial de Mercado Libre: guardarlo en public/marcas/mercadolibre.svg (o .png y cambiar la ruta).
// Si el archivo no está, el botón se muestra igual, solo con el texto.
const LOGO = "/marcas/mercadolibre.svg";

export default function BotonMercadoLibre({ href }) {
  const [conLogo, setConLogo] = useState(true);
  return (
    <a className="btn btn-ml" href={href} target="_blank" rel="noreferrer">
      {conLogo && <img src={LOGO} alt="" className="btn-ml-logo" onError={() => setConLogo(false)} />}
      Ver en Mercado Libre
      <IconoExterno />
    </a>
  );
}
