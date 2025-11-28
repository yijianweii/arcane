import React, { Suspense } from 'react'
import 'antd-mobile/es/global'
import { Routes, Route, Link } from 'react-router-dom'
import { ThemeProvider } from './theme'
import Home from './pages/Home'
import DemoLayout from './pages/DemoLayout'

// 直接导入所有demo组件
import BlogDemo from './demos/BlogDemo'
import BlogPost from './demos/BlogDemo/BlogPost'
import ThemeShowcase from './demos/ThemeShowcase'
import CanvasParticles from './demos/CanvasParticles'
import LazyImageDemo from './demos/LazyImageDemo'
import CityVoxels from './demos/CityVoxels'
import DocxPreview from './demos/DocxPreview'
import Card3DDemo from './demos/3DCardDemo'
import ChartDemo from './demos/ChartDemo'
import MinimalResumeDemo from './demos/MinimalResumeDemo'
import ResumeStudio from './demos/ResumeStudio'

export default function App() {
  return (
    <ThemeProvider>
      <div className="app-shell">
        <main className="container">
          <Suspense fallback={<div className="loading">加载中...</div>}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="demo" element={<DemoLayout />}>
                <Route path="blog" element={<BlogDemo />} />
                <Route path="blog/:id" element={<BlogPost />} />
                <Route path="theme" element={<ThemeShowcase />} />
                <Route path="canvas" element={<CanvasParticles />} />
                <Route path="lazy-image" element={<LazyImageDemo />} />
                <Route path="city" element={<CityVoxels />} />
                <Route path="docx" element={<DocxPreview />} />
                <Route path="3d-card" element={<Card3DDemo />} />
                <Route path="chart" element={<ChartDemo />} />
                <Route path="resume" element={<MinimalResumeDemo />} />
                <Route path="resume-studio" element={<ResumeStudio />} />
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
