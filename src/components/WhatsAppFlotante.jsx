import { IconoChat } from "./Iconos";
import { linkWhatsApp, MENSAJES } from "../utils/whatsapp";

export default function WhatsAppFlotante() {
  return (
    <a
      className="wa"
      href={linkWhatsApp(MENSAJES.general)}
      target="_blank"
      rel="noreferrer"
      aria-label="Escribinos por WhatsApp"
    >
      <IconoChat />
      <span>WhatsApp</span>
    </a>
  );
}
