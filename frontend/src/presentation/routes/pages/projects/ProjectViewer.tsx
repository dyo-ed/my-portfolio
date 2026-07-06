import { useState, useEffect } from "react";
import GlitchText from "../../../components/glitch_text/glitchText";
import {
  EdFile,
  EdContentEntry,
  PLACEHOLDER_ED,
  PROJECT_VIEWER_CSS,
} from "../../../../utils/constants/projectViewerConstant";

// ─── HELPERS ──────────────────────────────────────────────────────────────────

function goTo(prompt: string) {
  if (typeof window !== "undefined" && (window as any).sendPrompt) {
    (window as any).sendPrompt(prompt);
  }
}

// ─── ED FILE PARSER ───────────────────────────────────────────────────────────
//
// Parses the custom .ed text format into an EdFile object.
//
// .ed format:
//
//   project-details = {
//     active: true,
//     title: "...",
//     subtitle: "...",
//     hero-image: "...",
//     stats: [ { label: "...", value: "..." }, ... ],
//     client-type: "...",
//     date: "...",
//     technologies: ["...", ...],
//     links: [ { label: "...", href: "..." }, ... ],
//     bestFitService: { icon: "...", title: "...", subtitle: "...", link: "..." }
//   }
//
//   content = {
//     // order matters — blocks are emitted in file order
//     highlight: "...",
//     title: "SECTION HEADING",
//     text: "...",
//     quote: "...",
//     image: "...",
//     ...
//   }
//
// Prev/next navigation is derived automatically from slug order (03 → 02 → 01).

