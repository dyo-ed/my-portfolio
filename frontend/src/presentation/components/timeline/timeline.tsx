import { useState, useEffect, useRef } from "react";
import GlitchText from "../glitch_text/glitchText";
import appStrings from "../../../locales/en/appStrings.json";
import {
  ACHIEVEMENTS,
  TIMELINE_CSS,
  AchievementItem,
  timelineStyles,
} from "../../../utils/constants/aboutConstant";

// ─── TIMELINE CARD ────────────────────────────────────────────────────────────

function TimelineCard({
  item,
  index,
}: {
  item: AchievementItem;
  index: number;
}) {
  const { timeline: content } = appStrings.about;
  const isLeft = index % 2 === 0;

  return (
    <div
      className={`tl-item ${isLeft ? "is-left" : "is-right"}`}
      style={{ animationDelay: `${index * 55}ms` }}
    >
      {/* ── date block ── */}
      <div
        className={`tl-date-block ${isLeft ? "date-right" : "date-left"}`}
      >
        <span style={timelineStyles.dateMonth}>
          {item.date.split(" ")[0]}
        </span>
        <span style={timelineStyles.dateYear}>
          {item.date.split(" ")[1]}
        </span>
      </div>

      {/* ── node ── */}
      <div className="tl-node-col">
        <div className={`tl-node ${item.highlight ? "hl" : ""}`}>
          <div className="tl-node-dot" />
        </div>
      </div>

      {/* ── card ── */}
      <div className="tl-card-col">
        <article className={`tl-card ${item.highlight ? "highlighted" : ""}`}>
          {/* mobile-only date strip */}
          <div className="tl-mobile-date">
            <span style={timelineStyles.mobMonth}>
              {item.date.split(" ")[0]}
            </span>
            <span style={timelineStyles.mobYear}>
              {item.date.split(" ")[1]}
            </span>
          </div>

          {/* image */}
          <div style={timelineStyles.imgWrap}>
            <img
              src={item.image}
              alt={item.title}
              className="tl-img"
              draggable={false}
            />
            <div style={timelineStyles.imgScrim} />
            <span style={timelineStyles.imgNum}>{item.id}</span>
          </div>

          {/* body */}
          <div style={timelineStyles.cardBody}>
            {item.highlight && (
              <div style={timelineStyles.badge}>{content.highlightBadge}</div>
            )}
            <h3 className="tl-title" style={timelineStyles.cardTitle}>
              {item.title}
            </h3>
            <p style={timelineStyles.cardDesc}>{item.description}</p>
            <div style={timelineStyles.cardTags}>
              {item.tags.map((t) => (
                <span className="tl-tag" key={t} style={timelineStyles.tag}>
                  {t}
                </span>
              ))}
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}

// ─── ROOT ─────────────────────────────────────────────────────────────────────

export default function AchievementTimeline() {
  const { timeline: content } = appStrings.about;
  const vpRef = useRef<HTMLDivElement>(null);
  const drag = useRef({ active: false, startY: 0, scrollTop: 0 });
  const [prog, setProg] = useState(0);

  // mouse drag scroll
  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    drag.current = {
      active: true,
      startY: e.clientY,
      scrollTop: vpRef.current!.scrollTop,
    };
  };

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!drag.current.active) return;
      vpRef.current!.scrollTop =
        drag.current.scrollTop - (e.clientY - drag.current.startY);
    };
    const onUp = () => {
      drag.current.active = false;
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, []);

  // touch drag scroll
  const onTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    drag.current = {
      active: true,
      startY: e.touches[0].clientY,
      scrollTop: vpRef.current!.scrollTop,
    };
  };
  const onTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    vpRef.current!.scrollTop =
      drag.current.scrollTop - (e.touches[0].clientY - drag.current.startY);
  };

  const onScroll = () => {
    const el = vpRef.current;
    if (!el) return;
    setProg(el.scrollTop / (el.scrollHeight - el.clientHeight));
  };

  return (
    <div style={timelineStyles.root}>
      <style>{TIMELINE_CSS}</style>

      {/* ── HEADER ── */}
      <header style={timelineStyles.header}>
        <span style={timelineStyles.eyebrow}>{content.eyebrow}</span>
        <h2 style={timelineStyles.h1}>
          <GlitchText text={content.headingLine1} />{" "}
          <span style={{ color: "#FFE600" }}>
            <GlitchText text={content.headingLine2} />
          </span>{" "}
          <span style={{ WebkitTextStroke: "1px #222", color: "transparent" }}>
            <GlitchText text={content.headingLine3} />
          </span>
        </h2>
      </header>

      {/* ── SCROLLABLE VIEWPORT ── */}
      <div
        className="tl-vp"
        ref={vpRef}
        style={timelineStyles.viewport}
        onMouseDown={onMouseDown}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onScroll={onScroll}
      >
        {/* right-edge progress bar */}
        <div style={timelineStyles.progressBar}>
          <div
            style={{
              width: "100%",
              height: `${prog * 100}%`,
              background: "#FFE600",
              transition: "height 0.08s linear",
            }}
          />
        </div>

        <div className="tl-inner" style={timelineStyles.inner}>
          <div className="tl-spine" style={timelineStyles.spine} />
          {ACHIEVEMENTS.map((item, i) => (
            <TimelineCard key={item.id} item={item} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
