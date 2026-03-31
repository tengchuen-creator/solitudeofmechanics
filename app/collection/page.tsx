export const dynamic = 'force-dynamic'

import { client } from '@/sanity/client'
import { allWatchesQuery } from '@/sanity/lib/queries'
import CollectionFilter from '@/components/CollectionFilter'
import FadeIn from '@/components/FadeIn'
import Link from 'next/link'

// Placeholder data used when Sanity has no content yet
const PLACEHOLDER_WATCHES = [
  { _id: 'p2', name: 'Datograph', maker: 'A. Lange & S\u00f6hne', reference: '403.035', slug: { current: 'datograph' }, filterCategory: 'lange', order: 2 },
  { _id: 'p3', name: 'Nautilus', maker: 'Patek Philippe', reference: '5711/1A', slug: { current: 'nautilus' }, filterCategory: 'patek', order: 3 },
  { _id: 'p4', name: 'Lange 1', maker: 'A. Lange & S\u00f6hne', reference: '101.032', slug: { current: 'lange-1' }, filterCategory: 'lange', order: 4 },
  { _id: 'p5', name: 'Lange 1 Time Zone', maker: 'A. Lange & S\u00f6hne', reference: '116.032', slug: { current: 'lange-1-time-zone' }, filterCategory: 'lange', order: 6 },
  { _id: 'p6', name: 'Zeitwerk', maker: 'A. Lange & S\u00f6hne', slug: { current: 'zeitwerk' }, filterCategory: 'lange', order: 7 },
  { _id: 'p7', name: 'Calatrava', maker: 'Patek Philippe', reference: '5196G', slug: { current: 'calatrava' }, filterCategory: 'patek', order: 8 },
  { _id: 'p8', name: 'Overseas', maker: 'Vacheron Constantin', reference: '4500V', slug: { current: 'overseas' }, filterCategory: 'vc', order: 9 },
  { _id: 'p9', name: 'Chronometre Bleu', maker: 'F.P. Journe', slug: { current: 'chronometre-bleu' }, filterCategory: 'independent', order: 10 },
  { _id: 'p10', name: 'Simplicity', maker: 'Philippe Dufour', slug: { current: 'simplicity' }, filterCategory: 'independent', order: 11 },
  { _id: 'p11', name: 'Vingt-8', maker: 'Kari Voutilainen', slug: { current: 'vingt-8' }, filterCategory: 'independent', order: 12 },
  { _id: 'p12', name: 'Submariner', maker: 'Rolex', reference: '114060', slug: { current: 'submariner' }, filterCategory: 'rolex', order: 13 },
]

export const metadata = {
  title: 'The Collection \u2014 Solitude of Mechanics',
}

export default async function CollectionPage() {
  const sanityWatches = await client.fetch(allWatchesQuery).catch(() => []) || []

  // Merge: use Sanity entries where available, fill remaining slots with placeholders
  const sanityNames = new Set(sanityWatches.map((w: any) => w.name.toLowerCase()))
  const remainingPlaceholders = PLACEHOLDER_WATCHES.filter(
    p => !sanityNames.has(p.name.toLowerCase())
  )
  const watches = [...sanityWatches, ...remainingPlaceholders].sort(
    (a: any, b: any) => (a.order ?? 999) - (b.order ?? 999)
  )

  return (
    <div className="container">
      <div className="page-header">
        <FadeIn>
          <h1>The Collection</h1>
        </FadeIn>
        <FadeIn>
          <p>Forty-six pieces across thirteen makers. Each chosen for movement, not market.</p>
        </FadeIn>
      </div>
      <CollectionFilter watches={watches} />

      <FadeIn>
        <div className="collection-feature-link">
          <Link href="/the-92-set">
            <span className="collection-feature-link__label">Featured</span>
            <span className="collection-feature-link__title">The 92 Set</span>
            <span className="collection-feature-link__sub">Three A. Lange &amp; Söhne limited pieces. Three different complications. One matching number.</span>
          </Link>
        </div>
      </FadeIn>
    </div>
  )
}
