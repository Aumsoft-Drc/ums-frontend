"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type Language = "fr" | "en" | "sw"

interface LanguageContextType {
  language: Language
  setLanguage: (language: Language) => void
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("fr")

  useEffect(() => {
    // Check if there's a saved language preference
    const savedLanguage = localStorage.getItem("language") as Language
    if (savedLanguage && ["fr", "en", "sw"].includes(savedLanguage)) {
      setLanguage(savedLanguage)
    }
  }, [])

  const handleSetLanguage = (newLanguage: Language) => {
    setLanguage(newLanguage)
    localStorage.setItem("language", newLanguage)
    document.documentElement.lang = newLanguage
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage }}>{children}</LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
