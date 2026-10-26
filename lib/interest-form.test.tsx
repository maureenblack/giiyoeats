import assert from "node:assert/strict";
import test from "node:test";
import { renderToStaticMarkup } from "react-dom/server";
import { JoinPage } from "@/components/join-page";
import { openFormUrl, resolveInterestForm } from "@/lib/interest-form";

const EMBED =
  "https://docs.google.com/forms/d/e/1FAIpQLSe1dsI0Jao2VB3wNTXTkiulzcTiv4bZ79pI8TSiJ0nR6sH7xA/viewform?embedded=true";

test("open-in-new-tab URL removes only embedded=true", () => {
  assert.equal(
    openFormUrl(EMBED),
    "https://docs.google.com/forms/d/e/1FAIpQLSe1dsI0Jao2VB3wNTXTkiulzcTiv4bZ79pI8TSiJ0nR6sH7xA/viewform",
  );

  assert.equal(
    openFormUrl(
      "https://docs.google.com/forms/d/e/abc/viewform?usp=pp_url&embedded=true&foo=1",
    ),
    "https://docs.google.com/forms/d/e/abc/viewform?usp=pp_url&foo=1",
  );

  assert.equal(
    openFormUrl(
      "https://docs.google.com/forms/d/e/abc/viewform?embedded=false",
    ),
    "https://docs.google.com/forms/d/e/abc/viewform?embedded=false",
  );

  assert.equal(
    openFormUrl("https://docs.google.com/forms/d/e/abc/viewform?embedded=true#section"),
    "https://docs.google.com/forms/d/e/abc/viewform#section",
  );
});

test("unset or non-form config is not configured", () => {
  for (const value of [
    undefined,
    null,
    "",
    "   ",
    "not a url",
    "https://example.com/forms/d/e/abc/viewform?embedded=true",
    "https://docs.google.com/spreadsheets/d/e/abc",
    "http://docs.google.com/forms/d/e/abc/viewform?embedded=true",
    "https://docs.google.com.evil.com/forms/d/e/abc/viewform",
  ]) {
    assert.deepEqual(resolveInterestForm(value), { configured: false });
  }

  const resolved = resolveInterestForm(EMBED);
  assert.equal(resolved.configured, true);
  if (resolved.configured) {
    assert.equal(resolved.embedUrl, EMBED);
    assert.equal(
      resolved.openUrl,
      "https://docs.google.com/forms/d/e/1FAIpQLSe1dsI0Jao2VB3wNTXTkiulzcTiv4bZ79pI8TSiJ0nR6sH7xA/viewform",
    );
  }
});

test("unset config hides the iframe and the open-form link", () => {
  const html = renderToStaticMarkup(
    <JoinPage form={{ configured: false }} />,
  );
  assert.equal(html.includes("<iframe"), false);
  assert.equal(html.includes("Open form in a new tab"), false);
  assert.match(html, /This page is not configured yet/);
  assert.match(html, /src="\/brand\/giiyo-eats-logo\.png"/);
});

test("configured form renders the iframe and derived link", () => {
  const form = resolveInterestForm(EMBED);
  const html = renderToStaticMarkup(<JoinPage form={form} />);
  assert.match(html, /<iframe/);
  assert.match(html, /title="Giiyo Eats lunch interest form"/);
  assert.match(html, /loading="lazy"/);
  assert.match(html, /Loading the interest form/);
  assert.match(html, /Open form in a new tab/);
  assert.match(
    html,
    /href="https:\/\/docs\.google\.com\/forms\/d\/e\/1FAIpQLSe1dsI0Jao2VB3wNTXTkiulzcTiv4bZ79pI8TSiJ0nR6sH7xA\/viewform"/,
  );
  assert.doesNotMatch(html, /This page is not configured yet/);
  assert.equal(html.includes("giiyotech@gmail.com"), false);
});
