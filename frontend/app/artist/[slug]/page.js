export const dynamic = 'force-dynamic'; // Enable SSR

import { PortableText } from '@portabletext/react';
import client from '../../../client';
import Image from 'next/image';
import Link from 'next/link';
import { urlFor } from '../../../lib/sanityImageUrl';
import styles from './ArtistPage.module.css';

// Define how Portable Text should render custom types like images
const ptComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset?._ref) {
        return null;
      }
      return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          alt={value.alt || ' '}
          loading='lazy'
          src={urlFor(value)
            .width(400)
            .height(400)
            .fit('max')
            .auto('format')
            .url()}
          style={{ margin: '1em 0', maxWidth: '100%' }}
        />
      );
    },
    iframeEmbed: ({ value }) => {
      return (
        // Player Not Centered:
        <div style={{ maxWidth: '700px', margin: '2em 0', width: '100%' }}>
          {/* // Player Centered: */}
          {/* <div style={{ maxWidth: '700px', margin: '2em auto', width: '100%' }}> */}
          <iframe
            className={styles.desktopPlayer}
            src={value.url}
            style={{
              border: 0,
              width: '100%',
              height: '120px',
            }}
            loading='lazy'
            seamless
          />
          <iframe
            className={styles.mobilePlayer}
            src={value.url.replace('size=large', 'size=medium')}
            style={{
              width: '100%',
              height: '120px',
              border: '0',
            }}
            loading='lazy'
            seamless
          />
        </div>
      );
    },
  },
};

export async function generateMetadata({ params }) {
  const { slug } = await params;

  const artist = await client.fetch(
    `*[_type == "artist" && slug.current == $slug][0]{
      artistName
    }`,
    { slug }
  );

  return {
    title: 'NX3 | ' + artist?.artistName || 'Artist Page',
    description: 'NX3 Label Website.',
    icons: {
      icon: '/favicon.ico',
    },
  };
}

export async function generateStaticParams() {
  const slugs = await client.fetch(
    `*[_type == "artist" && defined(slug.current)][].slug.current`
  );
  return slugs.map((slug) => ({ slug }));
}

const ArtistPage = async (props) => {
  const { slug } = await props.params;

  const artist = await client.fetch(
    `*[_type == "artist" && slug.current == $slug][0]{
      artistName,
      body,
      "authorName": author->name,
      "authorImage": author->image,
      "categories": categories[]->artistName
    }`,
    { slug }
  );

  if (!artist) {
    return <p>Artist not found</p>;
  }

  return (
    <article className={styles.container}>
      <h1>{artist.artistName}</h1>

      <br />

      {artist.authorImage?.asset && (
        <Image
          src={urlFor(artist.authorImage).width(100).height(100).url()}
          alt={`Photo of ${artist.authorName}`}
          width={100}
          height={100}
          style={{ borderRadius: '50%' }}
        />
      )}

      {artist.categories?.length > 0 && (
        <ul>
          <strong>artisted in:</strong>
          {artist.categories.map((category) => (
            <li key={category}>{category}</li>
          ))}
        </ul>
      )}

      <PortableText value={artist.body} components={ptComponents} />

      <p style={{ marginTop: '2em' }}>
        <Link
          href='/'
          style={{
            color: 'blue',
            textDecoration: 'underline',
            fontSize: '1.2rem',
          }}
        >
          Back to Home
        </Link>
      </p>
    </article>
  );
};

export default ArtistPage;
