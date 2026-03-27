import { useEffect, useMemo, useRef, useState } from "react";

type Rect = {
  left: number;
  top: number;
  width: number;
  height: number;
};

function isInteractiveTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) return false;

  const tag = target.tagName;
  if (tag === "BUTTON") return true;
  if (tag === "A") return true;
  if (tag === "INPUT") return true;
  if (tag === "TEXTAREA") return true;
  if (tag === "SELECT") return true;
  if (tag === "LABEL") return true;

  if (target.isContentEditable) return true;
  if (target.closest("button,a,input,textarea,select,[contenteditable='true']")) return true;

  return false;
}

export default function SelectionLayer() {
  const [rect, setRect] = useState<Rect | null>(null);

  const startRef = useRef<{ x: number; y: number } | null>(null);
  const draggingRef = useRef(false);
  const didMoveRef = useRef(false);
  const rafRef = useRef<number | null>(null);
  const lastPointRef = useRef<{ x: number; y: number } | null>(null);
  const listenerOptions: AddEventListenerOptions = { capture: true };

  const cancel = () => {
    draggingRef.current = false;
    didMoveRef.current = false;
    startRef.current = null;
    setRect(null);
  };

  useEffect(() => {
    const onPointerDown = (e: PointerEvent) => {
      // Only mimic mouse selection (skip touch/pen for this design).
      if (e.pointerType !== "mouse") return;
      if (e.button !== 0) return;
      if (isInteractiveTarget(e.target)) return;

      draggingRef.current = true;
      didMoveRef.current = false;
      startRef.current = { x: e.clientX, y: e.clientY };

      // Don't show until the user has moved enough to be considered "dragging".
      setRect(null);

      // Prevent native selection flashes.
      e.preventDefault();
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!draggingRef.current) return;
      const start = startRef.current;
      if (!start) return;

      const dx = Math.abs(e.clientX - start.x);
      const dy = Math.abs(e.clientY - start.y);
      if (!didMoveRef.current && dx + dy > 4) didMoveRef.current = true;
      if (!didMoveRef.current) return;

      lastPointRef.current = { x: e.clientX, y: e.clientY };
      if (rafRef.current != null) return;

      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        const point = lastPointRef.current;
        const s = startRef.current;
        if (!point || !s) return;

        const left = Math.min(s.x, point.x);
        const top = Math.min(s.y, point.y);
        const width = Math.abs(point.x - s.x);
        const height = Math.abs(point.y - s.y);

        setRect({ left, top, width, height });
      });
    };

    const onPointerUp = () => cancel();
    const onPointerCancel = () => cancel();

    window.addEventListener("pointerdown", onPointerDown, listenerOptions);
    window.addEventListener("pointermove", onPointerMove, listenerOptions);
    window.addEventListener("pointerup", onPointerUp, listenerOptions);
    window.addEventListener("pointercancel", onPointerCancel, listenerOptions);

    return () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
      cancel();
      window.removeEventListener("pointerdown", onPointerDown, listenerOptions);
      window.removeEventListener("pointermove", onPointerMove, listenerOptions);
      window.removeEventListener("pointerup", onPointerUp, listenerOptions);
      window.removeEventListener("pointercancel", onPointerCancel, listenerOptions);
    };
  }, []);

  const style = useMemo(() => {
    if (!rect) return undefined;
    return {
      left: rect.left,
      top: rect.top,
      width: rect.width,
      height: rect.height,
    };
  }, [rect]);

  return rect ? (
    <div className="selection-rect" style={style} aria-hidden="true" />
  ) : null;
}

