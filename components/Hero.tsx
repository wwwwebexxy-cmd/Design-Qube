import styles from "./Hero.module.css";
import ScrollReveal from "./ScrollReveal";

export default function Hero() {
  return (
    <section id="home" className={styles.heroSection}>
      <div className={styles.diagonalWrapper}>
        <div className={styles.topLeftImage}>
          <div className={styles.overlayContent}>
             <ScrollReveal direction="up" delay={0.2}>
               <h1 className={styles.title}>
                Design Your <br /><span className="text-gradient">Dream Space</span>
              </h1>
             </ScrollReveal>
          </div>
        </div>
        <div className={styles.bottomRightImage}>
           <div className={styles.overlayContentRight}>
              <ScrollReveal direction="up" delay={0.4}>
                <p className={styles.subtitle}>
                  Transforming houses into breathtaking homes. We craft modern, functional, and luxurious interiors tailored perfectly to your lifestyle.
                </p>
              </ScrollReveal>
              <ScrollReveal direction="up" delay={0.6}>
                <div className={styles.ctaGroup}>
                  <a href="#contact" className={styles.primaryBtn}>Get Started</a>
                  <a href="#features" className={styles.secondaryBtn}>Portfolio</a>
                </div>
              </ScrollReveal>
           </div>
        </div>
      </div>
      
      <div className={styles.wavyDivider}>
        <svg viewBox="0 0 1440 100" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,50 C320,150 420,-50 740,50 C1060,150 1160,-50 1440,50 L1440,100 L0,100 Z" fill="var(--background)" />
        </svg>
      </div>
    </section>
  );
}
