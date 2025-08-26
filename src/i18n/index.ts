import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import HttpBackend from 'i18next-http-backend'
import resourcesToBackend from 'i18next-resources-to-backend'
import { resources } from './resources'

i18next
  .use(HttpBackend)
  .use(LanguageDetector)
  .use(
    resourcesToBackend(
      (language: any, namespace: any) =>
        import(`./locales/${language}/${namespace}.json`)
    )
  )
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    supportedLngs: ['en', 'fr', 'sw'],
    debug: process.env.NODE_ENV === 'development',
    interpolation: {
      escapeValue: false,
    },
    defaultNS: 'common',
    ns: ['common'],
    keySeparator: false,
    nsSeparator: false,
    saveMissing: true,
    saveMissingTo: 'all',
    react: {
      useSuspense: false,
    },
    resources,
  })

export default i18next
