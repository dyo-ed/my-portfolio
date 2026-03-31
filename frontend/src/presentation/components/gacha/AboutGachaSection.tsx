import { useEffect, useState } from "react";
import appStrings from "../../../locales/en/appStrings.json";
import GlitchText from "../glitch_text/glitchText";
import {
  aboutGachaCss,
  aboutStyles,
  GACHA_FRAGMENTS,
  GACHA_NOISE_CHARS,
  GACHA_RARITIES,
  type GachaFragment,
  type GachaRarity,
} from "../../../utils/constants/aboutConstant";

type PullResult = {
  rarity: GachaRarity;
  fragment: GachaFragment;
};

function hexToRgba(hex: string, alpha: number): string {
  const normalized = hex.replace("#", "");
  const value =
    normalized.length === 3
      ? normalized
          .split("")
          .map((char) => char + char)
          .join("")
      : normalized;
  const r = Number.parseInt(value.slice(0, 2), 16);
  const g = Number.parseInt(value.slice(2, 4), 16);
  const b = Number.parseInt(value.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function weightedRandom(arr: GachaRarity[]): GachaRarity {
  const total = arr.reduce((sum, rarity) => sum + rarity.weight, 0);
  let rng = Math.random() * total;
  for (const rarity of arr) {
    rng -= rarity.weight;
    if (rng <= 0) return rarity;
  }
  return arr[arr.length - 1];
}

function randItem(arr: GachaFragment[]): GachaFragment {
  return arr[Math.floor(Math.random() * arr.length)];
}

function useGlitch(text: string, running: boolean): string {
  const [display, setDisplay] = useState(text);

  useEffect(() => {
    if (!running) {
      setDisplay(text);
      return;
    }

    let ticks = 0;
    const interval = window.setInterval(() => {
      if (ticks > 14) {
        setDisplay(text);
        window.clearInterval(interval);
        return;
      }

      setDisplay(
        text
          .split("")
          .map((char, index) =>
            index < ticks * 0.7
              ? char
              : Math.random() > 0.4
              ? GACHA_NOISE_CHARS[
                  Math.floor(Math.random() * GACHA_NOISE_CHARS.length)
                ]
              : char
          )
          .join("")
      );
      ticks += 1;
    }, 40);

    return () => window.clearInterval(interval);
  }, [text, running]);

  return display;
}

function PullButton({
  onClick,
  disabled,
  pulling,
  pullingLabel,
  pullButtonLabel,
}: {
  onClick: () => void;
  disabled: boolean;
  pulling: boolean;
  pullingLabel: string;
  pullButtonLabel: string;
}) {
  const [hover, setHover] = useState(false);
  const label = pulling ? pullingLabel : pullButtonLabel;

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        fontFamily: "'Space Mono', monospace",
        fontSize: 14,
        fontWeight: 700,
        letterSpacing: 4,
        padding: "20px 56px",
        background: disabled ? "#1a1a1a" : hover ? "#FFE600" : "#0a0a0a",
        color: disabled ? "#333" : hover ? "#0a0a0a" : "#FFE600",
        border: `2px solid ${disabled ? "#1a1a1a" : "#FFE600"}`,
        cursor: "crosshair",
        transition: "all .12s",
        transform: hover && !disabled ? "translate(-4px,-4px)" : "none",
        boxShadow: hover && !disabled ? "4px 4px 0 #fff" : "none",
        position: "relative",
        overflow: "hidden",
        minWidth: 280,
      }}
    >
      {pulling && (
        <span
          style={{
            position: "absolute",
            inset: 0,
            background:
              "repeating-linear-gradient(90deg,transparent,transparent 6px,#FFE60022 6px,#FFE60022 12px)",
            animation: "scanH .4s linear infinite",
          }}
        />
      )}
      {label}
    </button>
  );
}

