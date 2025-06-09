export default function PostPage({ params }) {
  const { slug } = params;

  return (
    <article>
      <h1>{slug}</h1>
    </article>
  );
}
