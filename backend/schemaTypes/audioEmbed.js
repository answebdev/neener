import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'audioEmbed',
  title: 'Audio Player',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Track Title',
      type: 'string',
      description: 'Displayed above or below the audio player',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'artistName',
      title: 'Artist Name',
      type: 'string',
    }),

    defineField({
      name: 'audioFile',
      title: 'Audio File (.mp3)',
      type: 'file',
      options: {
        accept: 'audio/mpeg',
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({title}) {
      return {
        title: `🎵 Audio: ${title}`,
      }
    },
  },
})
