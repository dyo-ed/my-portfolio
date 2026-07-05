import type { CSSProperties } from "react";
import type { EdLinks } from "./projectViewerConstant";

export const PROJECT_FILTERS = ["ALL", "ACTIVE", "OSS", "ARCHIVED"] as const;
export type ProjectFilter = (typeof PROJECT_FILTERS)[number];

export const SPECTRUM_BANDS = 48;

/** Numeric prefix from slug (e.g. "02_cafebistro" → 2). */
export function projectSlugOrder(slug: string): number {
  const m = slug.match(/^(\d+)_/);
  return m ? parseInt(m[1], 10) : 0;
}

/** Two-digit id from slug prefix (e.g. "02_cafebistro" → "02"). */
export function projectSlugId(slug: string): string {
  const m = slug.match(/^(\d+)_/);
  return m ? m[1].padStart(2, "0") : "";
}

/** Sort projects descending by slug prefix (02 before 01). */
export function sortProjectsDesc<T extends { slug: string }>(entries: T[]): T[] {
  return [...entries].sort(
    (a, b) => projectSlugOrder(b.slug) - projectSlugOrder(a.slug)
  );
}

/** Prev/next links derived from slug order (03 → 02 → 01). */
export function buildProjectNavLinks(
  currentSlug: string,
  entries: { slug: string; data: { details: { title: string } } }[]
): EdLinks {
  const ordered = sortProjectsDesc(entries);
  const idx = ordered.findIndex((e) => e.slug === currentSlug);
  const prev = idx > 0 ? ordered[idx - 1] : null;
  const next = idx >= 0 && idx < ordered.length - 1 ? ordered[idx + 1] : null;

  return {
    previous: prev
      ? { id: projectSlugId(prev.slug), title: prev.data.details.title }
      : { id: "", title: "" },
    next: next
      ? { id: projectSlugId(next.slug), title: next.data.details.title }
      : { id: "", title: "" },
  };
}

