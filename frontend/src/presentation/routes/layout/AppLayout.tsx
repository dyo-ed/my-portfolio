import React from "react";
import appStrings from "../../../locales/en/appStrings.json";
import FooterView from "../../components/footer/footerView";
import HeaderView from "../../components/header/headerView";
import { useHeaderModel } from "../../components/header/headerModel";
import SelectionLayer from "../../components/selection/selectionLayer";
import TabInputsOnly from "../../components/keyboard/tabInputsOnly";
import { Outlet, useLocation } from "react-router-dom";
// import StarsBackground from "../../components/stars/StarsBackground";

export default function AppLayout() {
  const { activeSection, currentTime, onRouteTo } = useHeaderModel(appStrings.header);
  const location = useLocation();

  // Always scroll to top when navigating between pages.
  // (Prevents landing mid-page when you were previously scrolled down.)
  React.useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [location.key]);

  return (
    <div className="app-shell">
      {/* <StarsBackground /> */}
      <SelectionLayer />
      <TabInputsOnly />
      <HeaderView
        activeSection={activeSection}
        currentTime={currentTime}
        header={appStrings.header}
        onScrollTo={onRouteTo}
      />
      <main className="app-content">
        <Outlet />
      </main>
      <FooterView footer={appStrings.footer} />
    </div>
  );
}

