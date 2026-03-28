import type { CSSProperties } from "react";

export const STATS_DEFINITIONS: StatDefinition[] = [
  { id: "01", value: 10, live: false },      // Projects delivered
  { id: "02", value: 3, live: false },      // Research papers published
  { id: "03", value: null, live: true },    // Days active
];
/** Anchor date for the live “days active” stat (local midnight). */
export const STATS_BIRTH_DATE = new Date("2026-03-26T00:00:00");

export const WORKS = [
  {
    title: "NEURAL_MESH",
    description: "Real-time distributed neural network visualization engine. 1M+ nodes rendered at 60fps using instanced geometry and a custom shader pipeline.",
    tags: ["RUST", "WASM", "WEBGL"],
    bg: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80",
    link: "#",
  },
  {
    title: "VOID_DB",
    description: "Distributed key-value store with Raft consensus algorithm. Sub-millisecond replication across 5-node clusters under sustained write load.",
    tags: ["GO", "RAFT", "GRPC"],
    bg: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&q=80",
    link: "#",
  },
  {
    title: "BYTECODE_VM",
    description: "Custom bytecode virtual machine with a JIT compiler backend. 3× faster than interpreted alternatives on numeric workloads.",
    tags: ["C++", "LLVM", "JIT"],
    bg: "https://images.unsplash.com/photo-1484417894907-623942c8ee29?w=1200&q=80",
    link: "#",
  },
  {
    title: "SIGNAL_MAP",
    description: "IoT telemetry platform processing 50K events/sec with real-time anomaly detection and sub-second alerting latency.",
    tags: ["PYTHON", "KAFKA", "REACT"],
    bg: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&q=80",
    link: "#",
  },
  {
    title: "CIPHER_NET",
    description: "Zero-knowledge authentication layer for distributed systems. Stateless, auditable, and built for hostile network environments.",
    tags: ["RUST", "ZK-PROOFS", "P2P"],
    bg: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&q=80",
    link: "#",
  },
];

