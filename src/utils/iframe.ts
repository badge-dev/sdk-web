import type {
  Navigation,
  TemplateEmbedFeatures,
} from "../helpers/embedFeatures.ts";
import type {FontSource, AppearanceConfig} from "../helpers/appearance";

export interface CreateIframeOptions {
  token: string;
  path: string;
  pathHash: string;
  navigation: Navigation;
  config: {
    features?: TemplateEmbedFeatures | undefined;
    fonts?: FontSource[] | undefined;
    appearance?: AppearanceConfig | undefined;
  };
}

export function createEmbedIframe(
  options: CreateIframeOptions,
): HTMLIFrameElement {
  const {path, token, pathHash, navigation, config} = options;

  const iframe = document.createElement("iframe");

  iframe.style.width = "100%";
  iframe.style.height = "100%";
  iframe.style.border = "none";

  const iframeUrl = new URL(path);

  iframeUrl.searchParams.set("token", token);
  iframeUrl.searchParams.set("navigation", navigation);
  iframeUrl.searchParams.set("config", JSON.stringify(config));

  iframeUrl.hash = pathHash;

  iframe.src = iframeUrl.toString();

  return iframe;
}
