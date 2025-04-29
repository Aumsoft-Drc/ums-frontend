"use client"

import { LanguageProvider as LanguageContextProvider } from "@/hooks/use-language"
import type { ReactNode } from "react"

export function LanguageProvider({ children }: { children: ReactNode }) {
  return <LanguageContextProvider>{children}</LanguageContextProvider>
}
