import type { CSSProperties } from "react";

const buttonBase: CSSProperties = {
  fontFamily: "'Space Mono',monospace",
  fontSize: 11,
  letterSpacing: 3,
  textTransform: "uppercase",
  padding: "8px 12px",
  borderRadius: 0,
  border: "1px solid transparent",
  background: "transparent",
  cursor: "pointer",
  userSelect: "none",
  outline: "none",
  whiteSpace: "nowrap",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  minHeight: 34,
  width: "clamp(128px, 16vw, 180px)",
  textAlign: "center",
  transition:
    "box-shadow 180ms ease, transform 180ms ease, background 180ms ease, border-color 180ms ease, color 180ms ease",
  WebkitTapHighlightColor: "transparent",
};

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

  sectionPhone: {
    height: "calc(100svh - 56px)",
    minHeight: "calc(100vh - 56px)",
    position: "relative",
    overflow: "hidden",
    display: "flex",
    flexDirection: "row",
    alignItems: "stretch",
  },

  leftCol: {
    position: "relative",
    zIndex: 5,
    // Extra bottom padding so CTA buttons sit visually above the marquee bar.
    padding:
      "clamp(24px, 4vw, 40px) clamp(24px, 6vw, 90px) clamp(72px, 12vh, 108px)",
    width: "50%",
    flex: "0 0 50%",
    display: "flex",
    flexDirection: "column",
    // Keep hero stack vertically centered within the available viewport.
    justifyContent: "center",
  },

  leftColPhone: {
    position: "relative",
    zIndex: 5,
    // Phone: keep a left column so the 3D model can stay visible on the right.
    padding:
      "clamp(18px, 4vw, 28px) clamp(18px, 4vw, 26px) clamp(72px, 12vh, 108px)",
    width: "58%",
    flex: "0 0 58%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
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
    // Scale hero lines up to be more prominent on larger viewports.
    // The middle value is relative to viewport width; clamp keeps it from
    // becoming too small on mobile or too large on ultra-wide screens.
    // Cap by both viewport width and height to avoid overlap on short screens.
    fontSize: "clamp(56px, min(11.5vw, 22vh), 150px)",
    lineHeight: 0.8,
    letterSpacing: "-1px",
    // Avoid default h1 margin pushing away from the status row.
    marginTop: 30,
    marginBottom: "clamp(10px, 1.8vh, 18px)",
  },

  heroTitlePhone: {
    fontFamily: "'Bebas Neue',sans-serif",
    fontSize: "clamp(52px, min(13vw, 20vh), 120px)",
    lineHeight: 0.82,
    letterSpacing: "-1px",
    marginTop: 18,
    marginBottom: "clamp(12px, 2vh, 18px)",
  },
  heroHighlight: {
    color: "#FFE600",
  },
  heroOutline: {
    WebkitTextStroke: "0.5px #3a3a3a",
    color: "transparent",
  },

  descriptionDesktop: {
    fontFamily: "'Space Mono',monospace",
    fontSize: 13,
    lineHeight: 1.9,
    color: "#888",
    maxWidth: 340,
    margin: 0,
  },

  descriptionPhone: {
    fontFamily: "'Space Mono',monospace",
    fontSize: 13,
    lineHeight: 1.9,
    color: "#888",
    maxWidth: 340,
    margin: 0,
  },

  subtitleCtaWrapDesktop: {
    display: "flex",
    flexDirection: "column",
    gap: "clamp(12px, 1.8vh, 18px)",
    alignItems: "flex-start",
  },

  subtitleCtaWrapPhone: {
    display: "flex",
    flexDirection: "column",
    gap: "clamp(14px, 2.2vh, 26px)",
    width: "100%",
  },

  ctaButtonsDesktop: {
    display: "flex",
    flexDirection: "row",
    gap: 12,
    alignItems: "flex-start",
    marginTop: 2,
  },

  ctaButtonsPhone: {
    display: "flex",
    flexDirection: "row",
    gap: 12,
    width: "100%",
    alignItems: "stretch",
  },

  primaryButton: {
    ...buttonBase,
    borderColor: "#FFE600",
    background: "#FFE600",
    color: "#0a0a0a",
    boxShadow: "0 0 0 rgba(0,0,0,0)",
  },

  outlineButton: {
    ...buttonBase,
    borderColor: "#ffffff",
    color: "#ffffff",
  },

  primaryButtonPhone: {
    ...buttonBase,
    borderColor: "#FFE600",
    background: "#FFE600",
    color: "#0a0a0a",
    flex: "1 1 0%",
    width: "auto",
  },

  outlineButtonPhone: {
    ...buttonBase,
    borderColor: "#ffffff",
    color: "#ffffff",
    flex: "1 1 0%",
    width: "auto",
  },

  rightCol: {
    position: "relative",
    flex: "1",
    overflow: "hidden",
  },

  rightColPhone: {
    position: "relative",
    width: "42%",
    flex: "0 0 42%",
    overflow: "hidden",
  },

  phoneSplitFade: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: "58%",
    width: "clamp(18px, 5vw, 44px)",
    transform: "translateX(-50%)",
    background: "linear-gradient(to right, #0a0a0a 0%, rgba(10,10,10,0.65) 45%, transparent 100%)",
    zIndex: 4,
    pointerEvents: "none",
  },

  bustStage: {
    position: "absolute",
    inset: 0,
    zIndex: 0,
    // keep it from covering the bottom marquee area visually
    paddingBottom: 54,
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
    bottom: 72,
    right: 50,
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
    bottom: 80,
    right: 56,
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
    // Sit above the 3D scene/gradients but below hero content (buttons, text)
    // so the marquee never visually covers CTAs or other interactive elements.
    zIndex: 3,
    // Ensure marquee never blocks pointer events for underlying buttons/links.
    pointerEvents: "none",
  },
  marqueeChar: {
    fontFamily: "'Space Mono',monospace",
    fontSize: 11,
    letterSpacing: 4,
    color: "#333",
  },

  belowMarqueeSection: {
    position: "relative",
    width: "100%",
    background: "#0a0a0a",
    borderTop: "1px solid #1a1a1a",
  },
  belowMarqueeInner: {
    width: "100%",
    height: "min(55vh, 520px)",
  },

  ctaArrowTopRight: {
    width: 14,
    height: 14,
    marginLeft: 10,
    transform: "translateY(-1px)",
    flex: "0 0 auto",
  },
};

