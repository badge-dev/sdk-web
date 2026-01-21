export type {BadgeSdk} from "./sdk.ts";

export {
  embedTemplatePage,
  type EmbedTemplatePageOptions,
  type TemplateEmbedFeatures,
} from "./calls/embedTemplatePage.ts";
export {
  embedTemplateEditorPage,
  type EmbedTemplateEditorPageOptions,
  type TemplateEditorFeatures,
  TEMPLATE_EDITOR_FEATURES_DEFAULT,
  TEMPLATE_EDITOR_FEATURES_ALL,
  TEMPLATE_EDITOR_FEATURES_NONE,
  TEMPLATE_EDITOR_FEATURES_ENABLE_BARCODE,
} from "./calls/embedTemplateEditorPage.ts";
export {makeSdk, type SdkOptions} from "./calls/makeSdk.ts";
