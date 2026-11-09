import Image from "next/image";
import styles from "./About.module.css";
import ScrollReveal from "./ScrollReveal";

export default function About() {
  return (
    <section id="about" className={styles.aboutSection}>
      <div className={`container ${styles.container}`}>
        <div className={styles.imageWrapper}>
          <ScrollReveal direction="right" className={styles.imageMain}>
            <Image
              src="/images/hero-villa.png"
              alt="Warm, natural stone and oak finishes in a completed Abu Dhabi villa interior"
              fill
              sizes="(max-width: 992px) 90vw, 40vw"
            />
          </ScrollReveal>
          <ScrollReveal direction="left" delay={0.3} className={styles.imageOverlap}>
            <Image
              src="/images/bespoke-kitchen.png"
              alt="Bespoke kitchen joinery and stone finishes"
              fill
              sizes="(max-width: 992px) 70vw, 32vw"
            />
          </ScrollReveal>
        </div>
        <div className={styles.textContent}>
          <ScrollReveal direction="up" delay={0.1}>
            <h2 className="section-title text-gradient" style={{ textAlign: "left", margin: 0 }}>About Us</h2>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.2}>
            <h3 className={styles.heading}>One complete QUBE: design, detail, deliver.</h3>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.3}>
            <p className={styles.paragraph}>
              DESIGNQUBE is an Abu Dhabi interior design and contracting company. From concept to completion, we shape functional, considered environments through innovative design and precise execution.
            </p>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.4}>
            <ul className={styles.featureList}>
              <li><strong>Our vision:</strong> to be the UAE&apos;s trusted partner for interior transformation, known for craftsmanship, timely delivery and innovative design.</li>
              <li><strong>Our mission:</strong> create spaces that inspire, perform and last through detailed drawings, skilled execution and year-round support.</li>
              <li><strong>Our QUBE:</strong> every project brings design, detail and delivery together, with care in each small element.</li>
            </ul>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
