export function getImageUrl(name, type) {
  return new URL(`../assets/${name}.${type}`, import.meta.url).href;
}
