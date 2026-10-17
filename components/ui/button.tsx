import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  // Ink edge on every variant that has a fill or outline; ghost and link keep a transparent one so sizes match.
  "inline-flex shrink-0 cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap rounded-md border text-[13px] font-medium select-none outline-none transition-[background-color,border-color,color] duration-150 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:cursor-not-allowed disabled:border-muted-line disabled:bg-muted disabled:text-[#8d8d8d] motion-safe:active:not-disabled:translate-y-px aria-invalid:border-destructive [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "border-rule bg-primary text-primary-foreground hover:not-disabled:bg-primary/85",
        destructive:
          "border-destructive bg-destructive text-white hover:not-disabled:border-destructive/90 hover:not-disabled:bg-destructive/90",
        outline:
          "border-rule bg-background text-foreground hover:not-disabled:bg-accent",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:not-disabled:bg-[#e8e6e2]",
        ghost:
          "border-transparent text-foreground hover:not-disabled:bg-accent",
        link: "border-transparent text-foreground underline underline-offset-4 hover:decoration-2",
      },
      size: {
        default: "h-9 px-3.5",
        sm: "h-[30px] px-2.5 text-xs",
        lg: "h-10 px-5 text-sm",
        icon: "size-9",
        "icon-sm": "size-[30px]",
        "icon-lg": "size-10",
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
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
