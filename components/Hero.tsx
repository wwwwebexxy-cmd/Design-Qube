"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import styles from "./Hero.module.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const villaScenes = [
  "/images/hero-project-site-start.webp",
  "/images/hero-project-ceiling-fitout.webp",
  "/images/hero-project-complete-living.webp",
];

const hospitalityScenes = [
  "/images/hero-project-electrical-check.webp",
  "/images/hero-project-joinery-fitout.webp",
  "/images/hero-project-complete-kitchen.webp",
];

const headlineScenes = [
  { firstLine: "Design. Detail.", secondLine: "Deliver." },
  { firstLine: "Precision meets", secondLine: "design." },
  { firstLine: "Spaces made", secondLine: "personal." },
];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const villaLayerRef = useRef<HTMLDivElement>(null);
  const officeLayerRef = useRef<HTMLDivElement>(null);
  const villaFramesRef = useRef<Array<HTMLDivElement | null>>([]);
  const hospitalityFramesRef = useRef<Array<HTMLDivElement | null>>([]);
  const headlineFramesRef = useRef<Array<HTMLSpanElement | null>>([]);

  useGSAP(
    () => {
      if (
        !sectionRef.current ||
        !villaLayerRef.current ||
        !officeLayerRef.current ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ) {
        return;
      }

      const villaFrames = villaFramesRef.current.filter(
        (frame): frame is HTMLDivElement => frame !== null
      );
      const hospitalityFrames = hospitalityFramesRef.current.filter(
        (frame): frame is HTMLDivElement => frame !== null
      );
      const headlineFrames = headlineFramesRef.current.filter(
        (frame): frame is HTMLSpanElement => frame !== null
      );
      if (
        villaFrames.length !== villaScenes.length ||
        hospitalityFrames.length !== hospitalityScenes.length ||
        headlineFrames.length !== headlineScenes.length
      ) {
        return;
      }

      gsap.set([...villaFrames, ...hospitalityFrames], { autoAlpha: 0, scale: 1.08 });
      gsap.set(headlineFrames, { autoAlpha: 0, yPercent: 12 });
      gsap.set([villaFrames[0], hospitalityFrames[0]], { autoAlpha: 1, scale: 1 });
      gsap.set(headlineFrames[0], { autoAlpha: 1, yPercent: 0 });

      const parallax = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => (window.innerWidth <= 768 ? "+=165%" : "+=230%"),
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      parallax
        .to(villaLayerRef.current, { xPercent: -3, yPercent: -17, scale: 1.2, duration: 1, ease: "none" }, 0)
        .to(officeLayerRef.current, { xPercent: 3, yPercent: 15, scale: 1.2, duration: 1, ease: "none" }, 0);

      [0, 1].forEach((sceneIndex) => {
        const position = 0.22 + sceneIndex * 0.3;

        [villaFrames, hospitalityFrames].forEach((frames) => {
          parallax
            .to(frames[sceneIndex], { autoAlpha: 0, scale: 1.1, duration: 0.18, ease: "none" }, position)
            .fromTo(
              frames[sceneIndex + 1],
              { autoAlpha: 0, scale: 1.12 },
              { autoAlpha: 1, scale: 1, duration: 0.2, ease: "none" },
              position
            );
        });

        parallax
          .to(headlineFrames[sceneIndex], { autoAlpha: 0, yPercent: -8, duration: 0.07, ease: "none" }, position)
          .fromTo(
            headlineFrames[sceneIndex + 1],
            { autoAlpha: 0, yPercent: 8 },
            { autoAlpha: 1, yPercent: 0, duration: 0.1, ease: "none" },
            position + 0.07
          );
      });
    },
    { scope: sectionRef }
  );

  return (
    <section id="home" ref={sectionRef} className={styles.heroSection}>
      <div className={styles.diagonalWrapper}>
        <div className={styles.topLeftImage}>
          <div ref={villaLayerRef} className={styles.imageLayer} aria-hidden="true">
            {villaScenes.map((scene, index) => (
              <div
                key={scene}
                ref={(element) => { villaFramesRef.current[index] = element; }}
                className={styles.photoFrame}
              >
                <Image
                  src={scene}
                  alt=""
                  fill
                  preload={index === 0}
                  loading={index === 0 ? undefined : "eager"}
                  sizes="100vw"
                  className={styles.photo}
                />
              </div>
            ))}
          </div>
          <div className={styles.overlayContent}>
            <div className={styles.contentBlock}>
              <h1 className={styles.title} aria-label="Design. Detail. Deliver.">
                <span className={styles.headlineStack} aria-hidden="true">
                  {headlineScenes.map((scene, index) => (
                    <span
                      key={scene.firstLine}
                      ref={(element) => { headlineFramesRef.current[index] = element; }}
                      className={styles.headlineFrame}
                    >
                      {scene.firstLine}<br /><span className="text-gradient">{scene.secondLine}</span>
                    </span>
                  ))}
                </span>
              </h1>
            </div>
          </div>
        </div>
        <div className={styles.bottomRightImage}>
          <div ref={officeLayerRef} className={`${styles.imageLayer} ${styles.officeLayer}`} aria-hidden="true">
            {hospitalityScenes.map((scene, index) => (
              <div
                key={scene}
                ref={(element) => { hospitalityFramesRef.current[index] = element; }}
                className={styles.photoFrame}
              >
                <Image
                  src={scene}
                  alt=""
                  fill
                  preload={index === 0}
                  loading={index === 0 ? undefined : "eager"}
                  sizes="100vw"
                  className={styles.photo}
                />
              </div>
            ))}
          </div>
          <div className={styles.overlayContentRight}>
            <div className={styles.contentBlock}>
              <p className={styles.subtitle}>
                Interior fit-out and contracting in Abu Dhabi, from the first concept and detailed drawings to precise execution and handover.
              </p>
            </div>
            <div className={styles.contentBlock}>
              <div className={styles.ctaGroup}>
                <a href="#contact" className={styles.primaryBtn}>Discuss your project</a>
                <a href="#services" className={styles.secondaryBtn}>Our services</a>
              </div>
            </div>
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
