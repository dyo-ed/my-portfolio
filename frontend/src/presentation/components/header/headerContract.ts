export interface HeaderNavItem {
  id: string;
  label: string;
}

export interface HeaderStrings {
  brand: string;
  homeLabel: string;
  clockLocale: string;
  navItems: HeaderNavItem[];
}

export interface AppStrings {
  header: HeaderStrings;
}

export interface HeaderViewProps {
  activeSection: string;
  currentTime: Date;
  header: HeaderStrings;
  onScrollTo: (id: string, label: string) => void;
}
