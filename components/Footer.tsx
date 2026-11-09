import styles from "./Footer.module.css";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.container}`}>
        <div className={styles.brand}>
          <div className={styles.logo}>
            <span className="text-gradient">Luxe</span>Interiors
          </div>
          <p className={styles.description}>
            Elevating your living spaces with bespoke interior design and premium aesthetics.
          </p>
        </div>
        
        <div className={styles.linksGroup}>
          <h4 className={styles.columnTitle}>Company</h4>
          <a href="#about" className={styles.link}>About</a>
          <a href="#services" className={styles.link}>Services</a>
          <a href="#features" className={styles.link}>Portfolio</a>
        </div>

        <div className={styles.linksGroup}>
          <h4 className={styles.columnTitle}>Legal</h4>
          <a href="#" className={styles.link}>Privacy Policy</a>
          <a href="#" className={styles.link}>Terms of Service</a>
        </div>
      </div>
      
      <div className={styles.bottomBar}>
        <p>&copy; {currentYear} Luxe Interiors. All rights reserved.</p>
      </div>
    </footer>
  );
}
