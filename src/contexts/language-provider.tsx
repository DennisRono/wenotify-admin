'use client'
import type React from 'react'
import { createContext, useContext, useState, useEffect } from 'react'
import i18next from '@/i18n/index'

type LanguageContextType = {
  currentLanguage: string
  changeLanguage: (lang: string) => Promise<void>
  availableLanguages: string[]
}

const LanguageContext = createContext<LanguageContextType>({
  currentLanguage: 'en',
  changeLanguage: async () => {},
  availableLanguages: ['en', 'fr', 'sw'],
})

export const useLanguage = () => useContext(LanguageContext)

interface LanguageProviderProps {
  children: React.ReactNode
  defaultLanguage?: string
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({
  children,
  defaultLanguage = 'en',
}) => {
  const supportedLanguages = ['en', 'fr', 'sw']
  const [currentLanguage, setCurrentLanguage] = useState(
    i18next.language || defaultLanguage
  )

  useEffect(() => {
    if (i18next.language !== currentLanguage) {
      i18next.changeLanguage(currentLanguage)
    }

    const handleLanguageChanged = (lng: string) => {
      setCurrentLanguage(lng)
      document.documentElement.lang = lng
    }

    i18next.on('languageChanged', handleLanguageChanged)

    return () => {
      i18next.off('languageChanged', handleLanguageChanged)
    }
  }, [currentLanguage])

  const changeLanguage = async (lang: string) => {
    if (!supportedLanguages.includes(lang)) {
      lang = defaultLanguage
    }

    await i18next.changeLanguage(lang)
    setCurrentLanguage(lang)

    localStorage.setItem('i18nextLng', lang)
  }

  return (
    <LanguageContext.Provider
      value={{
        currentLanguage,
        changeLanguage,
        availableLanguages: supportedLanguages,
      }}
    >
      {children}
    </LanguageContext.Provider>
  )
}
