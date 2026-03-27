import appStrings from "../../../locales/en/appStrings.json";
import { contactConstant, contactStyles } from "../../../utils/constants/contactConstant";

export default function ContactPage() {
  const { contact } = appStrings;

  return (
    <section style={contactStyles.section}>
      <div style={contactStyles.grid}>
        <div>
          <span className="section-label">{contact.sectionLabel}</span>
          <h2 style={contactStyles.heading}>
            {contact.titleLine1}
            <br />
            <span style={{ color:"#FFE600" }}>{contact.titleHighlight}</span>
            <br />
            {contact.titleLine3}
          </h2>
          <p style={contactStyles.description}>
            {contact.description}
          </p>
          <div style={contactStyles.contactList}>
            {[
              { label: contact.emailLabel, val: contactConstant.email },
              { label: contact.githubLabel, val: contactConstant.github },
              { label: contact.linkedinLabel, val: contactConstant.linkedin },
            ].map((l) => (
              <div
                key={l.label}
                style={contactStyles.contactRow}
              >
                <span style={contactStyles.contactRowLabel}>
                  {l.label}
                </span>
                <span style={{ color:"#ccc" }}>{l.val}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={contactStyles.rightPanel}>
          <div style={contactStyles.sendMessageTitle}>
            {contact.sendMessageLabel}
          </div>
          {contact.fields.map((f) => (
            <div key={f.id}>
              <label style={contactStyles.formLabel}>
                {f.label}
              </label>
              <input className="contact-input" placeholder={`// ${f.label.toLowerCase()}`} />
            </div>
          ))}
          <div>
            <label style={contactStyles.formLabel}>{contact.messageLabel}</label>
            <textarea
              className="contact-input"
              rows={4}
              placeholder={contact.messagePlaceholder}
              style={contactStyles.textarea}
            />
          </div>
          <button className="btn-primary" style={contactStyles.sendButton}>
            {contact.sendButtonLabel}
          </button>
        </div>
      </div>
    </section>
  );
}

