"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const cards = [
  { step: "01", title: "Consultation", desc: "We start by sitting down with you to understand your space, your lifestyle, and exactly what success looks like for this project." },
  { step: "02", title: "Concept Design", desc: "Crafting beautiful mood boards, 3D renderings, and precise floor plans tailored to your vision." },
  { step: "03", title: "Procurement", desc: "Sourcing premium materials, custom furniture, and unique decor from our global network of artisans." },
  { step: "04", title: "Installation", desc: "Bringing the design to life with meticulous white-glove installation and final styling touches." },
];

const HorizontalProcess = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current || !wrapperRef.current) return;

      const cardsCount = cards.length;

      // Calculate the exact distance we need to scroll horizontally.
      // It's the total width of the inner wrapper minus the width of the section container (avoids scrollbar discrepancies).
      const getScrollAmount = () => wrapperRef.current!.offsetWidth - sectionRef.current!.offsetWidth;

      gsap.to(wrapperRef.current, {
        x: () => -getScrollAmount(),
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top", // pin when top of section hits top of viewport
          // the end value dictates how long the pin lasts; longer means slower scroll
          end: () => `+=${getScrollAmount()}`,
          pin: true,
          scrub: 1, // smooth scrubbing with 1 second delay
          invalidateOnRefresh: true, // Recalculate on resize
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden bg-zinc-950 text-white flex items-center"
    >
      {/* 
        The wrapper width is 400% of the parent section.
        Since we have 4 cards, each card takes 1/4 of this width.
      */}
      <div ref={wrapperRef} className="flex h-full w-[400%]">
        {cards.map((card, idx) => (
          <div
            key={idx}
            className="h-full w-1/4 flex flex-col justify-center px-6 md:px-16 lg:px-32 xl:px-48 2xl:px-80 relative"
          >
            {/* Background large step number */}
            <h2 className="text-[28vw] md:text-[25vw] xl:text-[22vw] 2xl:text-[18vw] font-black leading-none text-zinc-900 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 select-none">
              {card.step}
            </h2>

            {/* Content */}
            <div className="z-10">
              <span className="text-lg md:text-2xl lg:text-3xl 2xl:text-5xl text-emerald-400 font-mono mb-2 md:mb-4 2xl:mb-8 block">
                Step // {card.step}
              </span>
              <h3 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl 2xl:text-[10rem] font-bold mb-4 md:mb-6 2xl:mb-10 tracking-tight">
                {card.title}.
              </h3>
              <p className="text-base sm:text-lg md:text-2xl lg:text-3xl 2xl:text-5xl text-zinc-400 max-w-sm sm:max-w-xl md:max-w-3xl 2xl:max-w-6xl leading-relaxed">
                {card.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HorizontalProcess;