export function parseEdFile(raw: string): EdFile {
  try {
    // ── helpers ──────────────────────────────────────────────────────────────

    /** Extract the raw text inside the outermost { } for a top-level block. */
    const extractBlock = (src: string, key: string): string => {
      const start = src.indexOf(`${key} = {`);
      if (start === -1) return "";
      // The opening { is at start + key.length + 3 (" = {" offset from key end).
      // We initialise depth=1 (outer { already consumed) and scan from the char after it.
      const openPos = start + key.length + 3; // position of the outer {
      let depth = 1;
      for (let i = openPos + 1; i < src.length; i++) {
        if (src[i] === "{") { depth++; }
        else if (src[i] === "}") {
          depth--;
          if (depth === 0) return src.slice(openPos + 1, i);
        }
      }
      return "";
    };

    /** Pull the first string value for a simple key: "value" pair. */
    const strVal = (block: string, key: string): string => {
      const rx = new RegExp(`${key}\\s*:\\s*"([^"]*)"`);
      const m = block.match(rx);
      return m ? m[1] : "";
    };

    /** Pull a boolean value. */
    const boolVal = (block: string, key: string): boolean => {
      const rx = new RegExp(`${key}\\s*:\\s*(true|false)`);
      const m = block.match(rx);
      return m ? m[1] === "true" : false;
    };

    /** Extract an inline array of strings: ["a","b",...] */
    const strArray = (block: string, key: string): string[] => {
      const rx = new RegExp(`${key}\\s*:\\s*\\[([^\\]]*)]`);
      const m = block.match(rx);
      if (!m) return [];
      const results: string[] = [];
      const rx2 = /"([^"]*)"/g;
      let hit: RegExpExecArray | null;
      while ((hit = rx2.exec(m[1])) !== null) results.push(hit[1]);
      return results;
    };

    /** Extract an inline array of objects — returns raw text between [ and ]. */
    const objArray = (block: string, key: string): string[] => {
      const rx = new RegExp(`${key}\\s*:\\s*\\[`);
      const m = rx.exec(block);
      if (!m) return [];
      let depth = 0;
      let start = -1;
      for (let i = m.index + m[0].length - 1; i < block.length; i++) {
        if (block[i] === "[") { if (depth === 0) start = i; depth++; }
        else if (block[i] === "]") {
          depth--;
          if (depth === 0) {
            const inner = block.slice(start + 1, i);
            // split by top-level { }
            const items: string[] = [];
            let d = 0, s = -1;
            for (let j = 0; j < inner.length; j++) {
              if (inner[j] === "{") { if (d === 0) s = j; d++; }
              else if (inner[j] === "}") {
                d--;
                if (d === 0) items.push(inner.slice(s + 1, j));
              }
            }
            return items;
          }
        }
      }
      return [];
    };

    /** Extract a nested object literal for a given key. */
    const nestedObj = (block: string, key: string): string => {
      const rx = new RegExp(`${key}\\s*:\\s*\\{`);
      const m = rx.exec(block);
      if (!m) return "";
      let depth = 0, open = -1;
      for (let i = m.index + m[0].length - 1; i < block.length; i++) {
        if (block[i] === "{") { if (depth === 0) open = i; depth++; }
        else if (block[i] === "}") {
          depth--;
          if (depth === 0) return block.slice(open + 1, i);
        }
      }
      return "";
    };

    // ── project-details ───────────────────────────────────────────────────────
    const detBlock = extractBlock(raw, "project-details");

    const statItems = objArray(detBlock, "stats").map((s) => ({
      label: strVal(s, "label"),
      value: strVal(s, "value"),
    }));

    const linkItems = objArray(detBlock, "links").map((l) => ({
      label: strVal(l, "label"),
      href: strVal(l, "href"),
    }));

    const bfsBlock = nestedObj(detBlock, "bestFitService");
    const bestFitService = {
      icon: strVal(bfsBlock, "icon"),
      title: strVal(bfsBlock, "title"),
      subtitle: strVal(bfsBlock, "subtitle"),
      link: strVal(bfsBlock, "link"),
    };

    const details = {
      active: boolVal(detBlock, "active"),
      featured: boolVal(detBlock, "featured"),
      status: strVal(detBlock, "status") || "ARCHIVED",
      title: strVal(detBlock, "title"),
      subtitle: strVal(detBlock, "subtitle"),
      heroImage: strVal(detBlock, "hero-image"),
      stats: statItems,
      clientType: strVal(detBlock, "client-type"),
      date: strVal(detBlock, "date"),
      technologies: strArray(detBlock, "technologies"),
      links: linkItems,
      bestFitService,
    };

    // ── content ───────────────────────────────────────────────────────────────
    //
    // The content block uses repeated keys in source order — standard JSON
    // parsing loses duplicates. We walk line-by-line instead.

    const raw_content = extractBlock(raw, "content");
    const contentEntries: EdContentEntry[] = [];

    // We process line by line and collect multi-line strings.
    const lines = raw_content.split("\n");

    const readValue = (rest: string): string => {
      // rest is the part after the colon, trimmed.  Extract the string value.
      const m = rest.match(/"([^"]*)"/);
      return m ? m[1] : rest.trim().replace(/^"|"$/g, "");
    };

    for (const rawLine of lines) {
      const line = rawLine.replace(/\r/, "").trim();
      if (!line || line.startsWith("//") || line === "{" || line === "}") continue;

      const colonIdx = line.indexOf(":");
      if (colonIdx === -1) continue;

      const key = line.slice(0, colonIdx).trim();
      const rest = line.slice(colonIdx + 1).trim();

      // Remove trailing comma from rest if present
      const val = readValue(rest.replace(/,$/, ""));

      switch (key) {
        case "highlight":
          contentEntries.push({ kind: "highlight", text: val });
          break;
        case "title":
          contentEntries.push({ kind: "title", text: val });
          break;
        case "text":
          contentEntries.push({ kind: "text", text: val });
          break;
        case "quote":
          contentEntries.push({ kind: "quote", text: val });
          break;
        case "image":
          contentEntries.push({ kind: "image", src: val });
          break;
        default:
          contentEntries.push({ kind: "custom", label: key, text: val });
          break;
      }
    }

    // ── links (computed at runtime from slug order, not from .ed files) ─────
    const links = {
      previous: { id: "", title: "" },
      next: { id: "", title: "" },
    };

    return { details, content: contentEntries, links };
  } catch {
    return PLACEHOLDER_ED;
  }
}

// ─── PROPS ────────────────────────────────────────────────────────────────────

export type ProjectViewerProps = {
  /** Parsed .ed data. Falls back to placeholder skeleton when omitted. */
  data?: EdFile;
  /** Stable id for the open project (e.g. slug). Drives scroll-to-top on change. */
  projectKey?: string;
  /** Called when the user clicks the back-to-index button. */
  onBack?: () => void;
  /** Called when the user navigates to a sibling project by numeric id (e.g. "02"). */
  onNavigate?: (id: string) => void;
  /** Called when the user clicks the "VIEW SERVICE" button. */
  onViewService?: (serviceTitle: string) => void;
};

// ─── COMPONENT ────────────────────────────────────────────────────────────────

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

