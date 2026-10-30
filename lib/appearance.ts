/** Browser-local appearance: no tenant records or permissions are changed. */
export const APPEARANCE_KEY = "julia-appearance";

export const APPEARANCES = [
  {
    id: "default",
    name: "Padrão da empresa",
    description: "A identidade e as cores configuradas pela sua empresa.",
    mode: "system",
    preview: { bg: "#faf9f6", surface: "#ffffff", border: "#e7e3da", accent: "#506d48" },
  },
  {
    id: "graphite",
    name: "Grafite",
    description: "Preto e cinza, com contraste e um visual discreto.",
    mode: "dark",
    preview: { bg: "#09090f", surface: "#1c1b2b", border: "#302c43", accent: "#e2e8f0" },
  },
  {
    id: "violet",
    name: "Preto e roxo",
    description: "O visual JUL-IA: grafite profundo e detalhes em violeta.",
    mode: "dark",
    preview: { bg: "#09090f", surface: "#1c1b2b", border: "#302c43", accent: "#a78bfa" },
  },
  {
    id: "ocean",
    name: "Oceano",
    description: "Azul profundo e ciano para um ambiente envolvente.",
    mode: "dark",
    preview: { bg: "#07121b", surface: "#102633", border: "#234453", accent: "#67e8f9" },
  },
  {
    id: "blue",
    name: "Azul claro",
    description: "Superfícies claras com a energia do azul.",
    mode: "light",
    preview: { bg: "#f6f8fd", surface: "#ffffff", border: "#dbe3f2", accent: "#1d4ed8" },
  },
  {
    id: "mint",
    name: "Menta",
    description: "Verde suave, leve e confortável para o dia a dia.",
    mode: "light",
    preview: { bg: "#f4fbf8", surface: "#ffffff", border: "#d5e9e1", accent: "#047857" },
  },
  {
    id: "lilac",
    name: "Lilás",
    description: "Um visual claro com a personalidade do roxo.",
    mode: "light",
    preview: { bg: "#faf7fe", surface: "#ffffff", border: "#e8ddf2", accent: "#7e22ce" },
  },
] as const;
export type Appearance = (typeof APPEARANCES)[number]["id"];
export function isAppearance(value: unknown): value is Appearance {
  return APPEARANCES.some((item) => item.id === value);
}
export function readAppearance(): Appearance {
  try {
    const value = window.localStorage.getItem(APPEARANCE_KEY);
    return isAppearance(value) ? value : "default";
  } catch {
    return "default";
  }
}

// Only these static tokens are serialized. No arbitrary CSS or user input.
const palettes = {
  graphite: ["#334155", "#1e293b", "#e2e8f0", "#f1f5f9", "#e8edf4", "#202a37"],
  violet: ["#6d28d9", "#5b21b6", "#a78bfa", "#c4b5fd", "#ede9fe", "#28203f"],
  ocean: ["#0e7490", "#155e75", "#67e8f9", "#a5f3fc", "#cffafe", "#123441"],
  blue: ["#1d4ed8", "#1e40af", "#93c5fd", "#bfdbfe", "#dbeafe", "#1b2c4c"],
  mint: ["#047857", "#065f46", "#6ee7b7", "#a7f3d0", "#d1fae5", "#15392f"],
  lilac: ["#7e22ce", "#6b21a8", "#d8b4fe", "#e9d5ff", "#f3e8ff", "#362143"],
} as const;
export const APPEARANCE_CSS = Object.entries(palettes)
  .map(([id, p]) => {
    const selector =
      'html[data-julia-appearance="' + id + '"][data-julia-appearance][data-julia-appearance]';
    const light =
      "--color-accent:" +
      p[0] +
      ";--color-accent-hover:" +
      p[1] +
      ";--color-accent-soft:" +
      p[4] +
      ";--color-accent-fg:#ffffff;--color-accent-400:" +
      p[2] +
      ";--color-accent-300:" +
      p[3] +
      ";--color-accent-500:" +
      p[0] +
      ";--color-accent-600:" +
      p[0] +
      ";--color-accent-700:" +
      p[1] +
      ";";
    const dark =
      "--color-accent:" +
      p[2] +
      ";--color-accent-hover:" +
      p[3] +
      ";--color-accent-soft:" +
      p[5] +
      ";--color-accent-fg:#101018;";
    return (
      selector + " body{" + light + "}\n" + selector + '[data-theme="dark"] body{' + dark + "}"
    );
  })
  .join("\n");

export const APPEARANCE_INIT_SCRIPT =
  "(function(){try{var a=localStorage.getItem(" +
  JSON.stringify(APPEARANCE_KEY) +
  ');document.documentElement.setAttribute("data-julia-appearance",' +
  JSON.stringify(APPEARANCES.map((item) => item.id)) +
  '.indexOf(a)!==-1?a:"default");}catch(e){}})();';
