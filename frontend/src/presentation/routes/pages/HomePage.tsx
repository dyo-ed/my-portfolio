import React from "react";
import { useLocation } from "react-router-dom";
import GlitchText from "../../components/glitch_text/glitchText";
import appStrings from "../../../locales/en/appStrings.json";
import { homeStyles } from "../../../utils/constants/homeConstant";

export default function HomePage() {
  const { home } = appStrings;
  const location = useLocation();
  const animateKey = location.key || "home";

  return (
    <section style={homeStyles.section}>
      <div style={homeStyles.leftCol}>
        <div style={homeStyles.statusRow}>
          <div style={homeStyles.statusDot} />
          <span style={homeStyles.statusText}>{home.statusLabel}</span>
        </div>
        <h1 style={homeStyles.heroTitle}>
          <GlitchText text={home.heroLine1} animateOnMount animateKey={animateKey} />
          <br />
          <span style={homeStyles.heroHighlight}>
            <GlitchText text={home.heroLine2} animateOnMount animateKey={animateKey} />
          </span>
          <br />
          <span style={homeStyles.heroOutline}>
            <GlitchText text={home.heroLine3} animateOnMount animateKey={animateKey} />
          </span>
        </h1>
        <p style={homeStyles.description}>{home.description}</p>
        <div style={homeStyles.ctaRow}>
          {/* <button className="btn-primary" onClick={() => {}}>VIEW WORK</button>
          <button className="btn-outline" onClick={() => {}}>CONTACT</button> */}
        </div>
      </div>

      <div style={homeStyles.rightCol}>
        <div style={homeStyles.cornerTL} />
        <div style={homeStyles.cornerBR} />
        <div style={homeStyles.artifactLabel}>{home.artifactLabel}</div>
        <div style={homeStyles.renderLabel}>
          {home.renderLabelLine1}
          <br />
          {home.renderLabelLine2}
        </div>
        <div style={homeStyles.gradTop} />
        <div style={homeStyles.gradBottom} />
        <div style={homeStyles.gradLeft} />
        <div style={homeStyles.gradRight} />
      </div>

      <div style={homeStyles.marqueeBar}>
        <div className="marquee-wrap">
          <div className="marquee-track">
            {Array(home.marqueeRepeat)
              .fill(home.marqueeText)
              .join("")
              .split("")
              .map((ch, i) => (
                <span key={i} style={homeStyles.marqueeChar}>
                  {ch}
                </span>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}  