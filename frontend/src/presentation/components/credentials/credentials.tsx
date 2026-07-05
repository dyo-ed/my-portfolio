import React, { useState, useRef } from "react";
import appStrings from "../../../locales/en/appStrings.json";
import GlitchText from "../glitch_text/glitchText";
import {
  CERTS,
  CREDENTIALS_CSS,
  CertItem,
  credentialsStyles,
} from "../../../utils/constants/aboutConstant";

// ─── CERT CARD ────────────────────────────────────────────────────────────────

function CertCard({
  cert,
  isActive,
}: {
  cert: CertItem;
  isActive: boolean;
}) {
  const [hov, setHov] = useState(false);
  const active = isActive || hov;

  const corners: Array<["top" | "bottom", "left" | "right"]> = [
    ["top", "left"],
    ["top", "right"],
    ["bottom", "left"],
    ["bottom", "right"],
  ];

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        width: "clamp(270px, 26vw, 320px)",
        height: "clamp(270px, 26vw, 320px)",
        flexShrink: 0,
        cursor: "crosshair",
        userSelect: "none",
        transform: hov
          ? "translateY(-6px)"
          : isActive
            ? "translateY(-3px)"
            : "none",
        transition: "transform 0.22s cubic-bezier(0.23,1,0.32,1)",
      }}
    >
      <div
        style={{
          border: `1px solid ${active ? cert.accent : "#1e1e1e"}`,
          background: "#0d0d0d",
          height: "100%",
          overflow: "hidden",
          boxShadow: active ? `3px 3px 0 ${cert.accent}` : "none",
          transition: "border-color 0.2s, box-shadow 0.2s",
          position: "relative",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Corner decorations */}
        {corners.map(([v, h]) => (
          <div
            key={v + h}
            style={{
              position: "absolute",
              [v]: 6,
              [h]: 6,
              width: 8,
              height: 8,
              borderTop: v === "top" ? `1px solid ${cert.accent}` : "none",
              borderBottom:
                v === "bottom" ? `1px solid ${cert.accent}` : "none",
              borderLeft: h === "left" ? `1px solid ${cert.accent}` : "none",
              borderRight: h === "right" ? `1px solid ${cert.accent}` : "none",
              opacity: active ? 1 : 0.2,
              transition: "opacity 0.2s",
              zIndex: 4,
              pointerEvents: "none",
            }}
          />
        ))}

        {/* Image zone — collapses when panel is open */}
        <div
          style={{
            position: "relative",
            height: isActive ? "0px" : "clamp(90px, 9vw, 115px)",
            overflow: "hidden",
            background: "#080808",
            flexShrink: 0,
            transition: "height 0.38s cubic-bezier(0.23,1,0.32,1)",
          }}
        >
          <img
            src={cert.img}
            alt={cert.title}
            draggable={false}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
              opacity: isActive ? 0 : hov ? 0.55 : 0.3,
              filter: "grayscale(30%)",
              transform: hov && !isActive ? "scale(1.07)" : "scale(1)",
              transition: "opacity 0.3s, transform 0.5s",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
              backgroundImage:
                "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.15) 2px,rgba(0,0,0,0.15) 4px)",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: 6,
              right: 10,
              fontFamily: "'Bebas Neue',sans-serif",
              fontSize: "clamp(44px,6vw,64px)",
              color: cert.accent,
              opacity: isActive ? 0 : 0.13,
              lineHeight: 1,
              pointerEvents: "none",
              transition: "opacity 0.3s",
            }}
          >
            {cert.id}
          </div>
          <div
            style={{
              position: "absolute",
              top: 10,
              right: 10,
              fontFamily: "'Bebas Neue',sans-serif",
              fontSize: "clamp(13px,1.6vw,17px)",
              letterSpacing: 2,
              color: "#f0f0f0",
              background: "#0d0d0dcc",
              padding: "2px 7px",
              opacity: isActive ? 0 : 1,
              transition: "opacity 0.2s",
            }}
          >
            {cert.issuer}
          </div>
        </div>

        {/* Body */}
        <div
          style={{
            padding: "clamp(14px,2vw,20px)",
            display: "flex",
            flexDirection: "column",
            flex: 1,
          }}
        >
          {/* Dates — hidden when active */}
          {!isActive && (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 10,
                fontFamily: "'Space Mono',monospace",
                fontSize: "clamp(8px,0.9vw,10px)",
                letterSpacing: 3,
              }}
            >
              <span style={{ color: "#444" }}>{cert.date}</span>
              <span style={{ color: "#2a2a2a" }}>EXP {cert.expires}</span>
            </div>
          )}

          {/* Title */}
          <h3
            style={{
              fontFamily: "'Bebas Neue',sans-serif",
              fontSize: "clamp(22px,3vw,30px)",
              letterSpacing: 2,
              lineHeight: 1.1,
              color: active ? cert.accent : "#f0f0f0",
              transition: "color 0.2s",
              marginBottom: 2,
            }}
          >
            {cert.title}
          </h3>
          <div
            style={{
              fontFamily: "'Bebas Neue',sans-serif",
              fontSize: "clamp(14px,1.8vw,19px)",
              letterSpacing: 2,
              color: "#444",
              marginBottom: isActive ? 10 : 12,
            }}
          >
            {cert.subtitle}
          </div>

          {/* Description — only when active */}
          {isActive && (
            <p
              style={{
                fontFamily: "'Space Mono',monospace",
                fontSize: "clamp(8px,0.85vw,10px)",
                lineHeight: 1.85,
                color: "#666",
                marginBottom: 10,
              }}
            >
              {cert.desc}
            </p>
          )}

          {/* Divider */}
          <div
            style={{
              height: 1,
              background: `linear-gradient(to right, ${cert.accent}55, transparent)`,
              marginTop: "auto",
              marginBottom: 10,
            }}
          />

          {/* Credential ID */}
          <div
            style={{
              fontFamily: "'Space Mono',monospace",
              fontSize: "clamp(8px,0.9vw,10px)",
              letterSpacing: 2,
              color: "#333",
              display: "flex",
              gap: 8,
              alignItems: "center",
            }}
          >
            <span style={{ color: cert.accent, fontSize: 8 }}>▶</span>
            {cert.credId}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────