export const REVIEWS = [
  {
    id: "R01",
    stars: 5,
    text: "Alex shipped our entire infra rewrite in 6 weeks. Zero downtime. The kind of engineer you don't find twice.",
    name: "Marcus Webb",
    org: "CORE SYSTEMS INC.",
    avatar: "MW",
    color: "#FFE600",
  },
  {
    id: "R02",
    stars: 5,
    text: "Absolute precision. Every PR was clean, every estimate accurate. Our latency dropped 40% in a single sprint.",
    name: "Yuki Tanaka",
    org: "VECTOR LABS",
    avatar: "YT",
    color: "#00ff88",
  },
  {
    id: "R03",
    stars: 5,
    text: "Delivered a distributed tracing system we'd been putting off for 2 years. Done in 3 weeks. Ran first try.",
    name: "Rena Okafor",
    org: "PULSE FINTECH",
    avatar: "RO",
    color: "#ff4d4d",
  },
  {
    id: "R04",
    stars: 5,
    text: "Doesn't just write code — thinks in systems. Changed how our entire team approaches architecture.",
    name: "Sam Devereaux",
    org: "ORBIT CLOUD CO.",
    avatar: "SD",
    color: "#8b5cf6",
  },
  {
    id: "R05",
    stars: 5,
    text: "Most engineers ask for specs. Alex asks why. Then builds something better than what you asked for.",
    name: "Priya Menon",
    org: "IRONGATE VENTURES",
    avatar: "PM",
    color: "#f97316",
  },
  {
    id: "R06",
    stars: 5,
    text: "The WebGL dashboard he built became the product's #1 differentiator. Investors literally ask about it.",
    name: "Tom Vickers",
    org: "SIGNAL WORKS",
    avatar: "TV",
    color: "#06b6d4",
  },
  {
    id: "R07",
    stars: 5,
    text: "Took on our Kafka pipeline rewrite nobody else wanted to touch. Handled 3x load on launch day.",
    name: "Lena Bauer",
    org: "FLUX MEDIA GROUP",
    avatar: "LB",
    color: "#ec4899",
  },
  {
    id: "R08",
    stars: 5,
    text: "First contractor we've ever tried to hire full-time. He politely declined. We're still sad about it.",
    name: "Chris Nakamura",
    org: "DEEPROOT TECH",
    avatar: "CN",
    color: "#FFE600",
  },
  {
    id: "R09",
    stars: 5,
    text: "Security audit found zero critical issues in code he wrote solo over 4 months. Unheard of.",
    name: "Aisha Solis",
    org: "NULLPOINT SECURITY",
    avatar: "AS",
    color: "#00ff88",
  },
  {
    id: "R10",
    stars: 5,
    text: "Onboarded in a day, was the most productive member of the team by day three. No jokes.",
    name: "Dan Hollis",
    org: "CRUX ROBOTICS",
    avatar: "DH",
    color: "#f97316",
  },
];

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

  statsSection: {
    position: "relative",
    width: "100%",
    background: "#0a0a0a",
    borderTop: "1px solid #1a1a1a",
  },
  statsSectionInner: {
    width: "100%",
    padding: "clamp(32px, 6vw, 80px) clamp(24px, 6vw, 90px)",
    boxSizing: "border-box",
  },
  afterWorksShowcasePlaceholderSection: {
    position: "relative",
    width: "100%",
    minHeight: "min(55vh, 520px)",
    background: "#0a0a0a",
    borderTop: "1px solid #1a1a1a",
  },

  workConnectsRoot: {
    background: "#0a0a0a",
    color: "#f0f0f0",
    fontFamily: "'Courier New', Courier, monospace",
    cursor: "crosshair",
    borderTop: "1px solid #1a1a1a",
  },
  workConnectsEyebrow: {
    fontFamily: "'Space Mono',monospace",
    fontSize: 10,
    letterSpacing: 5,
    color: "#FFE600",
    display: "block",
    marginBottom: 18,
  },
  workConnectsHeadline: {
    fontFamily: "'Bebas Neue',sans-serif",
    fontSize: "clamp(44px, 6.5vw, 84px)",
    lineHeight: 0.88,
    letterSpacing: "-0.5px",
    marginBottom: 32,
  },
  workConnectsBody1: {
    fontFamily: "'Space Mono',monospace",
    fontSize: 13,
    lineHeight: 2,
    color: "#666",
    maxWidth: 380,
    marginBottom: 16,
  },
  workConnectsBody2: {
    fontFamily: "'Space Mono',monospace",
    fontSize: 13,
    lineHeight: 2,
    color: "#555",
    maxWidth: 380,
    marginBottom: 48,
  },
  workConnectsCtaRow: {
    display: "flex",
    gap: 14,
    flexWrap: "wrap",
  },
  workConnectsRightHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },
  workConnectsRightHeaderLeft: {
    fontFamily: "'Space Mono',monospace",
    fontSize: 9,
    letterSpacing: 4,
    color: "#333",
  },
  workConnectsRightHeaderRight: {
    fontFamily: "'Space Mono',monospace",
    fontSize: 9,
    letterSpacing: 3,
    color: "#222",
  },
  workConnectsServiceLink: {
    display: "block",
    textDecoration: "none",
    padding: "clamp(22px, 3vw, 40px) clamp(24px, 4vw, 56px)",
    position: "relative",
    transition: "border-color .18s, background .18s, transform .18s, box-shadow .18s",
    cursor: "crosshair",
    color: "inherit",
  },
  workConnectsServiceAccentBar: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    width: 2,
    transition: "background .18s",
  },
  workConnectsServiceRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 12,
  },
  workConnectsServiceCol: {
    flex: 1,
  },
  workConnectsServiceMeta: {
    fontFamily: "'Space Mono',monospace",
    fontSize: "clamp(9px, 1.2vw, 12px)",
    letterSpacing: 4,
    marginBottom: 10,
    transition: "color .18s",
  },
  workConnectsServiceTitle: {
    fontFamily: "'Bebas Neue',sans-serif",
    fontSize: "clamp(20px, 3vw, 36px)",
    letterSpacing: 1.5,
    lineHeight: 1.05,
    marginBottom: 8,
    transition: "color .18s",
  },
  workConnectsServiceDesc: {
    fontFamily: "'Space Mono',monospace",
    fontSize: "clamp(9px, 1.1vw, 12px)",
    lineHeight: 1.8,
    transition: "color .18s",
    margin: 0,
    marginBottom: 16,
  },
  workConnectsServiceActionText: {
    fontFamily: "'Space Mono',monospace",
    fontSize: "clamp(9px, 1.1vw, 12px)",
    letterSpacing: 2,
    fontWeight: "bold",
    transition: "color .18s",
  },
  workConnectsServiceArrow: {
    fontSize: "clamp(16px, 2.2vw, 24px)",
    transition: "color .18s, transform .18s",
    display: "inline-block",
    flexShrink: 0,
    marginTop: 2,
  },

  ctaArrowTopRight: {
    width: 14,
    height: 14,
    marginLeft: 10,
    transform: "translateY(-1px)",
    flex: "0 0 auto",
  },
};

