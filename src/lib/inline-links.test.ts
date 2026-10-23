import { describe, expect, it } from 'vitest'
import { parseLinks, stripLinks } from './inline-links'

describe('parseLinks', () => {
  it('returns plain text when there are no links', () => {
    expect(parseLinks('just text')).toEqual([{ type: 'text', value: 'just text' }])
  })

  it('parses a link surrounded by text', () => {
    expect(parseLinks('Some text [Link](/link) more text.')).toEqual([
      { type: 'text', value: 'Some text ' },
      { type: 'link', text: 'Link', href: '/link' },
      { type: 'text', value: ' more text.' }
    ])
  })

  it('parses multiple links and links at the edges', () => {
    expect(parseLinks('[a](/a) and [b](https://b.se)')).toEqual([
      { type: 'link', text: 'a', href: '/a' },
      { type: 'text', value: ' and ' },
      { type: 'link', text: 'b', href: 'https://b.se' }
    ])
  })

  it('leaves invalid syntax as text', () => {
    expect(parseLinks('[a] (/a)')).toEqual([{ type: 'text', value: '[a] (/a)' }])
  })
})

describe('stripLinks', () => {
  it('replaces links with their text', () => {
    expect(stripLinks('ägg från [hönan](/honan)')).toBe('ägg från hönan')
  })
})
