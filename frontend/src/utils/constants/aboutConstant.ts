import type { CSSProperties } from "react";

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

export const aboutStyles: Record<string, CSSProperties> = {
  page: {
    width: "100%",
    background: "#0a0a0a",
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