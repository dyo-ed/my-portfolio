import { useState, useEffect, useRef, type CSSProperties } from "react";
import {
  STATS_BIRTH_DATE,
  STATS_DEFINITIONS,
  STATS_NOISE_CHARS,
  statsCounterCss,
  type StatDefinition,
} from "../../../utils/constants/homeConstant";

type HomeStatsCopy = {
  liveBadge: string;
  items: Array<{
    id: string;
    label: string;
    unit: string;
    description: string;
  }>;
};

type StatRow = StatDefinition & {
  label: string;
  unit: string;
  description: string;
};

function mergeStats(copy: HomeStatsCopy): StatRow[] {
  return STATS_DEFINITIONS.map((def) => {
    const item = copy.items.find((i) => i.id === def.id);
    if (!item) {
      throw new Error(`Missing home.stats.items entry for id ${def.id}`);
    }
    return {
      ...def,
      label: item.label,
      unit: item.unit,
      description: item.description,
    };
  });
}

function getDaysActive() {
  return Math.floor(
    (Date.now() - STATS_BIRTH_DATE.getTime()) / (1000 * 60 * 60 * 24)
  );
}

function useCountUp(target: number, duration = 1600) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLDivElement | null>(null);
  const started = useRef(false);

  useEffect(() => {
    started.current = false;
    setVal(0);
  }, [target]);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !started.current) {
          started.current = true;
          const frames = Math.round(duration / 16);
          let frame = 0;
          const tick = () => {
            frame++;
            const eased = 1 - Math.pow(1 - frame / frames, 3);
            setVal(Math.floor(target * eased));
            if (frame < frames) requestAnimationFrame(tick);
            else setVal(target);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target, duration]);

  return [val, ref] as const;
}

function GlitchNumber({ value }: { value: number }) {
  const [display, setDisplay] = useState(String(value));
  const glitching = useRef(false);

  useEffect(() => {
    setDisplay(String(value));
  }, [value]);

  const triggerGlitch = () => {
    if (glitching.current) return;
    glitching.current = true;
    const str = String(value);
    let tick = 0;
    const iv = setInterval(() => {
      if (tick > 8) {
        clearInterval(iv);
        setDisplay(str);
        glitching.current = false;
        return;
      }
      setDisplay(
        str
          .split("")
          .map((c, i) =>
            i < tick
              ? c
              : /\d/.test(c)
                ? String(Math.floor(Math.random() * 10))
                : STATS_NOISE_CHARS[
                    Math.floor(Math.random() * STATS_NOISE_CHARS.length)
                  ]
          )
          .join("")
      );
      tick++;
    }, 40);
  };

  return (
    <span onMouseEnter={triggerGlitch} style={{ cursor: "crosshair" }}>
      {display}
    </span>
  );
}

function StatCard({
  stat,
  index,
  liveBadge,
}: {
  stat: StatRow;
  index: number;
  liveBadge: string;
}) {
  const resolvedTarget = stat.live ? getDaysActive() : (stat.value ?? 0);
  const [count, cardRef] = useCountUp(
    resolvedTarget,
    stat.live ? 2400 : 1400 + index * 200
  );
  const [days, setDays] = useState(resolvedTarget);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (!stat.live) return;
    const iv = setInterval(() => setDays(getDaysActive()), 60000);
    return () => clearInterval(iv);
  }, [stat.live]);

  const displayValue = stat.live ? days : count;

  return (
    <div
      ref={cardRef}
      className={`stat-card${hovered ? " stat-card--hover" : ""}`}
      style={{ "--delay": `${index * 0.12}s` } as CSSProperties}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="stat-id">{stat.id}</div>

      {stat.live && (
        <div className="live-badge">
          <span className="live-dot" />
          {liveBadge}
        </div>
      )}

      <div className="stat-number">
        <GlitchNumber value={displayValue} />
      </div>

      <div className="stat-label">
        {stat.label.split("\n").map((line, i) => (
          <span key={i} style={{ display: "block" }}>
            {line}
          </span>
        ))}
      </div>

      <div className="stat-meta">
        <span className="stat-unit">{stat.unit}</span>
        <span className="stat-desc">{stat.description}</span>
      </div>

      <div className="corner corner--tl" />
      <div className="corner corner--br" />
    </div>
  );
}

type StatsCounterProps = {
  stats: HomeStatsCopy;
};

export default function StatsCounter({ stats }: StatsCounterProps) {
  const rows = mergeStats(stats);
  return (
    <>
      <style>{statsCounterCss}</style>
      <div className="stats-grid">
        {rows.map((stat, i) => (
          <StatCard
            key={stat.id}
            stat={stat}
            index={i}
            liveBadge={stats.liveBadge}
          />
        ))}
      </div>
    </>
  );
}
