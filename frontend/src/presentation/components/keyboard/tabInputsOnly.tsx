import { useEffect } from "react";

const INPUT_SELECTOR =
  "input:not([type='hidden']):not([disabled]), textarea:not([disabled]), select:not([disabled]), [contenteditable]";

function isInputTarget(el: Element | null) {
  if (!(el instanceof HTMLElement)) return false;
  const tag = el.tagName;
  if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return !el.hasAttribute("disabled");
  if (el.isContentEditable) return true;
  return false;
}

function isActuallyVisible(el: HTMLElement) {
  const style = window.getComputedStyle(el);
  if (style.display === "none") return false;
  if (style.visibility === "hidden") return false;
  if (el.getClientRects().length === 0) return false;
  return true;
}

function getAllowedInputs(): HTMLElement[] {
  const nodes = Array.from(document.querySelectorAll(INPUT_SELECTOR)) as HTMLElement[];
  return nodes.filter((el) => isActuallyVisible(el) && isInputTarget(el));
}

export default function TabInputsOnly() {
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;

      const allowed = getAllowedInputs();
      e.preventDefault(); // disable normal tabbing through buttons/nav

      const active = document.activeElement;
      const activeIndex = allowed.indexOf(active as HTMLElement);
      const activeIsAllowed = activeIndex !== -1 && isInputTarget(active);

      // If focus isn't on an input, route Tab to the next input (first one).
      if (!activeIsAllowed) {
        if (allowed.length === 0) return;
        allowed[0].focus();
        return;
      }

      if (allowed.length === 0) return;

      const currentIndex = Math.max(0, activeIndex);
      const direction = e.shiftKey ? -1 : 1;

      const nextIndexRaw = currentIndex + direction;
      const nextIndex =
        nextIndexRaw < 0
          ? allowed.length - 1
          : nextIndexRaw >= allowed.length
            ? 0
            : nextIndexRaw;

      allowed[nextIndex].focus();
    };

    document.addEventListener("keydown", onKeyDown, true);
    return () => document.removeEventListener("keydown", onKeyDown, true);
  }, []);

  return null;
}

