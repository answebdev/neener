import { PortableText } from '@portabletext/react';
import client from '../../../client';
import Image from 'next/image';
import { urlFor } from '../../../lib/sanityImageUrl';

export async function generateStaticParams() {
  const slugs = await client.fetch(
    `*[_type == "post" && defined(slug.current)][].slug.current`
  );
  return slugs.map((slug) => ({ slug }));
}

export default async function PostPage({ params }) {
  const { slug } = params;

  const post = await client.fetch(
    `*[_type == "post" && slug.current == $slug][0]{
      title,
      body,
      "authorName": author->name,
      "authorImage": author->image
    }`,
    { slug }
  );

  if (!post) {
    return <p>Post not found</p>;
  }

  return (
    <article>
      <h1>{post.title}</h1>
      <p>By {post.authorName}</p>
      {post.authorImage && post.authorImage.asset && (
        <Image
          src={urlFor(post.authorImage).width(100).height(100).url()}
          alt={`Photo of ${post.authorName}`}
          width={100}
          height={100}
          style={{ borderRadius: '50%' }}
        />
      )}
      <PortableText value={post.body} />
    </article>
  );
}
