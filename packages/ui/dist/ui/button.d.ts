import { Button as ButtonPrimitive } from '@base-ui/react/button';
import { type VariantProps } from 'class-variance-authority';
type ButtonProps = {
    loading?: boolean;
};
declare const buttonVariants: (props?: ({
    variant?: "link" | "default" | "outline" | "outlineDestructive" | "outlineFilled" | "secondary" | "ghost" | "destructive" | null | undefined;
    size?: "default" | "xs" | "sm" | "lg" | "icon" | "icon-xs" | "icon-sm" | "icon-lg" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
declare function Button({ className, variant, size, loading, disabled, children, ...props }: ButtonPrimitive.Props & VariantProps<typeof buttonVariants> & ButtonProps): import("react/jsx-runtime").JSX.Element;
export { Button, ButtonProps, buttonVariants };
//# sourceMappingURL=button.d.ts.map