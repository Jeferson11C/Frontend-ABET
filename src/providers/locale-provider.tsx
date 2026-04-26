'use client'

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import esMessages from '@/languaje/locales/es.json'
import enMessages from '@/languaje/locales/en.json'

type Locale = 'es' | 'en'

type I18nContextType = {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (key: string) => string
}

const STORAGE_KEY = 'app_locale'
const DEFAULT_LOCALE: Locale = 'es'

const messages: Record<Locale, Record<string, string>> = {
  es: esMessages,
  en: enMessages,
}

const I18nContext = createContext<I18nContextType | null>(null)

function resolveMessage(locale: Locale, key: string) {
  const value = messages[locale][key]
  return value ?? key
}

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE)

  const setLocale = useCallback((nextLocale: Locale) => {
    setLocaleState(nextLocale)
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, nextLocale)
      document.documentElement.lang = nextLocale
    }
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return

    const stored = window.localStorage.getItem(STORAGE_KEY) as Locale | null
    if (stored === 'es' || stored === 'en') {
      setLocaleState(stored)
      document.documentElement.lang = stored
      return
    }

    const browserLocale = navigator.language.toLowerCase()
    const inferred: Locale = browserLocale.startsWith('en') ? 'en' : 'es'
    setLocaleState(inferred)
    document.documentElement.lang = inferred
    window.localStorage.setItem(STORAGE_KEY, inferred)
  }, [])

  const t = useCallback((key: string) => resolveMessage(locale, key), [locale])

  const value = useMemo<I18nContextType>(() => ({ locale, setLocale, t }), [locale, setLocale, t])

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n must be used within LocaleProvider')
  return ctx
}
