import type { CSSProperties } from "react";

export const headerStyles: Record<string, CSSProperties> = {
  nav: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 50,
    borderBottom: "1px solid #1a1a1a",
    background: "#0a0a0aee",
    backdropFilter: "blur(4px)",
    padding: "0 40px",
    height: 56,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  brandButton: {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: 22,
    letterSpacing: 4,
    color: "#FFE600",
    background: "none",
    border: "none",
    cursor: "crosshair",
  },
  navList: {
    display: "flex",
    gap: 36,
    alignItems: "center",
  },
  clock: {
    fontFamily: "'Space Mono', monospace",
    fontSize: 11,
    color: "#444",
    letterSpacing: 2,
  },
};
