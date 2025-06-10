import { PortableText } from '@portabletext/react';
import client from '../../../client';

export async function generateStaticParams() {
  const slugs = await client.fetch(
    `*[_type == "post" && defined(slug.current)][].slug.current`
  );
  return slugs.map((slug) => ({ slug }));
}

export default async function PostPage({ params }) {
  const { slug } = params;

  const post = await client.fetch(
    `*[_type == "post" && slug.current == $slug][0]`,
    { slug }
  );

  if (!post) {
    return <p>Post not found</p>;
  }

  return (
    <article>
      <h1>{post.title}</h1>
      <PortableText value={post.body} />
    </article>
  );
}