export const STATS_NOISE_CHARS = "!@#$%^&*<>/\\|{}[]~`";

export type StatDefinition = {
  id: string;
  value: number | null;
  live: boolean;
};

/** Global CSS for stats grid (fonts loaded in index.css). */
export const statsCounterCss = `
  @keyframes statsBlink  { 0%,100%{opacity:1} 50%{opacity:0} }
  @keyframes statsFadeUp { from{transform:translateY(24px);opacity:0} to{transform:translateY(0);opacity:1} }

  .stats-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    cursor: crosshair;
  }

  .stat-card {
    position: relative;
    border: 1px solid #1e1e1e;
    padding: 40px 36px 36px;
    display: flex;
    flex-direction: column;
    animation: statsFadeUp 0.7s both;
    animation-delay: var(--delay);
    /* Do not animate border-color — RGB interpolation flashes through light/white before yellow. */
    transition: background 0.18s;
    overflow: hidden;
  }
  .stat-card + .stat-card { border-left: none; }
  /* Adjacent cards drop left border to avoid doubling; restore it on hover so the yellow frame is complete. */
  .stat-card--hover {
    background: #0f0f0f;
    border-color: #FFE600 !important;
    border-left: 1px solid #FFE600 !important;
    z-index: 2;
  }

  @media (max-width: 700px) {
    .stats-grid {
      grid-template-columns: 1fr;
    }
    .stat-card + .stat-card {
      border-left: 1px solid #1e1e1e;
      border-top: none;
    }
    .stat-card--hover {
      border-top: 1px solid #FFE600 !important;
    }
  }

  .corner { position: absolute; width: 18px; height: 18px; pointer-events: none; opacity: 0; transition: opacity 0.2s; }
  .stat-card--hover .corner { opacity: 1; }
  .corner--tl { top: 8px; left: 8px; border-top: 1.5px solid #FFE600; border-left: 1.5px solid #FFE600; }
  .corner--br { bottom: 8px; right: 8px; border-bottom: 1.5px solid #FFE600; border-right: 1.5px solid #FFE600; }

  .stat-id { font-family: 'Space Mono', monospace; font-size: 10px; letter-spacing: 4px; color: #2a2a2a; margin-bottom: 28px; transition: color 0.2s; }
  .stat-card--hover .stat-id { color: #555; }

  .live-badge { position: absolute; top: 38px; right: 36px; display: flex; align-items: center; gap: 6px; font-family: 'Space Mono', monospace; font-size: 9px; letter-spacing: 3px; color: #00ff88; }
  .live-dot { display: inline-block; width: 6px; height: 6px; border-radius: 50%; background: #00ff88; animation: statsBlink 1.4s infinite; }

  .stat-number { font-family: 'Bebas Neue', sans-serif; font-size: clamp(72px, 10vw, 110px); line-height: 0.9; letter-spacing: -1px; color: #FFE600; margin-bottom: 20px; transition: text-shadow 0.2s; }
  .stat-card--hover .stat-number { text-shadow: 0 0 40px rgba(255,230,0,0.25); }

  .stat-label { font-family: 'Bebas Neue', sans-serif; font-size: 28px; letter-spacing: 3px; line-height: 1.05; color: #f0f0f0; margin-bottom: 24px; }

  .stat-meta { display: flex; justify-content: space-between; align-items: flex-end; gap: 12px; border-top: 1px solid #1a1a1a; padding-top: 16px; margin-top: auto; transition: border-color 0.2s; }
  .stat-card--hover .stat-meta { border-top-color: #2a2a2a; }

  .stat-unit { font-family: 'Space Mono', monospace; font-size: 9px; letter-spacing: 4px; color: #FFE600; }
  .stat-desc { font-family: 'Space Mono', monospace; font-size: 10px; letter-spacing: 2px; color: #333; text-align: right; font-style: italic; transition: color 0.2s; }
  .stat-card--hover .stat-desc { color: #555; }
`;

