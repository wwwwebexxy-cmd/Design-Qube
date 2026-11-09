"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const ScrollMarquee = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!textRef.current || !containerRef.current) return;

      // Animate the text leftwards on scroll
      gsap.to(textRef.current, {
        xPercent: -50,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom", // when the top of the container hits the bottom of the viewport
          end: "bottom top", // when the bottom of the container hits the top of the viewport
          scrub: 1, // smooth scrubbing with 1 second delay
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="relative flex w-full items-center overflow-hidden border-y py-12 md:py-24 2xl:py-32"
      style={{ background: "var(--surface)", borderColor: "var(--card-border)" }}
    >
      <div
        ref={textRef}
        className="flex whitespace-nowrap font-black text-[15vw] uppercase leading-none tracking-tighter text-transparent"
        style={{
          width: "fit-content",
          WebkitTextStroke: "2px var(--primary)",
        }}
      >
        <span className="pr-8 md:pr-16 lg:pr-24 2xl:pr-32">DESIGN • DETAIL • DELIVER • INTERIOR FIT-OUT • CONTRACTING • </span>
        <span className="pr-8 md:pr-16 lg:pr-24 2xl:pr-32">DESIGN • DETAIL • DELIVER • INTERIOR FIT-OUT • CONTRACTING • </span>
      </div>
    </div>
  );
};

export default ScrollMarquee;
