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
  "/images/hero-villa-scroll.webp",
  "/images/hero-residence-detail.webp",
  "/images/hero-villa-dining.webp",
];

const hospitalityScenes = [
  "/images/hero-hospitality-scroll.webp",
  "/images/hero-office-lounge.webp",
  "/images/hero-hotel-lounge.webp",
];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const villaLayerRef = useRef<HTMLDivElement>(null);
  const officeLayerRef = useRef<HTMLDivElement>(null);
  const villaFramesRef = useRef<Array<HTMLDivElement | null>>([]);
  const hospitalityFramesRef = useRef<Array<HTMLDivElement | null>>([]);
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

      const villaFrames = villaFramesRef.current.filter(
        (frame): frame is HTMLDivElement => frame !== null
      );
      const hospitalityFrames = hospitalityFramesRef.current.filter(
        (frame): frame is HTMLDivElement => frame !== null
      );

      if (villaFrames.length !== villaScenes.length || hospitalityFrames.length !== hospitalityScenes.length) {
        return;
      }

      gsap.set([...villaFrames, ...hospitalityFrames], { autoAlpha: 0 });
      gsap.set([villaFrames[0], hospitalityFrames[0]], { autoAlpha: 1 });

      const parallax = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => (window.innerWidth <= 768 ? "+=65%" : "+=115%"),
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      parallax
        .to(villaLayerRef.current, { xPercent: -3, yPercent: -17, scale: 1.2, duration: 1, ease: "none" }, 0)
        .to(officeLayerRef.current, { xPercent: 3, yPercent: 15, scale: 1.2, duration: 1, ease: "none" }, 0)
        .to(titleRef.current, { yPercent: -28, scale: 0.94, autoAlpha: 0, duration: 0.22, ease: "none" }, 0.76)
        .to(copyRef.current, { yPercent: 24, autoAlpha: 0, duration: 0.22, ease: "none" }, 0.76);

      const crossfadeScenes = (frames: HTMLDivElement[]) => {
        frames.slice(1).forEach((frame, index) => {
          const position = 0.18 + index * 0.4;

          parallax
            .to(frames[index], { autoAlpha: 0, duration: 0.16, ease: "none" }, position)
            .to(frame, { autoAlpha: 1, duration: 0.16, ease: "none" }, position);
        });
      };

      crossfadeScenes(villaFrames);
      crossfadeScenes(hospitalityFrames);
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
          <div ref={titleRef} className={styles.overlayContent}>
            <div className={styles.contentBlock}>
              <h1 className={styles.title}>
                Design. Detail.<br /><span className="text-gradient">Deliver.</span>
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
          <div ref={copyRef} className={styles.overlayContentRight}>
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
