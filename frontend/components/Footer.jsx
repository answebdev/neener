'use client'; // treat this file as a Client Component

import { useState, useEffect } from 'react';
import styles from './Footer.module.css';

const Footer = () => {
  const [currentYear, setCurrentYear] = useState(null);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <div className='footer'>
      <div className={styles.footer}>
        <span className={styles.footerText}>
          &copy; Copyright {currentYear} NX3
        </span>
        {/* <span className={styles.footerText}>
          &copy; Copyright 2025-{currentYear} NX3
        </span> */}
      </div>
    </div>
  );
};

export default Footer;
