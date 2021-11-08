
export function trimURL (link) {
  const url = new URL(link)
  return `${url.host}${url.pathname}`
}
export function trimURLEnd (link) {
  const url = new URL(link)
  return url.origin
}
