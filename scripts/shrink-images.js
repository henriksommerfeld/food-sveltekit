import { readdir, readFile, writeFile } from 'node:fs/promises'
import { extname, join } from 'node:path'
import sharp from 'sharp'

const dir = process.argv[2] ?? 'static/uploads'
const maxWidth = 2500

const encoders = {
  '.jpg': (img) => img.jpeg({ quality: 85, mozjpeg: true }),
  '.jpeg': (img) => img.jpeg({ quality: 85, mozjpeg: true }),
  '.webp': (img) => img.webp({ quality: 85 }),
  '.png': (img) => img.png({ compressionLevel: 9 })
}

let before = 0
let after = 0

for (const name of await readdir(dir)) {
  const encode = encoders[extname(name).toLowerCase()]
  if (!encode) continue

  const path = join(dir, name)
  const input = await readFile(path)
  const { width = 0 } = await sharp(input).metadata()
  before += input.length

  if (width <= maxWidth) {
    after += input.length
    continue
  }

  const output = await encode(
    sharp(input).rotate().resize({ width: maxWidth, withoutEnlargement: true })
  ).toBuffer()

  if (output.length < input.length) {
    await writeFile(path, output)
    after += output.length
    console.log(`${name}: ${(input.length / 1e6).toFixed(1)} MB -> ${(output.length / 1e6).toFixed(1)} MB`)
  } else {
    after += input.length
  }
}

console.log(`Total: ${(before / 1e6).toFixed(0)} MB -> ${(after / 1e6).toFixed(0)} MB`)
