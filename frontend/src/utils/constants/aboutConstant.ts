import type { CSSProperties } from "react";

export type CertItem = {
  id: string;
  issuer: string;
  title: string;
  subtitle: string;
  date: string;
  expires: string;
  credId: string;
  img: string;
  accent: string;
  desc: string;
};

export const CERTS: CertItem[] = [
  {
    id: "01",
    issuer: "AWS",
    title: "Solutions Architect",
    subtitle: "Professional",
    date: "MAR 2024",
    expires: "MAR 2027",
    credId: "AWS-SAP-00291847",
    img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=500&q=80",
    accent: "#FF9900",
    desc: "Validates advanced technical skills designing distributed systems on AWS. Covers multi-account strategy, hybrid networking, cost optimization, and high-availability architecture at scale.",
  },
  {
    id: "02",
    issuer: "Google",
    title: "Professional Cloud",
    subtitle: "DevOps Engineer",
    date: "JAN 2024",
    expires: "JAN 2026",
    credId: "GCP-PCDE-00748291",
    img: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=500&q=80",
    accent: "#00ff88",
    desc: "Demonstrates ability to build CI/CD pipelines, manage service reliability, and apply SRE practices across Google Cloud infrastructure using Kubernetes and Cloud Build.",
  },
  {
    id: "03",
    issuer: "CKAD",
    title: "Certified Kubernetes",
    subtitle: "Application Developer",
    date: "NOV 2023",
    expires: "NOV 2025",
    credId: "CKAD-2300-047821",
    img: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=500&q=80",
    accent: "#326CE5",
    desc: "Hands-on certification proving competency in designing, building, and deploying cloud-native applications using Kubernetes. Covers workloads, services, networking, and observability.",
  },
  {
    id: "04",
    issuer: "HashiCorp",
    title: "Terraform Associate",
    subtitle: "003",
    date: "SEP 2023",
    expires: "SEP 2025",
    credId: "HC-TF-003-091923",
    img: "https://images.unsplash.com/photo-1520869562399-e772f042f422?w=500&q=80",
    accent: "#7B42BC",
    desc: "Confirms proficiency in infrastructure-as-code concepts using Terraform. Covers state management, modules, workspace strategy, and provider configuration for cloud provisioning.",
  },
  {
    id: "05",
    issuer: "Linux Foundation",
    title: "Certified System",
    subtitle: "Administrator",
    date: "JUN 2023",
    expires: "JUN 2025",
    credId: "LF-LFCS-062023-A4",
    img: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=500&q=80",
    accent: "#FFE600",
    desc: "Validates essential Linux system administration skills including storage management, user administration, networking, service configuration, and security hardening in real environments.",
  },
  {
    id: "06",
    issuer: "MongoDB",
    title: "Associate Developer",
    subtitle: "Node.js",
    date: "FEB 2023",
    expires: "FEB 2026",
    credId: "MDB-DEV-022023-NJ",
    img: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=500&q=80",
    accent: "#00ED64",
    desc: "Covers MongoDB CRUD operations, aggregation pipelines, indexing strategies, and data modeling patterns within Node.js applications using the official MongoDB driver and Mongoose.",
  },
];

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
  rarity: string; // matches a GachaRarity id
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
  // ── LEGENDARY ─────────────────────────────────────────────────────────────
  {
    name: "NULL_BLADE",
    type: "WEAPON",
    flavor: "Carved from deallocated heap memory.",
    image: "/assets/null_blade.png",
    rarity: "LEGENDARY",
  },
  {
    name: "ZERO_DAY",
    type: "CURSE",
    flavor: "Exists in all versions. Found in none.",
    image: "/assets/zero_day.png",
    rarity: "LEGENDARY",
  },
  // ── MYTHIC ────────────────────────────────────────────────────────────────
  {
    name: "SIGKILL_ORB",
    type: "SPELL",
    flavor: "Cannot be caught. Cannot be ignored.",
    image: "/assets/sigkill_orb.png",
    rarity: "MYTHIC",
  },
  {
    name: "FORK_BOMB",
    type: "RELIC",
    flavor: "self.spawn(self). Handle with care.",
    image: "/assets/fork_bomb.png",
    rarity: "MYTHIC",
  },
  {
    name: "ENTROPY_CORE",
    type: "RELIC",
    flavor: "Disorganizes everything it touches.",
    image: "/assets/entropy_core.png",
    rarity: "MYTHIC",
  },
  // ── RARE ──────────────────────────────────────────────────────────────────
  {
    name: "KERNEL_FANG",
    type: "WEAPON",
    flavor: "Root access. No sudo required.",
    image: "/assets/kernel_fang.png",
    rarity: "RARE",
  },
  {
    name: "PHANTOM_CALL",
    type: "SPELL",
    flavor: "Invokes a function that no longer exists.",
    image: "/assets/phantom_call.png",
    rarity: "RARE",
  },
  {
    name: "MUTEX_CHAIN",
    type: "RELIC",
    flavor: "Owned by exactly one. Wanted by all.",
    image: "/assets/mutex_chain.png",
    rarity: "RARE",
  },
  // ── UNCOMMON ──────────────────────────────────────────────────────────────
  {
    name: "SEGFAULT_EDGE",
    type: "WEAPON",
    flavor: "Crosses boundaries without permission.",
    image: "/assets/segfault_edge.png",
    rarity: "UNCOMMON",
  },
  {
    name: "DEAD_LOCK",
    type: "CURSE",
    flavor: "Waits forever. Releases never.",
    image: "/assets/dead_lock.png",
    rarity: "UNCOMMON",
  },
  {
    name: "RACE_CONDITION",
    type: "RELIC",
    flavor: "Sometimes it works. Nobody knows why.",
    image: "/assets/race_condition.png",
    rarity: "UNCOMMON",
  },
  // ── COMMON ────────────────────────────────────────────────────────────────
  {
    name: "BYTECODE_MASK",
    type: "ARMOR",
    flavor: "Compiled at runtime. Cannot be patched.",
    image: "/assets/bytecode_mask.png",
    rarity: "COMMON",
  },
  {
    name: "HEAP_SHROUD",
    type: "ARMOR",
    flavor: "Wraps around undefined behavior.",
    image: "/assets/heap_shroud.png",
    rarity: "COMMON",
  },
  {
    name: "OVERFLOW_RING",
    type: "ARMOR",
    flavor: "Holds exactly one more than capacity.",
    image: "/assets/overflow_ring.png",
    rarity: "COMMON",
  },
  {
    name: "GARBAGE_WARD",
    type: "ARMOR",
    flavor: "Collects what others abandon.",
    image: "/assets/garbage_ward.png",
    rarity: "COMMON",
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
  { title: "FOCUS", text: "Systems & full-stack" },
  { title: "EXP", text: "6+ years shipping" },
  { title: "STYLE", text: "No fluff, no bloat" },
  { title: "APPROACH", text: "Readable, testable, durable" },
  { title: "DOMAIN", text: "Distributed systems" },
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

export const credentialsStyles: Record<string, CSSProperties> = {
  section: {
    background: "#0a0a0a",
    color: "#f0f0f0",
    fontFamily: "'Courier New', monospace",
    cursor: "crosshair",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
  },
  header: {
    padding: "clamp(20px,2.5vw,36px) clamp(24px,4vw,52px) clamp(6px,0.8vw,10px)",
    paddingTop: 50,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
    flexShrink: 0,
    animation: "fadeUp 0.45s both",
  },
  eyebrow: {
    fontFamily: "'Space Mono', monospace",
    fontSize: "clamp(9px,1vw,10px)",
    letterSpacing: 5,
    color: "#FFE600",
    display: "block",
    marginBottom: 0,
  },
  title: {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: "clamp(36px,5.5vw,72px)",
    letterSpacing: 3,
    lineHeight: 1,
    marginTop: 20,
    marginBottom: 0
  },
  track: {
    flexShrink: 0,
    overflowX: "scroll",
    overflowY: "visible",
    display: "flex",
    alignItems: "flex-start",
    gap: "clamp(16px,2.5vw,28px)",
    padding: "16px clamp(24px,4vw,52px) clamp(24px,4vw,48px)",
    WebkitOverflowScrolling: "touch" as any,
    touchAction: "pan-x",
  },
  trackSpacer: {
    flexShrink: 0,
    width: "clamp(16px,3vw,40px)",
  },
};

export const CREDENTIALS_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Bebas+Neue&display=swap');
  ::selection{background:#FFE600;color:#0a0a0a}
  @keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
  @keyframes fadeUp{from{transform:translateY(20px);opacity:0}to{transform:translateY(0);opacity:1}}
  .cred-track::-webkit-scrollbar{display:none}
  .cred-track{-ms-overflow-style:none;scrollbar-width:none}
  .cred-scanlines{
    position:fixed;inset:0;pointer-events:none;z-index:100;
    background-image:repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.022) 2px,rgba(0,0,0,0.022) 4px);
  }
