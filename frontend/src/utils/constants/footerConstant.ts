import type { CSSProperties } from "react";

export const footerStyles: Record<string, CSSProperties> = {
  footer: {
    borderTop: "1px solid #1a1a1a",
    padding: "24px 40px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  text: {
    fontFamily: "'Space Mono', monospace",
    fontSize: 11,
    color: "#333",
    letterSpacing: 2,
  },
  cursor: {
    color: "#FFE600",
    animation: "blink 1s infinite",
    marginLeft: 4,
  },
};
