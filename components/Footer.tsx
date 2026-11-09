import styles from "./Footer.module.css";
import Brand from "./Brand";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.container}`}>
        <div className={styles.brand}>
          <Brand />
          <p className={styles.description}>
            Interior design, fit-out and contracting, delivered with detail and care across Abu Dhabi.
          </p>
        </div>

        <div className={styles.linksGroup}>
          <h2 className={styles.columnTitle}>Explore</h2>
          <a href="#about" className={styles.link}>About DesignQube</a>
          <a href="#services" className={styles.link}>Our services</a>
          <a href="#features" className={styles.link}>Our process</a>
        </div>

        <div className={styles.linksGroup}>
          <h2 className={styles.columnTitle}>Contact</h2>
          <a href="mailto:info@designqube.ae" className={styles.link}>info@designqube.ae</a>
          <a href="tel:+971551869659" className={styles.link}>+971 55 186 9659</a>
          <a href="tel:+971552776261" className={styles.link}>+971 55 277 6261</a>
          <span className={styles.link}>As Sawari 7 St - Abu Dhabi, UAE</span>
        </div>
      </div>

      <div className={styles.bottomBar}>
        <p>&copy; {currentYear} DesignQube. All rights reserved.</p>
      </div>
    </footer>
  );
}