function Card({
  result,
  visible,
  hiddenName,
  hiddenType,
  typeTemplate,
  hiddenFlavor,
  onRevealComplete,
}: {
  result: PullResult;
  visible: boolean;
  hiddenName: string;
  hiddenType: string;
  typeTemplate: string;
  hiddenFlavor: string;
  onRevealComplete: () => void;
}) {
  const [revealed, setRevealed] = useState(false);
  const [glitching, setGlitching] = useState(false);
  const [hiddenNameDisplay, setHiddenNameDisplay] = useState(hiddenName);
  const nameDisplay = useGlitch(result.fragment.name, glitching);

  useEffect(() => {
    if (!visible) {
      setRevealed(false);
      setGlitching(false);
      return;
    }

    const t1 = window.setTimeout(() => setGlitching(true), 200);
    const t2 = window.setTimeout(() => {
      setGlitching(false);
      setRevealed(true);
      onRevealComplete();
    }, 900);

    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [visible, result, onRevealComplete]);

  useEffect(() => {
    setHiddenNameDisplay(hiddenName);
    if (!visible || revealed) return;

    const interval = window.setInterval(() => {
      setHiddenNameDisplay(
        hiddenName
          .split("")
          .map((char) =>
            Math.random() > 0.4
              ? GACHA_NOISE_CHARS[
                  Math.floor(Math.random() * GACHA_NOISE_CHARS.length)
                ]
              : char
          )
          .join("")
      );
    }, 70);

    return () => window.clearInterval(interval);
  }, [hiddenName, visible, revealed]);

  const { rarity, fragment } = result;

  return (
    <div
      style={{
        position: "relative",
        width: 320,
        border: `2px solid ${rarity.color}`,
        background: rarity.bg,
        boxShadow: `0 0 40px ${rarity.glow}, inset 0 0 60px ${rarity.glow}22`,
        opacity: visible ? 1 : 0,
        transform: visible
          ? "translateY(0) scale(1)"
          : "translateY(30px) scale(0.96)",
        transition: "opacity .3s, transform .4s cubic-bezier(.34,1.56,.64,1)",
      }}
    >
      {[
        ["top", "left"],
        ["top", "right"],
        ["bottom", "left"],
        ["bottom", "right"],
      ].map(([verticalKey, horizontalKey], index) => (
        <div
          key={index}
          style={{
            position: "absolute",
            [verticalKey]: 8,
            [horizontalKey]: 8,
            width: 16,
            height: 16,
            borderTop:
              verticalKey === "top" ? `1px solid ${rarity.color}` : "none",
            borderBottom:
              verticalKey === "bottom" ? `1px solid ${rarity.color}` : "none",
            borderLeft:
              horizontalKey === "left" ? `1px solid ${rarity.color}` : "none",
            borderRight:
              horizontalKey === "right" ? `1px solid ${rarity.color}` : "none",
            opacity: 0.6,
          }}
        />
      ))}

      <div
        style={{
          borderBottom: `1px solid ${rarity.color}33`,
          padding: "14px 24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span
          style={{
            fontFamily: "'Space Mono',monospace",
            fontSize: 10,
            letterSpacing: 5,
            color: rarity.color,
          }}
        >
          {rarity.label}
        </span>
        <span
          style={{
            fontFamily: "'Space Mono',monospace",
            fontSize: 9,
            letterSpacing: 3,
            color: "#444",
          }}
        >
          #{String(Math.floor(Math.random() * 10000)).padStart(4, "0")}
        </span>
      </div>

      <div
        style={{
          position: "relative",
          margin: "24px 24px 8px",
          height: 180,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        {revealed && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: `radial-gradient(circle at 50% 60%, ${rarity.glow} 0%, transparent 70%)`,
              pointerEvents: "none",
              animation: "bloom 1s ease-out both",
            }}
          />
        )}
        <img
          src={fragment.image}
          alt={fragment.name}
          style={{
            maxHeight: "100%",
            maxWidth: "100%",
            objectFit: "contain",
            position: "relative",
            zIndex: 1,
            opacity: revealed ? 1 : 0,
            transition: "opacity .4s",
            filter: `drop-shadow(0 0 16px ${rarity.glow})`,
            animation: revealed ? "pulse 3s ease-in-out infinite" : "none",
          }}
        />
        {!revealed && (
          <div
            style={{
              fontSize: 56,
              color: "#222",
              fontFamily: "monospace",
              position: "absolute",
            }}
          >
            ?
          </div>
        )}
      </div>

      <div style={{ padding: "0 24px", textAlign: "center" }}>
        <div
          style={{
            fontFamily: "'Bebas Neue',sans-serif",
            fontSize: 28,
            letterSpacing: 3,
            color: revealed ? rarity.color : "#333",
            transition: "color .3s",
            minHeight: 36,
          }}
        >
          {revealed ? nameDisplay : hiddenNameDisplay}
        </div>
        <div
          style={{
            fontFamily: "'Space Mono',monospace",
            fontSize: 9,
            letterSpacing: 3,
            color: "#555",
            marginTop: 6,
          }}
        >
          {revealed ? typeTemplate.replace("{type}", fragment.type) : hiddenType}
        </div>
      </div>

      <div
        style={{
          borderTop: `1px solid ${rarity.color}22`,
          margin: "20px 24px 0",
          padding: "16px 0 24px",
          fontFamily: "'Space Mono',monospace",
          fontSize: 11,
          lineHeight: 1.8,
          color: revealed ? "#777" : "#2a2a2a",
          fontStyle: "italic",
          transition: "color .4s",
          textAlign: "center",
        }}
      >
        {revealed ? `"${fragment.flavor}"` : hiddenFlavor}
      </div>

      <div
        style={{
          borderTop: `1px solid ${rarity.color}22`,
          padding: "10px 24px",
          fontFamily: "'Space Mono',monospace",
          fontSize: 9,
          letterSpacing: 4,
          color: rarity.color,
          opacity: revealed ? 0.6 : 0.2,
          transition: "opacity .3s",
          textAlign: "center",
        }}
      >
        {rarity.tagline}
      </div>
    </div>
  );
}

export default function AboutGachaSection() {
  const [pulling, setPulling] = useState(false);
  const [result, setResult] = useState<PullResult | null>(null);
  const [cardVisible, setCardVisible] = useState(false);
  const [flash, setFlash] = useState<{ color: string; alpha: number } | null>(
    null
  );
  const [decrypting, setDecrypting] = useState(false);
  const [isCompactLayout, setIsCompactLayout] = useState(false);
  const { gacha } = appStrings.about;

  useEffect(() => {
    const updateLayout = () => setIsCompactLayout(window.innerWidth < 980);
    updateLayout();
    window.addEventListener("resize", updateLayout);
    return () => window.removeEventListener("resize", updateLayout);
  }, []);

  const executePull = () => {
    if (pulling || decrypting) return;

    setPulling(true);
    setDecrypting(true);
    setCardVisible(false);

    window.setTimeout(() => {
      const rarity = weightedRandom(GACHA_RARITIES);
      const fragment = randItem(GACHA_FRAGMENTS);
      setResult({ rarity, fragment });
      const flashAlpha = rarity.weight <= 4 ? 0.65 : 0.18;
      setFlash({ color: rarity.color, alpha: flashAlpha });
      window.setTimeout(() => setFlash(null), 600);

      setPulling(false);
      window.setTimeout(() => setCardVisible(true), 60);
    }, 700);
  };

  return (
    <div
      className="about-gacha-root"
      style={{
        position: "relative",
        background: "#0a0a0a",
        color: "#f0f0f0",
        fontFamily: "'Courier New', monospace",
        cursor: "crosshair",
        overflow: "hidden",
      }}
    >
      <style>{aboutGachaCss}</style>

      <div className="about-gacha-scanlines" />


      <section
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 28,
          padding: "42px 40px 40px",
          overflow: "hidden",
        }}
      >
        {flash && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 150,
              pointerEvents: "none",
              background: hexToRgba(flash.color, flash.alpha),
              opacity: 0,
              animation: "flashIn .6s ease-out both",
            }}
          />
        )}
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            backgroundImage:
              "linear-gradient(#1a1a1a 1px,transparent 1px),linear-gradient(90deg,#1a1a1a 1px,transparent 1px)",
            backgroundSize: "48px 48px",
            opacity: 0.25,
          }}
        />

        <div
          style={{
            position: "relative",
            zIndex: 1,
            width: "100%",
            maxWidth: 1120,
            display: "grid",
            gridTemplateColumns: isCompactLayout ? "1fr" : "1.1fr 0.9fr",
            gap: 28,
            alignItems: "center",
          }}
        >
          <div style={{ textAlign: isCompactLayout ? "center" : "left" }}>
            <span
              style={{
                fontFamily: "'Space Mono',monospace",
                fontSize: 10,
                letterSpacing: 6,
                color: "#FFE600",
                display: "block",
                marginBottom: 12,
              }}
            >
              {gacha.eyebrowLabel}
            </span>
            <h1
              style={{
                fontFamily: "'Bebas Neue',sans-serif",
                fontSize: "clamp(42px,6vw,78px)",
                lineHeight: 0.9,
                letterSpacing: "-0.5px",
                marginBottom: 22,
              }}
            >
              <span>
                <GlitchText text={`${gacha.titleLine1Prefix} `} animateOnMount />
              </span>
              <span style={{ color: "#FFE600" }}>
                <GlitchText text={gacha.titleLine1Highlight} animateOnMount />
              </span>
              <br />
              <span style={{ WebkitTextStroke: "1px #3a3a3a", color: "transparent" }}>
                <GlitchText text={gacha.titleLine2} animateOnMount />
              </span>
            </h1>

            <PullButton
              onClick={executePull}
              disabled={pulling || decrypting}
              pulling={pulling}
              pullingLabel={gacha.pullingLabel}
              pullButtonLabel={gacha.pullButtonLabel}
            />
          </div>

          <div
            style={{
              width: "100%",
              minHeight: 420,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: 320,
                height: 400,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {result ? (
                <Card
                  result={result}
                  visible={cardVisible}
                  hiddenName={gacha.cardHiddenName}
                  hiddenType={gacha.cardHiddenType}
                  typeTemplate={gacha.cardTypeTemplate}
                  hiddenFlavor={gacha.cardHiddenFlavor}
                  onRevealComplete={() => setDecrypting(false)}
                />
              ) : (
                <div
                  style={{
                    width: 320,
                    border: "2px dashed #222",
                    height: 380,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                    gap: 16,
                  }}
                >
                  <div
                    style={{
                      fontFamily: "'Space Mono',monospace",
                      fontSize: 48,
                      color: "#222",
                    }}
                  >
                    {gacha.placeholderGlyph}
                  </div>
                  <div
                    style={{
                      fontFamily: "'Space Mono',monospace",
                      fontSize: 10,
                      letterSpacing: 4,
                      color: "#2a2a2a",
                    }}
                  >
                    {gacha.awaitingInputLabel}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div style={{ position: "relative", zIndex: 1, display: "flex", gap: 32 }}>
          {GACHA_RARITIES.slice()
            .reverse()
            .map((rarity) => (
              <div key={rarity.id} style={{ textAlign: "center" }}>
                <div
                  style={{
                    fontFamily: "'Bebas Neue',sans-serif",
                    fontSize: 20,
                    color: rarity.color,
                    opacity: 0.85,
                  }}
                >
                  {rarity.weight}%
                </div>
                <div
                  style={{
                    fontFamily: "'Space Mono',monospace",
                    fontSize: 8,
                    letterSpacing: 2,
                    color: "#333",
                    marginTop: 2,
                  }}
                >
                  {rarity.label}
                </div>
              </div>
            ))}
        </div>
        <hr style={aboutStyles.separator} />
      </section>
    </div>
  );
}
