import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'watch',
  title: 'Watch',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'maker',
      title: 'Maker',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'reference',
      title: 'Reference',
      type: 'string',
    }),
    defineField({
      name: 'year',
      title: 'Year Produced',
      type: 'string',
    }),
    defineField({
      name: 'caseMaterial',
      title: 'Case Material',
      type: 'string',
    }),
    defineField({
      name: 'caseDiameter',
      title: 'Case Diameter',
      type: 'string',
    }),
    defineField({
      name: 'movement',
      title: 'Movement',
      type: 'string',
    }),
    defineField({
      name: 'complications',
      title: 'Complications',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'notes',
      title: 'Notes',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'caption',
              type: 'string',
              title: 'Caption',
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'filterCategory',
      title: 'Filter Category',
      type: 'string',
      options: {
        list: [
          { title: 'A. Lange & Sohne', value: 'lange' },
          { title: 'Patek Philippe', value: 'patek' },
          { title: 'Vacheron Constantin', value: 'vc' },
          { title: 'Rolex', value: 'rolex' },
          { title: 'Grand Seiko', value: 'gs' },
          { title: 'Independents', value: 'independent' },
        ],
      },
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
    }),
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'maker',
      media: 'images.0',
    },
  },
})
