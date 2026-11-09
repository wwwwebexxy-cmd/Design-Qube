"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./StickyFeatures.module.css";
import ScrollReveal from "./ScrollReveal";

const features = [
  {
    id: 1,
    title: "Unmatched Speed",
    description: "We optimize every byte so your website loads in milliseconds.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 2,
    title: "Pixel Perfect",
    description: "Meticulous attention to detail ensures your design looks flawless on all devices.",
    image: "https://images.unsplash.com/photo-1558655146-d09347e92766?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 3,
    title: "Secure by Default",
    description: "Top-tier security practices keep your user data safe and sound.",
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 4,
    title: "Data Driven",
    description: "Built-in analytics to help you make informed business decisions.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 5,
    title: "Cloud Native",
    description: "Easily scalable infrastructure that grows with your business.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 6,
    title: "24/7 Support",
    description: "Our dedicated team is always here to help you succeed.",
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  }
];

export default function StickyFeatures() {
  return (
    <section id="features" className={styles.sectionContainer}>
      <div className="container">

        {/* Top Split Layout */}
        <div className={styles.splitLayout}>
          <div className={styles.textContent}>
            <ScrollReveal direction="up" delay={0.1}>
              <h2 className="section-title text-gradient" style={{ textAlign: 'left', margin: 0 }}>Why Choose Us</h2>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={0.3}>
              <p className={styles.description}>
                We provide unmatched quality and service. Explore our core features below and see why we are the best choice for your next project.
              </p>
            </ScrollReveal>
          </div>
          <div className={styles.imageContent}>
            <ScrollReveal direction="left" delay={0.2}>
              <img src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=800" alt="Why Choose Us" className={styles.mainImage} />
            </ScrollReveal>
          </div>
        </div>

        {/* Movement Carts (Horizontal Slider) */}
        <ScrollReveal direction="up" delay={0.4}>
          <div className={styles.sliderContainer}>
          <div className={styles.sliderTrack}>
            {features.concat(features).map((feature, index) => (
              <div key={`${feature.id}-${index}`} className={styles.slideCard}>
                <img src={feature.image} alt={feature.title} className={styles.slideImage} />
                <div className={styles.slideContent}>
                  <h3 className={styles.slideTitle}>{feature.title}</h3>
                  <p className={styles.slideDesc}>{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        </ScrollReveal>

      </div>
    </section>
  );
}
