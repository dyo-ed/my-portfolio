import { useState, useRef, useEffect, useMemo, type CSSProperties } from "react";
import { useSearchParams } from "react-router-dom";
import appStrings from "../../../locales/en/appStrings.json";
import GlitchText from "../../components/glitch_text/glitchText";
import {
  PROJECT_FILTERS,
  PROJECTS_CSS,
  SPECTRUM_BANDS,
  ProjectFilter,
  projectStyles,
  sortProjectsDesc,
  buildProjectNavLinks,
  normalizeProjectSlug,
} from "../../../utils/constants/projectConstant";
import {
  getAllParsedEdFiles,
  getEdBySlug,
  getEdById,
  type ParsedEdEntry,
} from "../../../utils/constants/edRegistry";
import ProjectViewer from "./projects/ProjectViewer";

// ─── HELPERS ──────────────────────────────────────────────────────────────────

/** Extract a 4-digit year from a date string like "MARCH 2025". */
function extractYear(date: string): string {
  const m = date.match(/\b(20\d{2}|19\d{2})\b/);
  return m ? m[1] : date;
}

/** Map the filter key to the .status string used in .ed files. */
const STATUS_MAP: Record<string, string> = {
  ACTIVE: "ACTIVE",
  OSS: "OSS",
  ARCHIVED: "ARCHIVED",
};

const STATUS_LABELS: Record<string, string> = {
  ACTIVE: "ACTIVE",
  OSS: "OPEN SOURCE",
  ARCHIVED: "ARCHIVED",
};

// ─── PROJECT CARD ─────────────────────────────────────────────────────────────

function ProjectCard({
  entry,
  index,
  onSelect,
}: {
  entry: ParsedEdEntry;
  index: number;
  onSelect: (slug: string) => void;
}) {
  const { projects: content } = appStrings;
  const cardRef = useRef<HTMLElement>(null);
  const { details } = entry.data;

  const statusClass = details.status
    ? `st-${details.status.toLowerCase()}`
    : "st-archived";
  const statusLabel =
    STATUS_LABELS[details.status?.toUpperCase()] ?? details.status;

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setTimeout(() => el.classList.add("in-view"), index * 80);
          observer.unobserve(el);
        }
      },
      { threshold: 0.08 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [index]);

  return (
    <article
      ref={cardRef}
      className={`pj-card ${details.featured ? "featured" : ""}`}
      style={{ "--i": index } as CSSProperties}
      onClick={() => onSelect(entry.slug)}
    >
      <div
        className="pj-img-wrap"
        style={{ height: details.featured ? 230 : 190 }}
      >
        {details.heroImage ? (
          <img
            src={details.heroImage}
            alt={details.title}
            className="pj-img"
            draggable={false}
            style={{ width: "100%", height: "100%", display: "block" }}
          />
        ) : (
          <div
            className="pj-img"
            style={{
              width: "100%",
              height: "100%",
              background: "#111",
              display: "block",
            }}
          />
        )}
        <div className="pj-img-scrim" />
        <span className="pj-img-num">{entry.slug.slice(0, 2)}</span>
        <span className={`pj-status ${statusClass}`}>{statusLabel}</span>
        {details.featured && (
          <div className="pj-badge">{content.featuredBadge}</div>
        )}
      </div>
      <div className="pj-body">
        <div className="pj-meta">
          <span className="pj-year">{extractYear(details.date)}</span>
          <span className="pj-dash">—</span>
          <span className="pj-subtitle">{details.subtitle}</span>
        </div>
        <h3 className="pj-title">
          <GlitchText text={details.title} />
        </h3>
        <div className="pj-tags">
          {details.technologies.slice(0, 4).map((t) => (
            <span className="pj-tag" key={t}>
              {t}
            </span>
          ))}
        </div>
      </div>
      <div className="pj-arrow">{content.arrowGlyph}</div>
    </article>
  );
}

// ─── SPECTRUM SCROLL RAIL ─────────────────────────────────────────────────────

function SpectrumRail({ prog, count }: { prog: number; count: number }) {
  const { projects: content } = appStrings;
  const activeBand = prog * (SPECTRUM_BANDS - 1);

  return (
    <div className="pj-rail">
      <div className="pj-rail-top">{content.railLabel}</div>
      <div className="pj-rail-track">
        {Array.from({ length: SPECTRUM_BANDS }).map((_, i) => {
          const dist = Math.abs(i - activeBand);
          const heat = Math.max(0, 1 - dist / 4.2);
          return (
            <div
              className="pj-band"
              key={i}
              style={{
                opacity: 0.14 + heat * 0.86,
                transform: `scaleX(${0.4 + heat * 0.6})`,
                background: heat > 0.55 ? "#FFE600" : "#3a3a3a",
                boxShadow: heat > 0.7 ? "0 0 6px #FFE60088" : "none",
              }}
            />
          );
        })}
        {Array.from({ length: count }).map((_, i) => {
          const pos = count > 1 ? i / (count - 1) : 0;
          const passed = prog >= pos - 0.02;
          return (
            <div
              key={`tick-${i}`}
              className={`pj-rail-tick ${passed ? "passed" : ""}`}
              style={{ top: `${pos * 100}%` }}
            />
          );
        })}
      </div>
      <div className="pj-rail-pct">
        {String(Math.round(prog * 100)).padStart(3, "0")}
      </div>
    </div>
  );
}

