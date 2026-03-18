import { client } from '@/sanity/client'
import { manufacturerBySlugQuery } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'
import SanityPortableText from '@/components/SanityPortableText'
import Link from 'next/link'
import Image from 'next/image'

type Props = {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props) {
  const manufacturer = await client
    .fetch(manufacturerBySlugQuery, { slug: params.slug })
    .catch(() => null)
  return {
    title: manufacturer
      ? `${manufacturer.name} \u2014 Solitude of Mechanics`
      : 'Manufacturer \u2014 Solitude of Mechanics',
  }
}

export default async function ManufacturerPage({ params }: Props) {
  const manufacturer = await client
    .fetch(manufacturerBySlugQuery, { slug: params.slug })
    .catch(() => null)

  if (!manufacturer) {
    return (
      <>
        <div className="manufacture-profile__hero" />
        <div className="container">
          <div className="manufacture-profile">
            <Link href="/manufacturers" className="back-link">
              Back to Manufacturers
            </Link>
            <h1 className="manufacture-profile__name">Manufacturer</h1>
            <div className="manufacture-profile__body">
              <p>Content coming soon. Add this manufacturer in the Sanity Studio at /studio.</p>
            </div>
            <Link href="/manufacturers" className="back-link" style={{ marginTop: 80 }}>
              Back to Manufacturers
            </Link>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <div className="manufacture-profile__hero">
        {manufacturer.image?.asset && (
          <Image
            src={urlFor(manufacturer.image).width(1600).url()}
            alt={manufacturer.name}
            width={1600}
            height={685}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            priority
          />
        )}
      </div>
      <div className="container">
        <div className="manufacture-profile">
          <Link href="/manufacturers" className="back-link">
            Back to Manufacturers
          </Link>
          <h1 className="manufacture-profile__name">{manufacturer.name}</h1>
          <div className="manufacture-profile__location">
            {manufacturer.location}
            {manufacturer.founded ? ` \u00b7 ${manufacturer.founded}` : ''}
          </div>
          <div className="manufacture-profile__body">
            {manufacturer.body ? (
              <SanityPortableText value={manufacturer.body} />
            ) : (
              <p>Full profile coming soon.</p>
            )}
          </div>
          <Link href="/manufacturers" className="back-link" style={{ marginTop: 80 }}>
            Back to Manufacturers
          </Link>
        </div>
      </div>
    </>
  )
}
