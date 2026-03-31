import { CSSProperties } from "react";

export const BOOT_DURATION = 1000;
export const TICK_MS = BOOT_DURATION / 100;

export const SCANLINES_CSS = `
  * { box-sizing: border-box; margin: 0; padding: 0; }
  @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
  .boot-scanlines {
    position: fixed; inset: 0; pointer-events: none; z-index: 100000;
    background-image: repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px);
  }
`;

export const overlayStyle: CSSProperties = {
  position: "fixed",
  inset: 0,
  backgroundColor: "#0a0a0a",
  zIndex: 99999,
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  transition: "opacity 0.05s linear",
  gap: 48,
  pointerEvents: "auto",
  touchAction: "none",
};

export const nameStyle: CSSProperties = {
  fontFamily: "'Bebas Neue', sans-serif",
  fontSize: "clamp(64px, 12vw, 128px)",
  letterSpacing: 12,
  color: "#FFE600",
  lineHeight: 1,
  userSelect: "none",
};

export const loadingContainerStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 14,
  width: "min(320px, 60vw)",
};

export const barContainerStyle: CSSProperties = {
  width: "100%",
  height: 2,
  background: "#1a1a1a",
  position: "relative",
  overflow: "hidden",
};

export const barFillerBase: CSSProperties = {
  position: "absolute",
  left: 0,
  top: 0,
  bottom: 0,
  background: "#FFE600",
  transition: "width 0.05s linear",
};

export const statusRowStyle: CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  width: "100%",
  fontFamily: "'Space Mono', monospace",
  fontSize: 10,
  letterSpacing: 3,
  color: "#444",
};
