export const dynamic = 'force-dynamic'
export const revalidate = 0

import { client } from '@/sanity/client'
import { urlFor } from '@/sanity/lib/image'
import { groq } from 'next-sanity'
import Image from 'next/image'
import Link from 'next/link'
import FadeIn from '@/components/FadeIn'

export const metadata = {
  title: 'The Last Set — Solitude of Mechanics',
  description: 'Three A. Lange & Söhne pieces from separate limited series of 100. The last complete threesome at that number.',
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
          <h1 className="set-hero__title">The Last Set</h1>
          <p className="set-hero__sub">Three pieces. One number. Complete.</p>
        </FadeIn>
      </div>

      {/* Introduction */}
      <div className="container">
        <div className="set-intro">
          <FadeIn>
            <p>
              The Lange boutique called and said they had something to show me. Three pieces from separate limited series of 100 — the Datograph Perpetual Tourbillon, the Lange 1 Ewiger Kalender in honey gold, the Lange 1 Ewiger Kalender in white gold with salmon dial. All carrying the same number. The last complete threesome at that number. They were offering the set.
            </p>
            <p>
              I hesitated. I knew the Datograph. I knew the honey gold Ewiger Kalender. The Lange 1 was less familiar to me — I had never spent real time with one, and I was not sure I would want to.
            </p>
            <p>
              Coincidentally, they had the salmon piece in the store that day. They put it on the counter. I picked it up.
            </p>
            <p>
              It instantly became the one I liked most out of the three.
            </p>
            <p>
              That is the story of this set. Not a hunt across years or a number noticed on a caseback after the fact. A single afternoon, a single decision, and a watch I did not expect to love becoming the reason I said yes.
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
              Lange numbers each piece of a limited series on the caseback. The number is private — visible only when the watch is off the wrist, only to the person holding it. The same number appears on the back of all three.
            </p>
            <p>
              The set has stayed together since that afternoon. It will continue to.
            </p>
            <p>
              The watch you hesitate over is often the one that matters most.
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
