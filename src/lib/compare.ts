export function equalsIgnoreCase(a: string, b: string) {
  return !a.localeCompare(b, 'sv', { sensitivity: 'base' })
}
