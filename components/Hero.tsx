"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import styles from "./Hero.module.css";
import ScrollReveal from "./ScrollReveal";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const villaLayerRef = useRef<HTMLDivElement>(null);
  const officeLayerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (
        !sectionRef.current ||
        !villaLayerRef.current ||
        !officeLayerRef.current ||
        !titleRef.current ||
        !copyRef.current ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ) {
        return;
      }

      const parallax = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.8,
        },
      });

      parallax
        .to(villaLayerRef.current, { yPercent: -7, ease: "none" }, 0)
        .to(officeLayerRef.current, { yPercent: 9, ease: "none" }, 0)
        .to(titleRef.current, { yPercent: -12, ease: "none" }, 0)
        .to(copyRef.current, { yPercent: 9, ease: "none" }, 0);
    },
    { scope: sectionRef }
  );

  return (
    <section id="home" ref={sectionRef} className={styles.heroSection}>
      <div className={styles.diagonalWrapper}>
        <div className={styles.topLeftImage}>
          <div ref={villaLayerRef} className={styles.imageLayer} aria-hidden="true">
            <Image
              src="/images/hero-villa.png"
              alt=""
              fill
              preload
              sizes="100vw"
              className={styles.photo}
            />
          </div>
          <div ref={titleRef} className={styles.overlayContent}>
            <ScrollReveal direction="up" delay={0.2}>
              <h1 className={styles.title}>
                Design. Detail.<br /><span className="text-gradient">Deliver.</span>
              </h1>
            </ScrollReveal>
          </div>
        </div>
        <div className={styles.bottomRightImage}>
          <div ref={officeLayerRef} className={`${styles.imageLayer} ${styles.officeLayer}`} aria-hidden="true">
            <Image
              src="/images/office-fitout.png"
              alt=""
              fill
              loading="eager"
              sizes="100vw"
              className={styles.photo}
            />
          </div>
          <div ref={copyRef} className={styles.overlayContentRight}>
            <ScrollReveal direction="up" delay={0.4}>
              <p className={styles.subtitle}>
                Interior fit-out and contracting in Abu Dhabi, from the first concept and detailed drawings to precise execution and handover.
              </p>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={0.6}>
              <div className={styles.ctaGroup}>
                <a href="#contact" className={styles.primaryBtn}>Discuss your project</a>
                <a href="#services" className={styles.secondaryBtn}>Our services</a>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>

      <div className={styles.wavyDivider}>
        <svg viewBox="0 0 1440 100" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M0,50 C320,150 420,-50 740,50 C1060,150 1160,-50 1440,50 L1440,100 L0,100 Z" fill="var(--background)" />
        </svg>
      </div>
    </section>
  );
}
