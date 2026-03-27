import React from "react";

type Star = {
  id: string;
  xPct: number;
  yPct: number;
  size: number;
  opacity: number;
  layer: 0 | 1 | 2;
};

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
}

export default function StarsBackground() {
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const [stars] = React.useState<Star[]>(() => {
    const count = 44; // minimal, but still present on large screens
    const out: Star[] = [];

    for (let i = 0; i < count; i++) {
      const layer = (i % 3) as 0 | 1 | 2;
      const sizeBase = layer === 0 ? 1 : layer === 1 ? 1.25 : 1.5;
      const size = sizeBase + Math.random() * 0.9;
      const opacityBase = layer === 0 ? 0.22 : layer === 1 ? 0.3 : 0.38;
      const opacity = clamp(opacityBase + Math.random() * 0.22, 0.12, 0.7);

      out.push({
        id: `star-${i}`,
        xPct: Math.random() * 100,
        yPct: Math.random() * 100,
        size,
        opacity,
        layer,
      });
    }

    return out;
  });

  React.useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    if (prefersReducedMotion()) return;

    let raf = 0;
    let targetX = 0;
    let targetY = 0;
    let currX = 0;
    let currY = 0;

    const onMove = (e: PointerEvent) => {
      const x = e.clientX / Math.max(1, window.innerWidth);
      const y = e.clientY / Math.max(1, window.innerHeight);
      // Keep reaction subtle (scale down the -1..1 range).
      targetX = (x - 0.5) * 2 * 0.55;
      targetY = (y - 0.5) * 2 * 0.55;
    };

    const tick = () => {
      // smooth a touch to keep it subtle
      // More delay / inertia (smaller lerp factor).
      currX += (targetX - currX) * 0.03;
      currY += (targetY - currY) * 0.03;
      el.style.setProperty("--px", currX.toFixed(4));
      el.style.setProperty("--py", currY.toFixed(4));
      raf = window.requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    raf = window.requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="stars-bg" ref={containerRef} aria-hidden="true">
      <div className="stars-layer stars-layer-0">
        {stars
          .filter((s) => s.layer === 0)
          .map((s) => (
            <span
              key={s.id}
              className="star"
              style={
                {
                  left: `${s.xPct}%`,
                  top: `${s.yPct}%`,
                  width: `${s.size}px`,
                  height: `${s.size}px`,
                  opacity: s.opacity,
                } as React.CSSProperties
              }
            />
          ))}
      </div>
      <div className="stars-layer stars-layer-1">
        {stars
          .filter((s) => s.layer === 1)
          .map((s) => (
            <span
              key={s.id}
              className="star"
              style={
                {
                  left: `${s.xPct}%`,
                  top: `${s.yPct}%`,
                  width: `${s.size}px`,
                  height: `${s.size}px`,
                  opacity: s.opacity,
                } as React.CSSProperties
              }
            />
          ))}
      </div>
      <div className="stars-layer stars-layer-2">
        {stars
          .filter((s) => s.layer === 2)
          .map((s) => (
            <span
              key={s.id}
              className="star"
              style={
                {
                  left: `${s.xPct}%`,
                  top: `${s.yPct}%`,
                  width: `${s.size}px`,
                  height: `${s.size}px`,
                  opacity: s.opacity,
                } as React.CSSProperties
              }
            />
          ))}
      </div>
    </div>
  );
}

