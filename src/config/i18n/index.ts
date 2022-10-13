// ** I18n Imports
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import HTMLReactParser from 'html-react-parser'
import es from './es.json'
import en from './en.json'

const defaultLanguage = localStorage.getItem('lang') ?? 'es'
localStorage.setItem('lang', defaultLanguage)

i18n.use(initReactI18next).init({
  interpolation: { escapeValue: false },
  lng: defaultLanguage,
  fallbackLng: 'es',
  resources: {
    es: {
      translation: es
    },
    en: {
      translation: en
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

export const changeToogleLanguage = () => {
  const newLang = localStorage.getItem('lang') === 'es' ? 'en' : 'es'
  i18n.changeLanguage(newLang)
  localStorage.setItem('lang', newLang)
}
