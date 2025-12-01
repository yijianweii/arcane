import { NavLink } from 'react-router-dom'
import { menu } from '@/config/menu'
import './index.css'
import ThemeSwitch from '@/components/ThemeSwitch/index'

export default function SideMenuOverlay({ open, onClose, variant = 'overlay' }: { open: boolean, onClose: () => void, variant?: 'overlay' | 'full' }) {
  return (
    <>
      <div className={`overlay ${variant === 'full' ? 'full' : ''} ${open ? 'open' : ''}`} aria-hidden={!open}>
        <div className="panel" id="sidebar">
          <button className="close-btn" onClick={onClose} aria-label="Close menu">
            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
          <div className="mode-toggle-container">
            <ThemeSwitch />
          </div>
          <div className="menu-content">
            {menu.map((g) => (
              <div key={g.title} className="menu-group-wrapper">
                <div className="group">{g.title}</div>
                <div className="list">
                  {g.items.map((it) => (
                    <NavLink
                      key={it.path}
                      to={it.path}
                      onClick={onClose}
                      className={({ isActive }) => `item${isActive ? ' active' : ''}`}
                    >
                      {it.label}
                    </NavLink>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className={`backdrop ${open ? 'show' : ''}`} onClick={onClose} />
    </>
  )
}
