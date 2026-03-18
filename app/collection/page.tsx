import { client } from '@/sanity/client'
import { allWatchesQuery } from '@/sanity/lib/queries'
import CollectionFilter from '@/components/CollectionFilter'
import FadeIn from '@/components/FadeIn'

// Placeholder data used when Sanity has no content yet
const PLACEHOLDER_WATCHES = [
  { _id: 'p1', name: '222', maker: 'Vacheron Constantin', reference: '44018', slug: { current: 'vacheron-222' }, filterCategory: 'vc' },
  { _id: 'p2', name: 'Datograph', maker: 'A. Lange & S\u00f6hne', reference: '403.035', slug: { current: 'datograph' }, filterCategory: 'lange' },
  { _id: 'p3', name: 'Nautilus', maker: 'Patek Philippe', reference: '5711/1A', slug: { current: 'nautilus' }, filterCategory: 'patek' },
  { _id: 'p4', name: 'Lange 1', maker: 'A. Lange & S\u00f6hne', reference: '101.032', slug: { current: 'lange-1' }, filterCategory: 'lange' },
  { _id: 'p5', name: 'Lange 1 Time Zone', maker: 'A. Lange & S\u00f6hne', reference: '116.032', slug: { current: 'lange-1-time-zone' }, filterCategory: 'lange' },
  { _id: 'p6', name: 'Zeitwerk', maker: 'A. Lange & S\u00f6hne', slug: { current: 'zeitwerk' }, filterCategory: 'lange' },
  { _id: 'p7', name: 'Calatrava', maker: 'Patek Philippe', reference: '5196G', slug: { current: 'calatrava' }, filterCategory: 'patek' },
  { _id: 'p8', name: 'Overseas', maker: 'Vacheron Constantin', reference: '4500V', slug: { current: 'overseas' }, filterCategory: 'vc' },
  { _id: 'p9', name: 'Chronometre Bleu', maker: 'F.P. Journe', slug: { current: 'chronometre-bleu' }, filterCategory: 'independent' },
  { _id: 'p10', name: 'Simplicity', maker: 'Philippe Dufour', slug: { current: 'simplicity' }, filterCategory: 'independent' },
  { _id: 'p11', name: 'Vingt-8', maker: 'Kari Voutilainen', slug: { current: 'vingt-8' }, filterCategory: 'independent' },
  { _id: 'p12', name: 'Submariner', maker: 'Rolex', reference: '114060', slug: { current: 'submariner' }, filterCategory: 'rolex' },
]

export const metadata = {
  title: 'The Collection \u2014 Solitude of Mechanics',
}

export default async function CollectionPage() {
  let watches = await client.fetch(allWatchesQuery).catch(() => [])
  if (!watches || watches.length === 0) {
    watches = PLACEHOLDER_WATCHES
  }

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
    </div>
  )
}
