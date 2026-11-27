import { readFile, stat } from 'node:fs/promises'
import assert from 'node:assert/strict'
import { resolve, sep } from 'node:path'

const root = resolve('dist')
const html = await readFile(resolve(root, 'index.html'), 'utf8')
assert.match(html, /<html lang="es">/, 'El idioma del documento debe ser español')
const assets = [...html.matchAll(/(?:src|href)="([^"]+)"/g)]
  .map((match) => match[1]).filter((url) => url.startsWith('/'))
assert(assets.some((asset) => asset.endsWith('.js')), 'Falta el bundle JavaScript')
assert(assets.some((asset) => asset.endsWith('.css')), 'Falta el CSS compilado')
for (const asset of assets) {
  const path = resolve(root, `.${asset}`)
  assert(path.startsWith(`${root}${sep}`), 'Asset fuera de dist')
  assert((await stat(path)).isFile(), `No existe ${asset}`)
}
const pdf = await readFile(resolve(root, 'Diego-Bercian-CV.pdf'))
assert.equal(pdf.subarray(0, 5).toString(), '%PDF-', 'El CV debe ser un PDF real')
assert(pdf.length > 1000, 'El CV parece incompleto')
const hosting = JSON.parse(await readFile('firebase.json', 'utf8'))
assert.equal(hosting.hosting.public, 'dist')
assert(hosting.hosting.rewrites.some((rule) => rule.source === '**' && rule.destination === '/index.html'))
console.log(`Bundle verificado: ${assets.length} assets, CV PDF y rutas de Firebase.`)
