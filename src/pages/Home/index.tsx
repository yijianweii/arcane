import { NavLink } from 'react-router-dom'
import { useState } from 'react'
import CreativeClock from '@/components/CreativeClock/index'
import SideMenuOverlay from '@/components/SideMenuOverlay/index'
import ThemeSwitch from '@/components/ThemeSwitch/index'
import './index.css'

export default function Home() {
  const [open, setOpen] = useState(false)
  return (
    <div className="home">
      <div className="page-bg" />
      <section className="desktop-card card">
        <button className="side-toggle" aria-expanded={open} aria-controls="sidebar" onClick={() => setOpen(v => !v)}>
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 6h16M4 12h10M4 18h16" />
          </svg>
        </button>
        <div className="corner-right"><ThemeSwitch /></div>
        <div className={`desktop-inner ${open ? 'open' : 'closed'}`}>
          <SideMenuOverlay open={open} onClose={() => setOpen(false)} />
          <main className="main">
            <CreativeClock />
          </main>
        </div>
      </section>
    </div>
  )
}
