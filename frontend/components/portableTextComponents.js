import { urlFor } from '@/lib/sanityImageUrl';
import styles from './portableTextComponents.module.css';

// Define how Portable Text should render custom types like images
export const portableTextComponents = {
  //   types: {
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
    audioEmbed: ({ value }) => (
      <div>
        {value.audioUrl && (
          <>
            <p style={{ fontWeight: 'bold', textAlign: 'center' }}>
              {value.title}
            </p>
            {value.artistName && (
              <p style={{ textAlign: 'center' }}>by {value.artistName}</p>
            )}
            {/* <audio controls controlsList='nodownload'> */}
            <audio controls style={{ width: '100%' }} controlsList='nodownload'>
              <source src={value.audioUrl} type='audio/mpeg' />
              Your browser does not support the audio element.
            </audio>
          </>
        )}
      </div>
    ),
  },
  marks: {
    link: ({ value, children }) => {
      const { href, blank } = value;
      return (
        <a
          href={href}
          target={blank ? '_blank' : '_self'}
          rel={blank ? 'noopener noreferrer' : undefined}
          style={{ color: 'blue', textDecoration: 'underline' }}
        >
          {children}
        </a>
      );
    },
  },
};
