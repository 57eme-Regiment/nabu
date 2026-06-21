import { PermissionSchema } from '@57eme-regiment/auth-package';
import { z } from 'zod';
export const NavigationLinkSchema = z.object({
    to: z.custom(),
    label: z.string(),
    description: z.string().optional(),
    permission: PermissionSchema.nullish(),
    Icon: z.custom().optional(),
    hidden: z.boolean().optional(),
    disabled: z.boolean().optional(),
    target: z.enum(['_self', '_blank', '_parent', '_top']).optional(),
});
export const NavigationLinksSchema = z.array(NavigationLinkSchema);
export const NavigationLinksGroupSchema = z.object({
    title: z.string(),
    links: NavigationLinksSchema,
});
export const NavigationLinksGroupsSchema = z.array(NavigationLinksGroupSchema);
