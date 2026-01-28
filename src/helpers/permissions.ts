import {z} from "@zod/mini";

export function hasPermission(
  permissions: SdkPermission[],
  validPermissionSets: SdkPermission[][],
): boolean {
  return validPermissionSets.every((permissionSet) =>
    permissionSet.some((permission) => permissions.includes(permission)),
  );
}

export function validatePermissions(
  permissions: SdkPermission[],
  validPermissionSets: SdkPermission[][],
): void {
  if (!hasPermission(permissions, validPermissionSets)) {
    throw new Error(
      validPermissionSets.map((set) => set.join(" or ")).join(", ") +
        " permissions are required",
    );
  }
}

export type SdkPermission = z.infer<typeof sdkPermissionSchema>;
export const sdkPermissionSchema = z.enum([
  "workspace:read",
  "workspace:write",
  "template:read",
  "template:write",
  "pass:read",
  "pass:write",
  "campaign:read",
  "campaign:write",
  "user:read",
  "user:write",
]);
