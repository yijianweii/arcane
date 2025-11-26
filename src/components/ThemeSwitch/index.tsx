import { useTheme, ThemeColor } from '@/theme'
import './index.css'

const colors: { value: ThemeColor; label: string; color: string }[] = [
  { value: 'blue', label: '蓝色', color: '#3b82f6' },
  { value: 'purple', label: '紫色', color: '#8b5cf6' },
  { value: 'green', label: '绿色', color: '#10b981' },
  { value: 'orange', label: '橙色', color: '#f59e0b' },
]

export default function ThemeSwitch() {
  const { mode, setMode, effective, color, setColor } = useTheme()
  const isDark = effective === 'dark'

  const toggleMode = () => {
    if (mode === 'system') {
      setMode(isDark ? 'light' : 'dark')
    } else {
      setMode(mode === 'dark' ? 'light' : 'dark')
    }
  }

  const getModeIcon = () => {
    if (mode === 'system') {
      return (
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="5" />
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </svg>
      )
    }
    return isDark ? (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>
    ) : (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="5" />
        <line x1="12" y1="1" x2="12" y2="3" />
        <line x1="12" y1="21" x2="12" y2="23" />
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
        <line x1="1" y1="12" x2="3" y2="12" />
        <line x1="21" y1="12" x2="23" y2="12" />
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
      </svg>
    )
  }

  return (
    <div className="theme-switch">
      <button className="theme-toggle" aria-label="切换主题模式" onClick={toggleMode}>
        {getModeIcon()}
      </button>
      <div className="color-picker">
        {colors.map((c) => (
          <button
            key={c.value}
            className={`color-option ${color === c.value ? 'active' : ''}`}
            style={{ backgroundColor: c.color }}
            aria-label={`切换到${c.label}主题`}
            onClick={() => setColor(c.value)}
          />
        ))}
      </div>
    </div>
  )
}