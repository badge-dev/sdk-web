import {z} from "@zod/mini";
import {sdkPermissionSchema} from "./permissions.ts";

export function parseTokenPayload(token: string): SdkTokenPayload {
  const tokenPayloadResult = sdkTokenPayloadSchema.safeParse(
    JSON.parse(atob(token.split(".")[1] ?? "")),
  );

  if (!tokenPayloadResult.success) {
    throw new Error("Invalid token payload");
  }

  return tokenPayloadResult.data;
}

export type SdkTokenPayload = z.infer<typeof sdkTokenPayloadSchema>;
const sdkTokenPayloadSchema = z.object({
  workspaceHandle: z.string(),
  permissions: z.array(sdkPermissionSchema),
});
