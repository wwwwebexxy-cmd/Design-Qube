"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <span className="text-gradient">Luxe</span>Interiors
      </div>
      
      {/* Mobile Toggle Button */}
      <button 
        className={styles.mobileToggle}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        {isOpen ? "✕" : "☰"}
      </button>

      <div className={`${styles.navLinks} ${isOpen ? styles.navLinksOpen : ''}`}>
        <Link href="#home" className={styles.navLink} onClick={() => setIsOpen(false)}>Home</Link>
        <Link href="#about" className={styles.navLink} onClick={() => setIsOpen(false)}>About</Link>
        <Link href="#services" className={styles.navLink} onClick={() => setIsOpen(false)}>Service</Link>
        {/* <Link href="#features" className={styles.navLink} onClick={() => setIsOpen(false)}>Why Choose Us</Link> */}
        <Link href="#contact" className={styles.navLink} onClick={() => setIsOpen(false)}>Contact</Link>
      </div>
    </nav>
  );
}
