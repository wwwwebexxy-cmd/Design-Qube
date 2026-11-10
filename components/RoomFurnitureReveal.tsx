import { useId } from "react";
import styles from "./Hero.module.css";

interface RoomFurnitureRevealProps {
  setItemRef: (index: number, element: SVGGElement | null) => void;
  setConstructionRef: (index: number, element: SVGGElement | null) => void;
}

// Reveal order is independent of paint order: the rug always stays below the sofa.
export const ROOM_REVEAL_ITEM_COUNT = 7;
const sceneWidth = 1672;
const sceneHeight = 941;
const decor = "/images/hero-room-decor.png";

export default function RoomFurnitureReveal({ setItemRef, setConstructionRef }: RoomFurnitureRevealProps) {
  const id = useId().replace(/:/g, "");
  const clip = (name: string) => `url(#${id}-${name})`;
  const sceneImage = (src: string) => (
    <image href={src} width={sceneWidth} height={sceneHeight} />
  );

  return (
    <svg
      className={styles.roomScene}
      viewBox={`0 0 ${sceneWidth} ${sceneHeight}`}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        {/* The transparent overlay keeps all objects in the source room's coordinates. */}
        <clipPath id={`${id}-chairs`}>
          <path d="M270 665 H430 L452 691 L465 730 V823 H270 Z M514 641 H677 V780 H524 L514 701 Z" />
        </clipPath>
        <clipPath id={`${id}-ottoman`}>
          <rect x="350" y="783" width="370" height="150" />
        </clipPath>
        <clipPath id={`${id}-lighting`}>
          <path d="M427 625 H511 V698 L523 703 V786 H458 V708 L447 698 H427 Z" />
          <rect x="986" y="533" width="55" height="61" />
          <path d="M1575 593 H1672 V730 H1594 V692 H1540 V679 H1575 Z" />
        </clipPath>
        <clipPath id={`${id}-plants`}>
          <rect x="714" y="545" width="260" height="213" />
          <path d="M1007 437 H1181 V593 H1041 V537 H1007 Z" />
          <path d="M1432 370 H1672 V594 H1575 V659 H1591 V679 H1511 V659 H1432 Z" />
        </clipPath>
        <clipPath id={`${id}-ceiling`}>
          <path d="M0 0 H1672 V235 L1530 239 L1454 267 L1382 305 L1287 328 L1213 347 C1188 361 1160 369 1110 371 H476 C431 369 408 348 394 320 C382 294 379 265 376 239 L367 174 L0 110 Z" />
        </clipPath>
        <clipPath id={`${id}-wall-marble-work`}>
          <path d="M452 238 L662 292 L658 722 L468 747 Z M817 356 L953 377 L951 680 L814 687 Z M1540 270 L1672 229 V694 L1550 705 Z M430 795 L478 740 L656 725 L814 709 L953 692 L1097 686 L1318 661 L1478 648 L1522 694 L1456 941 H430 Z" />
        </clipPath>
        <clipPath id={`${id}-glass`}>
          <path d="M8 110 L52 111 L52 811 L8 819 Z M56 111 L99 124 L99 796 L56 804 Z M111 128 L192 147 L192 781 L111 794 Z M201 148 L432 223 L432 772 L201 757 Z" />
        </clipPath>
      </defs>

      {/* This clean plate never moves, zooms or fades. Each overlay has real alpha. */}
      {sceneImage("/images/hero-project-living-empty.webp")}
      <g ref={(element) => setConstructionRef(0, element)} className={styles.constructionLayer} clipPath={clip("wall-marble-work")}>
        {sceneImage("/images/hero-room-walls-marble-work.webp")}
      </g>
      <g ref={(element) => setConstructionRef(1, element)} className={styles.constructionLayer} clipPath={clip("ceiling")}>
        {sceneImage("/images/hero-room-construction-stage.webp")}
      </g>
      <g ref={(element) => setConstructionRef(2, element)} className={styles.constructionLayer} clipPath={clip("glass")}>
        {sceneImage("/images/hero-room-construction-stage.webp")}
      </g>
      <g ref={(element) => setItemRef(2, element)} className={styles.roomItem} data-room-item="rug">
        {sceneImage("/images/hero-room-rug.png")}
      </g>
      <g ref={(element) => setItemRef(1, element)} className={styles.roomItem} data-room-item="sofa">
        {sceneImage("/images/hero-room-sofa.png")}
      </g>
      <g ref={(element) => setItemRef(3, element)} className={styles.roomItem} data-room-item="coffee-table">
        <g transform="translate(137 88) scale(0.86)">
          {sceneImage("/images/hero-room-table.png")}
        </g>
      </g>
      <g ref={(element) => setItemRef(4, element)} className={styles.roomItem} data-room-item="armchairs">
        <g clipPath={clip("chairs")}>{sceneImage(decor)}</g>
      </g>
      <g ref={(element) => setItemRef(5, element)} className={styles.roomItem} data-room-item="ottoman">
        <g clipPath={clip("ottoman")}>{sceneImage(decor)}</g>
      </g>
      <g ref={(element) => setItemRef(6, element)} className={styles.roomItem} data-room-item="lighting">
        <g clipPath={clip("lighting")}>{sceneImage(decor)}</g>
      </g>
      <g ref={(element) => setItemRef(7, element)} className={styles.roomItem} data-room-item="plants">
        <g clipPath={clip("plants")}>{sceneImage(decor)}</g>
      </g>
    </svg>
  );
}
