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
  options: EmbedTemplateEditorPageOptions,
): void {
  const {templateId, features, fonts, appearance} = options;
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

export const TEMPLATE_EDITOR_FEATURES_DEFAULT: Required<TemplateEditorFeatures> =
  {
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
  };

export const TEMPLATE_EDITOR_FEATURES_NONE: Record<
  TemplateEditorFeature,
  false
> = {
  logo: false,
  icon: false,
  heading: false,
  colors: false,
  coverImage: false,
  headerField: false,
  secondaryFields: false,
  barcodeType: false,
  barcodeData: false,
  barcodeText: false,
  description: false,
  backFields: false,
  locationMessages: false,
  appLinks: false,
  expiry: false,
};

export const TEMPLATE_EDITOR_FEATURES_ALL: Record<TemplateEditorFeature, true> =
  {
    logo: true,
    icon: true,
    heading: true,
    colors: true,
    coverImage: true,
    headerField: true,
    secondaryFields: true,
    barcodeType: true,
    barcodeData: true,
    barcodeText: true,
    description: true,
    backFields: true,
    locationMessages: true,
    appLinks: true,
    expiry: true,
  };

export const TEMPLATE_EDITOR_FEATURES_ENABLE_BARCODE = {
  barcodeType: true,
  barcodeData: true,
  barcodeText: true,
} satisfies TemplateEditorFeatures;
