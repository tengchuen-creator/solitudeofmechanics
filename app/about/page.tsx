export const metadata = {
  title: 'About \u2014 Solitude of Mechanics',
}

export default function AboutPage() {
  return (
    <div className="container">
      <div className="about">
        <h1 style={{ marginBottom: 48 }}>About</h1>
        <div className="about__body">
          <p>
            This archive exists because I believe a private collection should be
            recorded with the same care that went into building it. Every watch
            here was chosen for its movement, its maker, or the conviction
            behind its design &mdash; not for its market position.
          </p>
          <p>
            I started collecting because I wanted to understand how the best
            watchmakers think. Not the brands, but the people. The decisions
            they made at the bench, the problems they refused to solve with
            shortcuts, the details they finished knowing no one would ever see
            them.
          </p>
          <p>
            Solitude of Mechanics is a personal project. There is nothing for
            sale here. No affiliate links, no sponsored content, no advertising.
            If the writing is useful to you, that is enough.
          </p>
        </div>
        <div className="about__sig">TC</div>
      </div>
    </div>
  )
}
