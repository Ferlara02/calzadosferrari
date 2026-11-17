import CintaAnuncios from "../components/CintaAnuncios";
import Hero from "../sections/Hero";
import Catalogo from "../sections/Catalogo";
import Cintos from "../sections/Cintos";
import Mayorista from "../sections/Mayorista";
import Reparaciones from "../sections/Reparaciones";
import DondeEstamos from "../sections/DondeEstamos";

export default function Home() {
  return (
    <>
      <CintaAnuncios />
      <Hero />
      <Catalogo />
      <Cintos />
      <Mayorista />
      <Reparaciones />
      <DondeEstamos />
    </>
  );
}
