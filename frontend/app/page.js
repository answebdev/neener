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
        {/* <div> */}
        {/* <ul style={{ listStyle: 'none', padding: 0 }}> */}
        {artists.map((artist) => (
          // <li key={artist.slug.current} style={{ marginBottom: '1rem' }}>
          <div key={artist.slug.current} className={styles.artistCard}>
            <Link
              href={`/artist/${artist.slug.current}`}
              style={{
                color: 'blue',
                textDecoration: 'none',
                textTransform: 'uppercase',
                fontSize: '1.2rem',
              }}
            >
              <div className={styles.imageDiv}>
                {/* <div> */}
                <Image
                  src={urlFor(artist.mainImage).width(400).url()}
                  alt={artist.artistName}
                  fill
                  sizes='25vw'
                  style={{ objectFit: 'cover' }}
                />

                {/* <Image
                  src={urlFor(artist.mainImage).width(300).height(300).url()}
                  alt={artist.artistName}
                  width={300}
                  height={300}
                /> */}

                {/* <Image
                  src={urlFor(artist.mainImage).width(800).url()} // Fetch a high-res version
                  alt={artist.artistName}
                  width={800}
                  height={800}
                  sizes='(max-width: 768px) 100vw, 300px'
                  style={{
                    width: '100%',
                    height: 'auto',
                    objectFit: 'cover',
                  }}
                /> */}
              </div>
              <div className={styles.artistLink}>{artist.artistName}</div>
            </Link>
          </div>
          // </li>
        ))}
        {/* </ul> */}
        {/* </div> */}
      </div>
    </main>
  );
};

export default HomePage;
