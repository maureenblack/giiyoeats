import { FormEmbed } from "@/components/form-embed";
import {
  GIIYO_EATS_LOGO_HEIGHT,
  GIIYO_EATS_LOGO_PATH,
  GIIYO_EATS_LOGO_WIDTH,
  hasApprovedLogo,
} from "@/lib/brand";
import type { InterestForm } from "@/lib/interest-form";

export function JoinPage({ form }: { form: InterestForm }) {
  return (
    <div className="page">
      <a className="skip-link" href="#interest-form">
        Skip to the interest form
      </a>
      <header className="hero">
        {hasApprovedLogo ? (
          // Served as the original file. next/image would recompress it.
          // eslint-disable-next-line @next/next/no-img-element
          <img
            className="logo"
            src={GIIYO_EATS_LOGO_PATH}
            alt="Giiyo Eats"
            width={GIIYO_EATS_LOGO_WIDTH}
            height={GIIYO_EATS_LOGO_HEIGHT}
            fetchPriority="high"
          />
        ) : (
          <p className="logo-fallback">Giiyo Eats</p>
        )}
        <h1>Good lunch is coming to work.</h1>
        <p className="lede">
          Giiyo Eats is bringing fresh lunches to Bonamoussadi and Makepe from
          23 November 2026. 3,000 FCFA per meal, delivery included.
        </p>
        <p className="survey-note">
          The survey takes about 2 minutes and is non-binding.
        </p>
      </header>
      <main id="interest-form">
        {form.configured ? (
          <FormEmbed embedUrl={form.embedUrl} openUrl={form.openUrl} />
        ) : (
          <div className="unconfigured" role="status">
            <h2>This page is not configured yet</h2>
            <p>
              The interest form link has not been set, so the form is not
              shown.
            </p>
          </div>
        )}
        <p className="privacy">
          Responses are collected by Google Forms for Giiyo Eats only. Only
          people who answer “Yes, please” to the WhatsApp consent question
          receive launch or marketing messages. Submitting the form is not an
          order.
        </p>
      </main>
      <footer className="footer">
        <p>Giiyo Eats</p>
        <p>
          <a href="mailto:hello@giiyotech.com">hello@giiyotech.com</a>
        </p>
      </footer>
    </div>
  );
}
