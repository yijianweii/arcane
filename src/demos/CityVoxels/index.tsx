import { useEffect, useRef, useState } from 'react'
import './index.css'

function makeSeed() {
  return Math.floor(Math.random() * 1e9)
}

function lerp(a: number, b: number, t: number) { return a + (b - a) * t }

function noise2D(x: number, y: number, seed: number) {
  const n = Math.sin(x * 12.9898 + y * 78.233 + seed * 0.000001) * 43758.5453
  return n - Math.floor(n)
}

function smoothNoise(x: number, y: number, seed: number) {
  const xi = Math.floor(x), yi = Math.floor(y)
  const xf = x - xi, yf = y - yi
  const v1 = noise2D(xi, yi, seed)
  const v2 = noise2D(xi + 1, yi, seed)
  const v3 = noise2D(xi, yi + 1, seed)
  const v4 = noise2D(xi + 1, yi + 1, seed)
  const i1 = lerp(v1, v2, xf)
  const i2 = lerp(v3, v4, xf)
  return lerp(i1, i2, yf)
}

export default function CityVoxels() {
  const ref = useRef<HTMLCanvasElement | null>(null)
  const [seed, setSeed] = useState(makeSeed())
  const [tick, setTick] = useState(0)

  useEffect(() => {
    const canvas = ref.current!
    const ctx = canvas.getContext('2d')!
    let raf = 0
    const DPR = Math.max(1, Math.min(2, window.devicePixelRatio || 1))
    let w = 0, h = 0

    const resize = () => {
      w = canvas.clientWidth
      h = canvas.clientHeight
      canvas.width = Math.floor(w * DPR)
      canvas.height = Math.floor(h * DPR)
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0)
    }

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h)
      const style = getComputedStyle(document.documentElement)
      const bg = style.getPropertyValue('--card').trim() || '#2d3135'
      const border = style.getPropertyValue('--border').trim() || '#3a3f44'
      const accent = style.getPropertyValue('--accent').trim() || '#25282b'
      ctx.fillStyle = bg
      ctx.fillRect(0, 0, w, h)

      const tile = Math.max(10, Math.min(18, Math.floor(Math.min(w, h) / 24)))
      const cols = Math.floor(w / tile)
      const rows = Math.floor(h / tile)

      const ox = (t * 0.00025) + tick * 0.001
      const oy = (t * 0.00018) + tick * 0.001

      for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
          const nx = i * 0.25 + ox
          const ny = j * 0.25 + oy
          const base = smoothNoise(nx, ny, seed)
          const road = smoothNoise(nx * 0.6 + 100, ny * 0.6 + 100, seed)
          const isRoad = (road < 0.22) || (i % 8 === 0) || (j % 8 === 0)
          const x = i * tile
          const y = j * tile
          if (isRoad) {
            ctx.fillStyle = border
            ctx.fillRect(x, y, tile, tile)
            continue
          }
          const hq = Math.floor(base * base * 10)
          const cVal = Math.floor(180 - hq * 12)
          ctx.fillStyle = `rgb(${cVal}, ${cVal}, ${cVal})`
          ctx.fillRect(x + 2, y + 2, tile - 4, tile - 4)
          ctx.fillStyle = accent
          const roof = Math.max(4, Math.min(tile - 6, 4 + hq))
          ctx.fillRect(x + (tile - roof) / 2, y + (tile - roof) / 2, roof, roof)
          ctx.fillStyle = 'rgba(0,0,0,0.18)'
          ctx.fillRect(x + 2, y + tile - 6, tile - 4, 4)
        }
      }
    }

    const step = (t: number) => { draw(t); raf = requestAnimationFrame(step) }
    const onResize = () => resize()
    window.addEventListener('resize', onResize)
    resize(); raf = requestAnimationFrame(step)
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', onResize) }
  }, [seed, tick])

  return (
    <div className="demo">
      <h2 style={{ margin: 0 }}>体素城市生成</h2>
      <p className="desc" style={{ margin: 0 }}>噪声驱动街区与楼高，自动漫游，可重新生成。</p>
      <div className="city-controls">
        <button className="btn" onClick={() => setSeed(makeSeed())}>重新生成</button>
        <button className="btn secondary" onClick={() => setTick(v => v + 1)}>加速漫游</button>
      </div>
      <div className="city-wrap card">
        <canvas ref={ref} style={{ width: '100%', height: '100%' }} />
      </div>
    </div>
  )
}
