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

export default async function PostPage(props) {
  const params = await props.params;
  const slug = params.slug;

  const post = await client.fetch(
    `*[_type == "post" && slug.current == $slug][0]{
      title,
      body,
      "authorName": author->name,
      "authorImage": author->image,
      "categories": categories[]->title
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

      {post.categories && post.categories.length > 0 && (
        <ul>
          <strong>Posted in:</strong>
          {post.categories.map((category) => (
            <li key={category}>{category}</li>
          ))}
        </ul>
      )}

      <PortableText value={post.body} />
    </article>
  );
}
