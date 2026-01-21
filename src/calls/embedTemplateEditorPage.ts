import type {BadgeSdk} from "../sdk.ts";
import type {AppearanceConfig, FontSource} from "../helpers/appearance.ts";
import {createEmbedIframe} from "../utils/iframe.ts";
import {validatePermissions} from "../helpers/permissions.ts";
import {parseTokenPayload} from "../helpers/token.ts";
import {type SdkPermission} from "../helpers/permissions.ts";

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
 * requires template:read
 */
export function embedTemplateEditorPage(
  sdk: BadgeSdk,
  element: HTMLElement,
  {templateId, features, fonts, appearance}: EmbedTemplateEditorPageOptions,
): void {
  const {workspaceHandle, permissions} = parseTokenPayload(sdk.token);

  validatePermissions(permissions, REQUIRED_PERMISSIONS);
  validateFeatures(features ?? {});

  const iframe = createEmbedIframe({
    token: sdk.token,
    path: sdk.path,
    pathHash: `/${workspaceHandle}/templates/${templateId}/edit`,
    config: {features, fonts, appearance},
  });

  element.replaceChildren(iframe);
}

export interface TemplateEditorConfig {
  features?: TemplateEditorFeatures | undefined;
  fonts?: FontSource[] | undefined;
  appearance?: AppearanceConfig | undefined;
}

function validateFeatures(features: TemplateEditorFeatures): void {
  if (features && Object.keys(features).length === 0) {
    throw new Error("please specify at least one template editor feature.");
  }
}

const REQUIRED_PERMISSIONS: SdkPermission[][] = [
  ["workspace:read", "workspace:write"],
  ["user:read", "user:write"],
  ["template:write", "template:read"],
];

export interface TemplateEditorFeatures {
  logo?: boolean;
  icon?: boolean;
  heading?: boolean;
  colors?: boolean;
  coverImage?: boolean;
  headerField?: boolean;
  secondaryFields?: boolean;
  barcodeType?: boolean;
  barcodeData?: boolean;
  barcodeText?: boolean;
  description?: boolean;
  backFields?: boolean;
  locationMessages?: boolean;
  appLinks?: boolean;
  expiry?: boolean;
}

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
} satisfies Record<keyof TemplateEditorFeatures, true | false>;

export const TEMPLATE_EDITOR_FEATURES_ALL: Record<
  keyof TemplateEditorFeatures,
  true
> = {
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

export const TEMPLATE_EDITOR_FEATURES_NONE: Record<
  keyof TemplateEditorFeatures,
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

export const TEMPLATE_EDITOR_FEATURES_ENABLE_BARCODE: Partial<
  Record<keyof TemplateEditorFeatures, true>
> = {
  barcodeType: true,
  barcodeData: true,
  barcodeText: true,
};
