import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'artist',
  title: 'Artist',
  type: 'document',
  fields: [
    defineField({
      name: 'artistName',
      title: 'Artist Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'sortName',
      title: 'Sort Name',
      type: 'string',
      description: 'Used for alphabetical sorting (ignores leading "The") - use all lowercase',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'artistName',
        maxLength: 96,
      },
    }),

    // defineField({
    //   name: 'author',
    //   title: 'Author',
    //   type: 'reference',
    //   to: {type: 'author'},
    // }),
    defineField({
      name: 'mainImage',
      title: 'Main Image (1092px x 819px)',
      type: 'image',
      description: 'Used for home page',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image (1215px x 680px)',
      type: 'image',
      description: 'Used for individual artist page',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'releases',
      title: 'Releases',
      type: 'array',
      of: [{type: 'reference', to: {type: 'release'}}],
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'blockContent',
    }),
  ],

  preview: {
    select: {
      title: 'artistName',
      author: 'author.name',
      media: 'mainImage',
    },
    prepare(selection) {
      const {author} = selection
      return {...selection, subtitle: author && `by ${author}`}
    },
  },
})