export default function CertificationCards() {
  const { credentials: content } = appStrings.about;

  const trackRef = useRef<HTMLDivElement>(null);
  const drag = useRef({
    active: false,
    startX: 0,
    startScroll: 0,
    moved: false,
    vel: 0,
    lastX: 0,
    certId: null as string | null,
  });
  const rafRef = useRef<number | null>(null);
  const scrollRafRef = useRef<number | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);

  const stopMomentum = () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
  };

  const runMomentum = () => {
    const el = trackRef.current;
    if (!el || Math.abs(drag.current.vel) < 0.8) {
      drag.current.vel = 0;
      return;
    }
    drag.current.vel *= 0.91;
    el.scrollLeft -= drag.current.vel;
    rafRef.current = requestAnimationFrame(runMomentum);
  };

  const smoothScrollTo = (targetScroll: number) => {
    if (scrollRafRef.current) cancelAnimationFrame(scrollRafRef.current);
    const el = trackRef.current;
    if (!el) return;
    const start = el.scrollLeft;
    const dist = targetScroll - start;
    const duration = 450;
    let startTime: number | null = null;
    const ease = (t: number) =>
      t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    const step = (now: number) => {
      if (!startTime) startTime = now;
      const progress = Math.min((now - startTime) / duration, 1);
      el.scrollLeft = start + dist * ease(progress);
      if (progress < 1) scrollRafRef.current = requestAnimationFrame(step);
    };
    scrollRafRef.current = requestAnimationFrame(step);
  };

  const computeTargetScroll = (id: string) => {
    const track = trackRef.current;
    if (!track) return 0;
    const idx = CERTS.findIndex((c) => c.id === id);
    const visibleW = track.clientWidth;
    const padLeft =
      parseFloat(getComputedStyle(track).paddingLeft) || 52;
    const cardW = Math.min(320, Math.max(270, visibleW * 0.26));
    const gap = Math.min(28, Math.max(16, visibleW * 0.025));
    const panelW = Math.min(360, Math.max(260, window.innerWidth * 0.28));
    const cardScrollLeft = padLeft + idx * (cardW + gap);
    const pairW = cardW + panelW;
    const targetScroll =
      pairW >= visibleW
        ? cardScrollLeft - padLeft
        : cardScrollLeft - (visibleW - pairW) / 2;
    return Math.max(0, targetScroll);
  };

  const scrollToShowPair = (id: string, hadPrevOpen: boolean) => {
    const delay = hadPrevOpen ? 400 : 30;
    setTimeout(() => smoothScrollTo(computeTargetScroll(id)), delay);
  };

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    stopMomentum();
    let el = e.target as HTMLElement | null;
    let certId: string | null = null;
    let isClose = false;
    while (el && el !== trackRef.current) {
      if (el.dataset && el.dataset.certid) {
        if (el.dataset.certid === "__close__") isClose = true;
        else certId = el.dataset.certid;
        break;
      }
      el = el.parentElement;
    }
    if (isClose) {
      setActiveId(null);
      return;
    }
    drag.current = {
      active: true,
      startX: e.clientX,
      startScroll: trackRef.current!.scrollLeft,
      moved: false,
      vel: 0,
      lastX: e.clientX,
      certId,
    };
    trackRef.current!.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!drag.current.active) return;
    const dx = e.clientX - drag.current.startX;
    drag.current.vel = e.clientX - drag.current.lastX;
    drag.current.lastX = e.clientX;
    if (Math.abs(dx) > 4) drag.current.moved = true;
    trackRef.current!.scrollLeft = drag.current.startScroll - dx;
  };

  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!drag.current.active) return;
    drag.current.active = false;
    if (!drag.current.moved && drag.current.certId) {
      const id = drag.current.certId;
      setActiveId((prev) => {
        const next = prev === id ? null : id;
        if (next) scrollToShowPair(next, prev !== null && prev !== id);
        return next;
      });
    }
    drag.current.moved = false;
    drag.current.certId = null;
    rafRef.current = requestAnimationFrame(runMomentum);
  };

  return (
    <div style={credentialsStyles.section}>
      <style>{CREDENTIALS_CSS}</style>

      <div className="cred-scanlines" />

      {/* HEADER */}
      <header style={credentialsStyles.header}>
        <div>
          <span style={credentialsStyles.eyebrow}>{content.eyebrow}</span>
          <h2 style={credentialsStyles.title}>
            <GlitchText text={content.heading} animateOnMount />
            <span
              style={{
                color: "#FFE600",
                animation: "blink 1.4s infinite",
              }}
            >
              {content.blinkCursor}
            </span>
          </h2>
        </div>
      </header>

      {/* CARD TRACK */}
      <div
        ref={trackRef}
        className="cred-track"
        data-prevent-selection="true"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        style={credentialsStyles.track}
      >
        {CERTS.map((cert, i) => {
          const open = activeId === cert.id;
          const panelW = "clamp(260px, 28vw, 360px)";
          return (
            <div
              key={cert.id}
              data-certid={cert.id}
              style={{
                animation: `fadeUp 0.5s ${0.08 + i * 0.07}s both`,
                flexShrink: 0,
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-start",
              }}
            >
              <CertCard cert={cert} isActive={open} />

              {/* Inline sliding detail panel */}
              <div
                style={{
                  width: open ? panelW : "0px",
                  overflow: "hidden",
                  transition: "width 0.38s cubic-bezier(0.23,1,0.32,1)",
                  flexShrink: 0,
                  height: "clamp(270px, 26vw, 320px)",
                  borderTop: open ? `1px solid ${cert.accent}` : "none",
                  borderRight: open ? `1px solid ${cert.accent}` : "none",
                  borderBottom: open ? `1px solid ${cert.accent}` : "none",
                }}
              >
                <div
                  style={{
                    width: panelW,
                    height: "100%",
                    background: "#080808",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  {/* Full-panel image */}
                  <img
                    src={cert.img}
                    alt={cert.title}
                    draggable={false}
                    style={{
                      position: "absolute",
                      inset: 0,
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                      opacity: open ? 0.85 : 0,
                      filter: "grayscale(15%)",
                      transition: "opacity 0.4s 0.15s",
                    }}
                  />
                  {/* Scanlines overlay */}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      pointerEvents: "none",
                      zIndex: 1,
                      backgroundImage:
                        "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.12) 2px,rgba(0,0,0,0.12) 4px)",
                    }}
                  />
                  {/* Close button */}
                  <button
                    data-certid="__close__"
                    style={{
                      position: "absolute",
                      top: 10,
                      right: 10,
                      zIndex: 3,
                      background: "#0a0a0acc",
                      border: "1px solid #333",
                      color: "#666",
                      fontFamily: "'Space Mono',monospace",
                      fontSize: 11,
                      width: 26,
                      height: 26,
                      cursor: "crosshair",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    ✕
                  </button>
                </div>
              </div>
            </div>
          );
        })}
        <div style={credentialsStyles.trackSpacer} />
      </div>
    </div>
  );
}
