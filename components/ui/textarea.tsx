import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex field-sizing-content min-h-16 w-full rounded-md border border-input bg-background px-2.5 py-2 text-sm leading-relaxed text-foreground outline-none transition-colors duration-150 ease-out placeholder:text-muted-foreground",
        "hover:not-disabled:not-focus-visible:bg-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
        "disabled:cursor-not-allowed disabled:border-muted-line disabled:bg-[#fafaf8] disabled:text-[#8d8d8d] aria-invalid:border-destructive",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
