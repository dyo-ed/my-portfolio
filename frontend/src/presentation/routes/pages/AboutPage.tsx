import AboutGachaSection from "../../components/gacha/AboutGachaSection";
import AboutMe from "../../components/about_me/aboutMe";
import CertificationCards from "../../components/credentials/credentials";
import { aboutStyles } from "../../../utils/constants/aboutConstant";

export default function AboutPage() {
  return (
    <section id="about" style={aboutStyles.page}>
      <AboutGachaSection />
      <AboutMe />
      <div style={{ width: "100%", height: "1px", background: "rgba(255,255,255,0.08)", flexShrink: 0 }} />
      <CertificationCards />
    </section>
  );
}


