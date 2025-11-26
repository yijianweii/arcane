import { Outlet, Link, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import SideMenuOverlay from '@/components/SideMenuOverlay/index'
import './index.css'

export default function DemoLayout() {
  const [open, setOpen] = useState(false)
  const loc = useLocation()
  
  // 位置变化时自动收起菜单
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { setOpen(false) }, [loc.pathname])
  return (
    <div className="page">
      <Link className="back-btn" aria-label="返回首页" to="/">
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </Link>
      <button className={`menu-btn ${open ? 'open' : ''}`} aria-expanded={open} aria-controls="sidebar" onClick={() => setOpen(v => !v)}>
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 6h16M4 12h10M4 18h16" />
        </svg>
      </button>
      <div className={`content-wrap ${open ? 'dim' : ''}`}>
        <div className="card content-card">
          <Outlet />
        </div>
        <SideMenuOverlay open={open} onClose={() => setOpen(false)} variant="full" />
      </div>
    </div>
  )
}
