import type { CSSProperties } from "react";

export const homeStyles: Record<string, CSSProperties> = {
  section: {
    // Keep hero exactly within the viewport (header is fixed at 56px),
    // so the bottom marquee is visible without initial scrolling.
    height: "calc(100svh - 56px)",
    minHeight: "calc(100vh - 56px)",
    position: "relative",
    overflow: "hidden",
    display: "flex",
    alignItems: "stretch",
  },

  leftCol: {
    position: "relative",
    zIndex: 5,
    padding:
      "clamp(24px, 4vw, 40px) clamp(24px, 6vw, 90px) clamp(56px, 10vh, 84px)",
    width: "50%",
    flex: "0 0 50%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },

  statusRow: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    marginBottom: 0,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: "50%",
    background: "#00ff88",
    animation: "blink 1.5s infinite",
  },
  statusText: {
    fontFamily: "'Space Mono',monospace",
    fontSize: 11,
    color: "#00ff88",
    letterSpacing: 3,
  },

  heroTitle: {
    fontFamily: "'Bebas Neue',sans-serif",
    fontSize: "clamp(56px, 8.5vw, 108px)",
    lineHeight: 0.88,
    letterSpacing: "-1px",
    marginBottom: "clamp(12px, 2.2vh, 22px)",
  },
  heroHighlight: {
    color: "#FFE600",
  },
  heroOutline: {
    WebkitTextStroke: "0.5px #3a3a3a",
    color: "transparent",
  },

  description: {
    fontFamily: "'Space Mono',monospace",
    fontSize: 13,
    lineHeight: 1.9,
    color: "#888",
    maxWidth: 340,
    marginBottom: "clamp(18px, 3vh, 32px)",
  },

  ctaRow: {
    display: "flex",
    gap: 16,
  },

  rightCol: {
    position: "relative",
    flex: "1",
    overflow: "hidden",
  },

  cornerTL: {
    position: "absolute",
    top: 72,
    left: 12,
    width: 32,
    height: 32,
    borderTop: "1px solid #2a2a2a",
    borderLeft: "1px solid #2a2a2a",
    zIndex: 2,
    pointerEvents: "none",
  },
  cornerBR: {
    position: "absolute",
    bottom: 52,
    right: 12,
    width: 32,
    height: 32,
    borderBottom: "1px solid #2a2a2a",
    borderRight: "1px solid #2a2a2a",
    zIndex: 2,
    pointerEvents: "none",
  },

  artifactLabel: {
    position: "absolute",
    top: 88,
    left: 18,
    fontFamily: "'Space Mono',monospace",
    fontSize: 9,
    letterSpacing: 4,
    color: "#2a2a2a",
    writingMode: "vertical-lr",
    zIndex: 2,
    pointerEvents: "none",
  },
  renderLabel: {
    position: "absolute",
    bottom: 60,
    right: 18,
    fontFamily: "'Space Mono',monospace",
    fontSize: 9,
    letterSpacing: 3,
    color: "#252525",
    textAlign: "right",
    zIndex: 2,
    pointerEvents: "none",
    lineHeight: 1.8,
  },

  gradTop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 100,
    background: "linear-gradient(to bottom,#0a0a0a,transparent)",
    zIndex: 1,
    pointerEvents: "none",
  },
  gradBottom: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
    background: "linear-gradient(to top,#0a0a0a,transparent)",
    zIndex: 1,
    pointerEvents: "none",
  },
  gradLeft: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    width: 80,
    background: "linear-gradient(to right,#0a0a0a,transparent)",
    zIndex: 1,
    pointerEvents: "none",
  },
  gradRight: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    width: 40,
    background: "linear-gradient(to left,#0a0a0a,transparent)",
    zIndex: 1,
    pointerEvents: "none",
  },

  marqueeBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    borderTop: "1px solid #1a1a1a",
    padding: "14px 0",
    overflow: "hidden",
    zIndex: 10,
  },
  marqueeChar: {
    fontFamily: "'Space Mono',monospace",
    fontSize: 11,
    letterSpacing: 4,
    color: "#333",
  },
};

