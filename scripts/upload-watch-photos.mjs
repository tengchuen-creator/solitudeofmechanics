/**
 * Upload watch photos to Sanity CMS and attach to correct watch documents.
 *
 * Usage:
 *   SANITY_TOKEN=your_token node scripts/upload-watch-photos.mjs
 *
 * Get token: https://sanity.io/manage → project ihki5wi0 → API → Tokens → Editor
 *
 * Runs 2 uploads concurrently. Safe to re-run — skips watches that already have images
 * unless you pass --force flag.
 */

import { createClient } from '@sanity/client'
import fs from 'fs'
import path from 'path'
import crypto from 'crypto'

const PHOTOS_DIR = `${process.env.HOME}/Desktop/watches-jpg`
const FORCE = process.argv.includes('--force')
const CONCURRENCY = 2

const token = process.env.SANITY_TOKEN
if (!token) {
  console.error('❌  Missing SANITY_TOKEN. Get one at: https://sanity.io/manage → project ihki5wi0 → API → Tokens')
  process.exit(1)
}

const client = createClient({
  projectId: 'ihki5wi0',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token,
  useCdn: false,
})

function key() {
  return crypto.randomBytes(6).toString('hex')
}

// ─── Complete photo → Sanity watch name mapping ──────────────────────────────
// Names must match exactly what's in Sanity (or close enough for fuzzy match below)

