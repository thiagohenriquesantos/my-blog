import type { Language } from '@/i18n/config'
import { allLocales, base, defaultLocale } from '@/config'
import { getLangFromPath } from '@/i18n/lang'
import { getLocalizedPath } from '@/i18n/path'

const ogLocaleMap: Record<Language, string> = {
  de: 'de_DE',
  en: 'en_US',
  es: 'es_ES',
  fr: 'fr_FR',
  ja: 'ja_JP',
  ko: 'ko_KR',
  pl: 'pl_PL',
  pt: 'pt_BR',
  ru: 'ru_RU',
  zh: 'zh_CN',
  'zh-tw': 'zh_TW',
}

export function getCanonicalUrl(pathname: string, origin: string) {
  const currentLang = getLangFromPath(pathname)
  const normalizedPath = stripLangPrefix(pathname)
  const localizedPath = getLocalizedPath(normalizedPath, currentLang)
  return new URL(localizedPath, origin).toString()
}

export function getAlternateLinks(pathname: string, origin: string) {
  const normalizedPath = stripLangPrefix(pathname)
  return allLocales.map((lang) => {
    const href = getLocalizedPath(normalizedPath, lang)
    return {
      href: new URL(href, origin).toString(),
      hreflang: lang === 'zh-tw' ? 'zh-TW' : lang,
      lang,
    }
  })
}

export function getOgLocale(lang: Language) {
  return ogLocaleMap[lang] ?? ogLocaleMap[defaultLocale]
}

function stripLangPrefix(pathname: string) {
  const pathWithoutBase = base && pathname.startsWith(base)
    ? pathname.slice(base.length)
    : pathname

  const currentLang = getLangFromPath(pathname)
  if (currentLang === defaultLocale) {
    return pathWithoutBase
  }

  return pathWithoutBase.replace(new RegExp(`^/${currentLang}`), '') || '/'
}
