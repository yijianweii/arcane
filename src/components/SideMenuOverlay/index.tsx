import { NavLink } from 'react-router-dom'
import { menu } from '@/config/menu'
import './index.css'

export default function SideMenuOverlay({ open, onClose, variant = 'overlay' }: { open: boolean, onClose: () => void, variant?: 'overlay' | 'full' }) {
  return (
    <>
      <div className={`overlay ${variant === 'full' ? 'full' : ''} ${open ? 'open' : ''}`} aria-hidden={!open}>
        <div className="panel" id="sidebar">
          {menu.map((g) => (
            <div key={g.title}>
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
      <div className={`backdrop ${open ? 'show' : ''}`} onClick={onClose} />
    </>
  )
}
