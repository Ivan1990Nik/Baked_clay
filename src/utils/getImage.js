export const getImage = (category, file) => {
  return new URL(`../assets/images/${category}/${file}`, import.meta.url).href
}