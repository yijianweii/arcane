import { NavLink } from 'react-router-dom'
import './index.css'

export default function SideMenuOverlay({ open, onClose }: { open: boolean, onClose: () => void }) {
  return (
    <>
      <div className={`overlay ${open ? 'open' : ''}`} aria-hidden={!open}>
        <div className="panel" id="sidebar">
          <div className="group">PICK</div>
          <div className="list">
            <NavLink to="/demo/theme" className={({ isActive }) => `item${isActive ? ' active' : ''}`}>主题系统</NavLink>
            <NavLink to="/demo/canvas" className={({ isActive }) => `item${isActive ? ' active' : ''}`}>Canvas 粒子</NavLink>
          </div>
          <div className="group">DEMO</div>
          <div className="list">
            <NavLink to="/demo/lazy-image" className={({ isActive }) => `item${isActive ? ' active' : ''}`}>图片懒加载</NavLink>
          </div>
        </div>
      </div>
      <div className={`backdrop ${open ? 'show' : ''}`} onClick={onClose} />
    </>
  )
}
