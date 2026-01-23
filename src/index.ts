export type {BadgeSdk} from "./sdk.ts";

export {
  embedTemplatePage,
  type EmbedTemplatePageOptions,
} from "./calls/embedTemplatePage.ts";
export {
  embedTemplateEditorPage,
  type EmbedTemplateEditorPageOptions,
} from "./calls/embedTemplateEditorPage.ts";
export {makeSdk, type SdkOptions} from "./calls/makeSdk.ts";
export {
  type TemplateEmbedFeatures,
  type TemplateEditorFeatures,
  TEMPLATE_EDITOR_FEATURES_DEFAULT,
  TEMPLATE_EDITOR_FEATURES_ALL,
  TEMPLATE_EDITOR_FEATURES_NONE,
  TEMPLATE_EDITOR_FEATURES_ENABLE_BARCODE,
} from "./helpers/embedFeatures.ts";
