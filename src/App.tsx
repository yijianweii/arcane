import React, { Suspense } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { ThemeProvider } from './theme'
import Home from './pages/Home'
import DemoLayout from './pages/DemoLayout'

const loadDemo = (name: string) => {
  // 处理BlogPost这种特殊情况，确保正确的导入路径
  // 显式添加.tsx扩展名以帮助Vite正确解析动态导入
  const importPath = name === 'BlogDemo/BlogPost' ? './demos/BlogDemo/BlogPost.tsx' : `./demos/${name}/index.tsx`;
  const Component = React.lazy(() => import(importPath));
  return <Component />;
};

export default function App() {
  return (
    <ThemeProvider>
      <div className="app-shell">
        <main className="container">
          <Suspense fallback={<div className="loading">加载中...</div>}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/demo" element={<DemoLayout />}>
                <Route path="blog" element={loadDemo('BlogDemo')} />
                <Route path="blog/:id" element={loadDemo('BlogDemo/BlogPost')} />
                <Route path="theme" element={loadDemo('ThemeShowcase')} />
                <Route path="canvas" element={loadDemo('CanvasParticles')} />
                <Route path="lazy-image" element={loadDemo('LazyImageDemo')} />
                <Route path="city" element={loadDemo('CityVoxels')} />
                <Route path="docx" element={loadDemo('DocxPreview')} />
                <Route path="3d-card" element={loadDemo('3DCardDemo')} />
                <Route path="chart" element={loadDemo('ChartDemo')} />
                <Route path="resume" element={loadDemo('MinimalResumeDemo')} />
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
