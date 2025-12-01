import { useEffect, useState } from 'react'
import './index.css'

function useTime() {
  const [, force] = useState(0)
  useEffect(() => {
    const i = setInterval(() => force(t => t + 1), 1000)
    return () => clearInterval(i)
  }, [])
  const now = new Date()
  return {
    day: now.getDate().toString().padStart(2, '0'),
    hours: now.getHours().toString().padStart(2, '0'),
    minutes: now.getMinutes().toString().padStart(2, '0'),
    seconds: now.getSeconds().toString().padStart(2, '0'),
  }
}

function Digit({ value }: { value: string }) {
  const [prev, setPrev] = useState(value)
  const [curr, setCurr] = useState(value)
  const [anim, setAnim] = useState(false)
  useEffect(() => {
    if (value !== curr) {
      setPrev(curr)
      setCurr(value)
      setAnim(true)
      const t = setTimeout(() => setAnim(false), 420)
      return () => clearTimeout(t)
    }
  }, [value, curr])
  return (
    <div className={`tile ${anim ? 'animate' : ''}`}>
      <div className="tile-inner">
        {curr.split('').map((ch, i) => (
          <div className="roll" key={i}>
            <div className="roll-inner">
              <span className="d prev">{prev[i] || '0'}</span>
              <span className="d curr">{ch}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function Colon() {
  return (
    <div className="colon">
      <span className="dot" />
      <span className="dot" />
    </div>
  )
}

export default function CreativeClock() {
  const time = useTime()
  return (
    <div className="clock">
      <div className="heading">Current Time</div>
      <div className="board">
        <div className="group"><Digit value={time.day} /><div className="sub">Day</div></div>
        <Colon />
        <div className="group"><Digit value={time.hours} /><div className="sub">Hour</div></div>
        <Colon />
        <div className="group"><Digit value={time.minutes} /><div className="sub">Minute</div></div>
        <Colon />
        <div className="group"><Digit value={time.seconds} /><div className="sub">Second</div></div>
      </div>
    </div>
  )
}