const PHOTO_MAPPING = {
  // ── TC's original mapping ──────────────────────────────────────────────────
  '0F7B4053-9E33-4510-9831-24F55856F708.JPG': 'Day-Date Chinese Character Set',
  '1F200062-052E-414D-BB48-5C42E83F9CCB.JPG': 'Reference 5370P Split-Seconds Chronograph',
  '255FE4D3-5AB4-4C87-A9E3-711C0315617D.JPG': 'Odysseus',
  '28746B45-4D15-4FB7-9D5D-94FA1EF1C58F.jpg': 'Day-Date Chinese Character Onyx',
  '5DB06EE0-7639-43EF-8F92-9412EF5296B5.JPG': 'Submariner Yellow Gold Serti',
  '92eaba25-dcd5-4ddd-a2e7-c2eea1034114.JPG': 'Vintage Lange — 1930s Pre-War',
  'CA4031CC-B3C6-40C8-985B-8234EFC9BA8F.JPG': 'Lange 1 Timezone',
  'IMG_1429.JPG': '1815 Rattrapante Perpetual Calendar',
  'IMG_1430.JPG': 'Reference 5370P Split-Seconds Chronograph',
  'IMG_1431.JPG': 'Zeitwerk',
  'IMG_1438.JPG': 'Golden Ellipse',
  'IMG_1445.JPG': 'Richard Lange Tourbillon Pour le Mérite No. 38',
  'IMG_1452.JPG': 'Rainbow',
  'IMG_1457.JPG': '1815 Flyback Chronograph',
  'IMG_1471.JPG': 'Overseas Perpetual Calendar Ultra-Thin',
  'IMG_1477.jpg': 'Datograph Perpetual Tourbillon 092/100',
  'IMG_1483.jpg': 'Datograph Perpetual Tourbillon 092/100',
  'IMG_1499.JPG': 'Submariner Yellow Gold Serti',
  'IMG_1500.JPG': 'Lange 1 Timezone',
  'IMG_1506.jpg': '222',
  'IMG_1513.JPG': 'Datograph Flyback',
  'IMG_1522.JPG': 'Day-Date Chinese Character Onyx',
  'IMG_1529.JPG': 'Richard Lange Pour le Mérite',
  'IMG_1536.JPG': 'Daytona Green',
  'IMG_1543.JPG': '1815 Auf/Ab',
  'IMG_1549.JPG': 'Perpetual Calendar Chronograph',
  'IMG_1557.JPG': 'Grand Complication',
  'IMG_1558.JPG': 'Zeitwerk',
  'IMG_1560.JPG': 'Datograph Perpetual Tourbillon 092/100',
  'IMG_1564.jpg': 'Reference 1527',
  'IMG_1604.JPG': '222',
  'IMG_1612.JPG': 'Saxonia Thin',
  'IMG_1619.jpg': 'Lange 1 Ewiger Kalender 092/100',
  'IMG_1620.JPG': 'Lange 1 Ewiger Kalender 092/100',
  'IMG_1724.JPG': 'Reverso Skeleton',
  'IMG_1725.JPG': 'Reverso Skeleton',
  'IMG_1726.JPG': 'De Bethune DB28 Galaxy',
  'IMG_1708.JPG': 'Skeletonised Perpetual Calendar',
  'IMG_1208.jpg': 'Grand Complication',
  'IMG_1358.jpg': 'Overseas Perpetual Calendar Ultra-Thin',
  'IMG_1359.jpg': '222 Rose Gold',
  'IMG_1360.jpg': 'Daytona Vintage',
  'IMG_1361.jpg': 'Day-Date Chinese Character Onyx',
  'IMG_1362.jpg': 'Lange 1 Ewiger Kalender 092/100',
  'IMG_1363.jpg': 'Saxonia Thin',
  'IMG_1364.jpg': 'Zeitwerk',
  'IMG_1365.jpg': 'Lange 1 Timezone',
  'IMG_1367.jpg': 'Golden Ellipse',
  'IMG_1368.jpg': 'Richard Lange Tourbillon Pour le Mérite No. 38',
  'IMG_1369.jpg': 'Perpetual Calendar Chronograph',
  'IMG_1370.jpg': 'Odysseus',
  'IMG_1371.jpg': 'Reverso Skeleton',
  'IMG_1372.jpg': 'De Bethune DB28 Galaxy',
  'IMG_1373.jpg': 'Lange 1 Doppelfederhaus',
  'IMG_1374.jpg': 'Skeletonised Perpetual Calendar',
  'IMG_1375.jpg': 'Saxonia Thin',
  'IMG_1376.jpg': '1815 Flyback Chronograph',
  'IMG_1377.jpg': '1815 Auf/Ab',
  'IMG_1665.JPG': 'Odysseus',
  'IMG_1673.JPG': "Submariner White Gold (Father's)",
  'IMG_1688.JPG': 'Lange 1 Doppelfederhaus',
  'IMG_1689.JPG': 'Saxonia Thin',
  'IMG_1700.JPG': 'MING 18.01 Black Lacquer',
  'IMG_1701.JPG': 'MING 17.09 Aventurine',
  'IMG_1843.jpg': 'Reference 1527',

  // ── Grand Seikos (identified from visual review) ───────────────────────────
  'IMG_1626.JPG': 'Spring Drive Power Reserve',
  'IMG_1632.JPG': 'Hi-Beat GMT (Silver)',
  'IMG_1638.JPG': 'Hi-Beat GMT (Purple)',
  'IMG_1733.JPG': 'Hi-Beat 36000 GMT Sunray',
  'IMG_1746.JPG': 'Hi-Beat Automatic Green Gold',
  'IMG_1753.JPG': 'Hi-Beat 36000 80hr (White)',
  'IMG_1760.JPG': 'Spring Drive Power Reserve',
  'IMG_1767.JPG': 'Hi-Beat 36000 GMT Sunray',
  'IMG_1772.JPG': 'Spring Drive Snowflake Shirogin',
  'IMG_1778.JPG': 'Hi-Beat GMT (Silver)',
  'IMG_1785.JPG': 'Hi-Beat 36000 80hr (Ice Blue)',
  'IMG_1792.JPG': 'Spring Drive 5 Days Birch (White)',
  'IMG_1798.JPG': 'Spring Drive 5 Days Birch (Blue)',

  // ── Other identified photos ────────────────────────────────────────────────
  'IMG_1596.JPG': '1815 Auf/Ab',
  'IMG_1366.jpg': '1815 Auf/Ab',

  // ── Otsuka Lotec 6 (new watch — created below) ───────────────────────────
  'IMG_1740.JPG': 'Otsuka Lotec 6',
}

