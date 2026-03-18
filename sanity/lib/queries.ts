import { groq } from 'next-sanity'

// Collection
export const allWatchesQuery = groq`
  *[_type == "watch"] | order(order asc) {
    _id,
    name,
    maker,
    reference,
    slug,
    filterCategory,
    "imageUrl": images[0].asset->url
  }
`

export const watchBySlugQuery = groq`
  *[_type == "watch" && slug.current == $slug][0] {
    _id,
    name,
    maker,
    reference,
    slug,
    year,
    caseMaterial,
    caseDiameter,
    movement,
    complications,
    description,
    notes,
    images[] {
      asset->,
      caption
    }
  }
`

// Essays
export const allEssaysQuery = groq`
  *[_type == "essay"] | order(date desc) {
    _id,
    title,
    slug,
    date,
    description
  }
`

export const essayBySlugQuery = groq`
  *[_type == "essay" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    date,
    description,
    body
  }
`

// Manufacturers
export const allManufacturersQuery = groq`
  *[_type == "manufacturer"] | order(order asc) {
    _id,
    name,
    slug,
    location,
    founded,
    description,
    "imageUrl": image.asset->url
  }
`

export const manufacturerBySlugQuery = groq`
  *[_type == "manufacturer" && slug.current == $slug][0] {
    _id,
    name,
    slug,
    location,
    founded,
    description,
    body,
    image {
      asset->
    }
  }
`