export default function ProjectViewer({
  data,
  projectKey,
  onBack,
  onNavigate,
  onViewService,
}: ProjectViewerProps) {
  const ed = data ?? PLACEHOLDER_ED;
  const { details, content, links } = ed;
  const isPlaceholder = !data;

  const [prog, setProg] = useState(0);

  // Scroll to top whenever a project is opened or the user navigates prev/next
  useEffect(() => {
    scrollToTop();
    setProg(0);
  }, [projectKey]);

  // Track window scroll progress for the reading meter
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProg(docHeight > 0 ? Math.min(1, Math.max(0, scrollY / docHeight)) : 0);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [projectKey]);

  const handleBack = () => {
    if (onBack) { onBack(); return; }
    goTo("Go back to the projects index");
  };

  const handleNavigate = (id: string) => {
    if (!id) return;
    scrollToTop();
    setProg(0);
    if (onNavigate) { onNavigate(id); return; }
    goTo(`Open project ${id}`);
  };

  const handleViewService = () => {
    if (onViewService) { onViewService(details.bestFitService.title); return; }
    goTo(`Open the services tab for ${details.bestFitService.title}`);
  };

  const visibleLinks = isPlaceholder
    ? [
        { label: "VIEW REPOSITORY", href: "#" },
        { label: "LIVE DEMO", href: "#" },
      ]
    : details.links.filter((link) => link.label.trim());

  return (
    <div className="pv-root">
      <style>{PROJECT_VIEWER_CSS}</style>

      {/* ── TOP NAV ── */}
      <nav className="pv-nav">
        <button className="pv-back" onClick={handleBack}>
          <span className="arw">←</span> INDEX
        </button>
        <div className="pv-nav-right">
          <span className={details.active ? "pv-nav-status" : "pv-nav-inactive"}>
            {details.active ? "ACTIVE" : "ARCHIVED"}
          </span>
        </div>
        <div className="pv-progress">
          <div className="pv-progress-fill" style={{ width: `${prog * 100}%` }} />
        </div>
      </nav>

      <div className="pv-body-shell">
        {/* ── FLOATING SIDEBAR ── */}
        <aside className="pv-sidebar">
          {/* project details panel */}
          <div className="pv-panel">
            <div className="pv-panel-head">
              <span className={`pv-panel-dot${isPlaceholder ? " inactive" : ""}`} />
              <span className="pv-panel-title">PROJECT DETAILS</span>
            </div>
            <div className="pv-panel-body">
              <div className="pv-detail-row">
                <span className="pv-detail-label">CLIENT TYPE</span>
                <span className="pv-detail-value">
                  {isPlaceholder
                    ? <span className="pv-skeleton" style={{ display: "block", height: 18, width: "80%" }} />
                    : details.clientType}
                </span>
              </div>
              <div className="pv-detail-row">
                <span className="pv-detail-label">DATE</span>
                <span className="pv-detail-value">
                  {isPlaceholder
                    ? <span className="pv-skeleton" style={{ display: "block", height: 18, width: "50%" }} />
                    : details.date}
                </span>
              </div>
              <div className="pv-detail-row" style={{ marginBottom: 0 }}>
                <span className="pv-detail-label">TECHNOLOGIES</span>
                <div className="pv-detail-chips">
                  {isPlaceholder
                    ? details.technologies.map((t) => (
                        <span className="pv-detail-chip pv-skeleton" key={t}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                      ))
                    : details.technologies.map((t) => (
                        <span className="pv-detail-chip" key={t}>{t}</span>
                      ))}
                </div>
              </div>
            </div>
            {visibleLinks.length > 0 && (
              <div className="pv-panel-buttons">
                {visibleLinks.map((link, i) => (
                  <a
                    key={`${link.label}-${i}`}
                    className={`pv-btn ${i === 0 ? "primary" : "ghost"}`}
                    href={link.href || "#"}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* best-fit services panel */}
          <div className="pv-panel">
            <div className="pv-panel-head">
              <span className={`pv-panel-dot${isPlaceholder ? " inactive" : ""}`} />
              <span className="pv-panel-title">BEST FIT FOR</span>
            </div>
            <div className="pv-service-card">
              <div className="pv-service-icon">{details.bestFitService.icon}</div>
              <div className="pv-service-title">
                {isPlaceholder
                  ? <span className="pv-skeleton" style={{ display: "block", height: 22, width: "90%" }} />
                  : details.bestFitService.title}
              </div>
              <div className="pv-service-subtitle">
                {isPlaceholder
                  ? <span className="pv-skeleton" style={{ display: "block", height: 36, width: "100%" }} />
                  : details.bestFitService.subtitle}
              </div>
            </div>
            <button className="pv-service-link" onClick={handleViewService}>
              VIEW SERVICE
              <span className="arrow">→</span>
            </button>
          </div>
        </aside>

        {/* ── SCROLLABLE ARTICLE ── */}
        <div className="pv-vp">
          <article className="pv-wrap">
            <span className="pv-eyebrow">{"// PROJECT_LOG"}</span>

            <h1 className="pv-title">
              {isPlaceholder
                ? <span className="pv-skeleton" style={{ display: "block", height: "clamp(42px,7vw,76px)", width: "70%" }} />
                : <GlitchText text={details.title} />}
            </h1>

            <p className="pv-subtitle">
              {isPlaceholder
                ? <span className="pv-skeleton" style={{ display: "block", height: 16, width: "55%" }} />
                : details.subtitle}
            </p>

            {/* hero image */}
            <div className="pv-hero-img-wrap">
              {details.heroImage
                ? <>
                    <img src={details.heroImage} alt={details.title} className="pv-hero-img" />
                    <div className="pv-hero-scrim" />
                  </>
                : <div className="pv-hero-placeholder pv-skeleton" style={{ width: "100%", height: "100%" }} />}
            </div>

            {/* stats strip */}
            <div
              className="pv-stats"
              style={{ gridTemplateColumns: `repeat(${details.stats.length || 3}, 1fr)` }}
            >
              {details.stats.map((s, i) => (
                <div className="pv-stat" key={i}>
                  <div className="pv-stat-value">
                    {isPlaceholder
                      ? <span className="pv-skeleton" style={{ display: "block", height: 28, width: "60%", margin: "0 auto 6px" }} />
                      : s.value}
                  </div>
                  <div className="pv-stat-label">{s.label}</div>
                </div>
              ))}
            </div>

            {/* content blocks — rendered in sequential order */}
            {content.map((entry, i) => (
              <ContentBlock key={i} entry={entry} isPlaceholder={isPlaceholder} />
            ))}

            {(links.previous.title || links.next.title) && (
              <div className="pv-postnav">
                {links.previous.title ? (
                  <div
                    className="pv-postnav-item prev"
                    onClick={() => handleNavigate(links.previous.id)}
                  >
                    <span className="pv-postnav-label">← PREV</span>
                    <span className="pv-postnav-title">{links.previous.title}</span>
                  </div>
                ) : (
                  <div className="pv-postnav-item prev pv-postnav-empty" />
                )}
                {links.next.title ? (
                  <div
                    className="pv-postnav-item next"
                    onClick={() => handleNavigate(links.next.id)}
                  >
                    <span className="pv-postnav-label">NEXT →</span>
                    <span className="pv-postnav-title">{links.next.title}</span>
                  </div>
                ) : (
                  <div className="pv-postnav-item next pv-postnav-empty" />
                )}
              </div>
            )}
          </article>
        </div>
      </div>
    </div>
  );
}

// ─── CONTENT BLOCK RENDERER ───────────────────────────────────────────────────

function ContentBlock({
  entry,
  isPlaceholder,
}: {
  entry: EdContentEntry;
  isPlaceholder: boolean;
}) {
  switch (entry.kind) {
    case "highlight":
      return (
        <p className="pv-lead">
          {isPlaceholder
            ? <span className="pv-skeleton" style={{ display: "block", height: 72, width: "100%" }} />
            : entry.text}
        </p>
      );

    case "title":
      return (
        <h2 className="pv-h2">
          {isPlaceholder
            ? <span className="pv-skeleton" style={{ display: "block", height: 21, width: "40%" }} />
            : entry.text}
        </h2>
      );

    case "text":
      return (
        <p className="pv-p" style={{ marginBottom: 40 }}>
          {isPlaceholder
            ? <span className="pv-skeleton" style={{ display: "block", height: 60, width: "100%" }} />
            : entry.text}
        </p>
      );

    case "quote":
      return (
        <div className="pv-quote">
          <span className="pv-quote-mark">"</span>
          <p className="pv-quote-text">
            {isPlaceholder
              ? <span className="pv-skeleton" style={{ display: "block", height: 48, width: "100%" }} />
              : entry.text}
          </p>
        </div>
      );

    case "image":
      return (
        <div className="pv-mid-img-wrap">
          {entry.src
            ? <img src={entry.src} alt="" className="pv-mid-img" />
            : <div className="pv-mid-placeholder pv-skeleton" style={{ width: "100%", height: "100%" }} />}
        </div>
      );

    case "custom":
      return (
        <div className="pv-custom" style={{ border: "1px solid #161616", background: "#0c0c0c", padding: "16px", margin: "24px 0" }}>
          <div style={{ fontSize: "7px", letterSpacing: "2px", color: "#FFE600", marginBottom: "8px", textTransform: "uppercase" }}>
            {"// "}{entry.label.replace(/[-_]/g, " ")}
          </div>
          <p className="pv-p" style={{ color: "#aaa" }}>
            {isPlaceholder
              ? <span className="pv-skeleton" style={{ display: "block", height: 20, width: "80%" }} />
              : entry.text}
          </p>
        </div>
      );

    default:
      return null;
  }
}
