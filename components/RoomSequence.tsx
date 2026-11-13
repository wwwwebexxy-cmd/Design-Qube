"use client";

import { useEffect, useImperativeHandle, useRef, type Ref } from "react";
import styles from "./RoomSequence.module.css";

export interface RoomSequenceHandle {
  render: (progress: number) => void;
}

interface RoomSequenceProps {
  ref?: Ref<RoomSequenceHandle>;
}

const FRAME_COUNT = 120;
const LAST_FRAME = FRAME_COUNT - 1;
const BITMAP_LIMIT = 12;

function nearbyFrames(frame: number) {
  const frames = [frame];
  for (let offset = 1; offset <= 4; offset++) {
    if (frame - offset >= 0) frames.push(frame - offset);
    if (frame + offset <= LAST_FRAME) frames.push(frame + offset);
  }
  return frames;
}

export default function RoomSequence({ ref }: RoomSequenceProps) {
  const sceneRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const progressRef = useRef(0);
  const renderRef = useRef<((progress: number) => void) | null>(null);

  useImperativeHandle(ref, () => ({
    render(progress) {
      progressRef.current = Number.isFinite(progress) ? Math.min(1, Math.max(0, progress)) : 0;
      renderRef.current?.(progressRef.current);
    },
  }), []);

  useEffect(() => {
    const scene = sceneRef.current;
    const canvas = canvasRef.current;
    if (!scene || !canvas) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mobileViewport = window.matchMedia("(max-width: 768px)");
    let stopSequence = () => {};

    const startSequence = () => {
      stopSequence();
      renderRef.current = null;
      // The CSS poster supplies the finished room without loading the sequence.
      const usePoster = motion.matches || typeof window.createImageBitmap !== "function"
        || typeof window.ResizeObserver !== "function";
      scene.dataset.static = String(usePoster);
      if (usePoster) return;
      const context = canvas.getContext("2d");
      if (!context) {
        scene.dataset.static = "true";
        return;
      }

      const size = mobileViewport.matches ? "mobile" : "desktop";
      const controller = new AbortController();
      const blobs = new Map<number, Blob>();
      const bitmaps = new Map<number, ImageBitmap>();
      const loading = new Set<number>();
      const decoding = new Set<number>();
      const failedDecodes = new Set<number>();
      const checkpoints = [0, 12, 24, 36, 48, 60, 72, 84, 96, 108, LAST_FRAME];
      const queue = [...new Set([...checkpoints, ...Array.from({ length: FRAME_COUNT }, (_, index) => index)])];
      let active = true;
      let requestedFrame = -1;
      let drawnFrame = -1;
      let animationFrame = 0;
      let needsResizeDraw = true;

      const draw = () => {
        animationFrame = 0;
        if (!active) return;
        // Background loading never advances the room beyond the requested frame.
        const frame = bitmaps.has(requestedFrame) ? requestedFrame : drawnFrame >= 0 ? drawnFrame : 0;
        const bitmap = bitmaps.get(frame);
        if (!bitmap || (frame === drawnFrame && !needsResizeDraw)) return;
        const scale = Math.max(canvas.width / bitmap.width, canvas.height / bitmap.height);
        const width = bitmap.width * scale;
        const height = bitmap.height * scale;
        context.drawImage(bitmap, (canvas.width - width) / 2, (canvas.height - height) / 2, width, height);
        bitmaps.delete(frame);
        bitmaps.set(frame, bitmap);
        drawnFrame = frame;
        needsResizeDraw = false;
      };

      const requestDraw = () => {
        if (!animationFrame && active) animationFrame = window.requestAnimationFrame(draw);
      };

      const trimBitmaps = () => {
        for (const [frame, bitmap] of bitmaps) {
          if (bitmaps.size <= BITMAP_LIMIT) break;
          if (frame === requestedFrame || frame === drawnFrame) continue;
          bitmap.close();
          bitmaps.delete(frame);
        }
      };

      const decodeNearby = () => {
        if (!active || requestedFrame < 0) return;
        for (const frame of nearbyFrames(requestedFrame)) {
          if (decoding.size >= 2) break;
          const blob = blobs.get(frame);
          if (!blob || bitmaps.has(frame) || decoding.has(frame) || failedDecodes.has(frame)) continue;
          decoding.add(frame);
          void window.createImageBitmap(blob).then((bitmap) => {
            if (!active) {
              bitmap.close();
              return;
            }
            bitmaps.set(frame, bitmap);
            trimBitmaps();
            if (frame === requestedFrame || (frame === 0 && drawnFrame < 0)) requestDraw();
          }).catch(() => {
            if (active) failedDecodes.add(frame);
          }).finally(() => {
            decoding.delete(frame);
            if (active) decodeNearby();
          });
        }
      };

      const loadNext = () => {
        while (active && loading.size < 4 && queue.length) {
          const frame = queue.shift()!;
          loading.add(frame);
          const url = `/images/hero-sequence/${size}/frame_${String(frame).padStart(3, "0")}.webp`;
          void fetch(url, { signal: controller.signal, cache: "force-cache" }).then((response) => {
            if (!response.ok) throw new Error("Room frame unavailable");
            return response.blob();
          }).then((blob) => {
            if (!active) return;
            blobs.set(frame, blob);
            decodeNearby();
          }).catch(() => {
            // Keep the poster or last complete frame if a request fails.
          }).finally(() => {
            loading.delete(frame);
            if (active) loadNext();
          });
        }
      };

      const requestRender = (progress: number) => {
        const frame = Math.round(progress * LAST_FRAME);
        if (frame === requestedFrame) return;
        const firstRequest = requestedFrame < 0;
        requestedFrame = frame;
        // Fetch the live frame first; nearby frames cover forward and reverse scrolling.
        const priority = firstRequest ? [frame] : nearbyFrames(frame);
        const queuedPriority = priority.filter((index) => queue.includes(index));
        queuedPriority.forEach((index) => queue.splice(queue.indexOf(index), 1));
        queue.unshift(...queuedPriority);
        requestDraw();
        decodeNearby();
        loadNext();
      };

      const resize = () => {
        const bounds = canvas.getBoundingClientRect();
        const maxPixelRatio = mobileViewport.matches ? 1.25 : 1.5;
        const ratio = Math.min(window.devicePixelRatio || 1, maxPixelRatio);
        const width = Math.max(1, Math.round(bounds.width * ratio));
        const height = Math.max(1, Math.round(bounds.height * ratio));
        if (canvas.width === width && canvas.height === height) return;
        canvas.width = width;
        canvas.height = height;
        needsResizeDraw = true;
        requestDraw();
      };

      const observer = new ResizeObserver(resize);
      observer.observe(canvas);
      renderRef.current = requestRender;
      resize();
      requestRender(progressRef.current);

      stopSequence = () => {
        active = false;
        renderRef.current = null;
        observer.disconnect();
        window.cancelAnimationFrame(animationFrame);
        controller.abort();
        bitmaps.forEach((bitmap) => bitmap.close());
        bitmaps.clear();
        blobs.clear();
        context.clearRect(0, 0, canvas.width, canvas.height);
      };
    };

    startSequence();
    motion.addEventListener("change", startSequence);
    mobileViewport.addEventListener("change", startSequence);
    return () => {
      motion.removeEventListener("change", startSequence);
      mobileViewport.removeEventListener("change", startSequence);
      stopSequence();
    };
  }, []);

  return (
    <div ref={sceneRef} className={styles.scene} aria-hidden="true">
      <canvas ref={canvasRef} className={styles.canvas} />
    </div>
  );
}
