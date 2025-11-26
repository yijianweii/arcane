import { useState, useRef } from 'react'
import './index.css'
import * as mammoth from 'mammoth/mammoth.browser'

export default function DocxPreview() {
  const [html, setHtml] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const inputRef = useRef<HTMLInputElement | null>(null)

  const onPick = async (file: File) => {
    setError(''); setLoading(true); setName(file.name)
    try {
      const buf = await file.arrayBuffer()
      const result = await mammoth.convertToHtml({ arrayBuffer: buf }, {
        styleMap: [
          "p[style-name='Title'] => h1:fresh",
          "p[style-name='Subtitle'] => h2:fresh",
          "p[style-name='Heading 1'] => h1:fresh",
          "p[style-name='Heading 2'] => h2:fresh",
        ],
      })
      setHtml(result.value || '')
    } catch (e: any) {
      setError(e?.message || '解析失败')
      setHtml('')
    } finally {
      setLoading(false)
    }
  }

  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && /\.docx$/i.test(file.name)) {
      onPick(file)
    } else {
      setError('仅支持 .docx 文件'); setHtml('')
    }
  }

  const onDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const file = e.dataTransfer.files?.[0]
    if (file) onPick(file)
  }
  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => { e.preventDefault() }

  return (
    <div className="demo">
      <h2 style={{ margin: 0 }}>Word 上传与预览</h2>
      <div className="docx-wrap card">
        <div className="docx-toolbar">
          <button className="btn" onClick={() => inputRef.current?.click()}>选择文件</button>
          <input ref={inputRef} type="file" accept=".docx" onChange={onChange} style={{ display: 'none' }} />
          {name && <span className="file-name">{name}</span>}
        </div>
        <div className="drop-zone" onDrop={onDrop} onDragOver={onDragOver}>
          {loading ? <div className="hint">解析中...</div> : (html ? null : <div className="hint">拖拽 .docx 到此或点击选择文件</div>)}
          {error && <div className="error">{error}</div>}
          {html && <div className="docx-view" dangerouslySetInnerHTML={{ __html: html }} />}
        </div>
      </div>
    </div>
  )
}
