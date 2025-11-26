import { Outlet, Link } from 'react-router-dom'
import './index.css'

export default function DemoLayout() {
  return (
    <div className="page">
      <div style={{ display: 'flex', gap: 8 }}>
        <Link className="btn" to="/">返回首页</Link>
        <Link className="btn secondary" to="/demo/theme">主题系统</Link>
        <Link className="btn secondary" to="/demo/canvas">Canvas 粒子</Link>
        <Link className="btn secondary" to="/demo/lazy-image">图片懒加载</Link>
      </div>
      <div className="card" style={{ padding: 18 }}>
        <Outlet />
      </div>
    </div>
  )
}
