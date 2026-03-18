import { PortableText } from '@portabletext/react'

export default function SanityPortableText({ value }: { value: any }) {
  if (!value) return null
  return <PortableText value={value} />
}