/** Scoped layout + button classes for the Work Connects section. */
export const workConnectsCss = `
  .wc-root ::selection { background: #FFE600; color: #0a0a0a; }
  @keyframes wcFadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .wc-section {
    padding: 96px 48px 100px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 80px;
    align-items: center;
    animation: wcFadeUp .5s ease both;
  }
  @media (max-width: 860px) {
    .wc-section {
      grid-template-columns: 1fr;
      gap: 56px;
      padding: 72px 32px 80px;
    }
  }
  @media (max-width: 480px) {
    .wc-section {
      padding: 56px 20px 64px;
      gap: 44px;
    }
  }

  .wc-btn-primary {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 240px;
    max-width: 100%;
    box-sizing: border-box;
    background: #FFE600;
    color: #0a0a0a;
    font-family: 'Space Mono', monospace;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 3px;
    padding: 14px 28px;
    border: 2px solid #FFE600;
    cursor: crosshair;
    transition: transform .15s, box-shadow .15s, background .15s, color .15s, border-color .15s;
    text-decoration: none;
  }
  .wc-btn-primary:hover {
    background: #ffffff;
    color: #0a0a0a;
    border-color: #ffffff;
  }
  .wc-btn-outline {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 240px;
    max-width: 100%;
    box-sizing: border-box;
    background: transparent;
    color: #f0f0f0;
    font-family: 'Space Mono', monospace;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 3px;
    padding: 14px 28px;
    border: 2px solid #333;
    cursor: crosshair;
    transition: transform .15s, box-shadow .15s, background .15s, color .15s, border-color .15s;
    text-decoration: none;
  }
  .wc-btn-outline:hover {
    background: #ffffff;
    color: #0a0a0a;
    border-color: #ffffff;
  }

  .wc-service-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
  }
  @media (max-width: 1100px) {
    .wc-service-grid { grid-template-columns: 1fr; }
  }
  @media (max-width: 860px) {
    .wc-service-grid { grid-template-columns: 1fr 1fr; }
  }
  @media (max-width: 520px) {
    .wc-service-grid { grid-template-columns: 1fr; }
  }
`;

// ─── WORKS SHOWCASE DATA & STYLES ─────────────────────────────────────────────

export const worksShowcaseStyles: Record<string, CSSProperties> = {
  section: {
    background: "#0a0a0a",
    borderTop: "1px solid #1a1a1a",
    padding: "80px 40px",
    display: "flex",
    flexDirection: "column",
    gap: 48,
    fontFamily: "'Courier New', Courier, monospace",
    color: "#f0f0f0",
    cursor: "crosshair",
  },
  header: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  label: {
    fontFamily: "'Space Mono', monospace",
    fontSize: 10,
    letterSpacing: 5,
    color: "#FFE600",
    display: "block",
  },
  heading: {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: "clamp(48px, 7vw, 88px)",
    lineHeight: 0.9,
    margin: 0,
  },
  subtext: {
    fontFamily: "'Space Mono', monospace",
    fontSize: 10,
    letterSpacing: 4,
    color: "#333",
    marginTop: 8,
  },
  strip: {
    display: "flex",
    height: "clamp(420px, 58vh, 680px)",
    border: "1px solid #222",
    overflow: "hidden",
    gap: 0,
  },
};

