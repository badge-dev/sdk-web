import type {BadgeSdk} from "../sdk.ts";
import type {AppearanceConfig, FontSource} from "../helpers/appearance.ts";
import {createEmbedIframe} from "../helpers/iframe.ts";
import {validatePermissions} from "../helpers/permissions.ts";
import {parseTokenPayload} from "../helpers/token.ts";
import {type SdkPermission} from "../helpers/permissions.ts";
import {
  type TemplateEditorFeature,
  type TemplateEditorFeatures,
} from "../helpers/embedFeatures.ts";

export interface EmbedTemplateEditorPageOptions {
  /**
   * id of the template to show
   */
  templateId: string;
  features?: TemplateEditorFeatures | undefined;
  fonts?: FontSource[] | undefined;
  appearance?: AppearanceConfig | undefined;
}

/**
 * requires template:write
 */
export function embedTemplateEditorPage(
  sdk: BadgeSdk,
  element: HTMLElement,
  {templateId, features, fonts, appearance}: EmbedTemplateEditorPageOptions,
): void {
  const {workspaceHandle, permissions} = parseTokenPayload(sdk.token);

  validatePermissions(permissions, REQUIRED_PERMISSIONS);

  const iframe = createEmbedIframe({
    token: sdk.token,
    path: sdk.path,
    pathHash: `/${workspaceHandle}/templates/${templateId}/edit`,
    navigation: "bottom",
    config: {
      features: {
        templateEditor:
          Object.keys(features ?? {}).length > 0
            ? {...TEMPLATE_EDITOR_FEATURES_NONE, ...features}
            : TEMPLATE_EDITOR_FEATURES_DEFAULT,
      },
      fonts,
      appearance,
    },
  });

  element.replaceChildren(iframe);
}

const REQUIRED_PERMISSIONS: SdkPermission[][] = [
  ["workspace:read", "workspace:write"],
  ["user:read", "user:write"],
  ["template:write", "template:read"],
];

export const TEMPLATE_EDITOR_FEATURES_DEFAULT = {
  logo: true,
  icon: true,
  heading: true,
  colors: true,
  coverImage: true,
  headerField: true,
  secondaryFields: true,
  barcodeType: false,
  barcodeData: false,
  barcodeText: false,
  description: false,
  backFields: true,
  locationMessages: true,
  appLinks: true,
  expiry: false,
} satisfies Required<TemplateEditorFeatures>;

export const TEMPLATE_EDITOR_FEATURES_NONE = Object.fromEntries(
  Object.keys(TEMPLATE_EDITOR_FEATURES_DEFAULT).map((key) => [key, false]),
) as Record<TemplateEditorFeature, false>;

export const TEMPLATE_EDITOR_FEATURES_ALL = Object.fromEntries(
  Object.keys(TEMPLATE_EDITOR_FEATURES_DEFAULT).map((key) => [key, true]),
) as Record<TemplateEditorFeature, true>;

export const TEMPLATE_EDITOR_FEATURES_ENABLE_BARCODE = {
  barcodeType: true,
  barcodeData: true,
  barcodeText: true,
} satisfies Pick<
  Record<TemplateEditorFeature, true>,
  "barcodeType" | "barcodeData" | "barcodeText"
>;
