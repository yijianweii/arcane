import { useEffect, useRef, useState } from 'react'
import './index.css'

interface ChartData {
  label: string
  value: number
  color: string
}

const generateRandomData = (): ChartData[] => {
  const labels = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
  const colors = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444', '#06b6d4']
  
  return labels.map((label, index) => ({
    label,
    value: Math.floor(Math.random() * 100) + 20,
    color: colors[index % colors.length]
  }))
}

export default function ChartDemo() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [data, setData] = useState<ChartData[]>([])
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    setData(generateRandomData())
  }, [])

  useEffect(() => {
    if (!canvasRef.current || data.length === 0) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // 设置canvas尺寸
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      drawChart()
    }

    window.addEventListener('resize', resizeCanvas)
    resizeCanvas()

    return () => window.removeEventListener('resize', resizeCanvas)
  }, [data])

  const drawChart = () => {
    if (!canvasRef.current || data.length === 0) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const width = canvas.width
    const height = canvas.height
    // 根据屏幕宽度调整内边距，移动端增加底部内边距以容纳旋转后的标签
    const isMobile = width < 600
    const padding = { 
      top: 40, 
      right: 40, 
      bottom: isMobile ? 80 : 40, // 移动端增加底部内边距
      left: 40 
    }
    const chartWidth = width - padding.left - padding.right
    const chartHeight = height - padding.top - padding.bottom

    // 清空画布
    ctx.clearRect(0, 0, width, height)

    // 计算最大值
    const maxValue = Math.max(...data.map(item => item.value))

    // 绘制坐标轴
    ctx.strokeStyle = 'var(--border-color)'
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(padding.left, padding.top)
    ctx.lineTo(padding.left, height - padding.bottom)
    ctx.lineTo(width - padding.right, height - padding.bottom)
    ctx.stroke()

    // 绘制网格线
    ctx.strokeStyle = 'var(--border-color)'
    ctx.lineWidth = 0.5
    ctx.setLineDash([5, 5])

    for (let i = 0; i <= 5; i++) {
      const y = padding.top + (chartHeight / 5) * i
      ctx.beginPath()
      ctx.moveTo(padding.left, y)
      ctx.lineTo(width - padding.right, y)
      ctx.stroke()

      // 绘制Y轴标签
      ctx.setLineDash([])
      ctx.fillStyle = 'var(--muted-color)'
      ctx.font = '12px sans-serif'
      ctx.textAlign = 'right'
      ctx.fillText(`${Math.round(maxValue - (maxValue / 5) * i)}`, padding.left - 10, y + 4)
      ctx.setLineDash([5, 5])
    }

    ctx.setLineDash([])

    // 绘制柱状图
    const barWidth = chartWidth / data.length - 10
    const barSpacing = chartWidth / data.length

    data.forEach((item, index) => {
      const x = padding.left + index * barSpacing + 5
      const barHeight = (item.value / maxValue) * chartHeight
      const y = height - padding.bottom - barHeight

      // 绘制柱子
      ctx.fillStyle = item.color
      ctx.fillRect(x, y, barWidth, barHeight)

      // 添加悬停效果
      canvas.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect()
        const mouseX = e.clientX - rect.left
        const mouseY = e.clientY - rect.top

        if (mouseX >= x && mouseX <= x + barWidth && mouseY >= y && mouseY <= y + barHeight) {
          canvas.style.cursor = 'pointer'
          ctx.fillStyle = `${item.color}80`
          ctx.fillRect(x, y, barWidth, barHeight)
        } else {
          canvas.style.cursor = 'default'
        }
      })

      canvas.addEventListener('mouseleave', () => {
        canvas.style.cursor = 'default'
      })

      // 绘制X轴标签
      ctx.fillStyle = 'var(--text-color)'
      
      // 根据屏幕宽度动态调整标签样式
      const isMobile = width < 600
      const labelFontSize = isMobile ? 10 : 12
      
      ctx.font = `${labelFontSize}px sans-serif`
      ctx.textAlign = 'center'
      
      if (isMobile) {
        // 在移动端，旋转标签以避免重叠
        ctx.save()
        ctx.translate(x + barWidth / 2, height - padding.bottom + 20)
        ctx.rotate(-Math.PI / 4) // 旋转45度
        ctx.fillText(item.label, 0, 0)
        ctx.restore()
      } else {
        // 在桌面端，正常显示标签
        ctx.fillText(item.label, x + barWidth / 2, height - padding.bottom + 20)
      }
    })
  }

  const handleRegenerateData = () => {
    setIsAnimating(true)
    setData(generateRandomData())
    setTimeout(() => setIsAnimating(false), 500)
  }

  return (
    <div className="chart-demo">
      <div className="demo-header">
        <h2>图表示例</h2>
        <p>使用 Canvas API 实现的数据可视化图表</p>
      </div>
      <div className="demo-content">
        <canvas ref={canvasRef} className="chart-canvas" />
        <button 
          className={`regenerate-button ${isAnimating ? 'animating' : ''}`}
          onClick={handleRegenerateData}
          disabled={isAnimating}
        >
          {isAnimating ? '生成中...' : '重新生成数据'}
        </button>
      </div>
    </div>
  )
}