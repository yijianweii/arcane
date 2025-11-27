import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './styles/theme.css'
import './styles/global.css'
import './styles/animations.css'

// GitHub Pages路径配置
const basename = import.meta.env.PROD ? '/arcane/' : '/'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter basename={basename}>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
