import React, { useState, useEffect } from "react";
import appString from "../../../locales/en/appStrings.json";
import { PROFILE, ATTRIBUTES, SOCIALS, ABOUT_STYLES } from "../../../utils/constants/aboutConstant";

// ─── HELPERS ───────────────────────────────────────────────────────────────

const SocialIcon = ({ id }: { id: string }) => {
  if (id === "github")
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
        <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.603-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.461-1.11-1.461-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.268 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.026 2.747-1.026.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
      </svg>
    );
  if (id === "linkedin")
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    );
  return null;
};

function GlitchText({ text }: { text: string }) {
  const [display, setDisplay] = useState(text);
  const [glitching, setGlitching] = useState(false);
  const trigger = () => {
    if (glitching) return;
    setGlitching(true);
    let ticks = 0;
    const iv = setInterval(() => {
      if (ticks > 10) { clearInterval(iv); setDisplay(text); setGlitching(false); return; }
      setDisplay(text.split("").map((c, i) =>
        i < ticks ? c : Math.random() > 0.5 ? appString.about.me.noiseChars[Math.floor(Math.random() * appString.about.me.noiseChars.length)] : c
      ).join(""));
      ticks++;
    }, 45);
  };
  return <span onMouseEnter={trigger} style={{ cursor: "crosshair" }}>{display}</span>;
}

// ─── COMPONENT ───────────────────────────────────────────────────────────────

export default function AboutMe() {
  const [hoveredAttr, setHoveredAttr] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(() => (typeof window !== "undefined" ? window.innerWidth <= 760 : false));

  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth <= 760);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  return (
    <div style={{
      background: "#0a0a0a", color: "#f0f0f0", minHeight: "100vh",
      fontFamily: "'Courier New', Courier, monospace", cursor: "crosshair",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: "clamp(24px, 5vw, 72px)", boxSizing: "border-box",
    }}>
      <style>{ABOUT_STYLES}</style>
      <div className="scanlines" />

      <div className="about-grid">
        {!isMobile && (
          <div className="img-frame">
            <div className="img-corner tl" />
            <div className="img-corner br" />
            <div className="img-scanlines" />
            <img src={PROFILE.image} alt={PROFILE.name} />
          </div>
        )}

        <div className="info-col">
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16 }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontFamily: "'Space Mono',monospace", fontSize: 9, letterSpacing: 5, color: "#FFE600", marginBottom: 10 }}>
                {appString.about.me.entityProfile}
              </div>
              <h1 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: isMobile ? "clamp(40px, 11vw, 64px)" : "clamp(46px, 6.5vw, 90px)", lineHeight: 0.88, letterSpacing: "-1px" }}>
                <GlitchText text={PROFILE.name.split(" ")[0]} /><br />
                <span style={{ color: "#FFE600" }}>
                  <GlitchText text={PROFILE.name.split(" ").slice(1).join(" ")} />
                </span>
              </h1>
              <div style={{ fontFamily: "'Space Mono',monospace", fontSize: isMobile ? 9 : 11, letterSpacing: 5, color: "#888", marginTop: 12 }}>
                {PROFILE.role}
                <span style={{ color: "#FFE600", animation: "blink 1s infinite", marginLeft: 4 }}>_</span>
              </div>
            </div>
            {isMobile && (
              <div className="img-frame-mobile" style={{ marginTop: 24 }}>
                <div className="img-corner tl" /><div className="img-corner br" /><div className="img-scanlines" />
                <img src={PROFILE.imageMobile} alt={PROFILE.name} />
              </div>
            )}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 14, margin: "clamp(14px,2vw,24px) 0" }}>
            <div style={{ height: 1, flex: 1, background: "#1a1a1a" }} />
            <span style={{ fontFamily: "'Space Mono',monospace", fontSize: 9, letterSpacing: 4, color: "#2a2a2a" }}>{appString.about.me.profileTxt}</span>
            <div style={{ height: 1, flex: 1, background: "#1a1a1a" }} />
          </div>

          <p style={{ fontFamily: "'Space Mono',monospace", fontSize: "clamp(11px, 1.15vw, 13px)", lineHeight: 2, color: "#777", flex: "1 1 auto" }}>
            {PROFILE.description}
          </p>

          <div style={{ margin: "clamp(14px,2vw,24px) 0" }}>
            <div style={{ fontFamily: "'Space Mono',monospace", fontSize: 9, letterSpacing: 5, color: "#FFE600", marginBottom: 10 }}>
              {appString.about.me.attributesLabel}
            </div>
            <div className="attr-grid">
              {ATTRIBUTES.map((a, i) => (
                <div key={a.title} className="attr-item" onMouseEnter={() => setHoveredAttr(i)} onMouseLeave={() => setHoveredAttr(null)}>
                  <div style={{ fontFamily: "'Space Mono',monospace", fontSize: 8, letterSpacing: 4, color: hoveredAttr === i ? "#FFE600" : "#3a3a3a", marginBottom: 5, transition: "color 0.15s" }}>
                    {a.title}
                  </div>
                  <div style={{ fontFamily: "'Space Mono',monospace", fontSize: 12, color: hoveredAttr === i ? "#f0f0f0" : "#888", transition: "color 0.15s" }}>
                    {a.text}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {SOCIALS.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="social-btn" title={s.label}>
                <SocialIcon id={s.id} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}