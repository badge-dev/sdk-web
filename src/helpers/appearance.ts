export interface AppearanceConfig {
  mode?: AppearanceMode;
  fontFamily?: string | undefined;
  colors?: {
    primary?: string | undefined;
    neutral?: string | undefined;
  };
}

export type AppearanceMode = "light" | "dark";

export type FontSource = CssFontSource | CustomFontSource;

export interface CssFontSource {
  cssSrc: string;
}

export interface CustomFontSource {
  family: string;
  src: string;
  weight?:
    | "100"
    | "200"
    | "300"
    | "400"
    | "500"
    | "600"
    | "700"
    | "800"
    | "900";
  style?: "normal" | "italic" | "oblique";
  unicodeRange?: string;
}
