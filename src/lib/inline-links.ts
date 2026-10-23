export type InlinePart =
  | { type: 'text'; value: string }
  | { type: 'link'; text: string; href: string }

const linkPattern = /\[([^\]]+)\]\(([^)\s]+)\)/g

export function parseLinks(text: string): InlinePart[] {
  const parts: InlinePart[] = []
  let lastIndex = 0
  for (const match of text.matchAll(linkPattern)) {
    const index = match.index ?? 0
    if (index > lastIndex) parts.push({ type: 'text', value: text.slice(lastIndex, index) })
    parts.push({ type: 'link', text: match[1], href: match[2] })
    lastIndex = index + match[0].length
  }
  if (lastIndex < text.length) parts.push({ type: 'text', value: text.slice(lastIndex) })
  return parts
}

export function stripLinks(text: string): string {
  return text.replace(linkPattern, '$1')
}
