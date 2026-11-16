const pesos = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "ARS",
  maximumFractionDigits: 0,
});

export const formatoPrecio = (precio) =>
  typeof precio === "number" ? pesos.format(precio) : "Consultá el precio";
