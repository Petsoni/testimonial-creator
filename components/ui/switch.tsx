"use client"

import * as React from "react"
import * as SwitchPrimitive from "@radix-ui/react-switch"

import { cn } from "@/lib/utils"

function Switch({
  className,
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        "peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-md border border-rule bg-background p-0.5 outline-none transition-colors duration-150 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring data-[state=checked]:bg-primary disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          // Off: an ink square on the left. On: the track fills with ink and the square turns white on the right.
          "pointer-events-none block size-3.5 rounded-sm bg-primary data-[state=checked]:translate-x-4 data-[state=checked]:bg-background motion-safe:transition-[translate,background-color] motion-safe:duration-150 motion-safe:ease-out"
        )}
      />
    </SwitchPrimitive.Root>
  )
}

export { Switch }