export const PROJECTS_CSS = `
  .pj-root::after {
    content: '';
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: 1;
    background-image: repeating-linear-gradient(
      0deg, transparent, transparent 2px,
      rgba(0,0,0,0.022) 2px, rgba(0,0,0,0.022) 4px
    );
  }
  .pj-header {
    flex-shrink: 0;
    padding: 44px 52px 28px 68px;
    border-bottom: 1px solid #161616;
    position: relative;
    overflow: hidden;
  }
  .pj-eyebrow {
    font-size: 9px;
    letter-spacing: 6px;
    color: #FFE600;
    display: block;
    margin-bottom: 10px;
  }
  .pj-h1 {
    font-family: 'Bebas Neue', sans-serif;
    font-size: clamp(50px, 7.5vw, 96px);
    line-height: 0.88;
    letter-spacing: -1px;
  }
  .pj-h1 .y { color: #FFE600; }
  .pj-h1 .g { -webkit-text-stroke: 1px #222; color: transparent; }
  .pj-count {
    position: absolute;
    bottom: 12px;
    right: 52px;
    font-size: 10px;
    letter-spacing: 3px;
    font-weight: 700;
    color: #0a0a0a;
    background: #FFE600;
    border: 1px solid #FFE600;
    padding: 5px 12px;
    box-shadow: 0 0 12px rgba(255, 230, 0, 0.25);
  }
  .pj-filters {
    flex-shrink: 0;
    display: flex;
    gap: 2px;
    padding: 18px 52px 18px 68px;
    border-bottom: 1px solid #161616;
    flex-wrap: wrap;
  }
  .pj-filter-btn {
    background: transparent;
    border: 1px solid #1a1a1a;
    color: #444;
    font-family: 'Space Mono', monospace;
    font-size: 9px;
    letter-spacing: 3px;
    padding: 8px 16px;
    cursor: pointer;
    transition: all 0.15s;
  }
  .pj-filter-btn:hover {
    border-color: #FFE600;
    color: #FFE600;
  }
  .pj-filter-btn.active {
    background: #FFE600;
    border-color: #FFE600;
    color: #0a0a0a;
    font-weight: 700;
  }
  .pj-body-shell {
    display: flex;
    position: relative;
    align-items: stretch;
  }
  .pj-rail {
    width: 44px;
    flex-shrink: 0;
    align-self: stretch;
    border-right: 1px solid #161616;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 14px 0 10px;
    background: #0b0b0b;
    z-index: 15;
  }
  .pj-rail-top {
    font-size: 7px;
    letter-spacing: 2px;
    color: #333;
    margin-bottom: 12px;
    writing-mode: vertical-rl;
    text-orientation: mixed;
  }
  .pj-rail-track {
    position: relative;
    flex: 1;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: stretch;
    gap: 2px;
    padding: 2px 0;
  }
  .pj-band {
    width: 100%;
    flex: 1;
    min-height: 2px;
    border-radius: 0.5px;
    transition: opacity 0.12s linear, transform 0.12s linear, background 0.12s linear;
  }
  .pj-rail-tick {
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 14px;
    height: 1px;
    background: #2a2a2a;
    transition: background 0.2s;
  }
  .pj-rail-tick.passed { background: #FFE600; box-shadow: 0 0 4px #FFE60088; }
  .pj-rail-pct {
    margin-top: 12px;
    font-family: 'Bebas Neue', sans-serif;
    font-size: 13px;
    letter-spacing: 1px;
    color: #FFE600;
  }
  .pj-grid {
    flex: 1;
    min-width: 0;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1px;
    background: #161616;
    padding: 1px;
  }
  .pj-card {
    background: #0c0c0c;
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    text-decoration: none;
    cursor: pointer;
    border: 1px solid transparent;
    opacity: 0;
    transform: translateY(28px) scale(0.97);
    transition: background 0.2s, border-color 0.2s;
  }
  .pj-card.in-view {
    animation: pj-enter 0.55s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  }
  @keyframes pj-enter {
    from {
      opacity: 0;
      transform: translateY(28px) scale(0.97);
      clip-path: inset(8px 0 0 0);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
      clip-path: inset(0px 0 0 0);
    }
  }
  .pj-card:hover {
    background: #101010;
    border-color: #FFE600;
  }
  .pj-img-wrap {
    position: relative;
    height: 190px;
    overflow: hidden;
    background: #111;
    flex-shrink: 0;
  }
  .pj-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    filter: grayscale(60%) contrast(1.1) brightness(0.85);
    transition: filter 0.35s, transform 0.4s;
  }
  .pj-card:hover .pj-img {
    filter: grayscale(10%) contrast(1.1) brightness(1);
    transform: scale(1.05);
  }
  .pj-img-scrim {
    position: absolute;
    inset: 0;
    background: linear-gradient(to bottom, rgba(12,12,12,0) 45%, #0c0c0c 100%);
  }
  .pj-img-num {
    position: absolute;
    top: 8px; right: 12px;
    font-family: 'Bebas Neue', sans-serif;
    font-size: 32px;
    color: rgba(255,255,255,0.06);
    pointer-events: none;
    user-select: none;
  }
  .pj-status {
    position: absolute;
    top: 10px; left: 12px;
    font-size: 7px;
    letter-spacing: 2px;
    padding: 3px 7px;
    border: 1px solid;
    font-weight: 700;
  }
  .st-active   { color: #FFE600; border-color: #FFE600; }
  .st-oss      { color: #6be3a3; border-color: #2a4a3a; }
  .st-archived { color: #555;    border-color: #2a2a2a; }
  .pj-badge {
    position: absolute;
    bottom: 10px; left: 12px;
    font-size: 7px;
    letter-spacing: 2px;
    background: #FFE600;
    color: #0a0a0a;
    padding: 3px 8px;
    font-weight: 700;
  }
  .pj-body {
    padding: 16px 18px 20px;
    display: flex;
    flex-direction: column;
    flex: 1;
  }
  .pj-meta {
    display: flex;
    align-items: baseline;
    gap: 7px;
    margin-bottom: 8px;
  }
  .pj-year {
    font-size: 9px;
    letter-spacing: 2px;
    color: #FFE600;
  }
  .pj-dash { font-size: 9px; color: #333; }
  .pj-subtitle {
    font-size: 9px;
    letter-spacing: 1.5px;
    color: #555;
    text-transform: uppercase;
  }
  .pj-title {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 26px;
    letter-spacing: 1.5px;
    color: #ddd;
    line-height: 1.05;
    margin-bottom: 10px;
    transition: color 0.2s;
  }
  .pj-card:hover .pj-title { color: #FFE600; }
  .pj-desc {
    font-size: 10px;
    line-height: 1.85;
    color: #4a4a4a;
    margin-bottom: 14px;
    flex: 1;
  }
  .pj-tags { display: flex; flex-wrap: wrap; gap: 5px; }
  .pj-tag {
    font-size: 8px;
    letter-spacing: 2px;
    padding: 2px 6px;
    border: 1px solid #1e1e1e;
    color: #3a3a3a;
    transition: border-color 0.2s, color 0.2s;
  }
  .pj-card:hover .pj-tag { border-color: #2e2e2e; color: #666; }
  .pj-arrow {
    position: absolute;
    bottom: 16px;
    right: 16px;
    font-size: 14px;
    color: #222;
    transition: color 0.2s, transform 0.2s;
  }
  .pj-card:hover .pj-arrow {
    color: #FFE600;
    transform: translateX(3px);
  }
  .pj-card.featured { grid-column: span 2; }
  .pj-card.featured .pj-img-wrap { height: 230px; }
  .pj-card.featured .pj-title { font-size: 34px; }
  @media (max-width: 900px) {
    .pj-grid { grid-template-columns: repeat(2, 1fr); }
    .pj-card.featured { grid-column: span 2; }
  }
  @media (max-width: 600px) {
    .pj-header { padding: 36px 20px 24px 46px; }
    .pj-filters { padding: 14px 20px 14px 46px; }
    .pj-count { display: none; }
    .pj-rail { width: 28px; padding: 10px 0 8px; }
    .pj-rail-top { font-size: 6px; margin-bottom: 8px; }
    .pj-rail-pct { font-size: 11px; }
    .pj-grid { grid-template-columns: 1fr; }
    .pj-card.featured { grid-column: span 1; }
  }
`;

export const projectStyles: Record<string, CSSProperties> = {
  root: {
    background: "#0a0a0a",
    color: "#f0f0f0",
    minHeight: "calc(100vh - 56px)",
    fontFamily: "'Space Mono', monospace",
    position: "relative",
    width: "100%",
  },
};
