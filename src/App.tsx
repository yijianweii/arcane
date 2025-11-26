import React, { Suspense } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { ThemeProvider } from './theme'
import Home from './pages/Home'
import DemoLayout from './pages/DemoLayout'

// 使用React.lazy实现组件懒加载
const ThemeShowcase = React.lazy(() => import('./demos/ThemeShowcase'))
const CanvasParticles = React.lazy(() => import('./demos/CanvasParticles'))
const LazyImageDemo = React.lazy(() => import('./demos/LazyImageDemo'))
const CityVoxels = React.lazy(() => import('./demos/CityVoxels'))
const DocxPreview = React.lazy(() => import('./demos/DocxPreview'))
const ThreeDCardDemo = React.lazy(() => import('./demos/3DCardDemo'))
const ChartDemo = React.lazy(() => import('./demos/ChartDemo'))

export default function App() {
  return (
    <ThemeProvider>
      <div className="app-shell">
        <main className="container">
          <Suspense fallback={<div className="loading">加载中...</div>}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/demo" element={<DemoLayout />}>
                <Route path="theme" element={<ThemeShowcase />} />
                <Route path="canvas" element={<CanvasParticles />} />
                <Route path="lazy-image" element={<LazyImageDemo />} />
                <Route path="city" element={<CityVoxels />} />
                <Route path="docx" element={<DocxPreview />} />
                <Route path="3d-card" element={<ThreeDCardDemo />} />
                <Route path="chart" element={<ChartDemo />} />
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
          </Suspense>
        </main>
      </div>
    </ThemeProvider>
  )
}
