import styles from './Footer.module.css';

const Footer = () => (
  <div className='footer'>
    <div className={styles.footer}>
      <span className={styles.footerText}>
        &copy; Copyright {new Date().getFullYear()} NX3
      </span>
    </div>
  </div>
);

export default Footer;
