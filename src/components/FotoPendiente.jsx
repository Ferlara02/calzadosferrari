import IlustracionCinto from "./IlustracionCinto";

// Lugar de la foto mientras el producto (o el color elegido) no tiene fotos cargadas.
export default function FotoPendiente({ tipo }) {
  if (tipo === "Cintos") return <IlustracionCinto />;
  return (
    <div className="foto-pendiente">
      <svg viewBox="0 0 300 400" aria-hidden="true">
        <ellipse cx="150" cy="200" rx="96" ry="42" fill="none" stroke="#a8a79f" strokeWidth="1.5" strokeDasharray="6 6" />
        <circle cx="216" cy="168" r="6" fill="#a8a79f" />
      </svg>
      <span>Foto próximamente</span>
    </div>
  );
}
