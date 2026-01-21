import * as z from "@zod/mini";
import type {BadgeSdk} from "../sdk.ts";

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
  options: EmbedTemplateEditorPageOptions,
): void {
  const {templateId, features, fonts, appearance} = options;
  const {workspaceHandle, permissions} = parseTokenPayload(sdk.token);

  validatePermissions(permissions, features ?? {});

  const iframe = createEmbedIframe({
    token: sdk.token,
    path: sdk.path,
    workspaceHandle,
    templateId,
    config: {
      features,
      fonts,
      appearance,
    },
  });

  element.replaceChildren(iframe);
}

interface CreateIframeOptions {
  token: string;
  path: string;
  workspaceHandle: string;
  templateId: string;
  config: TemplateEditorEmbedConfig;
}

interface TemplateEditorEmbedConfig {
  features?: TemplateEditorFeatures | undefined;
  fonts?: FontSource[] | undefined;
  appearance?: AppearanceConfig | undefined;
}

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

export interface AppearanceConfig {
  fontFamily?: string | undefined;
  colors?: {
    primary?: string | undefined;
    neutral?: string | undefined;
  };
}

function createEmbedIframe(options: CreateIframeOptions): HTMLIFrameElement {
  const {path, token, workspaceHandle, templateId, config} = options;

  const iframe = document.createElement("iframe");

  iframe.style.width = "100%";
  iframe.style.height = "100%";
  iframe.style.border = "none";

  const iframeUrl = new URL(path);

  iframeUrl.searchParams.set("token", token);
  iframeUrl.searchParams.set("config", JSON.stringify(config));

  iframeUrl.hash = `/${workspaceHandle}/templates/${templateId}/edit`;

  iframe.src = iframeUrl.toString();

  return iframe;
}

function parseTokenPayload(token: string): SdkTokenPayload {
  const tokenPayloadResult = sdkTokenPayloadSchema.safeParse(
    JSON.parse(atob(token.split(".")[1] ?? "")),
  );

  if (!tokenPayloadResult.success) {
    throw new Error("Invalid token payload");
  }

  return tokenPayloadResult.data;
}

function validatePermissions(
  permissions: SdkPermission[],
  features: TemplateEditorFeatures,
): void {
  const hasPermission = (validPermissionSets: SdkPermission[][]) => {
    return validPermissionSets.every((permissionSet) =>
      permissionSet.some((permission) => permissions.includes(permission)),
    );
  };

  if (!hasPermission(REQUIRED_PERMISSIONS)) {
    throw new Error(
      REQUIRED_PERMISSIONS.map((set) => set.join(" or ")).join(", ") +
        " permissions are required",
    );
  }

  if (
    features &&
    typeof features === "object" &&
    Object.keys(features).length === 0
  ) {
    throw new Error(
      "features cannot be an empty object. Omit the parameter or specify at least one feature.",
    );
  }
}

type SdkPermission = z.infer<typeof sdkPermissionSchema>;
const sdkPermissionSchema = z.enum([
  "workspace:read",
  "workspace:write",
  "template:read",
  "template:write",
  "user:read",
  "user:write",
]);

type SdkTokenPayload = z.infer<typeof sdkTokenPayloadSchema>;
const sdkTokenPayloadSchema = z.object({
  workspaceHandle: z.string(),
  permissions: z.array(sdkPermissionSchema),
});

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
