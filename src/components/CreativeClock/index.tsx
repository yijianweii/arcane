import { useEffect, useRef, useState } from 'react'
import './index.css'

function useNow() {
  const [date, setDate] = useState(() => new Date())
  useEffect(() => {
    const t = setInterval(() => setDate(new Date()), 1000)
    return () => clearInterval(t)
  }, [])
  return date
}

function Flip({ value }: { value: string }) {
  const [prev, setPrev] = useState(value)
  const [anim, setAnim] = useState(false)
  const timer = useRef<number | null>(null)
  useEffect(() => {
    if (value !== prev) {
      setPrev(value)
      setAnim(true)
      if (timer.current) window.clearTimeout(timer.current)
      timer.current = window.setTimeout(() => setAnim(false), 600)
    }
  }, [value])
  return (
    <div className={`flip ${anim ? 'animate' : ''}`}>
      <div className="top">{value}</div>
      <div className="bottom">{value}</div>
    </div>
  )
}

function Digits({ value }: { value: string }) {
  return (
    <div className="digits">
      {value.split('').map((ch, i) => (
        ch === ':' ? (
          <div className="colon" key={'c' + i}>:</div>
        ) : (
          <Flip value={ch} key={i + '-' + ch} />
        )
      ))}
    </div>
  )
}

export default function CreativeClock() {
  const now = useNow()
  const hh = now.getHours().toString().padStart(2, '0')
  const mm = now.getMinutes().toString().padStart(2, '0')
  const ss = now.getSeconds().toString().padStart(2, '0')
  const display = `${hh}:${mm}:${ss}`
  return (
    <div className="clock">
      <div className="time"><Digits value={display} /></div>
    </div>
  )
}
