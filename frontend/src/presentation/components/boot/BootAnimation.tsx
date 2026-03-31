import React, { useEffect, useState } from "react";
import appStrings from "../../../locales/en/appStrings.json";
import {
  TICK_MS,
  SCANLINES_CSS,
  overlayStyle,
  nameStyle,
  loadingContainerStyle,
  barContainerStyle,
  barFillerBase,
  statusRowStyle,
} from "./bootConst";

interface BootAnimationProps {
  onComplete?: () => void;
}

export default function BootAnimation({ onComplete }: BootAnimationProps) {
  const [progress, setProgress] = useState<number>(0);
  const [opacity, setOpacity] = useState<number>(1);
  const [statusText, setStatusText] = useState<string>(appStrings.boot?.initializing ?? "INITIALIZING");

  // The overlay itself will capture wheel/touch events to prevent scrolling
  // and avoid toggling `document.body` overflow which can trigger layout shifts.

  const STATUS = [
    { at: 20, text: appStrings.boot?.loadingAssets ?? "LOADING ASSETS" },
    { at: 50, text: appStrings.boot?.buildingInterface ?? "BUILDING INTERFACE" },
    { at: 80, text: appStrings.boot?.almostReady ?? "ALMOST READY" },
    { at: 99, text: appStrings.boot?.launching ?? "LAUNCHING" },
  ];

  useEffect(() => {
    const iv = window.setInterval(() => {
      setProgress((p) => {
        const next = p + 1;
        const match = STATUS.slice().reverse().find((s) => next >= s.at);
        if (match) setStatusText(match.text);
        if (next >= 100) {
          window.clearInterval(iv);
          let o = 1;
          const fade = window.setInterval(() => {
            o -= 0.05;
            setOpacity(Math.max(o, 0));
            if (o <= 0) {
              window.clearInterval(fade);
              // Wait for fonts to be available (or timeout) before finishing
              (async () => {
                try {
                  if (document?.fonts) {
                    const fonts = [
                      "1rem 'Bebas Neue'",
                      "1rem 'Space Mono'",
                    ];
                    const loadPromise = Promise.all(fonts.map((f) => document.fonts.load(f)));
                    const timeout = new Promise((res) => setTimeout(res, 1000));
                    await Promise.race([loadPromise, timeout]);
                  }
                } catch (e) {
                  // ignore
                }
                onComplete?.();
              })();
            }
          }, 18);
          return 100;
        }
        return next;
      });
    }, TICK_MS);
    return () => window.clearInterval(iv);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      style={{
        ...overlayStyle,
        opacity,
      }}
      onWheel={(e) => e.preventDefault()}
      onTouchMove={(e) => e.preventDefault()}
    >
      <style>{SCANLINES_CSS}</style>

      <div className="boot-scanlines" />

      {/* Name */}
      <div style={nameStyle}>{appStrings.boot?.name ?? "ALEX.DEV"}</div>

      {/* Loading section */}
      <div style={loadingContainerStyle}>
        {/* Bar */}
        <div style={barContainerStyle}>
          <div style={{ ...barFillerBase, width: `${progress}%` }} />
        </div>

        {/* Status + percentage */}
        <div style={statusRowStyle}>
          <span>
            {statusText}
            <span style={{ animation: "blink 1s infinite", marginLeft: 2 }}>_</span>
          </span>
          <span style={{ color: "#FFE600" }}>{Math.floor(progress)}%</span>
        </div>
      </div>
    </div>
  );
}
