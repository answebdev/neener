import Link from 'next/link';
import client from '../client';

const HomePage = async () => {
  const artists = await client.fetch(
    `*[_type == "artist" && defined(slug.current)] | order(_createdAt desc){
      artistName,
      slug
    }`
  );

  return (
    <main style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ marginBottom: '1.5rem' }}>Artists</h1>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {artists.map((artist) => (
          <li key={artist.slug.current} style={{ marginBottom: '1rem' }}>
            <Link
              href={`/artist/${artist.slug.current}`}
              style={{
                color: 'blue',
                textDecoration: 'underline',
                fontSize: '1.2rem',
              }}
            >
              {artist.artistName}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default HomePage;
