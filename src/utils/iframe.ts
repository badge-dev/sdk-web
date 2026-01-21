import type {TemplateEditorConfig} from "../calls/embedTemplateEditorPage";
import type {TemplateEmbedConfig} from "../calls/embedTemplatePage";

interface CreateIframeOptions {
  token: string;
  path: string;
  pathHash: string;
  config: TemplateEmbedConfig | TemplateEditorConfig;
}

export function createEmbedIframe(
  options: CreateIframeOptions,
): HTMLIFrameElement {
  const {path, token, pathHash, config} = options;

  const iframe = document.createElement("iframe");

  iframe.style.width = "100%";
  iframe.style.height = "100%";
  iframe.style.border = "none";

  const iframeUrl = new URL(path);

  iframeUrl.searchParams.set("token", token);
  iframeUrl.searchParams.set("config", JSON.stringify(config));

  iframeUrl.hash = pathHash;

  iframe.src = iframeUrl.toString();

  return iframe;
}
