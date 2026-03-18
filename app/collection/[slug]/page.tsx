import { client } from '@/sanity/client'
import { watchBySlugQuery } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'
import SanityPortableText from '@/components/SanityPortableText'
import Link from 'next/link'
import Image from 'next/image'

type Props = {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props) {
  const watch = await client
    .fetch(watchBySlugQuery, { slug: params.slug })
    .catch(() => null)
  return {
    title: watch
      ? `${watch.name} \u2014 ${watch.maker} \u2014 Solitude of Mechanics`
      : 'Watch \u2014 Solitude of Mechanics',
  }
}

export default async function WatchPage({ params }: Props) {
  const watch = await client
    .fetch(watchBySlugQuery, { slug: params.slug })
    .catch(() => null)

  // Fallback for when Sanity has no data
  if (!watch) {
    return (
      <>
        <div className="watch-gallery">
          <div className="watch-gallery__item watch-gallery__item--placeholder">
            <span>Photograph 1 &mdash; Front dial</span>
          </div>
          <div className="watch-gallery__item watch-gallery__item--placeholder">
            <span>Photograph 2 &mdash; Case profile</span>
          </div>
          <div className="watch-gallery__item watch-gallery__item--placeholder">
            <span>Photograph 3 &mdash; Movement</span>
          </div>
        </div>
        <div className="container">
          <div className="watch-content">
            <div className="watch-content__maker">Maker</div>
            <h1 className="watch-content__name">Watch Name</h1>
            <div className="watch-content__ref">Ref. —</div>
            <dl className="watch-specs">
              <div><dt>Maker</dt><dd>—</dd></div>
              <div><dt>Reference</dt><dd>—</dd></div>
              <div><dt>Year Produced</dt><dd>—</dd></div>
              <div><dt>Movement</dt><dd>—</dd></div>
            </dl>
            <div className="watch-section">
              <div className="watch-section__label">Description</div>
              <p>Content coming soon. Add this watch in the Sanity Studio at /studio.</p>
            </div>
            <Link href="/collection" className="back-link">
              Back to The Collection
            </Link>
          </div>
        </div>
      </>
    )
  }

  const specs = [
    { label: 'Maker', value: watch.maker },
    { label: 'Reference', value: watch.reference },
    { label: 'Name', value: watch.name },
    { label: 'Year Produced', value: watch.year },
    { label: 'Case Material', value: watch.caseMaterial },
    { label: 'Case Diameter', value: watch.caseDiameter },
    { label: 'Movement', value: watch.movement },
    { label: 'Complications', value: watch.complications },
  ].filter((s) => s.value)

  return (
    <>
      <div className="watch-gallery">
        {watch.images && watch.images.length > 0 ? (
          watch.images.map((img: any, i: number) => (
            <div key={i} className="watch-gallery__item">
              <Image
                src={urlFor(img).width(1600).url()}
                alt={img.caption || `${watch.name} photograph ${i + 1}`}
                width={1600}
                height={1000}
                style={{ width: '100%', height: 'auto' }}
                priority={i === 0}
              />
            </div>
          ))
        ) : (
          <>
            <div className="watch-gallery__item watch-gallery__item--placeholder">
              <span>Photograph 1 &mdash; Front dial</span>
            </div>
            <div className="watch-gallery__item watch-gallery__item--placeholder">
              <span>Photograph 2 &mdash; Case profile</span>
            </div>
            <div className="watch-gallery__item watch-gallery__item--placeholder">
              <span>Photograph 3 &mdash; Movement</span>
            </div>
          </>
        )}
      </div>

      <div className="container">
        <div className="watch-content">
          <div className="watch-content__maker">{watch.maker}</div>
          <h1 className="watch-content__name">{watch.name}</h1>
          {watch.reference && (
            <div className="watch-content__ref">Ref. {watch.reference}</div>
          )}

          <dl className="watch-specs">
            {specs.map((s) => (
              <div key={s.label}>
                <dt>{s.label}</dt>
                <dd>{s.value}</dd>
              </div>
            ))}
          </dl>

          {watch.description && (
            <div className="watch-section">
              <div className="watch-section__label">Description</div>
              <SanityPortableText value={watch.description} />
            </div>
          )}

          {watch.notes && (
            <div className="watch-section">
              <div className="watch-section__label">Notes</div>
              <SanityPortableText value={watch.notes} />
            </div>
          )}

          <Link href="/collection" className="back-link">
            Back to The Collection
          </Link>
        </div>
      </div>
    </>
  )
}
