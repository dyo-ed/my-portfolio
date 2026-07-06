import type { CSSProperties } from "react";
import profileImage from "../../presentation/assets/profile-img.jpg";
import profileImageMobile from "../../presentation/assets/profile-img_small.jpg";
import certiificateCertiport from "../../presentation/assets/cert-certiport.jpg";
import certificateCisco from "../../presentation/assets/cert-cisco.jpg";
import certificateQcsp from "../../presentation/assets/cert-qcsp.jpg";
import certificateDict from "../../presentation/assets/cert-dict.jpg";
import certificateJpia from "../../presentation/assets/cert-jpia.jpg";
import timelineEnrolled from "../../presentation/assets/tl-enrolled.jpg";
import tl2 from "../../presentation/assets/tl-2.jpg";
import tl3 from "../../presentation/assets/tl-3.jpg";
import tl4 from "../../presentation/assets/tl-4.jpg";
import tl5 from "../../presentation/assets/tl-5.jpg";
import tl6 from "../../presentation/assets/tl-6.jpg";
import tl7 from "../../presentation/assets/tl-7.jpg";
import tl8 from "../../presentation/assets/tl-8.png";
import tl9 from "../../presentation/assets/tl-9.jpg";
import tl10 from "../../presentation/assets/tl-10.jpg";
import tl11 from "../../presentation/assets/tl-11.jpg";
import tl12 from "../../presentation/assets/tl-12.jpg";
import tl13 from "../../presentation/assets/tl-13.jpg";
import tl14 from "../../presentation/assets/tl-14.jpg";
import tl15 from "../../presentation/assets/tl-15.png"
import tl16 from "../../presentation/assets/tl-16.jpg";
import tl17 from "../../presentation/assets/tl-17.jpg";
import tl18 from "../../presentation/assets/tl-18.png";
import tl19 from "../../presentation/assets/tl-19.jpg";


export type CertItem = {
  id: string;
  issuer: string;
  title: string;
  subtitle: string;
  date: string;
  expires: string;
  credId: string;
  img: string;
  accent: string;
  desc: string;
};

export const CERTS: CertItem[] = [
  {
    id: "05",
    issuer: "CERTIPORT",
    title: "ARTIFICIAL INTELLIGENCE",
    subtitle: "IT SPECIALIST",
    date: "DEC 2025",
    expires: "DEC 2030",
    credId: "0ddbb2f2-fca4-412a-ab42-0c1c5c465fc1",
    img: certiificateCertiport,
    accent: "#FF9900",
    desc: "Candidates for this exam are AI enabled learners and are prepared for the professional use of AI by understanding how AI can be used to solve problems.",
  },
  {
    id: "04",
    issuer: "CISCO",
    title: "INTRODUCTION TO AI",
    subtitle: "ARTIFICIAL INTELLIGENCE",
    date: "OCT 2025",
    expires: "N/A",
    credId: "b3e45108-cefa-4b4e-a8b1-be7849197fc4",
    img: certificateCisco,
    accent: "#00ff88",
    desc: "The learner will have practiced using AI enabled features on free apps, such as photo apps, translation services, and chatbots. They will have had in depth practice in prompting a chatbot, and understand fundamentals of how the models work, which informs how they prompt chatbots.",
  },
  {
    id: "03",
    issuer: "QCSP",
    title: "QUANTUM COMPUTING & BLOCKCHAIN",
    subtitle: "LECTURE SERIES",
    date: "JUL 2025",
    expires: "N/A",
    credId: "89150281605285",
    img: certificateQcsp,
    accent: "#ff4d4d",
    desc: "Organized by the Quantum Computing Society of the Philippines (QCSP) and DataProtect-SIERRA Project from DOST-Advanced Science and Technology Institute",
  },
  {
    id: "02",
    issuer: "DICT",
    title: "Fundamentals of Pitching",
    subtitle: "",
    date: "MAR 2025",
    expires: "N/A",
    credId: "R4A_IIDB_DICT_R4A_2026134",
    img: certificateDict,
    accent: "#FFE600",
    desc: "for attending FUNDAMENTALS OF PITCHING and STARTUP PROJECTS organized by the Department of Informations and Communications Technology through ICT Industry Development Bureau",
  },
  {
    id: "01",
    issuer: "JPIA",
    title: "COMPANY & MOTIVATIONAL TALKS",
    subtitle: "23rd GENERAL ASSEMBLY",
    date: "JAN 2022",
    expires: "N/A",
    credId: "GA-CMT-0164",
    img: certificateJpia,
    accent: "#8b5cf6",
    desc: "for actively participating during the Company and Motivational Talks of the 23rd General Assembly with the Theme: PERLAS: Ang Reyna Ng Mga Hiyas of the National Federation of Junior Philippine Institute of Accountants - Region IV",
  },
];

