import appStrings from "../../../locales/en/appStrings.json";
import FooterView from "../../components/footer/footerView";
import HeaderView from "../../components/header/headerView";
import { useHeaderModel } from "../../components/header/headerModel";

import { Outlet } from "react-router-dom";

export default function AppLayout() {
  const { activeSection, currentTime, onRouteTo } = useHeaderModel(appStrings.header);

  return (
    <div className="app-shell">
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