`;

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
  // *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
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

// ─── TIMELINE ─────────────────────────────────────────────────────────────────

export type AchievementItem = {
  id: string;
  date: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  highlight: boolean;
};

export const ACHIEVEMENTS: AchievementItem[] = [
  {
    id: "01",
    date: "MAR 2025",
    title: "LAUNCHED NEURAL_MESH",
    description:
      "Shipped a real-time distributed neural network visualization engine capable of rendering 1M+ nodes at a sustained 60fps. Featured on HackerNews front page with 800+ upvotes.",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&q=80",
    tags: ["RUST", "WEBGL", "WASM"],
    highlight: true,
  },
  {
    id: "02",
    date: "NOV 2024",
    title: "OPEN-SOURCED VOID_DB",
    description:
      "Released a distributed key-value store implementing the Raft consensus algorithm. Reached 2.4K GitHub stars in the first month.",
    image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=600&q=80",
    tags: ["GO", "RAFT", "GRPC"],
    highlight: false,
  },
  {
    id: "03",
    date: "JUL 2024",
    title: "BYTECODE VM SHIPPED",
    description:
      "Published a custom bytecode virtual machine with JIT compiler targeting LLVM IR. Benchmarked 3x faster than equivalent interpreted runtimes.",
    image: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=600&q=80",
    tags: ["C++", "LLVM", "JIT"],
    highlight: false,
  },
  {
    id: "04",
    date: "FEB 2024",
    title: "STAFF ENGINEER PROMOTION",
    description:
      "Promoted to Staff Software Engineer after leading the re-architecture of the core data pipeline, cutting infrastructure costs by 38% while doubling throughput.",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&q=80",
    tags: ["LEADERSHIP", "INFRA"],
    highlight: true,
  },
  {
    id: "05",
    date: "SEP 2023",
    title: "SIGNAL_MAP GOES LIVE",
    description:
      "Launched IoT telemetry platform processing 50K+ events per second with real-time anomaly detection. Deployed across 3 continents with 99.97% uptime.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80",
    tags: ["PYTHON", "KAFKA", "REACT"],
    highlight: false,
  },
  {
    id: "06",
    date: "MAY 2022",
    title: "FOUNDED DEVLAB COLLECTIVE",
    description:
      "Co-founded an open-source collective with 120+ active contributors across 18 countries. Hosts bi-monthly virtual workshops on systems programming.",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&q=80",
    tags: ["OSS", "COMMUNITY"],
    highlight: false,
  },
  {
    id: "07",
    date: "JAN 2020",
    title: "FIRST FULL-TIME ROLE",
    description:
      "Joined Meridian Systems as a Software Engineer. Shipped first production feature — a real-time notification engine — within 3 weeks of starting.",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80",
    tags: ["BEGINNINGS"],
    highlight: false,
  },
];

export const TIMELINE_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,400;0,700&family=Bebas+Neue&display=swap');
  .tl-vp::-webkit-scrollbar { display: none; }
  .tl-vp { -ms-overflow-style: none; scrollbar-width: none; }
  .tl-vp::before,
  .tl-vp::after {
    content: '';
    position: sticky;
    display: block;
    left: 0; right: 0;
    height: 52px;
    pointer-events: none;
    z-index: 5;
  }
  .tl-vp::before { top: 0; background: linear-gradient(to bottom, #0a0a0a, transparent); margin-bottom: -52px; }
  .tl-vp::after  { bottom: 0; background: linear-gradient(to top, #0a0a0a, transparent); margin-top: -52px; }
  @keyframes tl-up {
    from { opacity: 0; transform: translateY(18px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .tl-item {
    display: grid;
    grid-template-columns: 1fr 52px 1fr;
    margin-bottom: 48px;
    padding: 0 44px;
    animation: tl-up 0.45s ease both;
  }
  .tl-item.is-left  .tl-date-block  { grid-column: 1; grid-row: 1; }
  .tl-item.is-left  .tl-node-col    { grid-column: 2; grid-row: 1; }
  .tl-item.is-left  .tl-card-col    { grid-column: 3; grid-row: 1; padding-left: 22px; }
  .tl-item.is-right .tl-card-col    { grid-column: 1; grid-row: 1; padding-right: 22px; justify-content: flex-end; }
  .tl-item.is-right .tl-node-col    { grid-column: 2; grid-row: 1; }
  .tl-item.is-right .tl-date-block  { grid-column: 3; grid-row: 1; }
  .tl-date-block { display: flex; flex-direction: column; padding-top: 12px; z-index: 2; }
  .tl-date-block.date-right { align-items: flex-end; padding-right: 18px; }
  .tl-date-block.date-left  { align-items: flex-start; padding-left: 18px; }
  .tl-node-col { display: flex; justify-content: center; padding-top: 10px; z-index: 2; }
  .tl-node {
    width: 16px; height: 16px;
    border: 1px solid #2a2a2a;
    background: #0a0a0a;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
    transition: border-color 0.2s, box-shadow 0.2s;
  }
  .tl-node.hl           { border-color: #FFE600; }
  .tl-item:hover .tl-node { border-color: #FFE600; box-shadow: 0 0 8px #FFE60055; }
  .tl-node-dot { width: 5px; height: 5px; background: #2a2a2a; transition: background 0.2s; }
  .tl-node.hl .tl-node-dot    { background: #FFE600; }
  .tl-item:hover .tl-node-dot { background: #FFE600; }
  .tl-card-col { display: flex; align-items: flex-start; }
  .tl-card {
    width: 100%; max-width: 360px;
    border: 1px solid #1a1a1a;
    background: #0c0c0c;
    overflow: hidden;
    position: relative;
    transition: border-color 0.2s, transform 0.2s, box-shadow 0.2s;
  }
  .tl-card:hover { border-color: #FFE600; transform: translate(-3px, -3px); box-shadow: 3px 3px 0 #FFE600; }
  .tl-card.highlighted::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0;
    height: 2px; background: #FFE600; z-index: 2;
  }
  .tl-img { width: 100%; height: 100%; object-fit: cover; display: block; filter: grayscale(60%) contrast(1.1) brightness(0.9); transition: filter 0.35s, transform 0.4s; }
  .tl-card:hover .tl-img { filter: grayscale(10%) contrast(1.1) brightness(1); transform: scale(1.05); }
  .tl-card:hover .tl-title { color: #FFE600; }
  .tl-card:hover .tl-tag { border-color: #2e2e2e; color: #666; }
  .tl-mobile-date { display: none; align-items: baseline; gap: 6px; padding: 10px 16px 0; border-bottom: 1px solid #1a1a1a; margin-bottom: 2px; }
  @media (max-width: 680px) {
    .tl-inner { padding: 48px 0 80px; }
    .tl-item { grid-template-columns: 36px 1fr; padding: 0 16px; }
    .tl-item.is-left  .tl-date-block,
    .tl-item.is-right .tl-date-block { display: none; }
    .tl-item.is-left  .tl-node-col,
    .tl-item.is-right .tl-node-col  { grid-column: 1; grid-row: 1; }
    .tl-item.is-left  .tl-card-col,
    .tl-item.is-right .tl-card-col  { grid-column: 2; grid-row: 1; padding: 0 0 0 14px; justify-content: flex-start; }
    .tl-spine { left: calc(16px + 14px) !important; }
    .tl-mobile-date { display: flex !important; }
  }
`;

