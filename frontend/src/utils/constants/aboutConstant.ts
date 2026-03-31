import type { CSSProperties } from "react";
import React from "react";

export type GachaRarity = {
  id: string;
  weight: number;
  color: string;
  glow: string;
  bg: string;
  label: string;
  tagline: string;
};

export type GachaFragment = {
  name: string;
  type: string;
  flavor: string;
  image: string;
};

export const GACHA_NOISE_CHARS = "!@#$%^&*<>/\\|{}[]~`+-";

export const GACHA_RARITIES: GachaRarity[] = [
  {
    id: "LEGENDARY",
    weight: 1,
    color: "#FF2D55",
    glow: "#FF2D5588",
    bg: "#1a0008",
    label: "LEGENDARY",
    tagline: "SYSTEM_ERROR: EXISTENCE UNDEFINED",
  },
  {
    id: "MYTHIC",
    weight: 4,
    color: "#BF5FFF",
    glow: "#BF5FFF88",
    bg: "#0d0014",
    label: "MYTHIC",
    tagline: "MEMORY_ADDR: 0x000000FF",
  },
  {
    id: "RARE",
    weight: 15,
    color: "#00C8FF",
    glow: "#00C8FF66",
    bg: "#00101a",
    label: "RARE",
    tagline: "ALLOCATION: HIGH PRIORITY",
  },
  {
    id: "UNCOMMON",
    weight: 30,
    color: "#00FF88",
    glow: "#00FF8844",
    bg: "#001a0d",
    label: "UNCOMMON",
    tagline: "STATUS: ABOVE THRESHOLD",
  },
  {
    id: "COMMON",
    weight: 50,
    color: "#FFE600",
    glow: "#FFE60033",
    bg: "#0a0a00",
    label: "COMMON",
    tagline: "INSTANCE: STANDARD_UNIT",
  },
];

export const GACHA_FRAGMENTS: GachaFragment[] = [
  {
    name: "NULL_BLADE",
    type: "WEAPON",
    flavor: "Carved from deallocated heap memory.",
    image: "/assets/null_blade.png",
  },
  {
    name: "BYTECODE_MASK",
    type: "ARMOR",
    flavor: "Compiled at runtime. Cannot be patched.",
    image: "/assets/bytecode_mask.png",
  },
  {
    name: "FORK_BOMB",
    type: "RELIC",
    flavor: "self.spawn(self). Handle with care.",
    image: "/assets/fork_bomb.png",
  },
  {
    name: "DEAD_LOCK",
    type: "CURSE",
    flavor: "Waits forever. Releases never.",
    image: "/assets/dead_lock.png",
  },
  {
    name: "KERNEL_FANG",
    type: "WEAPON",
    flavor: "Root access. No sudo required.",
    image: "/assets/kernel_fang.png",
  },
  {
    name: "HEAP_SHROUD",
    type: "ARMOR",
    flavor: "Wraps around undefined behavior.",
    image: "/assets/heap_shroud.png",
  },
  {
    name: "RACE_CONDITION",
    type: "RELIC",
    flavor: "Sometimes it works. Nobody knows why.",
    image: "/assets/race_condition.png",
  },
  {
    name: "PHANTOM_CALL",
    type: "SPELL",
    flavor: "Invokes a function that no longer exists.",
    image: "/assets/phantom_call.png",
  },
  {
    name: "ENTROPY_CORE",
    type: "RELIC",
    flavor: "Disorganizes everything it touches.",
    image: "/assets/entropy_core.png",
  },
  {
    name: "SEGFAULT_EDGE",
    type: "WEAPON",
    flavor: "Crosses boundaries without permission.",
    image: "/assets/segfault_edge.png",
  },
  {
    name: "OVERFLOW_RING",
    type: "ARMOR",
    flavor: "Holds exactly one more than capacity.",
    image: "/assets/overflow_ring.png",
  },
  {
    name: "ZERO_DAY",
    type: "CURSE",
    flavor: "Exists in all versions. Found in none.",
    image: "/assets/zero_day.png",
  },
  {
    name: "MUTEX_CHAIN",
    type: "RELIC",
    flavor: "Owned by exactly one. Wanted by all.",
    image: "/assets/mutex_chain.png",
  },
  {
    name: "GARBAGE_WARD",
    type: "ARMOR",
    flavor: "Collects what others abandon.",
    image: "/assets/garbage_ward.png",
  },
  {
    name: "SIGKILL_ORB",
    type: "SPELL",
    flavor: "Cannot be caught. Cannot be ignored.",
    image: "/assets/sigkill_orb.png",
  },
];

export const PROFILE = {  
  name: "JOED MERAÑA",
  role: "SOFTWARE ENGINEER",
  image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80",
  imageMobile: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&q=80",
  description:
    "I build systems that scale, interfaces that breathe, and abstractions that last. Six years turning complexity into clarity — from distributed databases to pixel-perfect UIs. I care deeply about craft, and I ship.",
};

export const ATTRIBUTES = [
  { title: "FOCUS",    text: "Systems & full-stack" },
  { title: "EXP",      text: "6+ years shipping" },
  { title: "STYLE",    text: "No fluff, no bloat" },
  { title: "APPROACH", text: "Readable, testable, durable" },
  { title: "DOMAIN",   text: "Distributed systems" },
  { title: "TIMEZONE", text: "UTC +8 · async-friendly" },
];

export const SOCIALS = [
  {
    label: "GitHub",
    href: "https://github.com/alexdev",
    id: "github",
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/alexdev",
    id: "linkedin",
  },
];

