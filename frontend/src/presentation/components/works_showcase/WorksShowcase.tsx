import React, { useState, useEffect } from "react";
import appStrings from "../../../locales/en/appStrings.json";
import GlitchText from "../glitch_text/glitchText";
import {
  WORKS,
  worksShowcaseStyles as styles,
  worksShowcaseCss as CSS,
} from "../../../utils/constants/homeConstant";

export default function WorksShowcase() {
  const [hovered, setHovered] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const { worksShowcase } = appStrings.home;

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 860px), (hover: none) and (pointer: coarse)");
    setIsMobile(mediaQuery.matches);
    
    const listener = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mediaQuery.addEventListener("change", listener);
    return () => mediaQuery.removeEventListener("change", listener);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, i: number) => {
    if (isMobile && hovered !== i) {
      e.preventDefault();
      setHovered(i);
    }
  };

  return (
    <section style={styles.section} aria-label="Selected Works">
      <style>{CSS}</style>

      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          backgroundImage:
            "linear-gradient(#1a1a1a 1px,transparent 1px),linear-gradient(90deg,#1a1a1a 1px,transparent 1px)",
          backgroundSize: "48px 48px",
          opacity: 0.25,
        }}
      />

      {/* ── HEADER ── */}
      <div style={styles.header}>
        <span style={styles.label}>{worksShowcase.label}</span>
        <h2 style={styles.heading}>
          <GlitchText text={worksShowcase.headingLine1} animateOnMount />{' '}
          <span style={{ color: "#FFE600" }}>
            <GlitchText text={worksShowcase.headingLine2} animateOnMount />
          </span>
        </h2>
        <p style={styles.subtext}>
          {worksShowcase.subtext.replace("{count}", WORKS.length.toString())}
        </p>
      </div>

      {/* ── CARDS STRIP ── */}
      <div
        style={styles.strip}
        onMouseLeave={() => setHovered(null)}
      >
        {WORKS.map((work, i) => {
          const isHovered = hovered === i;
          const isDeflated = hovered !== null && !isHovered;

          return (
            <a
              key={i}
              href={work.link}
              target="_blank"
              rel="noopener noreferrer"
              draggable={false}
              className={`works-card ${isHovered ? "works-card--open" : ""} ${isDeflated ? "works-card--closed" : ""}`}
              onMouseEnter={() => {
                if (!isMobile) setHovered(i);
              }}
              onClick={(e) => handleClick(e, i)}
              style={{
                "--bg": `url(${work.bg})`,
                textDecoration: "none",
              } as React.CSSProperties}
            >
              {/* index stamp — always visible */}
              <span className="works-card__index">
                {String(i + 1).padStart(2, "0")}
              </span>

              {/* vertical title shown when folded */}
              <span className="works-card__title-v">
                {work.title}
              </span>

              {/* body: title + desc + tags — shown on expand */}
              <div className="works-card__body">
                <span className="works-card__title-h">{work.title}</span>
                <p className="works-card__desc">{work.description}</p>
                <div className="works-card__tags">
                  {work.tags.map((t) => (
                    <span className="works-card__tag" key={t}>{t}</span>
                  ))}
                </div>
              </div>

              {/* bottom bar — CTA only */}
              <div className="works-card__footer">
                <span className="works-card__cta">{worksShowcase.viewCta}</span>
              </div>

              {/* scanline overlay */}
              <div className="works-card__scanlines" />

              {/* noise grain */}
              <div className="works-card__grain" />
            </a>
          );
        })}
      </div>

    </section>
  );
}
