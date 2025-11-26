import { Outlet, Link } from 'react-router-dom'
import './index.css'

export default function DemoLayout() {
  return (
    <div className="page">
      <Link className="back-btn" aria-label="返回首页" to="/">
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </Link>
      <div className="card content-card">
        <Outlet />
      </div>
    </div>
  )
}
