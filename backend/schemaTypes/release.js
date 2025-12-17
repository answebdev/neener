import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'release',
  title: 'Release',
  type: 'document',
  fields: [
    defineField({
      name: 'artist',
      title: 'Artist',
      type: 'reference',
      to: [{type: 'artist'}],
    }),
    defineField({
      name: 'releaseTitle',
      title: 'Release Title',
      type: 'string',
    }),
    defineField({
      name: 'releaseYear',
      title: 'Release Year',
      type: 'number',
    }),
    defineField({
      name: 'releaseCover',
      title: 'Release Cover (1200px x 1200px)',
      type: 'image',
      options: {hotspot: true},
    }),

    defineField({
      name: 'releaseLinks',
      title: 'Release Links',
      description: 'Links to where this release can be found online (max 3)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              title: 'Link Name',
              type: 'string',
              description: 'e.g., Spotify, Apple Music, Bandcamp',
            }),
            defineField({
              name: 'url',
              title: 'URL',
              type: 'url',
            }),
            defineField({
              name: 'newTab',
              title: 'Open in new tab',
              type: 'boolean',
              initialValue: true,
            }),
          ],
        },
      ],
      validation: (Rule) => Rule.max(3),
    }),
  ],
})
