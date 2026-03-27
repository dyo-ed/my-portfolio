import type { CSSProperties } from "react";

export const contactConstant = {
  email: "joedcmerana@gmail.com",
  github: "github.com/dyo-ed",
  linkedin: "linkedin.com/in/joedmerana",
} as const;

export const contactStyles = {
  section: {
    padding: "80px 40px",
    minHeight: "calc(100vh - 56px)",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 80,
  },
  heading: {
    fontFamily: "'Bebas Neue',sans-serif",
    fontSize: "clamp(48px,7vw,88px)",
    lineHeight: 0.9,
    marginBottom: 32,
  },
  description: {
    fontFamily: "'Space Mono',monospace",
    fontSize: 13,
    color: "#666",
    lineHeight: 2,
    marginBottom: 40,
  },
  contactList: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
  },
  contactRow: {
    display: "flex",
    gap: 24,
    fontFamily: "'Space Mono',monospace",
    fontSize: 13,
    borderBottom: "1px solid #1a1a1a",
    paddingBottom: 16,
  },
  contactRowLabel: {
    color: "#333",
    minWidth: 80,
    fontSize: 10,
    letterSpacing: 3,
    paddingTop: 2,
  },
  rightPanel: {
    border: "1px solid #222",
    padding: 40,
    display: "flex",
    flexDirection: "column",
    gap: 32,
  },
  sendMessageTitle: {
    fontFamily: "'Space Mono',monospace",
    fontSize: 10,
    letterSpacing: 4,
    color: "#FFE600",
  },
  formLabel: {
    fontFamily: "'Space Mono',monospace",
    fontSize: 9,
    letterSpacing: 3,
    color: "#444",
    display: "block",
    marginBottom: 8,
  },
  textarea: {
    resize: "none",
  },
  sendButton: {
    width: "100%",
    textAlign: "center",
  },
} satisfies Record<string, CSSProperties | Record<string, never>>;

