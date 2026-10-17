"use client"

import { useSyncExternalStore } from "react"

const DESKTOP_QUERY = "(min-width: 1024px)"

function subscribe(onChange: () => void) {
  const query = window.matchMedia(DESKTOP_QUERY)
  query.addEventListener("change", onChange)
  return () => query.removeEventListener("change", onChange)
}

/** True at 1024px and up. Null while server rendering and hydrating, so no layout is guessed. */
export function useIsDesktop(): boolean | null {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(DESKTOP_QUERY).matches,
    () => null
  )
}
