import React, { useCallback, useEffect, useRef, useState } from "react";

const NOISE_CHARS = "!@#$%^&*<>/\\|{}[]~`";

export type GlitchTextProps = {
  text: string;
  animateOnMount?: boolean;
  animateKey?: string;
};

export const GlitchText: React.FC<GlitchTextProps> = ({
  text,
  animateOnMount = false,
  animateKey,
}) => {
  const [display, setDisplay] = useState(text);
  const [glitching, setGlitching] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const glitchingRef = useRef(false);

  useEffect(() => {
    setDisplay(text);
  }, [text]);

  const triggerGlitch = useCallback(() => {
    if (glitchingRef.current) return;

    let ticks = 0;

    if (intervalRef.current !== null) {
      globalThis.clearInterval(intervalRef.current);
      intervalRef.current = null;
      glitchingRef.current = false;
      setGlitching(false);
    }

    glitchingRef.current = true;
    setGlitching(true);

    intervalRef.current = globalThis.setInterval(() => {
      if (ticks > 10) {
        if (intervalRef.current !== null) {
          globalThis.clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
        setDisplay(text);
        setGlitching(false);
        glitchingRef.current = false;
        return;
      }

      setDisplay(
        text
          .split("")
          .map((c, i) =>
            i < ticks
              ? c
              : Math.random() > 0.5
              ? NOISE_CHARS[Math.floor(Math.random() * NOISE_CHARS.length)]
              : c,
          )
          .join(""),
      );

      ticks++;
    }, 45);
  }, [text]);

  useEffect(() => {
    if (!animateOnMount) return;

    // StrictMode-safe: first effect pass is cleaned up before timeout fires.
    const timeoutId = globalThis.setTimeout(() => {
      triggerGlitch();
    }, 0);

    return () => {
      globalThis.clearTimeout(timeoutId);
    };
  }, [animateKey, animateOnMount, triggerGlitch]);

  useEffect(() => {
    return () => {
      if (intervalRef.current !== null) {
        globalThis.clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      glitchingRef.current = false;
    };
  }, []);

  return React.createElement(
    "span",
    {
      onMouseEnter: triggerGlitch,
      style: { cursor: "crosshair", fontFamily: "inherit" },
    },
    display,
  );
};

export default GlitchText;