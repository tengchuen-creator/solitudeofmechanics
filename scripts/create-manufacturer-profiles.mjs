import { createClient } from '@sanity/client'
import crypto from 'crypto'

const client = createClient({
  projectId: 'ihki5wi0',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_TOKEN,
  useCdn: false,
})

const key = () => crypto.randomBytes(8).toString('hex')

function para(text) {
  return {
    _type: 'block',
    _key: key(),
    style: 'normal',
    markDefs: [],
    children: [{ _type: 'span', _key: key(), text, marks: [] }],
  }
}

function heading(text) {
  return {
    _type: 'block',
    _key: key(),
    style: 'h2',
    markDefs: [],
    children: [{ _type: 'span', _key: key(), text, marks: [] }],
  }
}

const MANUFACTURERS = [
  {
    name: 'Vacheron Constantin',
    slug: 'vacheron-constantin',
    location: 'Geneva, Switzerland',
    founded: 'Founded 1755',
    order: 3,
    description: 'The oldest continuously operating manufacture. Why certain references from the 1970s and the Overseas line represent a different kind of Genevan watchmaking.',
    body: [
      para('There is a version of Vacheron Constantin that belongs to the trophy cabinet — the Grand Complication, the Patrimony, the Historiques. Fine watches for men who are done thinking about what they wear. I respect that version of the brand. It is not the one that interests me.'),
      para('What drew me to Vacheron was the 222. Designed by Jörg Hysek in 1977, it was their answer to the Royal Oak, the Nautilus — the moment when Geneva\'s oldest house decided it could play a different game. The integrated bracelet, the H-shaped bezel, the integrated lugs. It did not feel like a compromise. It felt like a considered argument.'),
      para('I own two 222s. One in steel with the original bracelet, one in rose gold. They sit differently on the wrist. The steel one is the daily companion — unpretentious, slightly athletic, a watch that does not announce itself. The rose gold one is the statement made quietly, the one you wear when you want to understand why warm metals fell out of fashion and then slowly came back.'),
      heading('The Overseas'),
      para('The Overseas Perpetual Calendar Ultra-Thin is the watch I reach for when I want to feel the full weight of what Geneva can do when it is not performing. The perpetual calendar mechanism is thin enough that the case itself feels like a declaration of intent. This is not a watch about complications for their own sake. It is about how much can disappear into 8.1mm of metal.'),
      para('The blue dial version I own has a quality of light that photographs cannot capture. It changes across a day. In the morning it reads deep ocean. By afternoon it has shifted to something cooler, more distant. No other watchmaker I own does this in quite the same way.'),
      heading('What Vacheron Represents'),
      para('Vacheron Constantin does not have the same cult around it that Patek or Lange does. The secondary market is thinner. The collector discourse is quieter. I consider this an advantage. You can study the brand on your own terms, without the noise of consensus telling you which references matter.'),
      para('The 222 has been rediscovered. The Overseas has found a generation that understands it. But neither has been overrun. There is still space to have a genuine relationship with these pieces rather than a market position.'),
      para('That is what I am after.'),
    ],
  },
  {
    name: 'Rolex',
    slug: 'rolex',
    location: 'Geneva, Switzerland',
    founded: 'Founded 1905',
    order: 4,
    description: 'What Rolex means beyond the market. The specific references that earn a place in a collection built on mechanical conviction.',
    body: [
      para('My father owned two Rolexes. A Submariner and a Day-Date. He wore the Submariner every day without ceremony — to work, to weddings, to nothing in particular. When I was a child I thought of it as furniture. Something that was simply there.'),
      para('I understand now that this is exactly what Rolex intended, and exactly what they achieved. No other watchmaker has so completely collapsed the distance between instrument and object. A Rolex is a tool that does not feel like a tool. It is also jewellery that does not perform as jewellery. This dual nature — the refusal to be pinned to a category — is the most interesting thing about the brand.'),
      heading('The Day-Date'),
      para('The Day-Date is the watch that should not appeal to me and does. It is maximalist in a way my collection otherwise is not. The President bracelet, the day window, the tonneau case — each element alone would be too much. Together they form something coherent.'),
      para('I have accumulated five Day-Dates with Chinese character dials. This is not a coincidence. The Chinese character dial is one of the few instances of Rolex acknowledging that the watch exists in cultural context — that meaning is carried not just through movement and case, but through text and symbol. The characters feel hand-carved even when they are not. They give the Day-Date a specificity it would otherwise lack.'),
      para('The Lapis Lazuli Onyx dial version is the one I wear least and think about most. The stone dial is not stone the way a painting is paint. It is geology compressed to 28mm, carrying 150 million years of sedimentation into a wristwatch.'),
      heading('Daytona and Submariner'),
      para('The Daytona Green is the only reference in my collection I would describe as loud. The green ceramic bezel, the white dial, the pushers. It is not restrained. I wear it when I want to be somewhere different in my own head — when the quiet pieces feel like too much silence.'),
      para('The Submariner Yellow Gold Serti with the diamond bezel is a different kind of excess. Where the Daytona shouts, this one whispers expensively. The yellow gold case has warmth that steel can never replicate. The diamond bezel is objectively too much and I have made peace with that.'),
      heading('What Rolex Actually Is'),
      para('The collector discourse around Rolex is often about what it is not — not independent, not hand-finished to the standard of Lange or Patek, not a philosophical statement. All of this is true and none of it matters.'),
      para('Rolex makes watches that work. They make watches that carry meaning across generations without requiring explanation. My father\'s Submariner told me something about durability and utility and the value of things that simply continue. I have tried to carry that into my own collection, in my own way.'),
    ],
  },
  {
    name: 'Grand Seiko',
    slug: 'grand-seiko',
    location: 'Suwa & Shizukuishi, Japan',
    founded: 'Founded 1960',
    order: 5,
    description: 'Precision without pretension. The Spring Drive, the Zaratsu polishing, and the philosophical argument for a Japanese approach to high watchmaking.',
    body: [
      para('There is a question that Grand Seiko forces you to answer: what do you believe watchmaking is for? If the answer is tradition, lineage, the accumulated weight of a name — Grand Seiko will always feel insufficient. If the answer is the quality of the object itself, the exactness of every surface, the silence of a well-regulated movement — then Grand Seiko will eventually seem obvious.'),
      para('I came to the brand late, as most collectors outside Japan do. The Zaratsu polishing was the entry point. Not the marketing around it — the thing itself, held under good light. The mirror finish on a Grand Seiko case has no equivalent in Swiss watchmaking at the price. The bevels are exact. The transitions between surfaces are clean in a way that makes Swiss cases look slightly approximate.'),
      heading('The Spring Drive'),
      para('The Spring Drive movement is the reason Grand Seiko occupies a unique position in my collection. It is not a quartz watch. It is not a mechanical watch. It is a third thing: a mainspring driving a gear train regulated by an electromagnetic brake controlled by a quartz oscillator. The accuracy achieved — typically ±1 second per day, sometimes better — is the result of a genuinely novel engineering approach rather than incremental refinement of an existing one.'),
      para('I own the Spring Drive Power Reserve in two versions — the SBGA211 Snowflake Shirogin and the standard white dial. The Snowflake dial is the one collectors talk about because it is easy to talk about. The dial texture — inspired by the snowfields of Shizukuishi in winter — reads differently at every angle. It is one of the most photographed dials in watchmaking for a reason.'),
      para('What I find equally interesting is the power reserve version. The sub-dial is positioned at 6 o\'clock with a simplicity that feels Japanese in the best sense — no element that does not earn its space.'),
      heading('Hi-Beat and the GMT Question'),
      para('The Hi-Beat 36000 is a different argument. 10 beats per second, the seconds hand gliding rather than stepping. It is a mechanical achievement dressed as an aesthetic one — the smoothness of the sweep is a consequence of the frequency, not a design choice. I appreciate this. Grand Seiko does not perform its precision. It demonstrates it.'),
      para('The GMT variants — the Hi-Beat GMT in silver, in purple, the 36000 Sunray — are the watches I wear when I am travelling or simply need to track two time zones without theatre. They are not complicated watches. They are precise ones.'),
      heading('The Japanese Argument'),
      para('Switzerland has a monopoly on the idea of fine watchmaking because it built the language through which the idea is expressed. Grand Seiko represents a different set of values — functional precision, material honesty, seasonal and natural motifs, craftsmanship that does not announce itself.'),
      para('My collection sits at an intersection. The Lange pieces make arguments about German engineering tradition. The Patek pieces make arguments about Genevan grand complication. Grand Seiko makes an argument about Japan, about Shizukuishi and Suwa, about what happens when a culture with different aesthetics and different values turns its attention to the wristwatch.'),
      para('That argument deserves space in any serious collection.'),
    ],
  },
  {
    name: 'Independents',
    slug: 'independents',
    location: 'Various',
    founded: '',
    order: 6,
    description: 'De Bethune, MING, Otsuka. The watchmakers outside the major houses whose work defines the outer edges of what the wristwatch can be.',
    body: [
      para('The independents occupy a different space in how I think about collecting. The major houses — Lange, Patek, Vacheron, Rolex, Grand Seiko — have legacies that arrive with the watch. A buyer inherits a relationship with history. The independents offer something harder to articulate: the work of a mind operating without institutional constraint.'),
      heading('De Bethune'),
      para('De Bethune is the watchmaker I recommend first to anyone who thinks they understand what a Swiss watch can look like. The DB28 Galaxy has a dial made from meteorite — not as a novelty but as a considered material choice, the most ancient thing we know to be real deployed in the most time-focused object we make. The movement architecture, the titanium spherical moon phase, the pressed dome of the case — it is the work of people who took seriously the question of what a watch should look like if you began from nothing.'),
      para('What strikes me most about De Bethune is the restraint within the ambition. The Galaxy dial is extreme in its material, but the layout is calm. The hours are legible. The moon phase is accurate to a degree that matters. This is the discipline that separates the serious independents from the ones performing strangeness.'),
      heading('MING'),
      para('MING is a different kind of independent — a design-led manufacture from Kuala Lumpur that works with movement specialists to produce watches in very small series. My 18.01 Black Lacquer and the 17.09 Aventurine are the smallest watches I own, and among the most considered.'),
      para('The aventurine dial on the 17.09 carries a quality of depth that no photograph transmits accurately. It looks like starfield. In certain light it reads as solid material; in others it opens. The case design — the way the strap integrates, the proportions — is the work of someone who has spent time with watches from every tradition and decided to start the argument again.'),
      para('MING makes watches in editions of two to three hundred pieces. Each one comes with a level of direct communication from the founders that no major house can replicate. You know where every decision came from. This transparency is part of what the watches are.'),
      heading('Otsuka'),
      para('The Otsuka Lotec 6 is the most obscure piece in my collection, and possibly the most unusual. Otsuka is a one-man atelier in Toshima, Tokyo. The Lotec 6 — a bespoke timepiece built to client specification — is the kind of watch that does not exist in any catalogue, cannot be acquired through any retailer, and requires a relationship before it can be discussed at all.'),
      para('I will write more about this piece in time. For now: it is the evidence that the wristwatch, at its furthest edge, is still a craft object — something made by a specific human being for a specific purpose. All the manufacturing efficiency and brand architecture in the world cannot replicate that.'),
      heading('Why Independents'),
      para('Every major house began as an independent. Patek Philippe was two men working in a Geneva workshop. Lange was a watchmaker returning to Glashütte after exile. Grand Seiko was a division within Seiko that believed precision mattered more than market position.'),
      para('The independents I collect are not nostalgic choices. They are arguments about what still matters when you remove everything that has accumulated around the object. The movement, the dial, the case — and the mind behind them.'),
    ],
  },
]

async function run() {
  const token = process.env.SANITY_TOKEN
  if (!token) {
    console.error('❌  SANITY_TOKEN not set')
    process.exit(1)
  }

  // Check what's already in Sanity
  const existing = await client.fetch(`*[_type == "manufacturer"]{ name, slug }`)
  const existingNames = new Set(existing.map(m => m.name.toLowerCase()))
  console.log(`📋  ${existing.length} manufacturers already in Sanity: ${existing.map(m => m.name).join(', ')}`)

  for (const m of MANUFACTURERS) {
    if (existingNames.has(m.name.toLowerCase())) {
      console.log(`⏭️   Skipping ${m.name} (already exists)`)
      continue
    }

    console.log(`✍️   Creating ${m.name}...`)
    const doc = {
      _type: 'manufacturer',
      name: m.name,
      slug: { _type: 'slug', current: m.slug },
      location: m.location,
      founded: m.founded,
      description: m.description,
      body: m.body,
      order: m.order,
    }

    const result = await client.create(doc)
    console.log(`   ✅  ${m.name} → ${result._id}`)
  }

  console.log('\n🎉  Done. Visit https://ihki5wi0.sanity.studio/production to review.')
}

run().catch(err => {
  console.error('❌', err.message)
  process.exit(1)
})
