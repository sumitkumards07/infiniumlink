/** Parse a #rgb / #rrggbb hex color and return its WCAG relative luminance (null when invalid). */
export function hexToLuminance(hex: string): number | null {
  let h = hex.replace("#", "").trim();
  if (h.length === 3) h = h.split("").map((c) => c + c).join("");
  if (h.length !== 6) return null;
  const n = Number.parseInt(h, 16);
  if (Number.isNaN(n)) return null;
  const channels = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((v) => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
}

/** WCAG contrast ratio (1–21) between two hex colors; null when either is invalid. */
export function contrastRatio(fg: string, bg: string): number | null {
  const lf = hexToLuminance(fg);
  const lb = hexToLuminance(bg);
  if (lf === null || lb === null) return null;
  const [hi, lo] = lf > lb ? [lf, lb] : [lb, lf];
  return (hi + 0.05) / (lo + 0.05);
}

/** Append an alpha byte to a hex color ("#RRGGBB" + "AA"). Returns the input unchanged when invalid. */
export function withAlpha(hex: string, alphaHex: string): string {
  let h = hex.replace("#", "").trim();
  if (h.length === 3) h = h.split("").map((c) => c + c).join("");
  if (h.length !== 6) return hex;
  return `#${h}${alphaHex}`;
}
