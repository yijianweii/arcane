import { useTheme } from '@/theme'
import './index.css'

export default function ThemeSwitch() {
  const { mode, setMode, effective } = useTheme()
  const isDark = (mode === 'system' ? effective === 'dark' : mode === 'dark')
  const icon = isDark
    ? <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
    : (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v3" />
        <path d="M12 19v3" />
        <path d="M4.22 4.22l2.12 2.12" />
        <path d="M17.66 17.66l2.12 2.12" />
        <path d="M2 12h3" />
        <path d="M19 12h3" />
        <path d="M4.22 19.78l2.12-2.12" />
        <path d="M17.66 6.34l2.12-2.12" />
      </svg>
    )

  const toggle = () => {
    if (mode === 'system') {
      setMode(isDark ? 'light' : 'dark')
    } else {
      setMode(mode === 'dark' ? 'light' : 'dark')
    }
  }

  return (
    <div className="wrap">
      <button className="button" aria-label="切换主题" onClick={toggle}>
        {icon}
      </button>
    </div>
  )
}
