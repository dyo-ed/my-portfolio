import React, { useState, useEffect, useRef } from "react";
import appStrings from "../../../locales/en/appStrings.json";
import GlitchText from "../glitch_text/glitchText";
import {
  REVIEWS,
  REVIEWS_CARD_STRIDE,
  REVIEWS_CARD_W,
  reviewsCarouselStyles,
} from "../../../utils/constants/homeConstant";

// ─── STAR COMPONENT ───────────────────────────────────────────────────────────

function Stars({ count = 5 }: { count?: number }) {
  return (
    <div style={reviewsCarouselStyles.starContainer}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="13" height="13" viewBox="0 0 24 24" fill={i < count ? "#FFE600" : "#2a2a2a"}>
          <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
        </svg>
      ))}
    </div>
  );
}

// ─── REVIEW CARD ─────────────────────────────────────────────────────────────

function ReviewCard({ review }: { review: typeof REVIEWS[0] }) {
  const [hovered, setHovered] = useState(false);
  const [grabbed, setGrabbed] = useState(false);

  useEffect(() => {
    if (!grabbed) return;
    const handleUp = () => setGrabbed(false);
    window.addEventListener("pointerup", handleUp);
    window.addEventListener("pointercancel", handleUp);
    return () => {
      window.removeEventListener("pointerup", handleUp);
      window.removeEventListener("pointercancel", handleUp);
    };
  }, [grabbed]);

  const isActive = hovered || grabbed;

  return (
    <div
      draggable={false}
      onDragStart={(e) => e.preventDefault()}
      onPointerDown={() => setGrabbed(true)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        ...reviewsCarouselStyles.cardInner,
        flex: `0 0 ${REVIEWS_CARD_W}px`,
        border: `1px solid ${isActive ? review.color : "#222"}`,
        background: isActive ? "#111" : "#0d0d0d",
      }}
    >
      <span style={reviewsCarouselStyles.cardId}>{review.id}</span>

      <Stars count={review.stars} />

      <p style={reviewsCarouselStyles.cardText}>
        "{review.text}"
      </p>

      <div style={reviewsCarouselStyles.cardDivider} />

      <div style={reviewsCarouselStyles.authorRow}>
        <div
          style={{
            width: 42,
            height: 42,
            borderRadius: "50%",
            border: `2px solid ${review.color}`,
            background: `${review.color}18`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 14,
            letterSpacing: 1,
            color: review.color,
            flexShrink: 0,
          }}
        >
          {review.avatar}
        </div>
        <div>
          <div style={reviewsCarouselStyles.authorName}>
            {review.name}
          </div>
          <div style={{ ...reviewsCarouselStyles.authorOrg, color: review.color }}>
            {review.org}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── CAROUSEL ROW ─────────────────────────────────────────────────────────────

function CarouselRow({ items, direction = 1, speed = 30 }: { items: typeof REVIEWS, direction?: number, speed?: number }) {
  const trackRef   = useRef<HTMLDivElement>(null);
  const wrapRef    = useRef<HTMLDivElement>(null);
  const posRef     = useRef(0);
  const rafRef     = useRef<number | null>(null);
  const lastTs     = useRef<number | null>(null);
  const dragRef    = useRef({ active: false, lastX: 0, vel: 0 });
  const currentDir = useRef(direction);

  const copies = [...items, ...items, ...items, ...items];
  const loopW  = items.length * REVIEWS_CARD_STRIDE;

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    posRef.current = 0;
    lastTs.current = null;
    currentDir.current = direction; // Reset on prop change

    // ── animation loop ──
    const tick = (ts: number) => {
      if (lastTs.current === null) lastTs.current = ts;
      const dt = Math.min(ts - lastTs.current, 64);
      lastTs.current = ts;

      if (!dragRef.current.active) {
        // blend drag velocity back toward auto-scroll speed based on current direction
        dragRef.current.vel += ((speed * currentDir.current) - dragRef.current.vel) * 0.06;
        posRef.current += (dragRef.current.vel / 1000) * dt;
      } else {
        // decay explicit drag velocity when held still
        dragRef.current.vel *= 0.9;
      }

      posRef.current = ((posRef.current % loopW) + loopW) % loopW;
      track.style.transform = `translateX(${-posRef.current}px)`;
      rafRef.current = requestAnimationFrame(tick);
    };

    // seed velocity so there's no lurch on mount
    dragRef.current.vel = speed * currentDir.current;
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      lastTs.current = null;
    };
  }, [loopW, direction, speed]);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    dragRef.current.active = true;
    dragRef.current.lastX = e.clientX;
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragRef.current.active) return;
    const dx = e.clientX - dragRef.current.lastX;
    
    // Update persistent auto-scroll direction if dragged sufficiently
    if (dx > 2) currentDir.current = -1; // dragging right, continue right
    else if (dx < -2) currentDir.current = 1; // dragging left, continue left
    
    dragRef.current.vel = -dx * 16;
    posRef.current -= dx;
    dragRef.current.lastX = e.clientX;
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    dragRef.current.active = false;
    e.currentTarget.releasePointerCapture(e.pointerId);
  };

  return (
    <div 
      ref={wrapRef} 
      style={{ ...reviewsCarouselStyles.carouselWrap, touchAction: "pan-y" }}
      data-prevent-selection="true"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      <div ref={trackRef} style={reviewsCarouselStyles.track}>
        {copies.map((r, i) => (
          <ReviewCard key={`${r.id}-${i}`} review={r} />
        ))}
      </div>
    </div>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────

export default function ReviewsCarousel() {
  const { reviewsCarousel: content } = appStrings.home;
  
  const row1 = REVIEWS.slice(0, 5);
  const row2 = REVIEWS.slice(5, 10);



  return (
    <div 
      style={reviewsCarouselStyles.section} 
    >
      {/* Header */}
      <div style={reviewsCarouselStyles.header}>
        <span style={reviewsCarouselStyles.label}>
          {content.label}
        </span>
        <div style={reviewsCarouselStyles.headingRow}>
          <h2 style={reviewsCarouselStyles.heading}>
            <GlitchText text={content.headingLine1} animateOnMount />{' '}
            <span style={reviewsCarouselStyles.headingHighlight}>
              <GlitchText text={content.headingLine2} animateOnMount />
            </span>{' '}
            <GlitchText text={content.headingLine3} animateOnMount />
          </h2>
          <div style={reviewsCarouselStyles.metrics}>
            {content.reviewsCount.replace("{count}", String(REVIEWS.length))}<br />
            {content.avgRating}
          </div>
        </div>
      </div>

      {/* Rows + edge fades in a relative container */}
      <div style={reviewsCarouselStyles.relativeContainer}>
        <div style={reviewsCarouselStyles.rowsContainer}>
          <CarouselRow items={row1} direction={1}  speed={32} />
          <CarouselRow items={row2} direction={-1} speed={28} />
        </div>

        {/* Edge fades overlay */}
        <div style={reviewsCarouselStyles.fadesWrap}>
          <div style={reviewsCarouselStyles.fadeLeft} />
          <div style={reviewsCarouselStyles.fadeRight} />
        </div>
      </div>
    </div>
  );
}
