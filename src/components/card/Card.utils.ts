export function getIdFromUrl(url: string) {
  const paths = url.split('/');
  return paths[paths.length - 2];
}
