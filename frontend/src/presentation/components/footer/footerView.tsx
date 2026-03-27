import type { FooterViewProps } from "./footerContract";
import { footerStyles } from "../../../utils/constants/footerConstant";
import { Link } from "react-router-dom";

export default function FooterView({ footer }: FooterViewProps) {
  const icons = {
    github: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          fill="currentColor"
          d="M12 2C6.477 2 2 6.596 2 12.26c0 4.53 2.865 8.37 6.84 9.727.5.095.683-.224.683-.497 0-.246-.009-.898-.014-1.763-2.782.622-3.369-1.375-3.369-1.375-.454-1.183-1.11-1.498-1.11-1.498-.907-.642.069-.63.069-.63 1.003.072 1.531 1.06 1.531 1.06.892 1.567 2.341 1.115 2.91.852.09-.665.35-1.115.636-1.371-2.221-.264-4.555-1.142-4.555-5.083 0-1.123.39-2.04 1.029-2.758-.103-.263-.446-1.326.098-2.764 0 0 .84-.276 2.75 1.054A9.2 9.2 0 0 1 12 6.844c.85.004 1.705.12 2.504.352 1.909-1.33 2.747-1.054 2.747-1.054.546 1.438.203 2.501.1 2.764.64.718 1.027 1.635 1.027 2.758 0 3.951-2.338 4.816-4.566 5.074.36.318.68.946.68 1.907 0 1.377-.012 2.49-.012 2.83 0 .276.18.598.688.496C19.138 20.626 22 16.79 22 12.26 22 6.596 17.523 2 12 2Z"
        />
      </svg>
    ),
    linkedin: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          fill="currentColor"
          d="M20.45 20.45h-3.55v-5.56c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.66H9.37V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.61 0 4.28 2.38 4.28 5.47v6.27ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM3.56 20.45h3.56V9H3.56v11.45Z"
        />
      </svg>
    ),
    facebook: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          fill="currentColor"
          d="M13.5 22v-8h2.7l.4-3h-3.1V9.1c0-.87.24-1.46 1.49-1.46H16.7V5.06c-.3-.04-1.33-.13-2.52-.13-2.5 0-4.2 1.56-4.2 4.42V11H7.4v3h2.58v8H13.5Z"
        />
      </svg>
    ),
  } as const;

  const socialLinks = [
    { label: "GitHub", href: "https://github.com/dyo-ed", icon: icons.github },
    { label: "LinkedIn", href: "https://linkedin.com/in/joedmerana", icon: icons.linkedin },
    { label: "Facebook", href: "https://facebook.com/joedmerana", icon: icons.facebook },
  ] as const;

  const servicesLinks = [
    { label: "WEB APPS", href: "#" },
    { label: "MOBILE", href: "#" },
    { label: "CONSULTING", href: "#" },
  ] as const;

  const sitemapLinks = [
    { label: "HOME", href: "/" },
    { label: "PROJECTS", href: "/projects" },
    { label: "SERVICES", href: "/services" },
    { label: "BLOG", href: "/blog" },
    { label: "ABOUT", href: "/about" },
    { label: "CONTACT", href: "/contact" },
  ] as const;

  const legalLinks = [
    { label: "PRIVACY", href: "#" },
    { label: "TERMS", href: "#" },
    { label: "COOKIES", href: "#" },
  ] as const;

  return (
    <footer style={footerStyles.footer}>
      <div style={footerStyles.topRow}>
        <div style={footerStyles.brandBlock}>
          <span style={footerStyles.text}>{footer.signature}</span>
          <span style={footerStyles.text}>
            {footer.tagline}
            <span style={footerStyles.cursor}>{footer.cursorGlyph}</span>
          </span>
        </div>

        <div style={footerStyles.socialRow}>
          {socialLinks.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target="_blank"
              rel="noreferrer"
              className="social-icon-link"
              aria-label={l.label}
              title={l.label}
            >
              {l.icon}
            </a>
          ))}
        </div>
      </div>

      <div style={footerStyles.navGrid}>
        <nav aria-label="Services" style={footerStyles.navCol}>
          <span style={footerStyles.navTitle}>01/ SERVICES</span>
          <div style={footerStyles.navLinks}>
            {servicesLinks.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="nav-link footer-nav-link"
                style={footerStyles.navLink}
              >
                {l.label}
              </a>
            ))}
          </div>
        </nav>

        <nav aria-label="Sitemap" style={footerStyles.navCol}>
          <span style={footerStyles.navTitle}>02/ SITEMAP</span>
          <div style={footerStyles.navLinks}>
            {sitemapLinks.map((l) => (
              <Link
                key={l.label}
                to={l.href}
                className="nav-link footer-nav-link"
                style={footerStyles.navLink}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </nav>

        <nav aria-label="Legal" style={footerStyles.navCol}>
          <span style={footerStyles.navTitle}>03/ LEGAL</span>
          <div style={footerStyles.navLinks}>
            {legalLinks.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="nav-link footer-nav-link"
                style={footerStyles.navLink}
              >
                {l.label}
              </a>
            ))}
          </div>
        </nav>
      </div>
    </footer>
  );
}