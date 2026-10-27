import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-[1rem]",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/80",
        outline:
          "border-border bg-background hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-[color-mix(in_oklch,var(--secondary),var(--foreground)_5%)] aria-expanded:bg-secondary aria-expanded:text-secondary-foreground",
        ghost:
          "hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50",
        destructive:
          "bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:focus-visible:ring-destructive/40",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default:
          "h-[2rem] gap-[0.375rem] px-[0.625rem] has-data-[icon=inline-end]:pr-[0.5rem] has-data-[icon=inline-start]:pl-[0.5rem]",
        xs: "h-[1.5rem] gap-[0.25rem] rounded-[min(var(--radius-md),10px)] px-[0.5rem] text-xs in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-[0.375rem] has-data-[icon=inline-start]:pl-[0.375rem] [&_svg:not([class*='size-'])]:size-[0.75rem]",
        sm: "h-[1.75rem] gap-[0.25rem] rounded-[min(var(--radius-md),12px)] px-[0.625rem] text-[0.8rem] in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-[0.375rem] has-data-[icon=inline-start]:pl-[0.375rem] [&_svg:not([class*='size-'])]:size-[0.875rem]",
        lg: "h-[2.25rem] gap-[0.375rem] px-[0.625rem] has-data-[icon=inline-end]:pr-[0.5rem] has-data-[icon=inline-start]:pl-[0.5rem]",
        icon: "size-[2rem]",
        "icon-xs":
          "size-[1.5rem] rounded-[min(var(--radius-md),10px)] in-data-[slot=button-group]:rounded-lg [&_svg:not([class*='size-'])]:size-[0.75rem]",
        "icon-sm":
          "size-[1.75rem] rounded-[min(var(--radius-md),12px)] in-data-[slot=button-group]:rounded-lg",
        "icon-lg": "size-[2.25rem]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
