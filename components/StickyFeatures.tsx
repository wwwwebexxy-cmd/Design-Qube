"use client";

import Image from "next/image";
import styles from "./StickyFeatures.module.css";
import ScrollReveal from "./ScrollReveal";

const processSteps = [
  {
    id: 1,
    title: "01 Consultation & Site Survey",
    description: "We understand your vision, visit the site and take accurate measurements.",
    image: "/images/hero-villa.png",
  },
  {
    id: 2,
    title: "02 Design & 3D Concept",
    description: "Explore design concepts and material selections before work starts.",
    image: "/images/bespoke-kitchen.png",
  },
  {
    id: 3,
    title: "03 Detailed Drawings & Quote",
    description: "Receive coordinated CAD and MEP drawings with a transparent BOQ.",
    image: "/images/office-fitout.png",
  },
  {
    id: 4,
    title: "04 Execution & Project Management",
    description: "Our skilled team manages the work and keeps you updated throughout.",
    image: "/images/spa-sauna.png",
  },
  {
    id: 5,
    title: "05 Handover & AMC",
    description: "We complete the final snagging and stay on for yearly maintenance support.",
    image: "/images/office-fitout.png",
  },
];

export default function StickyFeatures() {
  return (
    <section id="features" className={styles.sectionContainer}>
      <div className="container">
        <div className={styles.splitLayout}>
          <div className={styles.textContent}>
            <ScrollReveal direction="up" delay={0.1}>
              <h2 className="section-title text-gradient" style={{ textAlign: "left", margin: 0 }}>Why Choose DesignQube?</h2>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={0.3}>
              <p className={styles.description}>
                Design and execution under one roof, backed by Abu Dhabi market expertise, detailed drawings and transparent costing. We work with quality materials and skilled teams, deliver on time, and stay for year-round AMC support. See your space in 3D before work starts.
              </p>
            </ScrollReveal>
          </div>
          <div className={styles.imageContent}>
            <ScrollReveal direction="left" delay={0.2}>
              <Image
                src="/images/office-fitout.png"
                alt="Completed office fit-out with integrated reception, lighting and partitions"
                width={1600}
                height={1000}
                sizes="(max-width: 992px) 90vw, 45vw"
                className={styles.mainImage}
              />
            </ScrollReveal>
          </div>
        </div>

        <ScrollReveal direction="up" delay={0.4}>
          <div className={styles.sliderContainer}>
            <div className={styles.sliderTrack}>
              {processSteps.concat(processSteps).map((step, index) => (
                <article key={`${step.id}-${index}`} className={styles.slideCard}>
                  <Image
                    src={step.image}
                    alt={step.title}
                    width={800}
                    height={520}
                    sizes="350px"
                    className={styles.slideImage}
                  />
                  <div className={styles.slideContent}>
                    <h3 className={styles.slideTitle}>{step.title}</h3>
                    <p className={styles.slideDesc}>{step.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
