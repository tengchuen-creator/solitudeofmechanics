export const dynamic = 'force-dynamic'
export const revalidate = 0

import { client } from '@/sanity/client'
import { urlFor } from '@/sanity/lib/image'
import { groq } from 'next-sanity'
import Image from 'next/image'
import Link from 'next/link'
import FadeIn from '@/components/FadeIn'

export const metadata = {
  title: 'The 92 Set — Solitude of Mechanics',
  description: 'Three A. Lange & Söhne pieces. Same honey gold and white gold. Same number. 092 of 100.',
}

const THE_92_SLUGS = [
  'datograph-perpetual-tourbillon-092-100',
  'lange-1-ewiger-kalender-092-100',
  'lange-1-perpetual-calendar-salmon-092-100',
]

const query = groq`
  *[_type == "watch" && slug.current in $slugs] | order(order asc) {
    _id,
    name,
    maker,
    reference,
    slug,
    year,
    caseMaterial,
    complications,
    movement,
    images[] {
      asset->,
      caption
    }
  }
`

export default async function The92SetPage() {
  const watches = await client
    .fetch(query, { slugs: THE_92_SLUGS })
    .catch(() => []) as any[]

  // Reorder to match preferred display order
  const ordered = THE_92_SLUGS
    .map(slug => watches.find((w: any) => w.slug?.current === slug))
    .filter(Boolean)

  return (
    <div className="the-92-set">

      {/* Header */}
      <div className="set-hero">
        <FadeIn>
          <div className="set-hero__eyebrow">A. Lange &amp; Söhne</div>
          <h1 className="set-hero__title">The 92 Set</h1>
          <p className="set-hero__sub">092 of 100, three times.</p>
        </FadeIn>
      </div>

      {/* Introduction */}
      <div className="container">
        <div className="set-intro">
          <FadeIn>
            <p>
              In 2015, A. Lange & Söhne produced three watches in limited series of 100. The Datograph Perpetual Tourbillon. The Lange 1 Ewiger Kalender in honey gold. The Lange 1 Ewiger Kalender in white gold with salmon dial. Each numbered individually, each independent.
            </p>
            <p>
              I own number 092 of all three.
            </p>
            <p>
              This was not planned. The first piece arrived through a relationship, the second through persistence, the third through a coincidence I did not recognise until I held it and looked at the caseback. When the number appeared — 092 — for the third time, in a different metal, a different complication, a different dial — something settled.
            </p>
            <p>
              A set of one is a watch. A set of three, with the same number, from the same year, from the same house, made within the same walls by the same hands — that is something else. It does not have a name in the catalogues because it was never intended to happen.
            </p>
          </FadeIn>
        </div>
      </div>

      {/* The three watches */}
      <div className="set-watches">
        {ordered.map((watch: any, idx: number) => {
          const images = watch.images || []
          const firstImage = images[0]

          const romanNumerals = ['I', 'II', 'III']

          return (
            <FadeIn key={watch._id}>
              <div className="set-watch">
                <div className="set-watch__number">{romanNumerals[idx]}</div>

                {/* Gallery: first image large, remaining smaller */}
                <div className="set-watch__gallery">
                  {firstImage ? (
                    <div className="set-watch__gallery-main">
                      <Image
                        src={urlFor(firstImage).width(1800).url()}
                        alt={`${watch.name} — primary photograph`}
                        width={1800}
                        height={1200}
                        style={{ width: '100%', height: 'auto' }}
                        priority={idx === 0}
                      />
                    </div>
                  ) : (
                    <div className="set-watch__gallery-main set-watch__gallery-placeholder">
                      <span>Photograph pending</span>
                    </div>
                  )}
                  {images.length > 1 && (
                    <div className="set-watch__gallery-secondary">
                      {images.slice(1).map((img: any, i: number) => (
                        <div key={i} className="set-watch__gallery-thumb">
                          <Image
                            src={urlFor(img).width(900).url()}
                            alt={`${watch.name} photograph ${i + 2}`}
                            width={900}
                            height={600}
                            style={{ width: '100%', height: 'auto' }}
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="set-watch__info">
                  <div className="set-watch__maker">{watch.maker}</div>
                  <h2 className="set-watch__name">{watch.name}</h2>
                  <div className="set-watch__ref">
                    Ref. {watch.reference}
                    {watch.year && <> &middot; {watch.year}</>}
                    {watch.caseMaterial && <> &middot; {watch.caseMaterial}</>}
                  </div>
                  {watch.complications && (
                    <div className="set-watch__complications">{watch.complications}</div>
                  )}
                  <Link
                    href={`/collection/${watch.slug.current}`}
                    className="set-watch__link"
                  >
                    View in collection
                  </Link>
                </div>
              </div>
            </FadeIn>
          )
        })}
      </div>

      {/* Closing */}
      <div className="container">
        <div className="set-closing">
          <FadeIn>
            <p>
              Lange numbers each piece of a limited series on the caseback, not the dial. The number is private — visible only to the owner, only when the watch is off the wrist. It is not meant to be seen by anyone else. I knew, when I checked the back of the third piece and saw 092, that this set would stay together.
            </p>
            <p>
              092 of 100. Three times.
            </p>
            <p>
              Some coincidences earn a shelf.
            </p>
          </FadeIn>
          <FadeIn>
            <Link href="/collection" className="back-link">
              Back to The Collection
            </Link>
          </FadeIn>
        </div>
      </div>

    </div>
  )
}
