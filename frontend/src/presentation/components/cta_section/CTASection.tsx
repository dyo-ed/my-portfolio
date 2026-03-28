import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import appStrings from "../../../locales/en/appStrings.json";
import { ctaSectionStyles, ctaSectionCss } from "../../../utils/constants/homeConstant";

const NOISE_CHARS = "!@#$%^&*<>/\\|{}[]~`";

function CTAGlitchText({ text, triggered }: { text: string; triggered: boolean }) {
  const [display, setDisplay] = useState(text);
  const running = useRef(false);

  useEffect(() => {
    if (!triggered || running.current) return;
    running.current = true;
    let ticks = 0;
    const iv = setInterval(() => {
      if (ticks > text.length + 4) {
        clearInterval(iv);
        setDisplay(text);
        running.current = false;
        return;
      }
      setDisplay(
        text
          .split("")
          .map((c, i) =>
            i < ticks
              ? c
              : Math.random() > 0.45
              ? NOISE_CHARS[Math.floor(Math.random() * NOISE_CHARS.length)]
              : c
          )
          .join("")
      );
      ticks++;
    }, 38);
  }, [triggered, text]);

  return <>{display}</>;
}

export default function CTASection() {
  const [hovered, setHovered] = useState(false);
  const [glitchKey, setGlitchKey] = useState(0);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLElement>(null);
  const navigate = useNavigate();
  
  const { ctaSection } = appStrings.home;

  const handleEnter = () => {
    setHovered(true);
    setGlitchKey((k) => k + 1);
  };
  const handleLeave = () => setHovered(false);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (!sectionRef.current) return;
      const r = sectionRef.current.getBoundingClientRect();
      setCursorPos({ x: e.clientX - r.left, y: e.clientY - r.top });
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <div style={ctaSectionStyles.rootContainer}>
      <style>{ctaSectionCss}</style>

      <section
        ref={sectionRef}
        className={`cta-section${hovered ? " is-hovered" : ""}`}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        onClick={() => navigate("/contact")}
      >
        {/* spotlight that follows cursor */}
        <div
          className="cta-spotlight"
          style={{ left: cursorPos.x, top: cursorPos.y }}
        />

        <div className="cta-noise" />
        <div className="cta-scanlines" />

        {/* corner brackets */}
        <div className="cta-corner cta-corner-tl" />
        <div className="cta-corner cta-corner-tr" />
        <div className="cta-corner cta-corner-bl" />
        <div className="cta-corner cta-corner-br" />

        <div className="cta-inner">
          {/* ── hero ── */}
          <div className="cta-hero" style={ctaSectionStyles.heroWrap}>
            <h2 className="cta-headline">
              <CTAGlitchText key={`l1-${glitchKey}`} text={ctaSection.headlineLine1} triggered={hovered} />
              <br />
              <CTAGlitchText key={`l2-${glitchKey}`} text={ctaSection.headlineLine2} triggered={hovered} />
              <br />
              <span className="cta-accent">
                <CTAGlitchText key={`l3-${glitchKey}`} text={ctaSection.headlineLine3} triggered={hovered} />
              </span>
            </h2>

            {/* arrow */}
            <div className="cta-arrow-btn" title="Get in touch">
              <span className="cta-arrow-icon">→</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
