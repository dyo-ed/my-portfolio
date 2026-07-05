import { useEffect, useState } from "react";
import type { HeaderViewProps } from "./headerContract";
import { headerStyles } from "../../../utils/constants/headerConstant";

export default function HeaderView({
  activeSection,
  currentTime,
  header,
  onScrollTo,
}: HeaderViewProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [activeSection]);

  useEffect(() => {
    if (!menuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  const handleNavClick = (id: string, label: string) => {
    onScrollTo(id, label);
    setMenuOpen(false);
  };

  const navButtons = header.navItems.map((item) => (
    <button
      key={item.id}
      className={`nav-link ${activeSection === item.label ? "active" : ""}`}
      onClick={() => handleNavClick(item.id, item.label)}
    >
      {item.label}
    </button>
  ));

  return (
    <nav className="site-header" style={headerStyles.nav}>
      <button
        onClick={() => handleNavClick("", header.homeLabel)}
        className="brand-link"
        style={headerStyles.brandButton}
      >
        {header.brand}
      </button>

      <div className="header-nav-desktop" style={headerStyles.navList}>
        {navButtons}
      </div>

      <div className="header-actions">
        <div className="header-clock" style={headerStyles.clock}>
          {currentTime.toLocaleTimeString(header.clockLocale, { hour12: false })}
        </div>

        <button
          type="button"
          className={`header-menu-toggle ${menuOpen ? "open" : ""}`}
          aria-expanded={menuOpen}
          aria-controls="header-mobile-menu"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="header-menu-bar" />
          <span className="header-menu-bar" />
          <span className="header-menu-bar" />
        </button>
      </div>

      <div
        id="header-mobile-menu"
        className={`header-nav-mobile ${menuOpen ? "open" : ""}`}
        aria-hidden={!menuOpen}
      >
        {navButtons}
      </div>
    </nav>
  );
}
