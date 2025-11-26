import { useState } from 'react'
import './index.css'

interface CardData {
  id: number
  title: string
  description: string
  imageUrl: string
}

const cards: CardData[] = [
  {
    id: 1,
    title: '3D 卡片效果',
    description: '这是一个具有3D翻转效果的卡片组件，支持鼠标交互。',
    imageUrl: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=300&h=200&fit=crop',
  },
  {
    id: 2,
    title: '现代设计',
    description: '采用现代设计理念，支持主题系统和响应式布局。',
    imageUrl: 'https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?w=300&h=200&fit=crop',
  },
  {
    id: 3,
    title: '流畅动画',
    description: '使用CSS 3D变换和过渡效果，实现流畅的动画体验。',
    imageUrl: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=300&h=200&fit=crop',
  },
  {
    id: 4,
    title: '响应式设计',
    description: '适配不同屏幕尺寸，提供一致的用户体验。',
    imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=300&h=200&fit=crop',
  },
]

export default function ThreeDCardDemo() {
  const [activeCard, setActiveCard] = useState<number | null>(null)

  const handleCardClick = (id: number) => {
    setActiveCard(activeCard === id ? null : id)
  }

  return (
    <div className="three-d-card-demo">
      <div className="demo-header">
        <h2>3D 卡片翻转效果</h2>
        <p>使用 CSS 3D 变换实现的卡片翻转交互效果</p>
      </div>
      <div className="card-grid">
        {cards.map((card) => (
          <div
            key={card.id}
            className={`card-container ${activeCard === card.id ? 'flipped' : ''}`}
            onClick={() => handleCardClick(card.id)}
          >
            <div className="card">
              <div className="card-front">
                <div className="card-image">
                  <img src={card.imageUrl} alt={card.title} />
                </div>
                <div className="card-content">
                  <h3>{card.title}</h3>
                  <p className="card-preview">点击查看详情</p>
                </div>
              </div>
              <div className="card-back">
                <div className="card-content">
                  <h3>{card.title}</h3>
                  <p>{card.description}</p>
                  <button className="card-button">了解更多</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}