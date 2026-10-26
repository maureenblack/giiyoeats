import fs from "node:fs";
import path from "node:path";

/**
 * Public path of the approved logo.
 * On disk: public/brand/giiyo-eats-logo.png
 * Do not point this at a redrawn or substitute asset.
 */
export const GIIYO_EATS_LOGO_PATH = "/brand/giiyo-eats-logo.png";

/** Pixel size of the approved file (IHDR). Not a resized derivative. */
export const GIIYO_EATS_LOGO_WIDTH = 1536;
export const GIIYO_EATS_LOGO_HEIGHT = 1024;

export const hasApprovedLogo = fs.existsSync(
  path.join(process.cwd(), "public", GIIYO_EATS_LOGO_PATH.slice(1)),
);