export const worksShowcaseCss = `
  @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Bebas+Neue&display=swap');

  .works-card {
    position: relative;
    flex: 1;
    min-width: 0;
    overflow: hidden;
    border-right: 1px solid #1e1e1e;
    background-image: var(--bg);
    background-size: cover;
    background-position: center;
    cursor: crosshair;
    transition:
      flex 0.65s cubic-bezier(0.77, 0, 0.18, 1);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 20px 18px 24px;
    text-decoration: none;
  }
  .works-card:last-child { border-right: none; }

  /* dark tint — lightens slightly on hover */
  .works-card::before {
    content: '';
    position: absolute;
    inset: 0;
    background: rgba(8, 8, 8, 0.90);
    transition: background 0.5s;
    z-index: 0;
  }
  .works-card--open::before  { background: rgba(8, 8, 8, 0.7); }
  .works-card--closed::before { background: rgba(8, 8, 8, 0.86); }

  /* EXPANDED */
  .works-card--open  { flex: 5.5; }

  /* DEFLATED */
  .works-card--closed { flex: 0.35; }

  /* yellow left accent line on hover */
  .works-card::after {
    content: '';
    position: absolute;
    top: 0; left: 0; bottom: 0;
    width: 2px;
    background: #FFE600;
    transform: scaleY(0);
    transform-origin: bottom;
    transition: transform 0.4s cubic-bezier(0.77, 0, 0.18, 1);
    z-index: 3;
  }
  .works-card--open::after { transform: scaleY(1); }

  /* ── INDEX ── */
  .works-card__index {
    position: relative;
    z-index: 2;
    font-family: 'Space Mono', monospace;
    font-size: 10px;
    letter-spacing: 3px;
    color: #FFE600;
    align-self: flex-start;
    padding: 3px 6px;
    border: 1px solid #FFE60055;
    transition: border-color 0.3s;
  }
  .works-card--open .works-card__index { border-color: #FFE600; }

  /* ── VERTICAL TITLE (folded state) ── */
  .works-card__title-v {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%) rotate(90deg);
    white-space: nowrap;
    font-family: 'Bebas Neue', sans-serif;
    font-size: 16px;
    letter-spacing: 5px;
    color: #444;
    z-index: 2;
    transition:
      opacity 0.3s,
      color 0.3s;
    pointer-events: none;
  }
  .works-card--open .works-card__title-v { opacity: 0; }

  /* ── BODY: DESC + TAGS ── */
  .works-card__body {
    position: relative;
    z-index: 2;
    display: flex;
    flex-direction: column;
    gap: 16px;
    opacity: 0;
    transform: translateY(10px);
    transition:
      opacity 0.35s 0.1s,
      transform 0.35s 0.1s;
    pointer-events: none;
    padding: 0 2px;
  }
  .works-card--open .works-card__body {
    opacity: 1;
    transform: translateY(0);
    pointer-events: auto;
  }

  .works-card__desc {
    font-family: 'Space Mono', monospace;
    font-size: clamp(10px, 1.1vw, 13px);
    line-height: 1.85;
    color: #aaa;
    margin: 0;
    max-width: 38ch;
  }

  .works-card__tags {
    display: flex;
    flex-wrap: wrap;
    gap: 7px;
  }

  .works-card__tag {
    font-family: 'Space Mono', monospace;
    font-size: 9px;
    letter-spacing: 2.5px;
    color: #FFE600;
    border: 1px solid #FFE60055;
    padding: 3px 8px;
    white-space: nowrap;
    transition: border-color 0.2s, background 0.2s;
  }
  .works-card--open:hover .works-card__tag {
    border-color: #FFE600aa;
  }

  /* ── TITLE inside body (above desc) ── */
  .works-card__title-h {
    font-family: 'Bebas Neue', sans-serif;
    font-size: clamp(28px, 3.5vw, 48px);
    letter-spacing: 2px;
    color: #FFE600;
    line-height: 1;
    white-space: nowrap;
  }

  /* ── BOTTOM FOOTER — CTA only ── */
  .works-card__footer {
    position: relative;
    z-index: 2;
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
    opacity: 0;
    transform: translateY(14px);
    transition:
      opacity 0.35s 0.2s,
      transform 0.35s 0.2s;
    pointer-events: none;
  }
  .works-card--open .works-card__footer {
    opacity: 1;
    transform: translateY(0);
    pointer-events: auto;
  }

  .works-card__cta {
    font-family: 'Space Mono', monospace;
    font-size: 11px;
    letter-spacing: 3px;
    color: #FFE600;
    padding: 6px 12px;
    border: 1px solid #FFE600;
    white-space: nowrap;
    transition: background 0.2s, color 0.2s;
  }
  .works-card--open:hover .works-card__cta {
    background: #FFE600;
    color: #0a0a0a;
  }

  /* ── SCANLINES ── */
  .works-card__scanlines {
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: 1;
    background-image: repeating-linear-gradient(
      0deg,
      transparent,
      transparent 3px,
      rgba(0,0,0,0.07) 3px,
      rgba(0,0,0,0.07) 4px
    );
  }

  /* ── GRAIN ── */
  .works-card__grain {
    position: absolute;
    inset: -50%;
    width: 200%;
    height: 200%;
    pointer-events: none;
    z-index: 1;
    opacity: 0.035;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    background-size: 256px 256px;
    animation: grain 0.4s steps(1) infinite;
  }
  @keyframes grain {
    0%,100% { transform: translate(0,0); }
    10%      { transform: translate(-3%,-4%); }
    20%      { transform: translate(5%, 2%); }
    30%      { transform: translate(-2%, 6%); }
    40%      { transform: translate(4%,-2%); }
    50%      { transform: translate(-5%, 3%); }
    60%      { transform: translate( 2%,-5%); }
    70%      { transform: translate(-4%, 1%); }
    80%      { transform: translate( 6%, 4%); }
    90%      { transform: translate(-1%,-3%); }
  }
`;

