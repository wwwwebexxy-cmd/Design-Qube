import styles from "./About.module.css";
import ScrollReveal from "./ScrollReveal";

export default function About() {
  return (
    <section id="about" className={styles.aboutSection}>
      <div className={`container ${styles.container}`}>
        <div className={styles.imageWrapper}>
          <ScrollReveal direction="right" className={styles.imageMain}>
            <img 
              src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80" 
              alt="Beautifully designed living room" 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </ScrollReveal>
          <ScrollReveal direction="left" delay={0.3} className={styles.imageOverlap}>
            <img 
              src="https://images.unsplash.com/photo-1554995207-c18c203602cb?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
              alt="Interior design detail" 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </ScrollReveal>
        </div>
        <div className={styles.textContent}>
          <ScrollReveal direction="up" delay={0.1}>
            <h2 className="section-title text-gradient" style={{ textAlign: 'left', margin: 0 }}>About Us</h2>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.2}>
            <h3 className={styles.heading}>We design spaces that feel like home.</h3>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.3}>
            <p className={styles.paragraph}>
              Great aesthetics meet everyday functionality. We don't just decorate rooms; we design bespoke living spaces tailored perfectly to your lifestyle.
            </p>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.4}>
            <ul className={styles.featureList}>
              <li>Award-winning interior designers</li>
              <li>Premium material selection</li>
              <li>End-to-end project management</li>
            </ul>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
