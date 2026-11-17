import { IconoFlecha } from "./Iconos";

// Logo oficial de Mercado Libre (public/marcas/mercadolibre.webp)
const LOGO = "/marcas/mercadolibre.webp";

export default function BotonMercadoLibre({ href }) {
  return (
    <a className="btn btn-ml" href={href} target="_blank" rel="noreferrer">
      <img src={LOGO} alt="" className="btn-ml-logo" width="37" height="26" />
      Ver en Mercado Libre
      <IconoFlecha />
    </a>
  );
}
