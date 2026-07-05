import { useState, useRef, useEffect } from "react";

// ─── GLITCH TEXT ──────────────────────────────────────────────────────────────
const NOISE = "!@#$%^&*<>/\\|{}[]~`";

interface GlitchTextProps {
  text: string;
}

function GlitchText({ text }: GlitchTextProps) {
  const [display, setDisplay] = useState(text);
  const glitching = useRef(false);
  const trigger = () => {
    if (glitching.current) return;
    glitching.current = true;
    let ticks = 0;
    const iv = setInterval(() => {
      if (ticks > 10) {
        clearInterval(iv);
        setDisplay(text);
        glitching.current = false;
        return;
      }
      setDisplay(
        text
          .split("")
          .map((c, i) =>
            i < ticks
              ? c
              : Math.random() > 0.5
              ? NOISE[Math.floor(Math.random() * NOISE.length)]
              : c
          )
          .join("")
      );
      ticks++;
    }, 45);
  };
  return (
    <span onMouseEnter={trigger} style={{ cursor: "crosshair" }}>
      {display}
    </span>
  );
}

// ─── BLINKING CURSOR ──────────────────────────────────────────────────────────
function Cursor() {
  const [on, setOn] = useState(true);
  useEffect(() => {
    const iv = setInterval(() => setOn((o) => !o), 530);
    return () => clearInterval(iv);
  }, []);
  return <span style={{ opacity: on ? 1 : 0 }}>_</span>;
}

// ─── ROOT ─────────────────────────────────────────────────────────────────────
export default function BlogPage() {
  return (
    <div className="root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,400;0,700&family=Bebas+Neue&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; }
        ::selection { background: #FFE600; color: #0a0a0a; }

        .root {
          background: #0a0a0a;
          color: #f0f0f0;
          min-height: calc(100vh - 56px);
          height: calc(100vh - 56px);
          display: flex;
          flex-direction: column;
          font-family: 'Space Mono', monospace;
          position: relative;
          overflow: hidden;
        }
        .root::after {
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

        /* ── CENTER STAGE ── */
        .cs-stage {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 40px 24px;
          position: relative;
        }

        .cs-bg-num {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(220px, 38vw, 460px);
          color: #0f0f0f;
          pointer-events: none;
          user-select: none;
          letter-spacing: -10px;
          line-height: 1;
          z-index: 0;
        }

        .cs-content { position: relative; z-index: 1; }

        .cs-eyebrow {
          font-size: 9px;
          letter-spacing: 6px;
          color: #FFE600;
          display: block;
          margin-bottom: 18px;
        }

        .cs-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(52px, 10vw, 128px);
          line-height: 0.9;
          letter-spacing: -1px;
          margin-bottom: 22px;
        }
        .cs-title .y { color: #FFE600; }

        .cs-desc {
          font-size: 11.5px;
          line-height: 2;
          color: #555;
          max-width: 420px;
          margin: 0 auto 34px;
        }

        .cs-loader {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          margin-bottom: 34px;
        }
        .cs-loader-track {
          width: 220px;
          height: 2px;
          background: #161616;
          position: relative;
          overflow: hidden;
        }
        .cs-loader-fill {
          position: absolute;
          top: 0; left: 0;
          height: 100%;
          width: 40%;
          background: #FFE600;
          box-shadow: 0 0 8px #FFE60088;
          animation: sweep 1.8s ease-in-out infinite;
        }
        @keyframes sweep {
          0%   { left: -40%; }
          100% { left: 100%; }
        }
        .cs-loader-pct {
          font-size: 9px;
          letter-spacing: 2px;
          color: #333;
          width: 34px;
          text-align: left;
        }

        .cs-status {
          font-size: 9px;
          letter-spacing: 3px;
          color: #333;
        }
        .cs-status .live { color: #FFE600; }

        /* ── RESPONSIVE ── */
        @media (max-width: 640px) {
          .cs-stage { padding: 32px 20px; }
        }
      `}</style>

      {/* ── CENTER STAGE ── */}
      <div className="cs-stage">
        <div className="cs-bg-num">?</div>
        <div className="cs-content">
          <span className="cs-eyebrow">// STATUS_PENDING</span>
          <h1 className="cs-title">
            <GlitchText text="COMING" /> <span className="y"><GlitchText text="SOON" /></span>
          </h1>
          <p className="cs-desc">
            This page is still being built. Check back shortly — or hover the title, it glitches.
          </p>

          <div className="cs-loader">
            <div className="cs-loader-track">
              <div className="cs-loader-fill" />
            </div>
          </div>

          <div className="cs-status">
            AWAITING_CONTENT<Cursor /> <span className="live">●</span> SYSTEM ONLINE
          </div>
        </div>
      </div>
    </div>
  );
}
