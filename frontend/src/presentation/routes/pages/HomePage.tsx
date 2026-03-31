import React from "react";
import { useLocation } from "react-router-dom";
import GlitchText from "../../components/glitch_text/glitchText";
import RomanBustScene from "../../components/roman_bust/RomanBustScene";
import StatsCounter from "../../components/stats_counter/StatsCounter";
import WorkConnectsSection from "../../components/work_connects/WorkConnectsSection";
import WorksShowcase from "../../components/works_showcase/WorksShowcase";
import ReviewsCarousel from "../../components/reviews_carousel/ReviewsCarousel";
import CTASection from "../../components/cta_section/CTASection";
import appStrings from "../../../locales/en/appStrings.json";
import { homeStyles } from "../../../utils/constants/homeConstant";

export default function HomePage() {
  const { home } = appStrings;
  const location = useLocation();
  const animateKey = location.key || "home";


  const [isPhone, setIsPhone] = React.useState(false);
  const [hoveredCta, setHoveredCta] = React.useState<"viewWork" | "contact" | null>(null);
  React.useEffect(() => {
    const check = () => setIsPhone(window.innerWidth <= 600);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const subtitleCtaWrapStyle = isPhone
    ? homeStyles.subtitleCtaWrapPhone
    : homeStyles.subtitleCtaWrapDesktop;
  const ctaButtonsStyle = isPhone
    ? homeStyles.ctaButtonsPhone
    : homeStyles.ctaButtonsDesktop;
  const viewWorkBtnStyle = isPhone
    ? homeStyles.primaryButtonPhone
    : homeStyles.primaryButton;
  const contactBtnStyle = isPhone
    ? homeStyles.outlineButtonPhone
    : homeStyles.outlineButton;
  const leftColStyle = isPhone ? homeStyles.leftColPhone : homeStyles.leftCol;
  const heroTitleStyle = isPhone ? homeStyles.heroTitlePhone : homeStyles.heroTitle;
  const rightColStyle = isPhone ? homeStyles.rightColPhone : homeStyles.rightCol;
  const sectionStyle = isPhone ? homeStyles.sectionPhone : homeStyles.section;

  const ctaHoverStyle: React.CSSProperties = {
    background: "#ffffff",
    borderColor: "#ffffff",
    color: "#0a0a0a",
  };

  return (
    <>
      <section style={sectionStyle}>
        <div style={leftColStyle} className="home-left-col">
          <div style={homeStyles.statusRow}>
            <div style={homeStyles.statusDot} />
            <span style={homeStyles.statusText}>{home.statusLabel}</span>
          </div>
          <h1 style={heroTitleStyle}>
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
          <div style={subtitleCtaWrapStyle}>
            <p
              className="home-subtitle"
              style={isPhone ? homeStyles.descriptionPhone : homeStyles.descriptionDesktop}
            >
              {home.description}
            </p>
            <div style={ctaButtonsStyle}>
              <button
                style={{ ...viewWorkBtnStyle, ...(hoveredCta === "viewWork" ? ctaHoverStyle : {}) }}
                onMouseEnter={() => setHoveredCta("viewWork")}
                onMouseLeave={() => setHoveredCta(null)}
                onFocus={() => setHoveredCta("viewWork")}
                onBlur={() => setHoveredCta(null)}
                onClick={() => { }}
              >
                VIEW WORK
                <svg
                  style={homeStyles.ctaArrowTopRight}
                  viewBox="0 0 24 24"
                  width="14"
                  height="14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M7 17L17 7"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 7H17V12"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <button
                style={{ ...contactBtnStyle, ...(hoveredCta === "contact" ? ctaHoverStyle : {}) }}
                onMouseEnter={() => setHoveredCta("contact")}
                onMouseLeave={() => setHoveredCta(null)}
                onFocus={() => setHoveredCta("contact")}
                onBlur={() => setHoveredCta(null)}
                onClick={() => { }}
              >
                CONTACT
              </button>
            </div>
          </div>
        </div>

        {isPhone && <div style={homeStyles.phoneSplitFade} />}

        <div style={rightColStyle}>
          <div style={homeStyles.bustStage}>
            <RomanBustScene />
          </div>
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

      <section style={homeStyles.statsSection}>
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            backgroundImage:
              "linear-gradient(#1a1a1a 1px,transparent 1px),linear-gradient(90deg,#1a1a1a 1px,transparent 1px)",
            backgroundSize: "48px 48px",
            opacity: 0.25,
          }}
        />
        <div style={homeStyles.statsSectionInner}>
          <StatsCounter stats={home.stats} />
        </div>
      </section>

      <WorkConnectsSection workConnects={home.workConnects} />

      <WorksShowcase />

      <ReviewsCarousel />

      <CTASection />
    </>
  );
}  