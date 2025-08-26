import i18next from "./index"
import { useTranslation } from "react-i18next"

/**
 * Simple translation function that uses the string itself as the key
 * @param text The text to translate
 * @param options Optional parameters for interpolation
 * @returns Translated text
 */
export function translate(text: string, options?: Record<string, any>): string {
  return i18next.t(text, options)
}

/**
 * React hook for translations
 * @returns Object with translate function
 */
export function useTranslate() {
  const { t } = useTranslation()

  return {
    translate: (text: string, options?: Record<string, any>) => t(text, options),
    t, // Also expose the original t function for more flexibility
  }
}
