import { useEffect, useState } from "react";

export default function GlobalCursor() {
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [showCursor, setShowCursor] = useState(false);
  const [isDesktopPointer, setIsDesktopPointer] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    const updatePointerMode = () => setIsDesktopPointer(mediaQuery.matches);
    updatePointerMode();

    const updateCursor = (event: MouseEvent) => {
      setCursorPos({ x: event.clientX, y: event.clientY });
      setShowCursor(true);
    };

    window.addEventListener("mousemove", updateCursor);

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", updatePointerMode);
    } else {
      mediaQuery.addListener(updatePointerMode);
    }

    return () => {
      window.removeEventListener("mousemove", updateCursor);
      if (typeof mediaQuery.removeEventListener === "function") {
        mediaQuery.removeEventListener("change", updatePointerMode);
      } else {
        mediaQuery.removeListener(updatePointerMode);
      }
    };
  }, []);

  if (!isDesktopPointer || !showCursor) return null;

  return (
    <div
      style={{
        position: "fixed",
        width: 8,
        height: 8,
        background: "#FFE600",
        pointerEvents: "none",
        zIndex: 9999,
        mixBlendMode: "difference",
        left: cursorPos.x - 4,
        top: cursorPos.y - 4,
      }}
    />
  );
}
