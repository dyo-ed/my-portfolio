
// ─── TYPES ────────────────────────────────────────────────────────────────────

export type EdStat = { label: string; value: string };
export type EdLink = { label: string; href: string };
export type EdBestFitService = {
  icon: string;
  title: string;
  subtitle: string;
  link: string;
};

/** Represents the "project-details" block of a .ed file. */
export type EdProjectDetails = {
  active: boolean;
  featured: boolean;
  /** Maps to the filter system: "ACTIVE" | "OSS" | "ARCHIVED" */
  status: string;
  title: string;
  subtitle: string;
  heroImage: string;
  stats: EdStat[];
  clientType: string;
  date: string;
  technologies: string[];
  links: EdLink[];
  bestFitService: EdBestFitService;
};

/** A single content block entry in the .ed file's content section. */
export type EdContentEntry =
  | { kind: "highlight"; text: string }
  | { kind: "title"; text: string }
  | { kind: "text"; text: string }
  | { kind: "quote"; text: string }
  | { kind: "image"; src: string }
  | { kind: "custom"; label: string; text: string };

/** Runtime prev/next navigation between projects (derived from slug order). */
export type EdLinks = {
  previous: { id: string; title: string };
  next: { id: string; title: string };
};

/** Full parsed structure of a .ed project file. */
export type EdFile = {
  details: EdProjectDetails;
  content: EdContentEntry[];
  links: EdLinks;
};

// ─── PLACEHOLDER ──────────────────────────────────────────────────────────────

/** Shown while no .ed data has been provided (bare render with skeleton values). */
export const PLACEHOLDER_ED: EdFile = {
  details: {
    active: false,
    featured: false,
    status: "ARCHIVED",
    title: "PROJECT_TITLE",
    subtitle: "Short one-line description of what this project does",
    heroImage: "",
    stats: [
      { label: "STAT LABEL A", value: "—" },
      { label: "STAT LABEL B", value: "—" },
      { label: "STAT LABEL C", value: "—" },
    ],
    clientType: "CLIENT / TYPE",
    date: "MON YYYY",
    technologies: ["TECH_A", "TECH_B", "TECH_C"],
    links: [
      { label: "VIEW REPOSITORY", href: "#" },
      { label: "LIVE DEMO", href: "#" },
    ],
    bestFitService: {
      icon: "◆",
      title: "SERVICE TITLE",
      subtitle: "Short description of the service that fits this project.",
      link: "#",
    },
  },
  content: [
    {
      kind: "highlight",
      text: "Lead paragraph goes here — the hook that draws the reader in before the detailed breakdown.",
    },
    {
      kind: "title",
      text: "THE PROBLEM",
    },
    {
      kind: "text",
      text: "Describe the challenge or context that motivated this project.",
    },
    {
      kind: "title",
      text: "THE APPROACH",
    },
    {
      kind: "text",
      text: "Explain the technical or design decisions made to address the problem.",
    },
    {
      kind: "quote",
      text: "A memorable quote or key insight from the project.",
    },
    {
      kind: "image",
      src: "",
    },
    {
      kind: "title",
      text: "WHAT SHIPPED",
    },
    {
      kind: "text",
      text: "Summarise the outcome, what was delivered, and any notable reception.",
    },
  ],
  links: {
    previous: { id: "", title: "" },
    next: { id: "", title: "" },
  },
};

// ─── GLOBAL CSS STRING ────────────────────────────────────────────────────────