export type GachaRarity = {
  id: string;
  weight: number;
  color: string;
  glow: string;
  bg: string;
  label: string;
  tagline: string;
};

export type GachaFragment = {
  name: string;
  type: string;
  flavor: string;
  image: string;
  rarity: string; // matches a GachaRarity id
};

export const GACHA_NOISE_CHARS = "!@#$%^&*<>/\\|{}[]~`+-";

export const GACHA_RARITIES: GachaRarity[] = [
  {
    id: "LEGENDARY",
    weight: 1,
    color: "#FF2D55",
    glow: "#FF2D5588",
    bg: "#1a0008",
    label: "LEGENDARY",
    tagline: "SYSTEM_ERROR: EXISTENCE UNDEFINED",
  },
  {
    id: "MYTHIC",
    weight: 4,
    color: "#BF5FFF",
    glow: "#BF5FFF88",
    bg: "#0d0014",
    label: "MYTHIC",
    tagline: "MEMORY_ADDR: 0x000000FF",
  },
  {
    id: "RARE",
    weight: 15,
    color: "#00C8FF",
    glow: "#00C8FF66",
    bg: "#00101a",
    label: "RARE",
    tagline: "ALLOCATION: HIGH PRIORITY",
  },
  {
    id: "UNCOMMON",
    weight: 30,
    color: "#00FF88",
    glow: "#00FF8844",
    bg: "#001a0d",
    label: "UNCOMMON",
    tagline: "STATUS: ABOVE THRESHOLD",
  },
  {
    id: "COMMON",
    weight: 50,
    color: "#FFE600",
    glow: "#FFE60033",
    bg: "#0a0a00",
    label: "COMMON",
    tagline: "INSTANCE: STANDARD_UNIT",
  },
];

export const GACHA_FRAGMENTS: GachaFragment[] = [
  // ── LEGENDARY ─────────────────────────────────────────────────────────────
  {
    name: "TEMPLATE",
    type: "LEGENDARY",
    flavor: "Lorem Ipsum",
    image: "/assets/template.png",
    rarity: "LEGENDARY",
  },
  // ── MYTHIC ────────────────────────────────────────────────────────────────
  {
    name: "TEMPLATE",
    type: "MYTHIC",
    flavor: "Lorem Ipsum",
    image: "/assets/template.png",
    rarity: "MYTHIC",
  },
  // ── RARE ──────────────────────────────────────────────────────────────────
  {
    name: "TEMPLATE",
    type: "RARE",
    flavor: "Lorem Ipsum",
    image: "/assets/template.png",
    rarity: "RARE",
  },
  // ── UNCOMMON ──────────────────────────────────────────────────────────────
  {
    name: "TEMPLATE",
    type: "UNCOMMON",
    flavor: "Lorem Ipsum",
    image: "/assets/template.png",
    rarity: "UNCOMMON",
  },
  // ── COMMON ────────────────────────────────────────────────────────────────
  {
    name: "TEMPLATE",
    type: "COMMON",
    flavor: "Lorem Ipsum",
    image: "/assets/template.png",
    rarity: "COMMON",
  },
];

