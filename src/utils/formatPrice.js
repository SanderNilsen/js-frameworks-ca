export function formatPrice(value) {
  return new Intl.NumberFormat("nb-NO").format(value) + " kr";
}