import { useEffect, useRef } from 'react'
import './index.css'

export default function CanvasParticles() {
  const ref = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = ref.current!
    const ctx = canvas.getContext('2d')!
    let raf = 0
    const DPR = window.devicePixelRatio || 1
    let w = 0, h = 0

    const particles = Array.from({ length: 80 }, () => ({
      x: Math.random(), y: Math.random(),
      vx: (Math.random() - 0.5) * 0.0006,
      vy: (Math.random() - 0.5) * 0.0006,
    }))

    const resize = () => {
      w = canvas.clientWidth
      h = canvas.clientHeight
      canvas.width = Math.floor(w * DPR)
      canvas.height = Math.floor(h * DPR)
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0)
    }
    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const mx = (e.clientX - rect.left) / w
      const my = (e.clientY - rect.top) / h
      particles.forEach(p => {
        const dx = mx - p.x, dy = my - p.y
        const d2 = dx * dx + dy * dy + 0.0001
        const force = 0.0006 / d2
        p.vx += dx * force
        p.vy += dy * force
      })
    }
    const step = () => {
      ctx.clearRect(0, 0, w, h)
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy
        p.vx *= 0.98; p.vy *= 0.98
        if (p.x < 0 || p.x > 1) p.vx *= -1
        if (p.y < 0 || p.y > 1) p.vy *= -1
        const x = p.x * w, y = p.y * h
        ctx.beginPath()
        ctx.arc(x, y, 2.4, 0, Math.PI * 2)
        ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--accent')
        ctx.fill()
      })
      raf = requestAnimationFrame(step)
    }
    const onResize = () => { resize() }
    window.addEventListener('resize', onResize)
    canvas.addEventListener('mousemove', onMove)
    resize(); step()
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', onResize); canvas.removeEventListener('mousemove', onMove) }
  }, [])

  return (
    <div className="demo">
      <h2 style={{ margin: 0 }}>Canvas 粒子</h2>
      <p style={{ margin: 0, color: 'var(--muted)' }}>鼠标吸引力场，颜色随主题强调色变化。</p>
      <div className="canvas-wrap card">
        <canvas ref={ref} style={{ width: '100%', height: '100%' }} />
      </div>
    </div>
  )
}