// ─── ROOT ─────────────────────────────────────────────────────────────────────

const FILTER_LABELS: Record<ProjectFilter, string> = {
  ALL: appStrings.projects.filters.all,
  ACTIVE: appStrings.projects.filters.active,
  OSS: appStrings.projects.filters.oss,
  ARCHIVED: appStrings.projects.filters.archived,
};

export default function ProjectsPage() {
  const { projects: content } = appStrings;
  const [searchParams, setSearchParams] = useSearchParams();

  // ── data ──────────────────────────────────────────────────────────────────
  const allEntries = sortProjectsDesc(getAllParsedEdFiles());

  const selectedSlug = useMemo(() => {
    const openParam = searchParams.get("open");
    if (!openParam) return null;
    const slug = normalizeProjectSlug(openParam);
    return getEdBySlug(slug) ? slug : null;
  }, [searchParams]);

  const openProject = (slug: string) => {
    setSearchParams({ open: slug });
  };

  const closeProject = () => {
    const next = new URLSearchParams(searchParams);
    next.delete("open");
    setSearchParams(next, { replace: true });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ── state ─────────────────────────────────────────────────────────────────
  const [filter, setFilter] = useState<ProjectFilter>("ALL");
  const [prog, setProg] = useState(0);
  const [gridKey, setGridKey] = useState(0);

  const rootRef = useRef<HTMLElement>(null);
  const mountKey = useRef(String(Date.now())).current;
  const isMounted = useRef(false);

  const visible =
    filter === "ALL"
      ? allEntries
      : allEntries.filter(
          (e) =>
            e.data.details.status?.toUpperCase() === STATUS_MAP[filter]
        );

  // ── scroll progress ───────────────────────────────────────────────────────
  const updateScrollProgress = () => {
    const el = rootRef.current;
    if (!el) return;
    const header = 56;
    const { top, height } = el.getBoundingClientRect();
    const scrollRange = height - (window.innerHeight - header);
    if (scrollRange <= 0) { setProg(0); return; }
    setProg(Math.min(1, Math.max(0, (header - top) / scrollRange)));
  };

  useEffect(() => {
    updateScrollProgress();
    window.addEventListener("scroll", updateScrollProgress, { passive: true });
    window.addEventListener("resize", updateScrollProgress);
    return () => {
      window.removeEventListener("scroll", updateScrollProgress);
      window.removeEventListener("resize", updateScrollProgress);
    };
  }, [visible.length]);

  useEffect(() => {
    if (!isMounted.current) { isMounted.current = true; return; }
    setProg(0);
    setGridKey((k) => k + 1);
    if (!rootRef.current) return;
    const top =
      rootRef.current.getBoundingClientRect().top + window.scrollY - 56;
    window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
  }, [filter]);

  // ── viewer navigation ─────────────────────────────────────────────────────
  const handleNavigate = (id: string) => {
    const next = getEdById(id);
    if (next) openProject(next.slug);
  };

  // ── if a project is selected, render the viewer ───────────────────────────
  if (selectedSlug) {
    const entry = getEdBySlug(selectedSlug);
    const viewerData = entry
      ? { ...entry.data, links: buildProjectNavLinks(entry.slug, allEntries) }
      : undefined;
    return (
      <ProjectViewer
        data={viewerData}
        projectKey={selectedSlug}
        onBack={closeProject}
        onNavigate={handleNavigate}
      />
    );
  }

  // ── grid view ─────────────────────────────────────────────────────────────
  return (
    <section
      id="projects"
      ref={rootRef}
      className="pj-root"
      style={projectStyles.root}
    >
      <style>{PROJECTS_CSS}</style>

      <header className="pj-header">
        <span className="pj-eyebrow">{content.eyebrow}</span>
        <h1 className="pj-h1">
          <GlitchText text={content.titleLine1} animateOnMount animateKey={mountKey} />{" "}
          <span className="y">
            <GlitchText text={content.titleLine2} animateOnMount animateKey={mountKey} />
          </span>{" "}
          <span className="g">
            <GlitchText text={content.titleLine3} animateOnMount animateKey={mountKey} />
          </span>
        </h1>
        <div className="pj-count">
          {content.entriesCount.replace("{count}", String(visible.length))}
        </div>
      </header>

      <div className="pj-filters">
        {PROJECT_FILTERS.map((s) => (
          <button
            key={s}
            type="button"
            className={`pj-filter-btn ${filter === s ? "active" : ""}`}
            onClick={() => setFilter(s)}
          >
            {FILTER_LABELS[s]}
          </button>
        ))}
      </div>

      <div className="pj-body-shell">
        <SpectrumRail prog={prog} count={visible.length} />
        <div className="pj-grid" key={gridKey}>
          {visible.map((entry, i) => (
            <ProjectCard
              key={entry.slug}
              entry={entry}
              index={i}
              onSelect={openProject}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
