"use client"

import { useLanguage } from "./use-language"
import translations from "@/translations"

export function useTranslation() {
  const { language } = useLanguage()

  const t = (key: string, params?: Record<string, string>) => {
    // Split the key by dots to access nested properties
    const keys = key.split(".")

    // Get the translation object for the current language
    let translation: any = translations[language]

    // Navigate through the nested properties
    for (const k of keys) {
      if (translation && translation[k]) {
        translation = translation[k]
      } else {
        // If translation not found, return the key
        return key
      }
    }

    // If the translation is a string, return it
    if (typeof translation === "string") {
      // Replace parameters if provided
      if (params) {
        return Object.entries(params).reduce(
          (acc, [key, value]) => acc.replace(new RegExp(`\\{${key}\\}`, "g"), value),
          translation,
        )
      }
      return translation
    }

    // If translation is not a string, return the key
    return key
  }

  return { t }
}
