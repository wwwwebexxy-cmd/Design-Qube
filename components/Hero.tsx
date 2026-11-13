"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import RoomSequence, { type RoomSequenceHandle } from "./RoomSequence";
import styles from "./Hero.module.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const chapters = [
  {
    label: "01 / Architecture",
    title: "Design. Detail. Deliver.",
    description: "Interior fit-out and contracting in Abu Dhabi, from the first concept and detailed drawings to precise execution and handover.",
  },
  {
    label: "02 / Structure",
    title: "Precision meets design.",
    description: "From detailed drawings to precise execution.",
  },
  {
    label: "03 / Design",
    title: "Spaces made personal.",
    description: "Every detail brought together, from the first concept to the finished interior.",
  },
  {
    label: "04 / Experience",
    title: "From concept to handover.",
    description: "Design. Detail. Deliver. Interior fit-out and contracting in Abu Dhabi.",
  },
];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const sequenceRef = useRef<RoomSequenceHandle>(null);
  const chapterRefs = useRef<Array<HTMLDivElement | null>>([]);
  const scrollHintRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);
  const progressLineRef = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    const chapterElements = chapterRefs.current.filter(
      (chapter): chapter is HTMLDivElement => chapter !== null
    );
    if (!sectionRef.current || chapterElements.length !== chapters.length) return;

    const media = gsap.matchMedia();
    media.add(
      {
        mobile: "(max-width: 768px)",
        motion: "(prefers-reduced-motion: no-preference)",
      },
      (context) => {
        if (!context.conditions?.motion) return;

        const isMobile = Boolean(context.conditions.mobile);
        const playhead = { progress: 0 };
        let lastPercentage = -1;
        gsap.set(chapterElements, { autoAlpha: 0, y: 28 });
        gsap.set(chapterElements[0], { autoAlpha: 1, y: 0 });
        sequenceRef.current?.render(0);

        const timeline = gsap.timeline({
          defaults: { ease: "none" },
          onUpdate: () => {
            sequenceRef.current?.render(playhead.progress);
            const percentage = Math.round(timeline.progress() * 100);
            if (percentage !== lastPercentage && progressRef.current) {
              progressRef.current.textContent = String(percentage).padStart(2, "0") + "%";
              lastPercentage = percentage;
            }
          },
          scrollTrigger: {
            id: "designqube-room-story",
            trigger: sectionRef.current,
            start: "top top",
            end: isMobile ? "+=200%" : "+=300%",
            pin: true,
            scrub: isMobile ? 0.4 : 0.65,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        // One fixed-camera sequence. The final 8% holds the finished room.
        timeline.to(playhead, { progress: 1, duration: 0.92 }, 0);
        timeline.to(progressLineRef.current, { scaleX: 1, duration: 1 }, 0);
        timeline.to(scrollHintRef.current, { autoAlpha: 0, y: -8, duration: 0.08 }, 0);
        timeline.to(chapterElements[0], { autoAlpha: 0, y: -28, duration: 0.07 }, 0.15);

        [0.25, 0.5, 0.75].forEach((position, index) => {
          timeline.to(chapterElements[index + 1], { autoAlpha: 1, y: 0, duration: 0.05 }, position);
          if (index < 2) {
            timeline.to(chapterElements[index + 1], { autoAlpha: 0, y: -28, duration: 0.07 }, position + 0.15);
          }
        });
        // Keep the final links available as the scene releases into the next section.
      }
    );

    return () => media.revert();
  }, { scope: sectionRef });

  return (
    <section id="home" ref={sectionRef} className={styles.heroSection} aria-label="DesignQube interior transformation">
      <link rel="preload" as="image" href="/images/hero-sequence/desktop/frame_000.webp" media="(min-width: 769px) and (prefers-reduced-motion: no-preference)" />
      <link rel="preload" as="image" href="/images/hero-sequence/mobile/frame_000.webp" media="(max-width: 768px) and (prefers-reduced-motion: no-preference)" />
      <div className={styles.roomViewport}>
        <RoomSequence ref={sequenceRef} />
      </div>

      <div className={styles.storyContent}>
        {chapters.map((chapter, index) => (
          <div
            key={chapter.label}
            ref={(element) => { chapterRefs.current[index] = element; }}
            className={styles.chapter}
          >
            <p className={styles.eyebrow}>{chapter.label}</p>
            {index === 0
              ? <h1 className={styles.title}>{chapter.title}</h1>
              : <h2 className={styles.title}>{chapter.title}</h2>}
            <p className={styles.description}>{chapter.description}</p>
            {index === chapters.length - 1 && (
              <div className={styles.ctaGroup}>
                <a href="#contact" className={styles.primaryBtn}>Discuss your project</a>
                <a href="#services" className={styles.secondaryBtn}>Our services</a>
              </div>
            )}
          </div>
        ))}
      </div>

      <div ref={scrollHintRef} className={styles.scrollHint} aria-hidden="true">
        <span>Scroll to discover</span>
        <span className={styles.scrollStem} />
      </div>
      <div className={styles.progress} aria-hidden="true">
        <span className={styles.progressTrack}><span ref={progressLineRef} className={styles.progressLine} /></span>
        <span ref={progressRef} className={styles.progressNumber}>00%</span>
      </div>
    </section>
  );
}