export const PROFILE = {
  name: "JOED MERAÑA",
  role: "SOFTWARE ENGINEER",
  image: profileImage,
  imageMobile: profileImageMobile,
  description:
    "I build systems that scale, interfaces that breathe, and abstractions that last. Six years turning complexity into clarity — from distributed databases to pixel-perfect UIs. I care deeply about craft, and I ship.",
};

export const ATTRIBUTES = [
  { title: "FOCUS", text: "Systems & full-stack" },
  { title: "EXP", text: "6+ years shipping" },
  { title: "STYLE", text: "No fluff, no bloat" },
  { title: "APPROACH", text: "Readable, testable, durable" },
  { title: "DOMAIN", text: "Distributed systems" },
  { title: "TIMEZONE", text: "UTC +8 · async-friendly" },
];

export const SOCIALS = [
  {
    label: "GitHub",
    href: "https://github.com/dyo-ed",
    id: "github",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/joedmerana",
    id: "linkedin",
  },
];

export const aboutStyles: Record<string, CSSProperties> = {
  page: {
    width: "100",
    background: "#0a0a0a",
  },
  separator: {
    position: "absolute",
    left: 0,
    bottom: 0,
    width: "100%",
    border: "none",
    height: "1px",
    backgroundColor: "rgba(255,255,255,0.08)",
    zIndex: 160,
  },
  futureSection: {
    position: "relative",
    borderTop: "1px solid #1a1a1a",
    minHeight: "40vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "72px 24px",
    background: "#0a0a0a",
  },
  futureSectionInner: {
    textAlign: "center",
  },
  futureEyebrow: {
    fontFamily: "'Space Mono', monospace",
    fontSize: 10,
    letterSpacing: 6,
    color: "#FFE600",
    marginBottom: 14,
    display: "block",
  },
  futureTitle: {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: "clamp(42px, 6vw, 72px)",
    color: "#f0f0f0",
    letterSpacing: 1,
    lineHeight: 0.92,
    margin: 0,
  },
  futureBody: {
    marginTop: 14,
    fontFamily: "'Space Mono', monospace",
    fontSize: 12,
    letterSpacing: 2,
    color: "#555",
  },
};

export const credentialsStyles: Record<string, CSSProperties> = {
  section: {
    background: "#0a0a0a",
    color: "#f0f0f0",
    fontFamily: "'Courier New', monospace",
    cursor: "crosshair",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
  },
  header: {
    padding: "clamp(20px,2.5vw,36px) clamp(24px,4vw,52px) clamp(6px,0.8vw,10px)",
    paddingTop: 50,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
    flexShrink: 0,
    animation: "fadeUp 0.45s both",
  },
  eyebrow: {
    fontFamily: "'Space Mono', monospace",
    fontSize: "clamp(9px,1vw,10px)",
    letterSpacing: 5,
    color: "#FFE600",
    display: "block",
    marginBottom: 0,
  },
  title: {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: "clamp(36px,5.5vw,72px)",
    letterSpacing: 3,
    lineHeight: 1,
    marginTop: 20,
    marginBottom: 0
  },
  track: {
    flexShrink: 0,
    overflowX: "scroll",
    overflowY: "visible",
    display: "flex",
    alignItems: "flex-start",
    gap: "clamp(16px,2.5vw,28px)",
    padding: "16px clamp(24px,4vw,52px) clamp(24px,4vw,48px)",
    WebkitOverflowScrolling: "touch" as any,
    touchAction: "pan-x",
  },
  trackSpacer: {
    flexShrink: 0,
    width: "clamp(16px,3vw,40px)",
  },
};

export const CREDENTIALS_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Bebas+Neue&display=swap');
  ::selection{background:#FFE600;color:#0a0a0a}
  @keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
  @keyframes fadeUp{from{transform:translateY(20px);opacity:0}to{transform:translateY(0);opacity:1}}
  .cred-track::-webkit-scrollbar{display:none}
  .cred-track{-ms-overflow-style:none;scrollbar-width:none}
  .cred-scanlines{
    position:fixed;inset:0;pointer-events:none;z-index:100;
    background-image:repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.022) 2px,rgba(0,0,0,0.022) 4px);
  }
