import { useEffect, useRef, useState } from 'react'
import './index.css'

function LazyImage({ src }: { src: string }) {
  const imgRef = useRef<HTMLImageElement | null>(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const img = imgRef.current!
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          img.src = src
          io.disconnect()
        }
      })
    }, { rootMargin: '120px' })
    io.observe(img)
    return () => io.disconnect()
  }, [src])

  return <img ref={imgRef} alt="demo" onLoad={() => setLoaded(true)} className={loaded ? 'loaded' : ''} />
}

export default function LazyImageDemo() {
  const images = [
    'https://picsum.photos/id/1015/800/800',
    'https://picsum.photos/id/1025/800/800',
    'https://picsum.photos/id/1035/800/800',
    'https://picsum.photos/id/1045/800/800',
    'https://picsum.photos/id/1055/800/800',
    'https://picsum.photos/id/1065/800/800',
  ]
  return (
    <div className="demo">
      <p className="desc" style={{ margin: 0 }}>进入视口前不加载，进入后平滑去模糊。</p>
      <div className="image-grid">
        {images.map((src, i) => (
          <div className="img-item" key={i}>
            <LazyImage src={src} />
          </div>
        ))}
      </div>
    </div>
  )
}
