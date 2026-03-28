import React from "react";
import { Link } from "react-router-dom";
import GlitchText from "../glitch_text/glitchText";
import { homeStyles, workConnectsCss } from "../../../utils/constants/homeConstant";

export type WorkConnectsServiceItem = {
  id: string;
  title: string;
  desc: string;
  tag: string;
  to: string;
};

export type WorkConnectsCopy = {
  sectionLabel: string;
  headlineLine1: string;
  headlineLine2: string;
  headlineLine3: string;
  paragraph1: string;
  paragraph2: string;
  ctaExploreServices: string;
  ctaBrowseProjects: string;
  servicesHeader: string;
  servicesCountLabel: string;
  services: WorkConnectsServiceItem[];
};

type ServiceBtnProps = { svc: WorkConnectsServiceItem };

function ServiceBtn({ svc }: ServiceBtnProps) {
  const [hovered, setHovered] = React.useState(false);
  return (
    <Link
      to={svc.to}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        ...homeStyles.workConnectsServiceLink,
        border: `1px solid ${hovered ? "#FFE600" : "#1e1e1e"}`,
        background: hovered ? "#FFE60006" : "transparent",
        transform: hovered ? "translate(-3px, -3px)" : "none",
        boxShadow: hovered ? "3px 3px 0 #FFE600" : "none",
      }}
    >
      <div
        style={{
          ...homeStyles.workConnectsServiceAccentBar,
          background: hovered ? "#FFE600" : "transparent",
        }}
      />

      <div style={homeStyles.workConnectsServiceRow}>
        <div style={homeStyles.workConnectsServiceCol}>
          <div
            style={{
              ...homeStyles.workConnectsServiceMeta,
              color: hovered ? "#FFE600" : "#333",
            }}
          >
            {svc.id} · {svc.tag}
          </div>
          <div
            style={{
              ...homeStyles.workConnectsServiceTitle,
              color: hovered ? "#FFE600" : "#e0e0e0",
            }}
          >
            {svc.title}
          </div>
          <p
            style={{
              ...homeStyles.workConnectsServiceDesc,
              color: hovered ? "#999" : "#444",
            }}
          >
            {svc.desc}
          </p>
          <div
            style={{
              ...homeStyles.workConnectsServiceActionText,
              color: hovered ? "#FFE600" : "#666",
            }}
          >
            VIEW SERVICE <span style={{ marginLeft: 4 }}>-&gt;</span>
          </div>
        </div>
        <span
          style={{
            ...homeStyles.workConnectsServiceArrow,
            color: hovered ? "#FFE600" : "#2a2a2a",
            transform: hovered ? "translate(3px, -3px)" : "none",
          }}
        >
          ↗
        </span>
      </div>
    </Link>
  );
}

type WorkConnectsSectionProps = {
  workConnects: WorkConnectsCopy;
};

export default function WorkConnectsSection({ workConnects: wc }: WorkConnectsSectionProps) {
  return (
    <div style={homeStyles.workConnectsRoot} className="wc-root">
      <style>{workConnectsCss}</style>

      <section className="wc-section">
        <div>
          <span style={homeStyles.workConnectsEyebrow}>{wc.sectionLabel}</span>

          <h2 style={homeStyles.workConnectsHeadline}>
            <GlitchText text={wc.headlineLine1} />
            <br />
            <span style={homeStyles.heroHighlight}>
              <GlitchText text={wc.headlineLine2} />
            </span>
            <br />
            <span style={homeStyles.heroOutline}>
              <GlitchText text={wc.headlineLine3} />
            </span>
          </h2>

          <p style={homeStyles.workConnectsBody1}>{wc.paragraph1}</p>
          <p style={homeStyles.workConnectsBody2}>{wc.paragraph2}</p>

          <div style={homeStyles.workConnectsCtaRow}>
            <Link to="/services" className="wc-btn-primary">
              {wc.ctaExploreServices}
            </Link>
            <Link to="/projects" className="wc-btn-outline">
              {wc.ctaBrowseProjects}
            </Link>
          </div>
        </div>

        <div>
          <div style={homeStyles.workConnectsRightHeader}>
            <span style={homeStyles.workConnectsRightHeaderLeft}>{wc.servicesHeader}</span>
            <span style={homeStyles.workConnectsRightHeaderRight}>{wc.servicesCountLabel}</span>
          </div>
          <div className="wc-service-grid">
            {wc.services.map((svc) => (
              <ServiceBtn key={svc.id} svc={svc} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
