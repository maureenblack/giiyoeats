import { mkdir } from "node:fs/promises";
import { chromium } from "playwright";

const base = process.argv[2];
const label = process.argv[3];
const outDir = process.argv[4] ?? "/opt/cursor/artifacts";

if (!base || !label) {
  console.error("Usage: node scripts/capture-join.mjs <baseUrl> <label> [outDir]");
  process.exit(1);
}

await mkdir(outDir, { recursive: true });

const browser = await chromium.launch();
const widths = [360, 1280];

try {
  for (const width of widths) {
    const page = await browser.newPage({
      viewport: { width, height: width === 360 ? 780 : 900 },
    });
    const response = await page.goto(`${base}/join`, {
      waitUntil: "domcontentloaded",
      timeout: 30000,
    });
    if (!response || !response.ok()) {
      throw new Error(`GET /join failed (${response?.status() ?? "no response"})`);
    }
    await page.getByRole("heading", { name: "Good lunch is coming to work." }).waitFor();
    await page.evaluate(() => document.fonts.ready);

    const frame = page.locator("iframe");
    if ((await frame.count()) > 0) {
      await frame.scrollIntoViewIfNeeded();
      await page.waitForTimeout(2500);
    }

    const overflow = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
    }));
    if (overflow.scrollWidth > overflow.clientWidth + 1) {
      throw new Error(
        `Horizontal overflow at ${width}px: scrollWidth ${overflow.scrollWidth} > clientWidth ${overflow.clientWidth}`,
      );
    }

    await page.screenshot({
      path: `${outDir}/join-${width}-${label}.png`,
      fullPage: true,
    });
    await page.close();
  }
} finally {
  await browser.close();
}
