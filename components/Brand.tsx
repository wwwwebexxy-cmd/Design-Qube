import styles from "./Brand.module.css";

export default function Brand() {
  return (
    <span className={styles.brand}>
      <svg className={styles.mark} viewBox="0 0 360 420" aria-hidden="true" focusable="false">
        <path
          d="M180 14 344 112v188"
          fill="none"
          stroke="currentColor"
          strokeWidth="24"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="m318 326-138 80L16 306V112L180 14"
          fill="none"
          stroke="currentColor"
          strokeWidth="24"
          strokeLinejoin="round"
        />
        <path d="m207 204 119-72v173l-119 72Z" fill="var(--primary)" />
        <path
          d="M180 226v180"
          fill="none"
          stroke="currentColor"
          strokeWidth="24"
          strokeLinecap="round"
        />
      </svg>
      <span className={styles.wordmark}>
        <span className={styles.name}><span>DESIGN</span><span className={styles.accent}>QUBE</span></span>
        <span className={styles.tagline}>Interiors &amp; Contracting</span>
      </span>
    </span>
  );
}
