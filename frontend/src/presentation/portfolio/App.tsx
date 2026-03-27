import appStrings from "../../locales/en/appStrings.json";
import HeaderView from "../../presentation/components/header/headerView";
import { useHeaderModel } from "../../presentation/components/header/headerModel";
import FooterView from "../../presentation/components/footer/footerView";

import "./App.css";

export default function App() {
  const { activeSection, currentTime, sectionIds, registerSectionRef, onScrollTo } =
    useHeaderModel(appStrings.header);

  return (
    <div className="app-shell">
      <HeaderView
        activeSection={activeSection}
        currentTime={currentTime}
        header={appStrings.header}
        onScrollTo={onScrollTo}
      />

      <main className="app-content">
        <section
          id="hero"
          ref={(element) => {
            registerSectionRef("hero", element);
          }}
        />

        {sectionIds.filter((id) => id !== "hero").map((id) => (
          <section
            key={id}
            id={id}
            ref={(element) => {
              registerSectionRef(id, element);
            }}
          />
        ))}
      </main>

      <FooterView footer={appStrings.footer} />
    </div>
  );
}