// ─── REVIEWS CAROUSEL DATA & STYLES ───────────────────────────────────────────

export const REVIEWS_CARD_W = 320;
export const REVIEWS_GAP = 16;
export const REVIEWS_CARD_STRIDE = REVIEWS_CARD_W + REVIEWS_GAP;

export const reviewsCarouselStyles: Record<string, CSSProperties> = {
  section: {
    background: "#0a0a0a",
    borderTop: "1px solid #1a1a1a",
    color: "#f0f0f0",
    padding: "80px 0",
    fontFamily: "'Courier New', Courier, monospace",
    overflow: "hidden",
    cursor: "crosshair",
  },
  header: {
    padding: "0 40px",
    marginBottom: 30,
  },
  label: {
    fontFamily: "'Space Mono', monospace",
    fontSize: 10,
    letterSpacing: 5,
    color: "#FFE600",
    display: "block",
    marginBottom: 6,
  },
  headingRow: {
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "space-between",
    gap: 24,
  },
  heading: {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: "clamp(42px, 6vw, 72px)",
    lineHeight: 0.9,
    letterSpacing: 1,
    margin: 0,
    marginTop: 10
  },
  headingHighlight: {
    color: "#FFE600",
  },
  metrics: {
    fontFamily: "'Space Mono', monospace",
    fontSize: 11,
    color: "#333",
    letterSpacing: 2,
    textAlign: "right",
    paddingBottom: 8,
  },
  relativeContainer: {
    position: "relative",
  },
  rowsContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
  },
  fadesWrap: {
    position: "absolute",
    inset: 0,
    pointerEvents: "none",
    zIndex: 5,
  },
  fadeLeft: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    width: 120,
    background: "linear-gradient(to right, #0a0a0a, transparent)",
  },
  fadeRight: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    width: 120,
    background: "linear-gradient(to left, #0a0a0a, transparent)",
  },
  carouselWrap: {
    overflow: "hidden",
    width: "100%",
    padding: "2px 0 4px",
    cursor: "crosshair",
  },
  track: {
    display: "flex",
    gap: REVIEWS_GAP,
    willChange: "transform",
    width: "max-content",
    pointerEvents: "none",
  },
  cardInner: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
    position: "relative",
    userSelect: "none",
    cursor: "crosshair",
    transition: "border-color .2s, background .2s",
    pointerEvents: "auto",
    padding: "28px 24px",
  },
  cardId: {
    position: "absolute",
    top: 12,
    right: 14,
    fontFamily: "'Space Mono', monospace",
    fontSize: 9,
    color: "#222",
    letterSpacing: 2,
  },
  cardText: {
    fontFamily: "'Space Mono', monospace",
    fontSize: 12,
    lineHeight: 1.85,
    color: "#999",
    flexGrow: 1,
  },
  cardDivider: {
    height: 1,
    background: "#1e1e1e",
  },
  authorRow: {
    display: "flex",
    alignItems: "center",
    gap: 14,
  },
  authorName: {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: 17,
    letterSpacing: 2,
    color: "#f0f0f0",
    lineHeight: 1.1,
  },
  authorOrg: {
    fontFamily: "'Space Mono', monospace",
    fontSize: 9,
    letterSpacing: 3,
    color: "inherit",
    marginTop: 3,
  },
  starContainer: {
    display: "flex",
    gap: 3,
  },
};