export const PROJECT_VIEWER_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,400;0,700&family=Bebas+Neue&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  ::selection { background: #FFE600; color: #0a0a0a; }

  .pv-root {
    background: #0a0a0a;
    color: #f0f0f0;
    min-height: calc(100vh - 56px);
    display: flex;
    flex-direction: column;
    font-family: 'Space Mono', monospace;
    position: relative;
  }
  .pv-root::after {
    content: '';
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 999;
    background-image: repeating-linear-gradient(
      0deg, transparent, transparent 2px,
      rgba(0,0,0,0.022) 2px, rgba(0,0,0,0.022) 4px
    );
  }

  /* ── TOP NAV + READING PROGRESS ── */
  .pv-nav {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 18px 44px;
    border-bottom: 1px solid #161616;
    z-index: 30;
    position: sticky;
    top: 56px;
    background: #0a0a0a;
  }
  .pv-back {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: none;
    border: none;
    color: #666;
    font-family: 'Space Mono', monospace;
    font-size: 10px;
    letter-spacing: 3px;
    cursor: pointer;
    transition: color 0.15s;
    padding: 0;
  }
  .pv-back:hover { color: #FFE600; }
  .pv-back .arw { font-size: 13px; transition: transform 0.15s; }
  .pv-back:hover .arw { transform: translateX(-3px); }

  .pv-nav-right { display: flex; align-items: center; gap: 14px; }
  .pv-nav-status {
    font-size: 8px; letter-spacing: 2px; color: #FFE600;
    border: 1px solid #FFE600; padding: 3px 8px; font-weight: 700;
  }
  .pv-nav-inactive {
    font-size: 8px; letter-spacing: 2px; color: #444;
    border: 1px solid #2a2a2a; padding: 3px 8px; font-weight: 700;
  }
  .pv-progress { position: absolute; left: 0; right: 0; bottom: -1px; height: 2px; background: #161616; }
  .pv-progress-fill { height: 100%; background: #FFE600; box-shadow: 0 0 6px #FFE60088; transition: width 0.08s linear; }

  /* ── BODY LAYOUT ── */
  .pv-body-shell {
    flex: 1;
    display: flex;
    position: relative;
    gap: 32px;
    padding: 28px 32px;
  }

  /* ── FLOATING SIDEBAR (Sticky on desktop) ── */
  .pv-sidebar {
    width: 252px;
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    gap: 16px;
    position: sticky;
    top: 140px; /* 56px header + 56px pv-nav + 28px padding */
    align-self: flex-start;
  }

  .pv-panel {
    border: 1px solid #1c1c1c;
    background: #0c0c0c;
    flex-shrink: 0;
  }
  .pv-panel-head {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 12px 16px;
    border-bottom: 1px solid #161616;
  }
  .pv-panel-dot { width: 5px; height: 5px; background: #FFE600; flex-shrink: 0; }
  .pv-panel-dot.inactive { background: #333; }
  .pv-panel-title { font-size: 9px; letter-spacing: 3px; color: #666; }
  .pv-panel-body { padding: 16px; }

  .pv-detail-row {
    display: flex;
    flex-direction: column;
    gap: 4px;
    margin-bottom: 16px;
  }
  .pv-detail-label { font-size: 7px; letter-spacing: 2px; color: #333; }
  .pv-detail-value {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 15px;
    letter-spacing: 1px;
    color: #ddd;
  }
  .pv-detail-chips { display: flex; flex-wrap: wrap; gap: 5px; }
  .pv-detail-chip {
    font-size: 8px;
    letter-spacing: 1.5px;
    padding: 4px 8px;
    border: 1px solid #1e1e1e;
    color: #777;
  }

  .pv-panel-buttons {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 14px 16px 16px;
    border-top: 1px solid #161616;
  }
  .pv-btn {
    font-family: 'Space Mono', monospace;
    font-size: 9px;
    letter-spacing: 2px;
    padding: 11px 14px;
    border: 1px solid #2a2a2a;
    color: #ccc;
    text-decoration: none;
    background: transparent;
    cursor: pointer;
    text-align: center;
    transition: all 0.15s;
  }
  .pv-btn.primary {
    background: #FFE600;
    border-color: #FFE600;
    color: #0a0a0a;
    font-weight: 700;
  }
  .pv-btn.primary:hover { background: #fff; border-color: #fff; }
  .pv-btn.ghost:hover { border-color: #FFE600; color: #FFE600; }

  /* best-fit service panel */
  .pv-service-card { padding: 18px 16px 16px; }
  .pv-service-icon {
    width: 40px;
    height: 40px;
    border: 1px solid #FFE600;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    color: #FFE600;
    margin-bottom: 14px;
  }
  .pv-service-title {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 19px;
    letter-spacing: 1px;
    color: #ddd;
    line-height: 1.1;
    margin-bottom: 8px;
  }
  .pv-service-subtitle { font-size: 10.5px; line-height: 1.7; color: #666; }
  .pv-service-link {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    padding: 13px 16px;
    border-top: 1px solid #161616;
    background: none;
    color: #ccc;
    font-family: 'Space Mono', monospace;
    font-size: 9.5px;
    letter-spacing: 2px;
    cursor: pointer;
    text-align: left;
    width: 100%;
    border-left: none; border-right: none; border-bottom: none;
    transition: color 0.15s, background 0.15s;
  }
  .pv-service-link:hover { color: #FFE600; background: #101010; }
  .pv-service-link .arrow { font-size: 12px; color: #444; transition: color 0.15s, transform 0.15s; }
  .pv-service-link:hover .arrow { color: #FFE600; transform: translateX(3px); }
  /* ── SCROLLABLE ARTICLE VIEWPORT ── */
  .pv-vp {
    flex: 1;
    min-width: 0;
  }

  .pv-wrap {
    max-width: 700px;
    margin: 0 auto;
    padding: 12px 32px 120px;
  }

  /* ── HERO ── */
  .pv-eyebrow { font-size: 9px; letter-spacing: 6px; color: #FFE600; display: block; margin-bottom: 14px; }
  .pv-title {
    font-family: 'Bebas Neue', sans-serif;
    font-size: clamp(42px, 7vw, 76px);
    line-height: 0.92;
    letter-spacing: -1px;
    margin-bottom: 14px;
  }
  .pv-subtitle { font-size: 13px; letter-spacing: 1px; color: #666; margin-bottom: 30px; }

  /* ── HERO IMAGE ── */
  .pv-hero-img-wrap {
    position: relative;
    width: 100%;
    height: 340px;
    overflow: hidden;
    margin-bottom: 40px;
    background: #111;
  }
  .pv-hero-img { width: 100%; height: 100%; object-fit: cover; filter: grayscale(45%) contrast(1.1) brightness(0.92); }
  .pv-hero-scrim { position: absolute; inset: 0; background: linear-gradient(to top, rgba(10,10,10,0.65), transparent 40%); }
  .pv-hero-placeholder {
    width: 100%; height: 100%;
    display: flex; align-items: center; justify-content: center;
    font-size: 9px; letter-spacing: 4px; color: #222;
  }

  /* ── STATS STRIP ── */
  .pv-stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; background: #161616; margin-bottom: 44px; }
  .pv-stat { background: #0c0c0c; padding: 18px 14px; text-align: center; }
  .pv-stat-value { font-family: 'Bebas Neue', sans-serif; font-size: 28px; color: #FFE600; letter-spacing: 1px; line-height: 1; margin-bottom: 6px; }
  .pv-stat-label { font-size: 7px; letter-spacing: 2px; color: #444; }

  /* ── ARTICLE BODY ── */
  .pv-lead { font-size: 15px; line-height: 1.9; color: #ccc; margin-bottom: 44px; padding-left: 16px; border-left: 2px solid #FFE600; }
  .pv-h2 {
    font-family: 'Bebas Neue', sans-serif; font-size: 21px; letter-spacing: 3px; color: #FFE600;
    margin-bottom: 14px; display: flex; align-items: center; gap: 10px;
  }
  .pv-h2::before { content: '//'; color: #333; font-family: 'Space Mono', monospace; font-size: 13px; }
  .pv-p { font-size: 12.5px; line-height: 2; color: #777; }

  /* ── PULL QUOTE ── */
  .pv-quote { margin: 48px 0; padding: 28px 30px; border: 1px solid #1a1a1a; border-left: 2px solid #FFE600; background: #0c0c0c; position: relative; }
  .pv-quote-mark { font-family: 'Bebas Neue', sans-serif; font-size: 42px; color: #1e1e1e; line-height: 0; position: absolute; top: 24px; left: 12px; }
  .pv-quote-text { font-size: 15px; line-height: 1.75; color: #ddd; padding-left: 18px; }

  /* ── MID IMAGE ── */
  .pv-mid-img-wrap { width: 100%; height: 280px; overflow: hidden; margin: 44px 0; background: #111; }
  .pv-mid-img { width: 100%; height: 100%; object-fit: cover; filter: grayscale(55%) contrast(1.1) brightness(0.88); }
  .pv-mid-placeholder {
    width: 100%; height: 100%;
    display: flex; align-items: center; justify-content: center;
    font-size: 9px; letter-spacing: 4px; color: #222;
  }

  /* ── PREV / NEXT NAV ── */
  .pv-postnav { display: grid; grid-template-columns: 1fr 1fr; gap: 1px; background: #161616; margin-top: 56px; }
  .pv-postnav-item { background: #0c0c0c; padding: 22px 24px; cursor: pointer; transition: background 0.15s; display: flex; flex-direction: column; gap: 8px; }
  .pv-postnav-item:hover { background: #101010; }
  .pv-postnav-item.next { text-align: right; align-items: flex-end; }
  .pv-postnav-empty { cursor: default; pointer-events: none; }
  .pv-postnav-label { font-size: 8px; letter-spacing: 3px; color: #333; }
  .pv-postnav-title { font-family: 'Bebas Neue', sans-serif; font-size: 22px; letter-spacing: 1px; color: #999; transition: color 0.15s; }
  .pv-postnav-item:hover .pv-postnav-title { color: #FFE600; }

  /* ── PLACEHOLDER SKELETON ── */
  @keyframes pv-pulse {
    0%, 100% { opacity: 0.3; }
    50% { opacity: 0.6; }
  }
  .pv-skeleton {
    background: #1a1a1a;
    animation: pv-pulse 1.8s ease-in-out infinite;
    border-radius: 1px;
  }

  /* ── RESPONSIVE ── */
  @media (max-width: 900px) {
    .pv-body-shell { flex-direction: column; padding: 20px; gap: 20px; }
    .pv-vp { order: 1; overflow: visible; flex: none; }
    .pv-sidebar {
      order: 2;
      width: 100%;
      flex-direction: column;
      overflow: visible;
      margin-top: 8px;
      position: static;
      max-height: none;
    }
    .pv-panel { min-width: 0; }
    .pv-wrap { padding: 0 0 0; max-width: 100%; }
  }
  @media (max-width: 640px) {
    .pv-nav { padding: 14px 20px; }
    .pv-hero-img-wrap { height: 200px; }
    .pv-stats { grid-template-columns: 1fr; }
    .pv-postnav { grid-template-columns: 1fr; }
    .pv-sidebar { flex-direction: column; }
  }
`;

