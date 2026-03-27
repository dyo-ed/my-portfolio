import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import type { HeaderStrings } from "./headerContract";

export interface HeaderModel {
  currentTime: Date;
  activeSection: string;
  sectionIds: string[];
  registerSectionRef: (id: string, element: HTMLElement | null) => void;
  onScrollTo: (id: string, label: string) => void;
}

export function useHeaderModel(header: HeaderStrings): HeaderModel {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeSection, setActiveSection] = useState(header.homeLabel);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  const sectionIds = useMemo(
    () => ["hero", ...header.navItems.map((item) => item.id)],
    [header.navItems]
  );

  const idToLabel = useMemo(
    () =>
      new Map<string, string>([
        ["hero", header.homeLabel],
        ...header.navItems.map((item): [string, string] => [item.id, item.label]),
      ]),
    [header.homeLabel, header.navItems]
  );

  useEffect(() => {
    const clockInterval = window.setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => window.clearInterval(clockInterval);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (!visible) {
          return;
        }

        const label = idToLabel.get(visible.target.id);
        if (label) {
          setActiveSection(label);
        }
      },
      {
        rootMargin: "-20% 0px -65% 0px",
        threshold: [0.2, 0.5, 0.8],
      }
    );

    sectionIds.forEach((id) => {
      const element = sectionRefs.current[id];
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [idToLabel, sectionIds]);

  const registerSectionRef = useCallback(
    (id: string, element: HTMLElement | null) => {
      sectionRefs.current[id] = element;
    },
    []
  );

  const onScrollTo = useCallback((id: string, label: string) => {
    const target = sectionRefs.current[id];
    if (!target) {
      return;
    }

    target.scrollIntoView({ behavior: "smooth", block: "start" });
    setActiveSection(label);
  }, []);

  return {
    currentTime,
    activeSection,
    sectionIds,
    registerSectionRef,
    onScrollTo,
  };
}
