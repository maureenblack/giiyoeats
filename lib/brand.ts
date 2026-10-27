import fs from "node:fs";
import path from "node:path";

/**
 * Approved logo files, copied byte-for-byte from the brand pack
 * (Giiyo Eats/Brand/Logo Assets/). Do not redraw, recompress, or trace them.
 * Served with <img>, not next/image, so the files stay unchanged.
 */
export const GIIYO_EATS_WORDMARK_PATH =
  "/brand/GiiyoEats_Logo_Wordmark_Red_Transparent.png";
export const GIIYO_EATS_WORDMARK_WIDTH = 1088;
export const GIIYO_EATS_WORDMARK_HEIGHT = 666;

export const GIIYO_EATS_MARK_PATH =
  "/brand/GiiyoEats_Logo_Mark_Red_Transparent.png";
export const GIIYO_EATS_MARK_WIDTH = 257;
export const GIIYO_EATS_MARK_HEIGHT = 362;

function publicFileExists(urlPath: string) {
  return fs.existsSync(
    path.join(process.cwd(), "public", urlPath.replace(/^\//, "")),
  );
}

export const hasApprovedWordmark = publicFileExists(GIIYO_EATS_WORDMARK_PATH);
export const hasApprovedMark = publicFileExists(GIIYO_EATS_MARK_PATH);
