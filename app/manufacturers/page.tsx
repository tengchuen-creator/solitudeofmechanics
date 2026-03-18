export const dynamic = 'force-dynamic'
export const revalidate = 0

import { client } from '@/sanity/client'
import { allManufacturersQuery } from '@/sanity/lib/queries'
import Link from 'next/link'
import Image from 'next/image'
import FadeIn from '@/components/FadeIn'

const PLACEHOLDER_MANUFACTURERS = [
  { _id: 'm2', name: 'Patek Philippe', slug: { current: 'patek-philippe' }, location: 'Geneva, Switzerland', founded: 'Founded 1839', description: 'Your relationship with the most established name in collecting. What draws you to specific references, the culture surrounding the brand, and the distance between reputation and the actual experience of ownership.' },
  { _id: 'm3', name: 'Vacheron Constantin', slug: { current: 'vacheron-constantin' }, location: 'Geneva, Switzerland', founded: 'Founded 1755', description: 'The oldest continuously operating manufacture. Why certain references from the 1970s and the Overseas line represent a different kind of Genevan watchmaking.' },
  { _id: 'm4', name: 'Rolex', slug: { current: 'rolex' }, location: 'Geneva, Switzerland', founded: 'Founded 1905', description: 'What Rolex means beyond the market. The specific references that earn a place in a collection built on mechanical conviction.' },
  { _id: 'm5', name: 'Grand Seiko', slug: { current: 'grand-seiko' }, location: 'Suwa & Shizukuishi, Japan', founded: 'Founded 1960', description: 'Precision without pretension. The Spring Drive, the Zaratsu polishing, and the philosophical argument for a Japanese approach to high watchmaking.' },
]

export const metadata = {
  title: 'Manufacture Profiles \u2014 Solitude of Mechanics',
}

export default async function ManufacturersPage() {
  const sanityManufacturers = await client.fetch(allManufacturersQuery).catch(() => []) || []

  // Merge: use Sanity entries where available, fill remaining slots with placeholders
  const sanityNames = new Set(sanityManufacturers.map((m: any) => m.name.toLowerCase().replace(/[^a-z]/g, '')))
  const remainingPlaceholders = PLACEHOLDER_MANUFACTURERS.filter(
    p => !sanityNames.has(p.name.toLowerCase().replace(/[^a-z]/g, ''))
  )
  const manufacturers = [...sanityManufacturers, ...remainingPlaceholders]

  return (
    <div className="container">
      <div className="page-header">
        <FadeIn><h1>Manufacture Profiles</h1></FadeIn>
        <FadeIn>
          <p>The houses and independents whose work defines the collection.</p>
        </FadeIn>
      </div>

      <div className="manufacture-list">
        {manufacturers.map((m: any) => (
          <FadeIn key={m._id}>
            <div className="manufacture-entry">
              <div className="manufacture-entry__image">
                {m.imageUrl && (
                  <Image
                    src={m.imageUrl}
                    alt={m.name}
                    width={260}
                    height={195}
                    style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                  />
                )}
              </div>
              <div className="manufacture-entry__content">
                <h2 className="manufacture-entry__name">{m.name}</h2>
                <div className="manufacture-entry__meta">
                  {m.location}
                  {m.founded ? ` \u00b7 ${m.founded}` : ''}
                </div>
                {m.description && (
                  <p className="manufacture-entry__desc">{m.description}</p>
                )}
                <Link
                  href={`/manufacturers/${m.slug.current}`}
                  className="manufacture-entry__link"
                >
                  Read profile
                </Link>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </div>
  )
}
