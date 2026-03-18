import { client } from '@/sanity/client'
import { essayBySlugQuery } from '@/sanity/lib/queries'
import SanityPortableText from '@/components/SanityPortableText'
import Link from 'next/link'

type Props = {
  params: { slug: string }
}

function formatDate(date: string) {
  if (!date) return ''
  const d = new Date(date + (date.length <= 7 ? '-01' : ''))
  return d.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
}

export async function generateMetadata({ params }: Props) {
  const essay = await client
    .fetch(essayBySlugQuery, { slug: params.slug })
    .catch(() => null)
  return {
    title: essay
      ? `${essay.title} \u2014 Solitude of Mechanics`
      : 'Essay \u2014 Solitude of Mechanics',
  }
}

export default async function EssayPage({ params }: Props) {
  const essay = await client
    .fetch(essayBySlugQuery, { slug: params.slug })
    .catch(() => null)

  if (!essay) {
    return (
      <div className="container--reading">
        <article className="essay-reading">
          <Link href="/essays" className="back-link">Back to Essays</Link>
          <h1 className="essay-reading__title">Essay</h1>
          <div className="essay-reading__body">
            <p>Content coming soon. Add this essay in the Sanity Studio at /studio.</p>
          </div>
          <Link href="/essays" className="back-link" style={{ marginTop: 80 }}>
            Back to Essays
          </Link>
        </article>
      </div>
    )
  }

  return (
    <div className="container--reading">
      <article className="essay-reading">
        <Link href="/essays" className="back-link">Back to Essays</Link>
        <div className="essay-reading__date">{formatDate(essay.date)}</div>
        <h1 className="essay-reading__title">{essay.title}</h1>
        <div className="essay-reading__body">
          {essay.body ? (
            <SanityPortableText value={essay.body} />
          ) : (
            <p>Content coming soon.</p>
          )}
        </div>
        <Link href="/essays" className="back-link" style={{ marginTop: 80 }}>
          Back to Essays
        </Link>
      </article>
    </div>
  )
}
