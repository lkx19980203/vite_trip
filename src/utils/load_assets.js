export const getAssetsUrl = (image) => {
  return new URL(`../assets/${image}`, import.meta.url);
};
