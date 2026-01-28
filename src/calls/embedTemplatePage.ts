import type {BadgeSdk} from "../sdk.ts";
import type {FontSource, AppearanceConfig} from "../helpers/appearance.ts";
import {createEmbedIframe} from "../helpers/iframe.ts";
import {parseTokenPayload} from "../helpers/token.ts";
import {
  hasPermission,
  validatePermissions,
  type SdkPermission,
} from "../helpers/permissions.ts";
import type {TemplateEmbedFeatures} from "../helpers/embedFeatures.ts";

export interface EmbedTemplatePageOptions {
  /**
   * id of the template to show
   */
  templateId: string;
  features?: TemplateEmbedFeatures | undefined;
  fonts?: FontSource[] | undefined;
  appearance?: AppearanceConfig | undefined;
}

/**
 * requires template:read
 */
export function embedTemplatePage(
  sdk: BadgeSdk,
  element: HTMLElement,
  {templateId, features, fonts, appearance}: EmbedTemplatePageOptions,
): void {
  const {workspaceHandle, permissions} = parseTokenPayload(sdk.token);

  validatePermissions(permissions, REQUIRED_PERMISSIONS);
  validatePermissionsByFeatures(permissions, features ?? {});

  const iframe = createEmbedIframe({
    token: sdk.token,
    path: sdk.path,
    pathHash: `/${workspaceHandle}/templates/${templateId}/overview`,
    navigation: "top",
    config: {features, fonts, appearance},
  });

  element.replaceChildren(iframe);
}

function validatePermissionsByFeatures(
  permissions: SdkPermission[],
  features: TemplateEmbedFeatures,
): void {
  const failedPermissions = Object.entries(features)
    .filter(([_, enabled]) => enabled)
    .map(([feature]) => ({
      feature,
      permissions:
        REQUIRED_PERMISSIONS_BY_FEATURE[feature as keyof TemplateEmbedFeatures],
    }))
    .filter(({permissions}) => permissions !== undefined)
    .filter(
      ({permissions: featurePermissions}) =>
        !hasPermission(permissions, featurePermissions),
    );

  if (failedPermissions.length > 0) {
    throw new Error(
      failedPermissions
        .map(
          ({feature, permissions}) =>
            `${feature} feature requires ${permissions.map((set) => set.join(" or ")).join(", ")} permission(s)`,
        )
        .join("\n"),
    );
  }
}

const REQUIRED_PERMISSIONS: SdkPermission[][] = [
  ["workspace:read", "workspace:write"],
  ["user:read", "user:write"],
  ["template:read", "template:write"],
];

// Each feature requires at least one permission from each inner permission set
const REQUIRED_PERMISSIONS_BY_FEATURE: Record<
  keyof TemplateEmbedFeatures,
  SdkPermission[][]
> = {
  passList: [["pass:read", "pass:write"]],
  templateEditor: [["template:write"]],
  campaigns: [["campaign:read", "campaign:write"]],
  campaignEditor: [["campaign:write"]],
};
