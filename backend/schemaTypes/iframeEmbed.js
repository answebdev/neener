import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'iframeEmbed',
  title: 'Embed (iframe)',
  type: 'object',
  fields: [
    defineField({
      name: 'url',
      title: 'Embed URL',
      type: 'url',
      validation: (Rule) =>
        Rule.uri({
          scheme: ['https'],
        }),
    }),
    defineField({
      name: 'height',
      title: 'Height (px)',
      type: 'number',
      initialValue: 150,
    }),
  ],
  preview: {
    select: {
      url: 'url',
    },
    prepare({url}) {
      return {
        title: `Embed: ${url}`,
      }
    },
  },
})
