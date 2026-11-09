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
      className="relative w-full overflow-hidden bg-zinc-900 text-white py-12 md:py-24 2xl:py-32 flex items-center border-y border-zinc-800"
    >
      <div
        ref={textRef}
        className="flex whitespace-nowrap font-black text-[15vw] uppercase leading-none tracking-tighter text-transparent"
        style={{
          width: "fit-content",
          WebkitTextStroke: "2px white",
        }}
      >
        <span className="pr-8 md:pr-16 lg:pr-24 2xl:pr-32">LUXURY INTERIORS • ARCHITECTURE • MODERN SPACES • DESIGN • </span>
        <span className="pr-8 md:pr-16 lg:pr-24 2xl:pr-32">LUXURY INTERIORS • ARCHITECTURE • MODERN SPACES • DESIGN • </span>
      </div>
    </div>
  );
};

export default ScrollMarquee;
