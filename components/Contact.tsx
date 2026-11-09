"use client";

import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import styles from "./Contact.module.css";
import ScrollReveal from "./ScrollReveal";

const mapUrl = "https://maps.google.com/?q=As+Sawari+7+St+-+Abu+Dhabi%2C+UAE";

export default function Contact() {
  return (
    <section id="contact" className={styles.contactSection}>
      <div className={`container ${styles.container}`}>
        <div className={styles.infoColumn}>
          <ScrollReveal direction="right" delay={0.1}>
            <div className={styles.infoBlock}>
              <span className={styles.icon}><FaMapMarkerAlt aria-hidden="true" /></span>
              <a className={styles.infoText} href={mapUrl} target="_blank" rel="noreferrer">
                As Sawari 7 St - Abu Dhabi, UAE
              </a>
            </div>
          </ScrollReveal>
          <ScrollReveal direction="right" delay={0.2}>
            <div className={styles.infoBlock}>
              <span className={styles.icon}><FaEnvelope aria-hidden="true" /></span>
              <a className={styles.infoText} href="mailto:info@designqube.ae">info@designqube.ae</a>
            </div>
          </ScrollReveal>
          <ScrollReveal direction="right" delay={0.3}>
            <div className={styles.infoBlock}>
              <span className={styles.icon}><FaPhoneAlt aria-hidden="true" /></span>
              <div className={styles.infoText}>
                <a href="tel:+971551869659">+971 55 186 9659</a>
                <a href="tel:+971552776261">+971 55 277 6261</a>
              </div>
            </div>
          </ScrollReveal>
        </div>

        <div className={styles.mapColumn}>
          <ScrollReveal direction="left" delay={0.2} style={{ width: "100%", height: "100%" }}>
            <iframe
              src="https://maps.google.com/maps?q=As%20Sawari%207%20St%20Abu%20Dhabi%20UAE&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="DesignQube location in Abu Dhabi"
              className={styles.mapIframe}
            />
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