// ─── CTA SECTION STYLES ───────────────────────────────────────────────────────

export const ctaSectionStyles: Record<string, import("react").CSSProperties> = {
  rootContainer: {
    background: "#0a0a0a",
    fontFamily: "'Courier New', Courier, monospace",
    cursor: "crosshair",
  },
  heroWrap: {
    paddingTop: "clamp(16px, 3vw, 32px)",
    paddingBottom: "clamp(16px, 3vw, 32px)",
    paddingLeft: "50px"
  }
};

export const ctaSectionCss = `
  @import url('https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,400;0,700&family=Bebas+Neue&display=swap');

  .cta-section * { box-sizing: border-box; margin: 0; padding: 0; }
  .cta-section ::selection { background: #0a0a0a; color: #FFE600; }

  @keyframes ctaBlink { 0%,100%{opacity:1} 50%{opacity:0} }
  @keyframes ctaScanPulse { 0%,100%{opacity:0.022} 50%{opacity:0.038} }
  @keyframes ctaArrowShift { from{transform:translate(0,0)} to{transform:translate(3px,-3px)} }

  .cta-section {
    position: relative;
    width: 100%;
    min-height: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-top: 1px solid #1a1a1a;
    overflow: hidden;
    transition: background 0.35s cubic-bezier(.77,0,.18,1);
  }
  .cta-section.is-hovered { background: #FFE600; }

  /* ripple spotlight */
  .cta-spotlight {
    position: absolute;
    width: 600px;
    height: 600px;
    border-radius: 50%;
    pointer-events: none;
    transform: translate(-50%, -50%);
    transition: opacity 0.3s;
    mix-blend-mode: multiply;
  }
  .cta-section:not(.is-hovered) .cta-spotlight { background: radial-gradient(circle, rgba(255,230,0,0.06) 0%, transparent 70%); opacity: 1; }
  .cta-section.is-hovered .cta-spotlight { background: radial-gradient(circle, rgba(0,0,0,0.08) 0%, transparent 70%); opacity: 1; }

  .cta-scanlines {
    position: absolute; inset: 0; pointer-events: none; z-index: 1;
    background-image: repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.028) 2px,rgba(0,0,0,0.028) 4px);
    animation: ctaScanPulse 4s ease-in-out infinite;
  }

  .cta-inner {
    position: relative; z-index: 2;
    padding: clamp(16px,3vw,32px) clamp(24px,5vw,48px);
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-height: auto;
  }

  /* ── top bar removed ── */

  /* ── hero text ── */
  .cta-hero {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 24px;
    padding: 0;
    flex: 1;
    margin: 0;
  }

  .cta-headline {
    font-family: 'Bebas Neue', sans-serif;
    font-size: clamp(72px, 12.5vw, 200px);
    line-height: 0.87;
    letter-spacing: -2px;
    user-select: none;
    transition: color 0.35s;
    margin: 0;
  }
  .cta-section:not(.is-hovered) .cta-headline { color: #f0f0f0; }
  .cta-section.is-hovered .cta-headline { color: #0a0a0a; }

  .cta-headline .cta-accent {
    transition: color 0.35s, -webkit-text-stroke 0.35s;
  }
  .cta-section:not(.is-hovered) .cta-headline .cta-accent {
    color: transparent;
    -webkit-text-stroke: 1px #333;
  }
  .cta-section.is-hovered .cta-headline .cta-accent {
    color: transparent;
    -webkit-text-stroke: 1.5px rgba(0,0,0,0.35);
  }

  /* ── arrow button ── */
  .cta-arrow-btn {
    flex-shrink: 0;
    width: clamp(80px, 10vw, 140px);
    height: clamp(80px, 10vw, 140px);
    border: 2px solid;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: crosshair;
    transition:
      border-color 0.35s,
      background 0.35s,
      transform 0.2s;
    position: relative;
    align-self: flex-end;
    margin-bottom: 8px;
  }
  .cta-section:not(.is-hovered) .cta-arrow-btn {
    border-color: #333;
    background: transparent;
  }
  .cta-section.is-hovered .cta-arrow-btn {
    border-color: #0a0a0a;
    background: #0a0a0a;
  }
  .cta-arrow-btn:hover {
    transform: translate(-4px, -4px);
  }
  .cta-section:not(.is-hovered) .cta-arrow-btn:hover {
    border-color: #FFE600;
    background: #FFE600;
  }

  .cta-arrow-icon {
    font-size: clamp(28px, 4vw, 52px);
    line-height: 1;
    display: block;
    transition: color 0.35s, transform 0.45s cubic-bezier(.34,1.56,.64,1);
  }
  /* resting (not hovered section): diagonal ↗ */
  .cta-section:not(.is-hovered) .cta-arrow-icon {
    color: #f0f0f0;
    transform: rotate(-45deg); /* points top-right */
  }
  /* section hovered: rotate to pure → (right) */
  .cta-section.is-hovered .cta-arrow-icon {
    color: #FFE600;
    transform: rotate(0deg);
  }
  /* arrow btn itself hovered on dark bg */
  .cta-section:not(.is-hovered) .cta-arrow-btn:hover .cta-arrow-icon {
    color: #0a0a0a;
  }

  /* ── bottom bar removed ── */



  /* corner brackets */
  .cta-corner { position: absolute; width: 28px; height: 28px; pointer-events: none; transition: border-color 0.35s; }
  .cta-corner-tl { top: 20px; left: 20px; border-top: 1px solid; border-left: 1px solid; }
  .cta-corner-tr { top: 20px; right: 20px; border-top: 1px solid; border-right: 1px solid; }
  .cta-corner-bl { bottom: 20px; left: 20px; border-bottom: 1px solid; border-left: 1px solid; }
  .cta-corner-br { bottom: 20px; right: 20px; border-bottom: 1px solid; border-right: 1px solid; }
  .cta-section:not(.is-hovered) .cta-corner { border-color: #222; }
  .cta-section.is-hovered .cta-corner { border-color: rgba(0,0,0,0.22); }

  /* noise overlay */
  .cta-noise {
    position: absolute; inset: 0; pointer-events: none; z-index: 0; opacity: 0.025;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
    background-repeat: repeat;
    background-size: 128px;
  }
`;
