'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import FadeIn from './FadeIn'

type Watch = {
  _id: string
  name: string
  maker: string
  reference?: string
  slug: { current: string }
  filterCategory?: string
  imageUrl?: string
}

const FILTERS = [
  { label: 'All', value: 'all' },
  { label: 'A. Lange & S\u00f6hne', value: 'lange' },
  { label: 'Patek Philippe', value: 'patek' },
  { label: 'Vacheron Constantin', value: 'vc' },
  { label: 'Rolex', value: 'rolex' },
  { label: 'Grand Seiko', value: 'gs' },
  { label: 'Independents', value: 'independent' },
]

export default function CollectionFilter({ watches }: { watches: Watch[] }) {
  const [active, setActive] = useState('all')

  const filtered =
    active === 'all'
      ? watches
      : watches.filter((w) => w.filterCategory === active)

  return (
    <>
      <div className="collection-filters">
        {FILTERS.map((f) => (
          <button
            key={f.value}
            className={active === f.value ? 'active' : ''}
            onClick={() => setActive(f.value)}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="collection-grid">
        {filtered.map((watch) => (
          <FadeIn key={watch._id}>
            <Link
              href={`/collection/${watch.slug.current}`}
              className="collection-tile"
            >
              <div
                className={`collection-tile__image ${!watch.imageUrl ? 'collection-tile__image--placeholder' : ''}`}
              >
                {watch.imageUrl ? (
                  <Image
                    src={watch.imageUrl}
                    alt={watch.name}
                    width={400}
                    height={500}
                    style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                  />
                ) : (
                  <span>Photograph</span>
                )}
              </div>
              <div className="collection-tile__info">
                <div className="collection-tile__maker">{watch.maker}</div>
                <div className="collection-tile__ref">
                  {watch.name}
                  {watch.reference ? ` \u00b7 ${watch.reference}` : ''}
                </div>
              </div>
            </Link>
          </FadeIn>
        ))}
      </div>
    </>
  )
}
