import { NEGOCIO, comoLlegarUrl, mapaEmbedUrl } from "../config/negocio";

export default function DondeEstamos() {
  return (
    <section id="local" className="sec" aria-labelledby="local-titulo">
      <div className="contenedor">
        <div className="local">
          <div className="local-info">
            <h2 id="local-titulo" className="titulo local-titulo">
              Dónde estamos
            </h2>
            <p className="texto texto-2">Vení a la fábrica a probarte los modelos o a traer tu calzado para arreglar.</p>
            <dl className="datos">
              <dt>Dirección</dt>
              <dd>
                {NEGOCIO.direccion}, {NEGOCIO.ciudad}
              </dd>
              <dt>Horario</dt>
              <dd>
                {NEGOCIO.horario.map((linea) => (
                  <span key={linea} className="datos-linea">
                    {linea}
                  </span>
                ))}
              </dd>
              <dt>Teléfono</dt>
              <dd>
                <a href={NEGOCIO.telefonoLink}>{NEGOCIO.telefono}</a>
              </dd>
            </dl>
            <div>
              <a className="btn btn-blanco btn-chico" href={comoLlegarUrl()} target="_blank" rel="noreferrer">
                Cómo llegar
              </a>
            </div>
          </div>
          <div className="local-mapa">
            <iframe
              title="Mapa con la ubicación del local en Google Maps"
              src={mapaEmbedUrl()}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </section>
  );
}
