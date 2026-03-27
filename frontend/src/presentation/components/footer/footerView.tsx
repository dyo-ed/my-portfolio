import type { FooterViewProps } from "./footerContract";
import { footerStyles } from "../../../utils/constants/footerConstant";

export default function FooterView({ footer }: FooterViewProps) {
  return (
    <footer style={footerStyles.footer}>
      <span style={footerStyles.text}>{footer.signature}</span>
      <span style={footerStyles.text}>
        {footer.tagline}
        <span style={footerStyles.cursor}>{footer.cursorGlyph}</span>
      </span>
    </footer>
  );
}