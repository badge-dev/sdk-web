import type {BadgeSdk} from "../sdk.ts";
import type {AppearanceConfig, FontSource} from "../helpers/appearance.ts";
import {createEmbedIframe} from "../utils/iframe.ts";
import {validatePermissions} from "../helpers/permissions.ts";
import {parseTokenPayload} from "../helpers/token.ts";
import {type SdkPermission} from "../helpers/permissions.ts";
import {
  type TemplateEditorFeatures,
  TEMPLATE_EDITOR_FEATURES_NONE,
  TEMPLATE_EDITOR_FEATURES_DEFAULT,
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
 * requires template:read
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
