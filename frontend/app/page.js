import Link from 'next/link';
import client from '../client';

export default async function HomePage() {
  const posts = await client.fetch(
    `*[_type == "post" && defined(slug.current)] | order(_createdAt desc){
      title,
      slug
    }`
  );

  return (
    <main style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ marginBottom: '1.5rem' }}>Blog Posts</h1>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {posts.map((post) => (
          <li key={post.slug.current} style={{ marginBottom: '1rem' }}>
            <Link
              href={`/artist/${post.slug.current}`}
              style={{
                color: 'blue',
                textDecoration: 'underline',
                fontSize: '1.2rem',
              }}
            >
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
