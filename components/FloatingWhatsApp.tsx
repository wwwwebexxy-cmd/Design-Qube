import { FaWhatsapp } from "react-icons/fa";
import styles from "./FloatingWhatsApp.module.css";

export default function FloatingWhatsApp() {
  return (
    <a
      className={styles.button}
      href="https://wa.me/971551869659"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Message DesignQube on WhatsApp"
    >
      <FaWhatsapp className={styles.icon} aria-hidden="true" />
      <span className={styles.label} aria-hidden="true">Chat on WhatsApp</span>
    </a>
  );
}
