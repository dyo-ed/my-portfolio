import type { HeaderViewProps } from "./headerContract";
import { headerStyles } from "../../../utils/constants/headerConstant";

export default function HeaderView({
  activeSection,
  currentTime,
  header,
  onScrollTo,
}: HeaderViewProps) {
  return (
    <nav style={headerStyles.nav}>
      <button
        onClick={() => onScrollTo("hero", header.homeLabel)}
        style={headerStyles.brandButton}
      >
        {header.brand}
      </button>

      <div style={headerStyles.navList}>
        {header.navItems.map((item) => (
          <button
            key={item.id}
            className={`nav-link ${activeSection === item.label ? "active" : ""}`}
            onClick={() => onScrollTo(item.id, item.label)}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div style={headerStyles.clock}>
        {currentTime.toLocaleTimeString(header.clockLocale, { hour12: false })}
      </div>
    </nav>
  );
}