export const timelineStyles: Record<string, CSSProperties> = {
  root: {
    background: "#0a0a0a",
    color: "#f0f0f0",
    height: "90vh",
    display: "flex",
    flexDirection: "column",
    fontFamily: "'Space Mono', monospace",
    overflow: "hidden",
    position: "relative",
  },
  gridOverlay: {
    position: "absolute",
    inset: 0,
    pointerEvents: "none",
    backgroundImage:
      "linear-gradient(#1a1a1a 1px,transparent 1px),linear-gradient(90deg,#1a1a1a 1px,transparent 1px)",
    backgroundSize: "48px 48px",
    opacity: 0.25,
    zIndex: 0,
  },
  header: {
    flexShrink: 0,
    padding: "20px 52px 16px",
    borderBottom: "1px solid #161616",
    position: "relative",
    overflow: "hidden",
    zIndex: 10,
    paddingTop: 50
  },
  eyebrow: {
    fontSize: 9,
    letterSpacing: 6,
    color: "#FFE600",
    display: "block",
  },
  h1: {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: "clamp(40px, 5.5vw, 72px)",
    lineHeight: 0.92,
    letterSpacing: -1,
    marginTop: 20,
    marginBottom: 20
  },
  progressBar: {
    position: "absolute",
    right: 0,
    top: 0,
    bottom: 0,
    width: 2,
    background: "#111",
    zIndex: 20,
    pointerEvents: "none",
  },
  viewport: {
    flex: 1,
    overflowY: "scroll",
    overflowX: "hidden",
    position: "relative",
    scrollbarWidth: "none" as any,
    backgroundImage:
      "linear-gradient(rgba(26,26,26,0.25) 1px,transparent 1px),linear-gradient(90deg,rgba(26,26,26,0.25) 1px,transparent 1px)",
    backgroundSize: "48px 48px",
  },
  inner: {
    position: "relative",
    padding: "64px 0 100px",
  },
  spine: {
    position: "absolute",
    left: "50%",
    top: 0,
    bottom: 0,
    width: 1,
    transform: "translateX(-50%)",
    background:
      "linear-gradient(to bottom, transparent, #FFE600 56px, #1c1c1c 96px, #1c1c1c calc(100% - 56px), transparent)",
    pointerEvents: "none",
  },
  dateMonth: {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: 22,
    letterSpacing: 4,
    color: "#FFE600",
    lineHeight: 1,
  },
  dateYear: {
    fontSize: 9,
    letterSpacing: 3,
    color: "#383838",
    marginTop: 3,
  },
  imgWrap: {
    position: "relative",
    height: 140,
    overflow: "hidden",
    background: "#111",
  },
  imgScrim: {
    position: "absolute",
    inset: 0,
    background:
      "linear-gradient(to bottom, rgba(12,12,12,0) 40%, #0c0c0c 100%)",
  },
  imgNum: {
    position: "absolute",
    top: 6,
    right: 10,
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: 30,
    color: "rgba(255,255,255,0.05)",
    pointerEvents: "none",
    userSelect: "none",
  },
  cardBody: {
    padding: "12px 16px 16px",
  },
  badge: {
    fontSize: 7,
    letterSpacing: 3,
    background: "#FFE600",
    color: "#0a0a0a",
    padding: "3px 8px",
    display: "inline-block",
    marginBottom: 8,
    fontWeight: 700,
  },
  cardTitle: {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: 20,
    letterSpacing: 2,
    color: "#ddd",
    lineHeight: 1.05,
    marginBottom: 8,
    transition: "color 0.2s",
  },
  cardDesc: {
    fontSize: 10,
    lineHeight: 1.85,
    color: "#4a4a4a",
    marginBottom: 12,
  },
  cardTags: {
    display: "flex",
    flexWrap: "wrap" as any,
    gap: 5,
  },
  tag: {
    fontSize: 8,
    letterSpacing: 2,
    padding: "2px 6px",
    border: "1px solid #1e1e1e",
    color: "#3a3a3a",
    transition: "border-color 0.2s, color 0.2s",
  },
  mobMonth: {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: 17,
    letterSpacing: 3,
    color: "#FFE600",
    lineHeight: 1,
  },
  mobYear: {
    fontSize: 9,
    letterSpacing: 3,
    color: "#3a3a3a",
  },
};