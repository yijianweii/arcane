import './index.css'

const tokens = [
  { name: '背景', var: '--bg' },
  { name: '文本', var: '--text' },
  { name: '弱化', var: '--muted' },
  { name: '卡片', var: '--card' },
  { name: '边框', var: '--border' },
  { name: '强调', var: '--accent' },
]

export default function ThemeShowcase() {
  return (
    <div className="demo">
      <h2 style={{ margin: 0 }}>主题系统示例</h2>
      <p className="desc" style={{ margin: 0 }}>
        使用 CSS 变量驱动颜色，支持浅/深色、系统跟随与持久化。页面顶部可切换模式。
      </p>
      <div className="token-grid">
        {tokens.map((t) => (
          <div key={t.name} className="token" style={{ background: `var(${t.var})` }} title={t.name} />
        ))}
      </div>
      <div className="grid2">
        <div className="card card-pad">
          <h3 style={{ margin: 0 }}>卡片示例</h3>
          <p className="desc">卡片背景、边框、阴影均由主题变量控制。</p>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="btn">主按钮</button>
            <button className="btn secondary">次按钮</button>
          </div>
        </div>
        <div className="card card-pad">
          <h3 style={{ margin: 0 }}>排版示例</h3>
          <p className="desc">文本与强调色在不同主题下自动对比。</p>
          <ul>
            <li>正文：使用 <code>--text</code></li>
            <li>弱化：使用 <code>--muted</code></li>
            <li>强调：使用 <code>--accent</code> / <code>--accent-contrast</code></li>
          </ul>
        </div>
      </div>
    </div>
  )
}
