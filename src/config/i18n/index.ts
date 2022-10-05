// ** I18n Imports
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import HTMLReactParser from 'html-react-parser'

i18n.use(initReactI18next).init({
  interpolation: { escapeValue: false },
  lng: 'es',
  fallbackLng: 'es',
  resources: {
    es: {
      translation: {
        key: 'hello world'
      }
    }
  },
  react: {
    useSuspense: true
  }
})

export default i18n

export const trans = (key: string, withHtml = false): string => {
  return withHtml ? (HTMLReactParser(i18n.t(key)) as string) : i18n.t(key)
}
