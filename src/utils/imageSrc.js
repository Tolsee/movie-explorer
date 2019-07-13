export function createCoverImg(path?: string, size?: string = 'w500') {
  if (!path) return 'https://via.placeholder.com/500x281';
  return `https://image.tmdb.org/t/p/${size}${path}`;
}
