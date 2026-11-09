"use client";

import { FaPhoneAlt, FaWhatsapp, FaRegClock } from "react-icons/fa";
import styles from "./Contact.module.css";
import ScrollReveal from "./ScrollReveal";

export default function Contact() {
  return (
    <section id="contact" className={styles.contactSection}>
      <div className={`container ${styles.container}`}>
        
        {/* Left Column: Info Blocks */}
        <div className={styles.infoColumn}>
          <ScrollReveal direction="right" delay={0.1}>
            <div className={styles.infoBlock}>
              <span className={styles.icon}><FaPhoneAlt /></span>
              <span className={styles.infoText}>+1 (555) 123-4567</span>
            </div>
          </ScrollReveal>
          <ScrollReveal direction="right" delay={0.2}>
            <div className={styles.infoBlock}>
              <span className={styles.icon}><FaWhatsapp /></span>
              <span className={styles.infoText}>WhatsApp Us</span>
            </div>
          </ScrollReveal>
          <ScrollReveal direction="right" delay={0.3}>
            <div className={styles.infoBlock}>
              <span className={styles.icon}><FaRegClock /></span>
              <span className={styles.infoText}>Mon - Fri, 9:00 AM - 6:00 PM</span>
            </div>
          </ScrollReveal>
        </div>

        {/* Right Column: Map */}
        <div className={styles.mapColumn}>
          <ScrollReveal direction="left" delay={0.2} style={{ width: '100%', height: '100%' }}>
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.215286595561!2d-73.9878239234685!3d40.75716163484931!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25855c6480299%3A0x55194ec5a1ae072e!2sTimes%20Square!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={false} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Google Maps"
              className={styles.mapIframe}
            ></iframe>
          </ScrollReveal>
        </div>

      </div>
    </section>
  );
}
