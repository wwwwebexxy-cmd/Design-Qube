"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import styles from "./Hero.module.css";
import RoomFurnitureReveal, { ROOM_REVEAL_ITEM_COUNT } from "./RoomFurnitureReveal";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const headlineScenes = [
  { firstLine: "Design. Detail.", secondLine: "Deliver." },
  { firstLine: "Precision meets", secondLine: "design." },
  { firstLine: "Spaces made", secondLine: "personal." },
];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const roomItemsRef = useRef<Array<SVGGElement | null>>([]);
  const constructionLayersRef = useRef<Array<SVGGElement | null>>([]);
  const headlineFramesRef = useRef<Array<HTMLSpanElement | null>>([]);
  const setRoomItemRef = (index: number, element: SVGGElement | null) => {
    roomItemsRef.current[index] = element;
  };
  const setConstructionRef = (index: number, element: SVGGElement | null) => {
    constructionLayersRef.current[index] = element;
  };

  useGSAP(
    () => {
      if (!sectionRef.current) {
        return;
      }

      const roomItems = roomItemsRef.current.filter(
        (item): item is SVGGElement => item !== null
      );
      const headlineFrames = headlineFramesRef.current.filter(
        (frame): frame is HTMLSpanElement => frame !== null
      );
      const constructionLayers = constructionLayersRef.current.filter(
        (layer): layer is SVGGElement => layer !== null
      );
      if (
        roomItems.length !== ROOM_REVEAL_ITEM_COUNT ||
        constructionLayers.length !== 3 ||
        headlineFrames.length !== headlineScenes.length
      ) {
        return;
      }

      const media = gsap.matchMedia();
      media.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set(headlineFrames, { autoAlpha: 0, yPercent: 12 });
        gsap.set(headlineFrames[0], { autoAlpha: 1, yPercent: 0 });
        gsap.set(roomItems, { autoAlpha: 0, y: 10 });
        gsap.set(constructionLayers, { autoAlpha: 1 });

        // One pinned, scroll-driven sequence, as in the reference recording.
        // The room itself stays fixed; completed items remain in the scene.
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: () => (window.innerWidth <= 768 ? "+=165%" : "+=230%"),
            scrub: 0.8,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        // Start with wall and marble work, then finish the ceiling and glazing in the same room view.
        timeline
          .to(constructionLayers[0], { autoAlpha: 0, duration: 0.1, ease: "none" }, 0.02)
          .to(constructionLayers[1], { autoAlpha: 0, duration: 0.1, ease: "none" }, 0.12)
          .to(constructionLayers[2], { autoAlpha: 0, duration: 0.1, ease: "none" }, 0.22);

        roomItems.forEach((item, index) => {
          timeline.to(
            item,
            { autoAlpha: 1, y: 0, duration: 0.085, ease: "power1.out" },
            0.34 + index * 0.09
          );
        });

        [0.37, 0.72].forEach((position, sceneIndex) => {
          timeline
            .to(headlineFrames[sceneIndex], { autoAlpha: 0, yPercent: -8, duration: 0.045, ease: "none" }, position)
            .fromTo(
              headlineFrames[sceneIndex + 1],
              { autoAlpha: 0, yPercent: 8 },
              { autoAlpha: 1, yPercent: 0, duration: 0.065, ease: "none" },
              position + 0.045
            );
        });

        // Reserve the last fifth of the scroll for the completed room.
        timeline.to({}, { duration: 0.2 }, 0.95);
      });

      return () => media.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section id="home" ref={sectionRef} className={styles.heroSection}>
      <link rel="preload" as="image" href="/images/hero-project-living-empty.webp" />
      <link rel="preload" as="image" href="/images/hero-room-walls-marble-work.webp" />
      <link rel="preload" as="image" href="/images/hero-room-construction-stage.webp" />
      <div className={styles.roomViewport}>
        <RoomFurnitureReveal setItemRef={setRoomItemRef} setConstructionRef={setConstructionRef} />
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

      <div className={styles.wavyDivider}>
        <svg viewBox="0 0 1440 100" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M0,50 C320,150 420,-50 740,50 C1060,150 1160,-50 1440,50 L1440,100 L0,100 Z" fill="var(--background)" />
        </svg>
      </div>
    </section>
  );
}
