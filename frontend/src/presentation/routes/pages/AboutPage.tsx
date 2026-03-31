import AboutGachaSection from "../../components/gacha/AboutGachaSection";
import AboutMe from "../../components/about_me/aboutMe";
import { aboutStyles } from "../../../utils/constants/aboutConstant";

export default function AboutPage() {
  return (
    <section id="about" style={aboutStyles.page}>
      <AboutGachaSection />
      <AboutMe />
      
      <section style={aboutStyles.futureSection}>
        <div style={aboutStyles.futureSectionInner}>
          <span style={aboutStyles.futureEyebrow}>// NEXT_MODULE_QUEUE</span>
          <h2 style={aboutStyles.futureTitle}>Future About Content</h2>
          <p style={aboutStyles.futureBody}>PLACEHOLDER_SECTION_READY</p>
        </div>
      </section>
    </section>
  );
}

