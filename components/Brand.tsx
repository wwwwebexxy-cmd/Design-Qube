import styles from "./Brand.module.css";

export default function Brand() {
  return (
    <span className={styles.brand}>
      <svg className={styles.mark} viewBox="0 0 64 64" aria-hidden="true" focusable="false">
        <path d="M8 19 32 5l24 14v27L32 59 8 46Z" fill="none" stroke="currentColor" strokeWidth="4.5" strokeLinejoin="round" />
        <path d="m35 21 16-9v29l-16 9Z" fill="var(--primary)" opacity=".9" />
        <path d="M32 59V28" fill="none" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" />
      </svg>
      <span className={styles.wordmark}>
        <span className={styles.name}><span>DESIGN</span><span className={styles.accent}>QUBE</span></span>
        <span className={styles.tagline}>Interiors &amp; Contracting</span>
      </span>
    </span>
  );
}