export const aboutStyles: Record<string, CSSProperties> = {
  page: {
    width: "100",
    background: "#0a0a0a",
  },
  separator: {
    position: "absolute",
    left: 0,
    bottom: 0,
    width: "100%",
    border: "none",
    height: "1px",
    backgroundColor: "rgba(255,255,255,0.08)",
    zIndex: 160,
  },
  futureSection: {
    position: "relative",
    borderTop: "1px solid #1a1a1a",
    minHeight: "40vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "72px 24px",
    background: "#0a0a0a",
  },
  futureSectionInner: {
    textAlign: "center",
  },
  futureEyebrow: {
    fontFamily: "'Space Mono', monospace",
    fontSize: 10,
    letterSpacing: 6,
    color: "#FFE600",
    marginBottom: 14,
    display: "block",
  },
  futureTitle: {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: "clamp(42px, 6vw, 72px)",
    color: "#f0f0f0",
    letterSpacing: 1,
    lineHeight: 0.92,
    margin: 0,
  },
  futureBody: {
    marginTop: 14,
    fontFamily: "'Space Mono', monospace",
    fontSize: 12,
    letterSpacing: 2,
    color: "#555",
  },
};

export const aboutGachaCss = `
  @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Bebas+Neue&display=swap');
  .about-gacha-root * { box-sizing: border-box; margin: 0; padding: 0; }
  .about-gacha-root ::selection { background: #FFE600; color: #0a0a0a; }
  @keyframes pulse   { 0%,100%{opacity:1} 50%{opacity:0.65} }
  @keyframes bloom   { from{opacity:0;transform:scale(0)} to{opacity:1;transform:scale(1)} }
  @keyframes scanH   { from{background-position:0 0} to{background-position:48px 0} }
  @keyframes flashIn { 0%{opacity:0.6} 100%{opacity:0} }
  .about-gacha-scanlines {
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 200;
    background-image: repeating-linear-gradient(
      0deg,
      transparent,
      transparent 2px,
      rgba(0, 0, 0, 0.03) 2px,
      rgba(0, 0, 0, 0.03) 4px
    );
  }
`;

export const ABOUT_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Bebas+Neue&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  ::selection { background: #FFE600; color: #0a0a0a; }
  @keyframes blink     { 0%,100%{opacity:1} 50%{opacity:0} }
  @keyframes fadeUp    { from{transform:translateY(20px);opacity:0} to{transform:translateY(0);opacity:1} }
  @keyframes imgReveal { from{clip-path:inset(100% 0 0 0);opacity:0} to{clip-path:inset(0% 0 0 0);opacity:1} }
  .scanlines { position: fixed; inset: 0; pointer-events: none; z-index: 100; background-image: repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.025) 2px, rgba(0,0,0,0.025) 4px); }
  .about-grid { display: grid; grid-template-columns: minmax(240px, 380px) 1fr; gap: clamp(28px, 5vw, 72px); align-items: stretch; width: 100%; max-width: 1100px; }
  @media (max-width: 760px) { .about-grid { grid-template-columns: 1fr; gap: 28px; } }
  .img-frame { position: relative; width: 100%; height: 100%; overflow: hidden; border: 1px solid #222; }
  .img-frame-mobile { position: relative; width: clamp(80px, 22vw, 110px); height: clamp(80px, 22vw, 110px); flex-shrink: 0; overflow: hidden; border: 1px solid #222; }
  .img-frame img, .img-frame-mobile img { width: 100%; height: 100%; object-fit: cover; object-position: top center; display: block; filter: grayscale(15%) contrast(1.05); animation: imgReveal 0.8s cubic-bezier(0.77,0,0.175,1) 0.1s both; }
  .img-corner { position: absolute; width: 20px; height: 20px; pointer-events: none; z-index: 2; }
  .img-corner.tl { top:8px; left:8px; border-top:1px solid #FFE600; border-left:1px solid #FFE600; }
  .img-corner.br { bottom:8px; right:8px; border-bottom:1px solid #FFE600; border-right:1px solid #FFE600; }
  .img-scanlines { position: absolute; inset: 0; z-index: 1; pointer-events: none; background-image: repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,0,0,0.04) 3px,rgba(0,0,0,0.04) 4px); }
  .info-col { display: flex; flex-direction: column; justify-content: space-between; animation: fadeUp 0.5s 0.15s both; }
  .attr-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 1px; background: #1a1a1a; border: 1px solid #1a1a1a; }
  .attr-item { background: #0a0a0a; padding: 13px 16px; transition: background 0.15s; cursor: crosshair; }
  .attr-item:hover { background: #111; }
  .social-btn { display: flex; align-items: center; justify-content: center; width: 46px; height: 46px; border: 1px solid #2a2a2a; background: transparent; color: #666; cursor: crosshair; text-decoration: none; position: relative; overflow: hidden; transition: color 0.18s, border-color 0.18s, transform 0.18s, box-shadow 0.18s; flex-shrink: 0; }
  .social-btn::before { content: ''; position: absolute; inset: 0; background: #FFE600; transform: scaleY(0); transform-origin: bottom; transition: transform 0.18s; z-index: 0; }
  .social-btn:hover::before { transform: scaleY(1); }
  .social-btn:hover { color: #0a0a0a; border-color: #FFE600; transform: translate(-2px, -2px); box-shadow: 2px 2px 0 #FFE600; }
  .social-btn svg { position: relative; z-index: 1; }
`;