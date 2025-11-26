import { Routes, Route, Link } from 'react-router-dom'
import { ThemeProvider } from './theme'
import ThemeSwitch from './components/ThemeSwitch/index'
import Home from './pages/Home'
import DemoLayout from './pages/DemoLayout'
import ThemeShowcase from './demos/ThemeShowcase'
import CanvasParticles from './demos/CanvasParticles'
import LazyImageDemo from './demos/LazyImageDemo'

export default function App() {
  return (
    <ThemeProvider>
      <div className="app-shell">
        <div className="global-switch"><ThemeSwitch /></div>
        <main className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/demo" element={<DemoLayout />}>
              <Route path="theme" element={<ThemeShowcase />} />
              <Route path="canvas" element={<CanvasParticles />} />
              <Route path="lazy-image" element={<LazyImageDemo />} />
            </Route>
            <Route
              path="*"
              element={
                <div className="center">
                  <p>页面未找到</p>
                  <Link className="btn" to="/">返回首页</Link>
                </div>
              }
            />
          </Routes>
        </main>
      </div>
    </ThemeProvider>
  )
}
