"use client";

import { useState } from "react";

type FormEmbedProps = {
  embedUrl: string;
  openUrl: string;
};

export function FormEmbed({ embedUrl, openUrl }: FormEmbedProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="form-block">
      <div className="form-card">
        <p className="form-loading" role="status" hidden={loaded}>
          Loading the form...
        </p>
        <iframe
          className="interest-frame"
          src={embedUrl}
          title="Giiyo Eats lunch interest form"
          loading="lazy"
          onLoad={() => setLoaded(true)}
        />
      </div>
      <div className="form-actions">
        <a
          className="open-form"
          href={openUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          Open form in a new tab <span aria-hidden="true">↗</span>
        </a>
      </div>
    </div>
  );
}
