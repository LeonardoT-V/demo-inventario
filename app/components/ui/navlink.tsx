import { cn } from "@/lib/utils";
import { NavLink as Nav, Link as LinkRemix } from "@remix-run/react";
import type {
  RemixLinkProps,
  RemixNavLinkProps,
} from "@remix-run/react/dist/components";
import { VariantProps, cva } from "class-variance-authority";

interface NavLinkProps extends RemixNavLinkProps {
  name: string;
  Icon: any;
}

const defaultStyle =
  "flex items-center gap-2 text-sm py-1.5 px-4 cursor-pointer rounded-sm hover:bg-primary transition-colors";

const linkVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow hover:bg-primary/90 dark:text-secondary",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export default function NavLink({ to, name, Icon }: NavLinkProps) {
  return (
    <Nav
      to={to}
      className={({ isActive }) =>
        isActive
          ? `${defaultStyle} bg-primary/50 font-medium`
          : `${defaultStyle} text-muted-foreground/70 hover:text-foreground`
      }
    >
      <Icon size="16" weight="light" />
      {name}
    </Nav>
  );
}

export interface LinkProps
  extends RemixLinkProps,
    VariantProps<typeof linkVariants> {
  name?: string;
  Icon?: any;
}

export function Link({ to, variant, size, className, ...props }: LinkProps) {
  return (
    <LinkRemix
      to={to}
      {...props}
      className={cn(linkVariants({ variant, size, className }))}
    >
      {props.children}
    </LinkRemix>
  );
}
