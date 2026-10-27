import Image from "next/image";
import { FormEmbed } from "@/components/form-embed";
import {
  GIIYO_EATS_MARK_HEIGHT,
  GIIYO_EATS_MARK_PATH,
  GIIYO_EATS_MARK_WIDTH,
  GIIYO_EATS_WORDMARK_HEIGHT,
  GIIYO_EATS_WORDMARK_PATH,
  GIIYO_EATS_WORDMARK_WIDTH,
  hasApprovedMark,
  hasApprovedWordmark,
} from "@/lib/brand";
import type { InterestForm } from "@/lib/interest-form";

const FORM_SECTION_ID = "interest-form";

function Wordmark({
  className,
  alt,
  priority = false,
}: {
  className: string;
  alt: string;
  priority?: boolean;
}) {
  if (!hasApprovedWordmark) {
    return <p className="logo-fallback">Giiyo Eats</p>;
  }

  return (
    // Original brand-pack file. next/image would recompress it.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className={className}
      src={GIIYO_EATS_WORDMARK_PATH}
      alt={alt}
      width={GIIYO_EATS_WORDMARK_WIDTH}
      height={GIIYO_EATS_WORDMARK_HEIGHT}
      fetchPriority={priority ? "high" : "auto"}
    />
  );
}

const steps = [
  {
    n: "1",
    tone: "red",
    title: "Tell us where you work",
    body: "Office, shop or site, anywhere in Douala.",
  },
  {
    n: "2",
    tone: "red",
    title: "Tell us what you like",
    body: "The meals you enjoy and the time that suits you.",
  },
  {
    n: "3",
    tone: "olive",
    title: "Hear from us first",
    body: "Launch news and menus on WhatsApp, if you say yes.",
  },
] as const;

export function JoinPage({ form }: { form: InterestForm }) {
  return (
    <div className="page">
      <a className="skip-link" href={`#${FORM_SECTION_ID}`}>
        Skip to the interest form
      </a>
      <header className="site-header">
        <Wordmark className="logo" alt="Giiyo Eats" priority />
        <a className="join-list" href={`#${FORM_SECTION_ID}`}>
          Join the list
        </a>
      </header>

      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="launch-pill">Launching Monday 23 November</p>
          <h1 id="hero-title">
            Good lunch
            <br />
            is coming
            <br />
            to work.
          </h1>
          <p className="lede">
            Giiyo Eats is bringing fresh lunches to Douala from 23 November
            2026. 3,000 FCFA per meal, delivery included.
          </p>
          <div className="hero-actions">
            <a className="survey-btn" href={`#${FORM_SECTION_ID}`}>
              Take the 2-minute survey
            </a>
            <p className="fine-print">
              Non-binding.
              <br />
              No payment.
            </p>
          </div>
        </div>

        <div className="hero-visual">
          <div className="lunch-circle">
            <Image
              src="/food/hero-bowls.jpg"
              alt="Rice bowls with grilled chicken, glazed chicken and fresh salad"
              fill
              sizes="(max-width: 979px) 328px, 496px"
              quality={85}
              className="hero-dish"
              preload
            />
          </div>
          <p className="price-badge">
            <span className="price-amount">
              3,000 <span className="price-currency">FCFA</span>
            </span>
            <span className="price-note">Delivered</span>
          </p>
          {hasApprovedMark ? (
            <div className="mark-badge">
              {/* Decorative smiling mark. The wordmark already names the brand. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={GIIYO_EATS_MARK_PATH}
                alt=""
                width={GIIYO_EATS_MARK_WIDTH}
                height={GIIYO_EATS_MARK_HEIGHT}
              />
            </div>
          ) : null}
        </div>
      </section>

      <section className="steps" aria-label="What the survey asks">
        <ol>
          {steps.map((step) => (
            <li key={step.n}>
              <span className={`step-num step-num-${step.tone}`}>{step.n}</span>
              <div className="step-copy">
                <p className="step-title">{step.title}</p>
                <p>{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="survey" id={FORM_SECTION_ID}>
        <div className="survey-inner">
          <h2>Help us plan your lunch.</h2>
          <p className="survey-copy">
            The survey takes roughly 2 minutes and is non-binding. It is not an
            order and you will not be asked to pay.
          </p>
          {form.configured ? (
            <FormEmbed embedUrl={form.embedUrl} openUrl={form.openUrl} />
          ) : (
            <div className="form-card">
              <div className="unconfigured" role="status">
                <p className="unconfigured-title">
                  This page is not configured yet
                </p>
                <p>
                  The interest form link has not been set, so the form is not
                  shown.
                </p>
              </div>
            </div>
          )}
          <p className="privacy">
            Your answers go to the Giiyo Eats team through Google Forms and are
            only used to plan deliveries. We will only message you on WhatsApp
            if you answer &quot;Yes, please&quot; to the last question.
          </p>
        </div>
      </section>

      <footer className="site-footer">
        <div className="footer-inner">
          <Wordmark className="logo logo-footer" alt="" />
          <div className="footer-contact">
            <p>
              Questions?{" "}
              <a href="mailto:eats@giiyo.com">eats@giiyo.com</a>
            </p>
            <p>Douala, Cameroon</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
