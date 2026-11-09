"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./Navbar.module.css";
import Brand from "./Brand";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className={styles.navbar}>
      <Link href="#home" className={styles.logo} aria-label="DesignQube home">
        <Brand />
      </Link>
      
      {/* Mobile Toggle Button */}
      <button 
        className={styles.mobileToggle}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
        aria-expanded={isOpen}
      >
        {isOpen ? "✕" : "☰"}
      </button>

      <div className={`${styles.navLinks} ${isOpen ? styles.navLinksOpen : ''}`}>
        <Link href="#home" className={styles.navLink} onClick={() => setIsOpen(false)}>Home</Link>
        <Link href="#about" className={styles.navLink} onClick={() => setIsOpen(false)}>About</Link>
        <Link href="#services" className={styles.navLink} onClick={() => setIsOpen(false)}>Services</Link>
        {/* <Link href="#features" className={styles.navLink} onClick={() => setIsOpen(false)}>Why Choose Us</Link> */}
        <Link href="#contact" className={styles.navLink} onClick={() => setIsOpen(false)}>Contact</Link>
      </div>
    </nav>
  );
}
