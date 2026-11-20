// Perla, la gata de la fábrica: lo que se muestra en su ventana ("Conocé a Perla").

export const PERLA = {
  // Su historia: un texto por párrafo, ej. ["Llegó a la fábrica en...", "Le encanta..."].
  // Mientras esté vacío, la ventana muestra solo las fotos.
  historia: [
    "Perla llegó a la fábrica en 2019 cuando su mamá la tuvo a ella y a sus hermanitos. Nació en el local de al lado, se dieron en adopción a todos, excepto a ella que se quedó con nosotros. Es súper leal con su dueño Javier (suele peinarle los pelos de la cabeza), le gusta pedir que la cepillen y morderte la esquina del celular para llamar la atención. Recurrentemente la vas a ver afilándose las uñas en los restos de cuero que Javier pacientemente guarda para ella. Ama dormir en el sillón, robarte criollos y sorbos de lo que estés tomando y es fanática de los mimos en la pancita!! Es un poco miedosa con desconocidos así que no te acerques tan de golpe.",
  ],

  // Fotos en public/perla/, verticales 4:5. La primera es la que se ve al abrir.
  fotos: [
    { src: "/perla/perla-1.webp", alt: "Perla sentada frente a las cajas de zapatos" },
    { src: "/perla/perla-2.webp", alt: "Perla mirando a cámara sobre la mesa de trabajo" },
    { src: "/perla/perla-3.webp", alt: "Perla en brazos, de cerca" },
    { src: "/perla/perla-4.webp", alt: "Perla sentada sobre un cinto de cuero" },
    { src: "/perla/perla-5.webp", alt: "Perla caminando por la fábrica" },
  ],
};
