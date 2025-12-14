import Link from 'next/link';
import styles from './Navbar.module.css';

const Navbar = () => {
  return (
    <header className={styles.navbar}>
      <div className={`${styles.navbarTitle} ${styles.navbarItem}`}>
        <div>
          <li className={styles.navbarItem}>
            <Link className={styles.brandLink} href='/'>
              NX3
              {/* NIHIL<sup>3</sup> */}
            </Link>
          </li>
        </div>
      </div>
      <ul className={styles.ulElement}>
        <li className={styles.navbarItem}>
          <Link className={styles.navLink} href='/'>
            Home
          </Link>
        </li>
        <li className={styles.navbarItem}>
          <Link className={styles.navLink} href='/about'>
            About
          </Link>
        </li>
        <li className={styles.navbarItem}>
          <Link className={styles.navLink} href='/contact'>
            Contact
          </Link>
        </li>
      </ul>
    </header>
  );
};

export default Navbar;
