import { createContext, useContext, useEffect, useMemo, useState } from 'react'

export type ThemeMode = 'light' | 'dark' | 'system'
export type ThemeColor = 'blue' | 'purple' | 'green' | 'orange'

function getSystemPreference(): 'light' | 'dark' {
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function applyTheme(theme: 'light' | 'dark', color: ThemeColor = 'blue') {
  document.documentElement.setAttribute('data-theme', theme)
  document.documentElement.setAttribute('data-color', color)
}

function getInitialMode(): ThemeMode {
  const saved = localStorage.getItem('theme-mode') as ThemeMode | null
  return saved ?? 'system'
}

function getInitialColor(): ThemeColor {
  const saved = localStorage.getItem('theme-color') as ThemeColor | null
  return saved ?? 'blue'
}

type ThemeContextValue = {
  mode: ThemeMode
  setMode: (m: ThemeMode) => void
  effective: 'light' | 'dark'
  color: ThemeColor
  setColor: (c: ThemeColor) => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<ThemeMode>(getInitialMode())
  const [color, setColor] = useState<ThemeColor>(getInitialColor())

  const effective = useMemo(() => (mode === 'system' ? getSystemPreference() : mode), [mode])

  useEffect(() => {
    applyTheme(effective, color)
  }, [effective, color])

  useEffect(() => {
    localStorage.setItem('theme-mode', mode)
  }, [mode])

  useEffect(() => {
    localStorage.setItem('theme-color', color)
  }, [color])

  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const handler = () => {
      if (mode === 'system') applyTheme(getSystemPreference(), color)
    }
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [mode, color])

  return (
    <ThemeContext.Provider value={{ mode, setMode, effective, color, setColor }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}
