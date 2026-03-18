import { client } from '@/sanity/client'
import { allEssaysQuery } from '@/sanity/lib/queries'
import Link from 'next/link'
import FadeIn from '@/components/FadeIn'

const PLACEHOLDER_ESSAYS = [
  { _id: 'e1', title: 'On the meaning of complications', slug: { current: 'on-the-meaning-of-complications' }, date: '2026-03', description: 'Why the most complex watches are really about conviction, not utility.' },
  { _id: 'e2', title: 'Why I sold my F.P. Journe collection', slug: { current: 'why-i-sold-my-fp-journe-collection' }, date: '2026-02', description: 'What happens when the market catches up to your taste.' },
  { _id: 'e3', title: 'What my father\u2019s Submariner taught me', slug: { current: 'what-my-fathers-submariner-taught-me' }, date: '2026-01', description: 'On inheritance, sentiment, and the watches that outlive their owners.' },
]

function formatDate(date: string) {
  if (!date) return ''
  const d = new Date(date + (date.length <= 7 ? '-01' : ''))
  return d.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
}

export const metadata = {
  title: 'Essays \u2014 Solitude of Mechanics',
}

export default async function EssaysPage() {
  let essays = await client.fetch(allEssaysQuery).catch(() => [])
  if (!essays || essays.length === 0) {
    essays = PLACEHOLDER_ESSAYS
  }

  return (
    <div className="container">
      <div className="page-header">
        <FadeIn><h1>Essays</h1></FadeIn>
        <FadeIn>
          <p>Long-form writing on the craft, the culture, and the quiet discipline of collecting.</p>
        </FadeIn>
      </div>

      <ul className="essay-list">
        {essays.map((essay: any) => (
          <FadeIn key={essay._id}>
            <li className="essay-item">
              <Link href={`/essays/${essay.slug.current}`}>
                <div className="essay-item__top">
                  <span className="essay-item__title">{essay.title}</span>
                  <span className="essay-item__date">{formatDate(essay.date)}</span>
                </div>
                {essay.description && (
                  <p className="essay-item__desc">{essay.description}</p>
                )}
              </Link>
            </li>
          </FadeIn>
        ))}
      </ul>
    </div>
  )
}
