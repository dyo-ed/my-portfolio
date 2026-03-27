import { useCallback, useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import type { HeaderStrings } from "./headerContract";

export interface HeaderModel {
  currentTime: Date;
  activeSection: string;
  onRouteTo: (id: string, label: string) => void;
}

export function useHeaderModel(header: HeaderStrings): HeaderModel {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeSection, setActiveSection] = useState(header.homeLabel);

  const idToLabel = useMemo(() => {
    return new Map<string, string>([
      ["", header.homeLabel],
      ...header.navItems.map((item): [string, string] => [item.id, item.label]),
    ]);
  }, [header.homeLabel, header.navItems]);

  useEffect(() => {
    const clockInterval = window.setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => window.clearInterval(clockInterval);
  }, []);

  useEffect(() => {
    const pathId = location.pathname.replace(/^\//, "");
    const label = idToLabel.get(pathId);
    setActiveSection(label ?? header.homeLabel);
  }, [header.homeLabel, idToLabel, location.pathname]);

  const onRouteTo = useCallback(
    (id: string, label: string) => {
      // `id` is treated as a route id ("" for home).
      navigate(id ? `/${id}` : "/");
      setActiveSection(label);
    },
    [navigate]
  );

  return {
    currentTime,
    activeSection,
    onRouteTo,
  };
}