`;

export const aboutGachaCss = `
  @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Bebas+Neue&display=swap');
  .about-gacha-root * { box-sizing: border-box; margin: 0; padding: 0; }
  .about-gacha-root ::selection { background: #FFE600; color: #0a0a0a; }
  @keyframes pulse   { 0%,100%{opacity:1} 50%{opacity:0.65} }
  @keyframes bloom   { from{opacity:0;transform:scale(0)} to{opacity:1;transform:scale(1)} }
  @keyframes scanH   { from{background-position:0 0} to{background-position:48px 0} }
  @keyframes flashIn { 0%{opacity:0.6} 100%{opacity:0} }
  .about-gacha-scanlines {
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 200;
    background-image: repeating-linear-gradient(
      0deg,
      transparent,
      transparent 2px,
      rgba(0, 0, 0, 0.03) 2px,
      rgba(0, 0, 0, 0.03) 4px
    );
  }
`;

export const ABOUT_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Bebas+Neue&display=swap');
  // *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  ::selection { background: #FFE600; color: #0a0a0a; }
  @keyframes blink     { 0%,100%{opacity:1} 50%{opacity:0} }
  @keyframes fadeUp    { from{transform:translateY(20px);opacity:0} to{transform:translateY(0);opacity:1} }
  @keyframes imgReveal { from{clip-path:inset(100% 0 0 0);opacity:0} to{clip-path:inset(0% 0 0 0);opacity:1} }
  .scanlines { position: fixed; inset: 0; pointer-events: none; z-index: 100; background-image: repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.025) 2px, rgba(0,0,0,0.025) 4px); }
  .about-grid { display: grid; grid-template-columns: minmax(240px, 380px) 1fr; gap: clamp(28px, 5vw, 72px); align-items: stretch; width: 100%; max-width: 1100px; }
  @media (max-width: 760px) { .about-grid { grid-template-columns: 1fr; gap: 28px; } }
  .img-frame { position: relative; width: 100%; height: 100%; overflow: hidden; border: 1px solid #222; }
  .img-frame-mobile { position: relative; width: clamp(80px, 22vw, 110px); height: clamp(80px, 22vw, 110px); flex-shrink: 0; overflow: hidden; border: 1px solid #222; }
  .img-frame img, .img-frame-mobile img { width: 100%; height: 100%; object-fit: cover; object-position: top center; display: block; filter: grayscale(15%) contrast(1.05); animation: imgReveal 0.8s cubic-bezier(0.77,0,0.175,1) 0.1s both; }
  .img-corner { position: absolute; width: 20px; height: 20px; pointer-events: none; z-index: 2; }
  .img-corner.tl { top:8px; left:8px; border-top:1px solid #FFE600; border-left:1px solid #FFE600; }
  .img-corner.br { bottom:8px; right:8px; border-bottom:1px solid #FFE600; border-right:1px solid #FFE600; }
  .img-scanlines { position: absolute; inset: 0; z-index: 1; pointer-events: none; background-image: repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,0,0,0.04) 3px,rgba(0,0,0,0.04) 4px); }
  .info-col { display: flex; flex-direction: column; justify-content: space-between; animation: fadeUp 0.5s 0.15s both; }
  .attr-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 1px; background: #1a1a1a; border: 1px solid #1a1a1a; }
  .attr-item { background: #0a0a0a; padding: 13px 16px; transition: background 0.15s; cursor: crosshair; }
  .attr-item:hover { background: #111; }
  .social-btn { display: flex; align-items: center; justify-content: center; width: 46px; height: 46px; border: 1px solid #2a2a2a; background: transparent; color: #666; cursor: crosshair; text-decoration: none; position: relative; overflow: hidden; transition: color 0.18s, border-color 0.18s, transform 0.18s, box-shadow 0.18s; flex-shrink: 0; }
  .social-btn::before { content: ''; position: absolute; inset: 0; background: #FFE600; transform: scaleY(0); transform-origin: bottom; transition: transform 0.18s; z-index: 0; }
  .social-btn:hover::before { transform: scaleY(1); }
  .social-btn:hover { color: #0a0a0a; border-color: #FFE600; transform: translate(-2px, -2px); box-shadow: 2px 2px 0 #FFE600; }
  .social-btn svg { position: relative; z-index: 1; }
`;

// ─── TIMELINE ─────────────────────────────────────────────────────────────────

export type AchievementItem = {
  id: string;
  date: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  highlight: boolean;
};

export const ACHIEVEMENTS: AchievementItem[] = [
  {
    id: "19",
    date: "JUN 2026",
    title: "JUST GRADUATED",
    description:
      "Graduated on Laguna State Polytechnic University with the awards: Cultural Service Award, Emerging Digital Innovators Award, Emerging Cybersecurity Professionals Award, and Outstanding Research Presentation Award",
    image: tl19,
    tags: ["BEGINNING OF ANOTHER JOURNEY"],
    highlight: true,
  },
  {
    id: "18",
    date: "APR 2026",
    title: "VOLUNTEER BACKEND DEVELOPER",
    description:
      "Started as a Volunteer Backend Developer for Quantum Computing Society of the Philippines for their project",
    image: tl18,
    tags: ["VOLUNTEER", "DEVELOPMENT"],
    highlight: false,
  },
  {
    id: "17",
    date: "APR 2026",
    title: "INTERNATIONAL CONFERENCE",
    description:
      "We presented our Thesis in International Conference on Frontiers of Engineering and Emerging Technologies (FET'26)",
    image: tl17,
    tags: ["THESIS", "INTERNATION CONFERENCE"],
    highlight: false,
  },
  {
    id: "16",
    date: "APR 2026",
    title: "INTERCISKWELA'S BATANG TECHNO",
    description:
      "I participated in Batangas State University's Batang Techno Programming Competition",
    image: tl16,
    tags: ["PROGRAMMING"],
    highlight: false,
  },
  {
    id: "15",
    date: "MAR 2026",
    title: "DOST PROJECT LODIXR",
    description:
      "I started my On-The-Job Training (OJT) in Department of Science and Technology under the Project LODIxR with the role Full Stack Developer",
    image: tl15,
    tags: ["INTERNSHIP"],
    highlight: true,
  },
  {
    id: "14",
    date: "FEB 2026",
    title: "TOURISM STARTUP",
    description:
      "We participated in CHED & DOT's Tourism Startup and won 4th Place with our MVP, PAMANA",
    image: tl14,
    tags: ["STARTUP", "PITCHING"],
    highlight: false,
  },
  {
    id: "13",
    date: "JAN 2026",
    title: "THESIS DEFENDED",
    description:
      "successfully defended our Thesis, Shroomify: Image-based classification using Modified Feature Engineering and Artificial Neural Networks",
    image: tl13,
    tags: ["THESIS", "MACHINE LEARNING"],
    highlight: true,
  },
  {
    id: "12",
    date: "DEC 2025",
    title: "IT SPECIALIST - ARTIFICIAL INTELLIGENCE",
    description:
      "Received the certification from Certiport - A Pearson VUE Business",
    image: tl12,
    tags: ["ARTIFICIAL INTELLIGENCE", "CERTIFICATION"],
    highlight: false,
  },
  {
    id: "11",
    date: "NOV 2025",
    title: "TRON CYBER DEFENSE CHAMPION",
    description:
      "won as the Champion of the Qualifying Cyber Defense Exercise Challenge TRON 2026",
    image: tl11,
    tags: ["CYBERSECURITY", "CAPTURE-THE-FLAG"],
    highlight: true,
  },
  {
    id: "10",
    date: "OCT 2025",
    title: "STRASUC 2025",
    description:
      "represented our university in Chorale Competition at Romblon University for Southern Tagalog Regional Association of State Universities and Colleges (STRASUC) Culture and Arts Festival",
    image: tl10,
    tags: ["AFK", "AWAY FROM KEYBOARD"],
    highlight: false,
  },
  {
    id: "09",
    date: "JUL 2025",
    title: "HACK4APROGRESS",
    description:
      "secured a spot as one of the top 8 finalists in the second Hack4AProgress 2025 competition hosted by the Department of Science and Technology-Calabarzon",
    image: tl9,
    tags: ["HACKATHON"],
    highlight: false,
  },
  {
    id: "08",
    date: "MAY 2025",
    title: "CCS WEEK - PROGRAMMING COMPETITION",
    description:
      "During CCS Week 2025, I participated in the programming competition and won 1st Runner Up",
    image: tl8,
    tags: ["PROGRAMMING"],
    highlight: false,
  },
  {
    id: "07",
    date: "MAY 2025",
    title: "MY FIRST HACKATHON",
    description:
      "We participated in Quantum Computing Society of the Philippine's Hackathon and won 1st Runner Up for our MVP, Wer's Paldo",
    image: tl7,
    tags: ["HACKATHON", "BLOCKCHAIN"],
    highlight: true,
  },
  {
    id: "06",
    date: "NOV 2024",
    title: "UMAK 13TH ITOLYMPICS",
    description:
      "During the University of Makati's 13th ITOlympics 2024, I participated in the Java programming competition representing our University.",
    image: tl6,
    tags: ["JAVA", "PROGRAMMING"],
    highlight: false,
  },
  {
    id: "05",
    date: "MAY 2024",
    title: "PROGRAMMING CHAMPION",
    description:
      "During CCS Week 2024, I participated in the programming competition and emerged as the winner.",
    image: tl5,
    tags: ["PROGRAMMING"],
    highlight: true,
  },
  {
    id: "04",
    date: "APR 2024",
    title: "TOPCIT 2024",
    description:
      "I represented our university alongside students from various universities nationwide. This test, known as the Test of Practical Competency in IT",
    image: tl4,
    tags: ["INFORMATION TECHNOLOGY"],
    highlight: false,
  },
  {
    id: "03",
    date: "NOV 2023",
    title: "UMAK 12TH ITOLYMPICS",
    description:
      "During the University of Makati's 12th ITOlympics 2023, I participated in the Java programming competition representing our University. ",
    image: tl3,
    tags: ["JAVA", "PROGRAMMNG"],
    highlight: false,
  },
  {
    id: "02",
    date: "MAY 2023",
    title: "MY FIRST COMPETITION",
    description:
      "I joined my very first programming competition in LSPU CCS Week and won 2nd Runner Up",
    image: tl2,
    tags: ["PROGRAMMING"],
    highlight: false,
  },
  {
    id: "01",
    date: "AUG 2022",
    title: "ENROLLED AS COMPUTER SCIENCE",
    description:
      "Made my decision to shift courses from BS Accountancy to BS Computer Science at Laguna State Polytechnic University",
    image: timelineEnrolled,
    tags: ["BEGINNING OF MY JOURNEY"],
    highlight: true,
  },
];

export const TIMELINE_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,400;0,700&family=Bebas+Neue&display=swap');
  .tl-vp::-webkit-scrollbar { display: none; }
  .tl-vp { -ms-overflow-style: none; scrollbar-width: none; }
  .tl-vp::before,
  .tl-vp::after {
    content: '';
    position: sticky;
    display: block;
    left: 0; right: 0;
    height: 52px;
    pointer-events: none;
    z-index: 5;
  }
  .tl-vp::before { top: 0; background: linear-gradient(to bottom, #0a0a0a, transparent); margin-bottom: -52px; }
  .tl-vp::after  { bottom: 0; background: linear-gradient(to top, #0a0a0a, transparent); margin-top: -52px; }
  @keyframes tl-up {
    from { opacity: 0; transform: translateY(18px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .tl-item {
    display: grid;
    grid-template-columns: 1fr 52px 1fr;
    margin-bottom: 48px;
    padding: 0 44px;
    animation: tl-up 0.45s ease both;
  }
  .tl-item.is-left  .tl-date-block  { grid-column: 1; grid-row: 1; }
  .tl-item.is-left  .tl-node-col    { grid-column: 2; grid-row: 1; }
  .tl-item.is-left  .tl-card-col    { grid-column: 3; grid-row: 1; padding-left: 22px; }
  .tl-item.is-right .tl-card-col    { grid-column: 1; grid-row: 1; padding-right: 22px; justify-content: flex-end; }
  .tl-item.is-right .tl-node-col    { grid-column: 2; grid-row: 1; }
  .tl-item.is-right .tl-date-block  { grid-column: 3; grid-row: 1; }
  .tl-date-block { display: flex; flex-direction: column; padding-top: 12px; z-index: 2; }
  .tl-date-block.date-right { align-items: flex-end; padding-right: 18px; }
  .tl-date-block.date-left  { align-items: flex-start; padding-left: 18px; }
  .tl-node-col { display: flex; justify-content: center; padding-top: 10px; z-index: 2; }
  .tl-node {
    width: 16px; height: 16px;
    border: 1px solid #2a2a2a;
    background: #0a0a0a;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
    transition: border-color 0.2s, box-shadow 0.2s;
  }
  .tl-node.hl           { border-color: #FFE600; }
  .tl-item:hover .tl-node { border-color: #FFE600; box-shadow: 0 0 8px #FFE60055; }
  .tl-node-dot { width: 5px; height: 5px; background: #2a2a2a; transition: background 0.2s; }
  .tl-node.hl .tl-node-dot    { background: #FFE600; }
  .tl-item:hover .tl-node-dot { background: #FFE600; }
  .tl-card-col { display: flex; align-items: flex-start; }
  .tl-card {
    width: 100%; max-width: 360px;
    border: 1px solid #1a1a1a;
    background: #0c0c0c;
    overflow: hidden;
    position: relative;
    transition: border-color 0.2s, transform 0.2s, box-shadow 0.2s;
  }
  .tl-card:hover { border-color: #FFE600; transform: translate(-3px, -3px); box-shadow: 3px 3px 0 #FFE600; }
  .tl-card.highlighted::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0;
    height: 2px; background: #FFE600; z-index: 2;
  }
  .tl-img { width: 100%; height: 100%; object-fit: cover; display: block; filter: grayscale(60%) contrast(1.1) brightness(0.9); transition: filter 0.35s, transform 0.4s; }
  .tl-card:hover .tl-img { filter: grayscale(10%) contrast(1.1) brightness(1); transform: scale(1.05); }
  .tl-card:hover .tl-title { color: #FFE600; }
  .tl-card:hover .tl-tag { border-color: #2e2e2e; color: #666; }
  .tl-mobile-date { display: none; align-items: baseline; gap: 6px; padding: 10px 16px 0; border-bottom: 1px solid #1a1a1a; margin-bottom: 2px; }
  @media (max-width: 680px) {
    .tl-inner { padding: 48px 0 80px; }
    .tl-item { grid-template-columns: 36px 1fr; padding: 0 16px; }
    .tl-item.is-left  .tl-date-block,
    .tl-item.is-right .tl-date-block { display: none; }
    .tl-item.is-left  .tl-node-col,
    .tl-item.is-right .tl-node-col  { grid-column: 1; grid-row: 1; }
    .tl-item.is-left  .tl-card-col,
    .tl-item.is-right .tl-card-col  { grid-column: 2; grid-row: 1; padding: 0 0 0 14px; justify-content: flex-start; }
    .tl-spine { left: calc(16px + 14px) !important; }
    .tl-mobile-date { display: flex !important; }
  }
`;

export const timelineStyles: Record<string, CSSProperties> = {
  root: {
    background: "#0a0a0a",
    color: "#f0f0f0",
    height: "90vh",
    display: "flex",
    flexDirection: "column",
    fontFamily: "'Space Mono', monospace",
    overflow: "hidden",
    position: "relative",
  },
  gridOverlay: {
    position: "absolute",
    inset: 0,
    pointerEvents: "none",
    backgroundImage:
      "linear-gradient(#1a1a1a 1px,transparent 1px),linear-gradient(90deg,#1a1a1a 1px,transparent 1px)",
    backgroundSize: "48px 48px",
    opacity: 0.25,
    zIndex: 0,
  },
  header: {
    flexShrink: 0,
    padding: "20px 52px 16px",
    borderBottom: "1px solid #161616",
    position: "relative",
    overflow: "hidden",
    zIndex: 10,
    paddingTop: 50
  },
  eyebrow: {
    fontSize: 9,
    letterSpacing: 6,
    color: "#FFE600",
    display: "block",
  },
  h1: {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: "clamp(40px, 5.5vw, 72px)",
    lineHeight: 0.92,
    letterSpacing: -1,
    marginTop: 20,
    marginBottom: 20
  },
  progressBar: {
    position: "absolute",
    right: 0,
    top: 0,
    bottom: 0,
    width: 2,
    background: "#111",
    zIndex: 20,
    pointerEvents: "none",
  },
  viewport: {
    flex: 1,
    overflowY: "scroll",
    overflowX: "hidden",
    position: "relative",
    scrollbarWidth: "none" as any,
    backgroundImage:
      "linear-gradient(rgba(26,26,26,0.25) 1px,transparent 1px),linear-gradient(90deg,rgba(26,26,26,0.25) 1px,transparent 1px)",
    backgroundSize: "48px 48px",
  },
  inner: {
    position: "relative",
    padding: "64px 0 100px",
  },
  spine: {
    position: "absolute",
    left: "50%",
    top: 0,
    bottom: 0,
    width: 1,
    transform: "translateX(-50%)",
    background:
      "linear-gradient(to bottom, transparent, #FFE600 56px, #1c1c1c 96px, #1c1c1c calc(100% - 56px), transparent)",
    pointerEvents: "none",
  },
  dateMonth: {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: 22,
    letterSpacing: 4,
    color: "#FFE600",
    lineHeight: 1,
  },
  dateYear: {
    fontSize: 9,
    letterSpacing: 3,
    color: "#383838",
    marginTop: 3,
  },
  imgWrap: {
    position: "relative",
    height: 140,
    overflow: "hidden",
    background: "#111",
  },
  imgScrim: {
    position: "absolute",
    inset: 0,
    background:
      "linear-gradient(to bottom, rgba(12,12,12,0) 40%, #0c0c0c 100%)",
  },
  imgNum: {
    position: "absolute",
    top: 6,
    right: 10,
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: 30,
    color: "rgba(255,255,255,0.05)",
    pointerEvents: "none",
    userSelect: "none",
  },
  cardBody: {
    padding: "12px 16px 16px",
  },
  badge: {
    fontSize: 7,
    letterSpacing: 3,
    background: "#FFE600",
    color: "#0a0a0a",
    padding: "3px 8px",
    display: "inline-block",
    marginBottom: 8,
    fontWeight: 700,
  },
  cardTitle: {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: 20,
    letterSpacing: 2,
    color: "#ddd",
    lineHeight: 1.05,
    marginBottom: 8,
    transition: "color 0.2s",
  },
  cardDesc: {
    fontSize: 10,
    lineHeight: 1.85,
    color: "#4a4a4a",
    marginBottom: 12,
  },
  cardTags: {
    display: "flex",
    flexWrap: "wrap" as any,
    gap: 5,
  },
  tag: {
    fontSize: 8,
    letterSpacing: 2,
    padding: "2px 6px",
    border: "1px solid #1e1e1e",
    color: "#3a3a3a",
    transition: "border-color 0.2s, color 0.2s",
  },
  mobMonth: {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: 17,
    letterSpacing: 3,
    color: "#FFE600",
    lineHeight: 1,
  },
  mobYear: {
    fontSize: 9,
    letterSpacing: 3,
    color: "#3a3a3a",
  },
};