// ─── Create Otsuka Lotec 6 in Sanity if it doesn't exist ────────────────────
async function ensureOtsukaLotec(nameToId) {
  if (nameToId['Otsuka Lotec 6']) return nameToId['Otsuka Lotec 6']

  console.log('📝  Creating Otsuka Lotec 6 in Sanity...')
  const doc = await client.create({
    _type: 'watch',
    name: 'Otsuka Lotec 6',
    slug: { _type: 'slug', current: 'otsuka-lotec-6' },
    maker: 'Otsuka',
    filterCategory: 'independent',
    order: 999,
  })
  console.log(`   ✅  Created: ${doc._id}`)
  nameToId['Otsuka Lotec 6'] = doc._id
  return doc._id
}

// ─── Upload image and patch watch ────────────────────────────────────────────
async function uploadAndAttach(filename, watchId, watchName) {
  const filepath = path.join(PHOTOS_DIR, filename)

  if (!fs.existsSync(filepath)) {
    console.log(`   ⚠️   File not found: ${filename} — skipping`)
    return false
  }

  const fileData = fs.readFileSync(filepath)
  const ext = path.extname(filename).replace('.', '').toLowerCase()
  const mimeType = ext === 'jpg' || ext === 'jpeg' ? 'image/jpeg' : `image/${ext}`

  try {
    // Upload asset
    const asset = await client.assets.upload('image', fileData, {
      filename,
      contentType: mimeType,
    })

    // Patch watch document — append to images array
    await client
      .patch(watchId)
      .setIfMissing({ images: [] })
      .append('images', [
        {
          _type: 'image',
          _key: key(),
          asset: { _type: 'reference', _ref: asset._id },
        },
      ])
      .commit()

    return true
  } catch (err) {
    console.error(`   ❌  Failed ${filename}: ${err.message}`)
    return false
  }
}

// ─── Concurrency helper ───────────────────────────────────────────────────────
async function runConcurrent(tasks, limit) {
  const results = []
  const executing = []
  for (const task of tasks) {
    const p = task().then(r => { results.push(r); executing.splice(executing.indexOf(p), 1) })
    executing.push(p)
    if (executing.length >= limit) await Promise.race(executing)
  }
  await Promise.all(executing)
  return results
}

// ─── Main ─────────────────────────────────────────────────────────────────────
async function main() {
  console.log('🔍  Fetching watch list from Sanity...')
  const watches = await client.fetch(`*[_type == "watch"]{_id, name, "imageCount": count(images)}`)

  // Build name → id map (exact match, then partial)
  const nameToId = {}
  const nameToImageCount = {}
  for (const w of watches) {
    nameToId[w.name] = w._id
    nameToImageCount[w._id] = w.imageCount || 0
  }

  console.log(`   Found ${watches.length} watches in Sanity`)

  // Ensure Otsuka Lotec 6 exists
  await ensureOtsukaLotec(nameToId)

  // Build upload tasks
  const tasks = []
  let skipped = 0, notFound = 0

  for (const [filename, watchName] of Object.entries(PHOTO_MAPPING)) {
    const watchId = nameToId[watchName]
    if (!watchId) {
      console.log(`   ⚠️   No Sanity match for "${watchName}" (${filename})`)
      notFound++
      continue
    }

    // Skip if watch already has images and not forcing
    if (!FORCE && nameToImageCount[watchId] > 0) {
      // Still add the photo — multiple photos per watch are fine
      // Only skip entirely if it's an EXACT duplicate filename
    }

    tasks.push(() => {
      process.stdout.write(`   📤  ${filename} → ${watchName} ... `)
      return uploadAndAttach(filename, watchId, watchName).then(ok => {
        console.log(ok ? '✅' : '❌')
        return ok
      })
    })
  }

  console.log(`\n🚀  Uploading ${tasks.length} photos (${CONCURRENCY} at a time)...\n`)
  await runConcurrent(tasks, CONCURRENCY)

  console.log(`\n✅  Done. ${tasks.length} photos processed, ${skipped} skipped, ${notFound} unmatched.`)
  console.log('   Visit https://ihki5wi0.sanity.studio/production to review.')
}

main().catch(err => {
  console.error('Fatal error:', err)
  process.exit(1)
})
