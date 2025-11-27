import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, HashRouter } from 'react-router-dom'
import App from './App'
import './styles/theme.css'
import './styles/global.css'
import './styles/animations.css'

// 生产环境使用 HashRouter，避免 GitHub Pages 对 SPA 路由 404
const Router = import.meta.env.PROD ? HashRouter : BrowserRouter
const basename = import.meta.env.BASE_URL

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router basename={basename}>
      <App />
    </Router>
  </React.StrictMode>
)
