import Link from 'next/link';
import Image from 'next/image';
import client from '../client';
import { urlFor } from '../lib/sanityImageUrl';
import styles from './Home.module.css';

export const generateMetadata = async () => {
  return {
    title: 'NX3',
    description: 'NX3 Label Website Home Page.',
    icons: {
      icon: '/favicon.ico',
    },
  };
};

const HomePage = async () => {
  const artists = await client.fetch(
    `*[_type == "artist" && defined(slug.current)] | order(_createdAt desc){
      artistName,
      mainImage,
      slug
    }`
  );

  return (
    <main className={styles.mainContainer}>
      <h1 style={{ marginBottom: '1.5rem' }}>Artists</h1>
      <div className={styles.artistContainer}>
        {artists.map((artist) => (
          <div key={artist.slug.current} className={styles.artistCard}>
            <Link
              href={`/artist/${artist.slug.current}`}
              style={{
                color: 'blue',
                textDecoration: 'none',
                textTransform: 'uppercase',
                fontSize: '1.0rem',
              }}
            >
              <div className={styles.imageDiv}>
                <Image
                  src={urlFor(artist.mainImage).width(400).url()}
                  alt={artist.artistName}
                  // fill
                  sizes='25vw'
                  // style={{ objectFit: 'contain' }}

                  width={364}
                  height={273} // use the image’s real aspect ratio if known
                  style={{
                    objectFit: 'contain',
                    width: '100%',
                    height: 'auto',
                  }}
                />
              </div>
              <div className={styles.artistLink}>{artist.artistName}</div>
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
};

export default HomePage;
