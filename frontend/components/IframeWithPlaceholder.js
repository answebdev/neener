'use client';

import { useState } from 'react';
import styles from './IframeWithPlaceholder.module.css';

export default function IframeWithPlaceholder({
  src,
  albumCoverUrl,
  height = 120,
}) {
  const [activated, setActivated] = useState(false);

  return (
    <div className={styles.wrapper} style={{ height: `${height}px` }}>
      {/* Always show album cover on smaller screens */}
      <img
        src={albumCoverUrl}
        alt='Album cover'
        className={styles.placeholder}
      />

      {/* Load iframe regardless of user interaction, but no autoplay */}
      <iframe
        src={src}
        className={styles.iframe}
        style={{ border: 0, width: '100%', height: `${height}px` }}
        allow='autoplay' // allows user to play, but does not start automatically
        seamless
      />
    </div>
  );
}
