import { useEffect, useRef, useState } from 'react'
import { Modal, Form, Input, TextArea, Toast } from 'antd-mobile'
import { AddOutline, EditSOutline, DeleteOutline, DownOutline, UpOutline, MoreOutline, SetOutline } from 'antd-mobile-icons'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import { useTheme } from '../../theme'
import './index.css'

type ResumeData = {
  name: string
  title: string
  contact: { email: string; phone: string; website: string }
  summary: string
  skills: string[]
  experience: { company: string; position: string; period: string; description: string }[]
  education: { institution: string; degree: string; period: string }[]
}

const defaultData: ResumeData = {
  name: '张三',
  title: '前端工程师',
  contact: { email: 'z3@example.com', phone: '138****', website: 'site.example.com' },
  summary: '专注于现代前端工程与用户体验优化，热爱设计与技术融合。',
  skills: ['React', 'TypeScript', 'Node.js', 'CSS', 'Vite', 'GraphQL'],
  experience: [
    { company: '公司A', position: '高级前端工程师', period: '2022-至今', description: '负责核心产品前端架构与性能优化，推进设计系统落地。' },
    { company: '公司B', position: '前端工程师', period: '2020-2022', description: '参与多端统一方案，搭建组件库与脚手架。' },
  ],
  education: [
    { institution: '某大学', degree: '计算机科学 学士', period: '2016-2020' },
  ],
}

export default function ResumeStudio() {
  const { effective, setMode } = useTheme()
  const [isDark, setIsDark] = useState(effective === 'dark')
  useEffect(() => setIsDark(effective === 'dark'), [effective])
  const [data, setData] = useState<ResumeData>(defaultData)
  const [tpl, setTpl] = useState<'modern' | 'timeline'>('modern')
  const [tab, setTab] = useState<'overview' | 'skills' | 'experience' | 'education'>('overview')
  const [mode, setModeView] = useState<'edit' | 'preview'>('edit')
  const [modalOpen, setModalOpen] = useState(false)
  const [modalType, setModalType] = useState<'overview' | 'skills' | 'experience' | 'education' | null>(null)
  const [modalIndex, setModalIndex] = useState<number | null>(null)
  const [modalTemp, setModalTemp] = useState<any>({})
  const [toolsOpen, setToolsOpen] = useState(false)
  const [expExpanded, setExpExpanded] = useState<Set<number>>(new Set())
  const previewRef = useRef<HTMLDivElement | null>(null)

  // Device detection
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 900)
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 900)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const toggleExp = (i: number) => {
    const next = new Set(expExpanded)
    if (next.has(i)) next.delete(i)
    else next.add(i)
    setExpExpanded(next)
  }

  const getInitials = (n: string) => {
    const s = String(n || '').trim()
    if (!s) return ''
    if (/^[A-Za-z]/.test(s)) {
      const parts = s.split(/\s+/).filter(Boolean)
      return parts.slice(0, 2).map(p => p[0]).join('').toUpperCase()
    }
    return s.slice(0, 2)
  }


  const delSkill = (i: number) => setData(p => ({ ...p, skills: p.skills.filter((_, idx) => idx !== i) }))
  const delExp = (i: number) => setData(p => ({ ...p, experience: p.experience.filter((_, idx) => idx !== i) }))
  const delEdu = (i: number) => setData(p => ({ ...p, education: p.education.filter((_, idx) => idx !== i) }))

  const openModal = (type: 'overview' | 'skills' | 'experience' | 'education', index: number | null = null) => {
    setModalType(type)
    setModalIndex(index)
    if (type === 'overview') setModalTemp({ name: data.name, title: data.title, email: data.contact.email, phone: data.contact.phone, website: data.contact.website, summary: data.summary })
    if (type === 'experience') {
      const base = { company: '', position: '', period: '', description: '' }
      setModalTemp(index != null ? { ...data.experience[index] } : base)
    }
    if (type === 'education') {
      const base = { institution: '', degree: '', period: '' }
      setModalTemp(index != null ? { ...data.education[index] } : base)
    }
    if (type === 'skills') {
      if (index != null) setModalTemp({ value: data.skills[index] })
      else setModalTemp({ value: '', batch: '' })
    }
    setModalOpen(true)
  }

  const saveModal = () => {
    if (modalType === 'overview') {
      setData(p => ({
        ...p,
        name: modalTemp.name || '',
        title: modalTemp.title || '',
        contact: { email: modalTemp.email || '', phone: modalTemp.phone || '', website: modalTemp.website || '' },
        summary: modalTemp.summary || ''
      }))
    } else if (modalType === 'experience') {
      if (modalIndex == null) setData(p => ({ ...p, experience: [...p.experience, { ...modalTemp }] }))
      else setData(p => ({ ...p, experience: p.experience.map((e, i) => i === modalIndex ? { ...modalTemp } : e) }))
    } else if (modalType === 'education') {
      if (modalIndex == null) setData(p => ({ ...p, education: [...p.education, { ...modalTemp }] }))
      else setData(p => ({ ...p, education: p.education.map((e, i) => i === modalIndex ? { ...modalTemp } : e) }))
    } else if (modalType === 'skills') {
      if (modalIndex == null) {
        const batch = String(modalTemp.batch || '').trim()
        const single = String(modalTemp.value || '').trim()
        if (batch) {
          const tokens = batch.split(/[,，、\s]+/).map(s => s.trim()).filter(Boolean)
          setData(p => ({ ...p, skills: [...p.skills, ...tokens] }))
        } else if (single) {
          setData(p => ({ ...p, skills: [...p.skills, single] }))
        }
      } else {
        const v = String(modalTemp.value || '').trim()
        if (v) setData(p => ({ ...p, skills: p.skills.map((s, i) => i === modalIndex ? v : s) }))
      }
    }
    setModalOpen(false)
    setModalIndex(null)
    setModalType(null)
    setModalTemp({})
    Toast.show({ content: '已保存', position: 'bottom' })
  }

  const download = (name: string, url: string) => { const a = document.createElement('a'); a.href = url; a.download = name; document.body.appendChild(a); a.click(); document.body.removeChild(a) }
  const exportJSON = () => { const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' }); const url = URL.createObjectURL(blob); download('resume.json', url); URL.revokeObjectURL(url) }
  const importJSON = (file: File) => { const r = new FileReader(); r.onload = () => { try { setData(JSON.parse(String(r.result))) } catch {} }; r.readAsText(file) }

  const captureResume = async (): Promise<HTMLCanvasElement | null> => {
    if (!previewRef.current) {
      console.error('Preview ref is null')
      return null
    }
    const input = previewRef.current.querySelector('.sheet') as HTMLElement || previewRef.current

    // Wait for fonts to load
    await document.fonts.ready

    // Clone for capture to avoid screen styles (zoom, scroll)
    const clone = input.cloneNode(true) as HTMLElement
    const wrapper = document.createElement('div')
    wrapper.className = 'resume-studio' // Ensure scope
    wrapper.style.position = 'fixed'
    wrapper.style.left = '0'
    wrapper.style.top = '0'
    wrapper.style.width = '794px' // A4 width @ 96dpi
    wrapper.style.zIndex = '-9999' // Ensure it's behind everything but technically "visible" in viewport
    wrapper.style.opacity = '0' // Make it invisible to user but visible to DOM
    wrapper.style.pointerEvents = 'none'

    // Reset clone styles for print
    clone.style.transform = 'none'
    clone.style.zoom = '1'
    clone.style.width = '100%'
    clone.style.height = 'auto'
    clone.style.margin = '0'
    clone.style.padding = '32px' // Add print padding
    clone.style.background = '#fff'
    
    wrapper.appendChild(clone)
    document.body.appendChild(wrapper)

    // Small delay to ensure rendering
    await new Promise(r => setTimeout(r, 500))

    try {
      const canvas = await html2canvas(clone, {
        scale: 2, // High resolution
        useCORS: true,
        logging: true, // Enable logging for debugging
        backgroundColor: '#ffffff',
        width: 794,
        windowWidth: 794,
        x: 0,
        y: 0
      })
      return canvas
    } catch (e) {
      console.error('Export failed:', e)
      throw e
    } finally {
      if (document.body.contains(wrapper)) {
        document.body.removeChild(wrapper)
      }
    }
  }

  const exportPNG = async () => {
    try {
      const canvas = await captureResume()
      if (!canvas) {
        Toast.show({ content: '导出失败：无法生成画布', position: 'bottom' })
        return
      }
      download('resume.png', canvas.toDataURL('image/png'))
    } catch (e: any) {
      Toast.show({ content: `导出失败: ${e.message || '未知错误'}`, position: 'bottom' })
    }
  }

  const exportPDF = async () => {
    try {
      const canvas = await captureResume()
      if (!canvas) {
        Toast.show({ content: '导出失败：无法生成画布', position: 'bottom' })
        return
      }

      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      })

      const imgProps = pdf.getImageProperties(imgData)
      const pdfWidth = pdf.internal.pageSize.getWidth()
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight)
      pdf.save('resume.pdf')
    } catch (e: any) {
      console.error(e)
      Toast.show({ content: `导出失败: ${e.message || '未知错误'}`, position: 'bottom' })
    }
  }

  return (
    <div className={`resume-studio ${isDark ? 'dark' : ''}`}>
      <div className="studio-topbar">
        <div className="brand">Resume Studio</div>
        <div className="actions">
          {isMobile ? (
            <>
              <div className="seg">
                <button className={mode === 'edit' ? 'active' : ''} onClick={() => setModeView('edit')}>编辑</button>
                <button className={mode === 'preview' ? 'active' : ''} onClick={() => setModeView('preview')}>预览</button>
              </div>
              <div className="right-actions">
                <button className="tool-toggle" onClick={() => setToolsOpen(!toolsOpen)}>
                  <SetOutline />
                </button>
              </div>
            </>
          ) : (
            <button className="tool-toggle" onClick={() => setToolsOpen(!toolsOpen)}>
              {toolsOpen ? <UpOutline /> : <DownOutline />}
            </button>
          )}

          <div className={`tools-group ${toolsOpen ? 'visible' : ''}`}>
            {isMobile && (
              <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginBottom: 8 }}>
                <button onClick={() => { const next = !isDark; setIsDark(next); setMode(next ? 'dark' : 'light') }}>{isDark ? '切换亮色模式' : '切换暗色模式'}</button>
              </div>
            )}
            <select value={tpl} onChange={e => setTpl(e.target.value as any)}>
              <option value="modern">现代</option>
              <option value="timeline">时间轴</option>
            </select>
            <button onClick={exportJSON}>JSON</button>
            <label className="import">
              导入
              <input type="file" accept="application/json" onChange={e => e.target.files && importJSON(e.target.files[0])} />
            </label>
            <button onClick={exportPNG}>PNG</button>
            <button onClick={exportPDF}>PDF</button>
          </div>
        </div>
      </div>

      <div className="studio-content">
        <div className={`flipper ${mode === 'preview' ? 'flipped' : ''}`}>
          <aside className={`editor ${mode === 'edit' ? 'active' : ''}`}>
            <div className="editor-nav">
            <button className={tab === 'overview' ? 'active' : ''} onClick={() => setTab('overview')}>总览</button>
            <button className={tab === 'skills' ? 'active' : ''} onClick={() => setTab('skills')}>技能</button>
            <button className={tab === 'experience' ? 'active' : ''} onClick={() => setTab('experience')}>经历</button>
            <button className={tab === 'education' ? 'active' : ''} onClick={() => setTab('education')}>教育</button>
          </div>
          {tab === 'overview' && (
            <div className="section-card">
              <div className="section-row"><div className="label">姓名</div><div className="val">{data.name}</div></div>
              <div className="section-row"><div className="label">头衔</div><div className="val">{data.title}</div></div>
              <div className="section-row"><div className="label">联系方式</div><div className="val">{data.contact.email} · {data.contact.phone} · {data.contact.website}</div></div>
              <div className="section-row"><div className="label">摘要</div><div className="val">{data.summary}</div></div>
              <div className="row-actions"><button className="icon-btn" aria-label="编辑" onClick={() => openModal('overview', null)}><EditSOutline /></button></div>
            </div>
          )}
          {tab === 'skills' && (
            <div className="section-card">
              <div className="section-head"><span>技能</span><div className="row-actions"><button className="icon-btn" aria-label="新增技能" onClick={() => openModal('skills', null)}><AddOutline /></button></div></div>
              <div className="chips">{data.skills.map((s, i) => (
                <span className="chip" key={i}>
                  {s}
                  <button className="chip-act" aria-label="编辑技能" onClick={() => openModal('skills', i)}><EditSOutline /></button>
                  <button className="del" aria-label="删除技能" onClick={() => delSkill(i)}><DeleteOutline /></button>
                </span>
              ))}</div>
            </div>
          )}
          {tab === 'experience' && (
            <>
              <div className="section-head"><span>经历</span><button className="icon-btn" aria-label="新增经历" onClick={() => openModal('experience', null)}><AddOutline /></button></div>
              {data.experience.map((e, i) => (
                <div className="entry-card" key={i}>
                  <div className="row"><div className="label">公司</div><div className="val">{e.company}</div></div>
                  <div className="row"><div className="label">职位</div><div className="val">{e.position}</div></div>
                  <div className="row"><div className="label">时间</div><div className="val">{e.period}</div></div>
                  <div className="row description" onClick={() => toggleExp(i)}>
                    <div className="label">描述</div>
                    <div className="val-wrap">
                      <div className={`val-text ${expExpanded.has(i) ? '' : 'collapsed'}`}>{e.description}</div>
                      <div className="toggler">{expExpanded.has(i) ? <UpOutline /> : <DownOutline />}</div>
                    </div>
                  </div>
                  <div className="row-actions"><button className="icon-btn" aria-label="编辑经历" onClick={() => openModal('experience', i)}><EditSOutline /></button><button className="icon-btn" aria-label="删除经历" onClick={() => delExp(i)}><DeleteOutline /></button></div>
                </div>
              ))}
            </>
          )}
          {tab === 'education' && (
            <>
              <div className="section-head"><span>教育</span><button className="icon-btn" aria-label="新增教育" onClick={() => openModal('education', null)}><AddOutline /></button></div>
              {data.education.map((e, i) => (
                <div className="entry-card" key={i}>
                  <div className="row"><div className="label">学校</div><div className="val">{e.institution}</div></div>
                  <div className="row"><div className="label">学位</div><div className="val">{e.degree}</div></div>
                  <div className="row"><div className="label">时间</div><div className="val">{e.period}</div></div>
                  <div className="row-actions"><button className="icon-btn" aria-label="编辑教育" onClick={() => openModal('education', i)}><EditSOutline /></button><button className="icon-btn" aria-label="删除教育" onClick={() => delEdu(i)}><DeleteOutline /></button></div>
                </div>
              ))}
            </>
          )}
        </aside>

        <main ref={previewRef} className={`preview ${tpl} ${mode === 'preview' ? 'active' : ''}`}>
          <div className="sheet">
            <div className="row1">
              <div className="avatar">{getInitials(data.name)}</div>
              <div>
                <div className="name">{data.name}</div>
                <div className="title">{data.title}</div>
                <div className="contact">{data.contact.email} · {data.contact.phone} · {data.contact.website}</div>
              </div>
            </div>
            <div className="summary">{data.summary}</div>
            <div className="block">
              <div className="h">技能</div>
              <div className="badges">{data.skills.map((s, i) => (<span key={i} className="badge">{s}</span>))}</div>
            </div>
            <div className="block">
              <div className="h">经历</div>
              <div className="list">
                {data.experience.map((e, i) => (
                  <div className="item" key={i}>
                    <div className="line"><span className="company">{e.company}</span><span className="position">{e.position}</span><span className="period">{e.period}</span></div>
                    <div className="desc">{e.description}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="block">
              <div className="h">教育</div>
              <div className="list">
                {data.education.map((e, i) => (
                  <div className="item" key={i}>
                    <div className="line"><span className="institution">{e.institution}</span><span className="degree">{e.degree}</span><span className="period">{e.period}</span></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
        </div>
      </div>

      {modalOpen && (
        <Modal
          visible={modalOpen}
          closeOnAction
          closeOnMaskClick
          getContainer={() => document.body}
          maskStyle={{ backgroundColor: 'rgba(0,0,0,.45)' }}
          onClose={() => setModalOpen(false)}
          content={(
            <Form layout="vertical">
              {modalType === 'overview' && (
                <>
                  <Form.Item label="姓名">
                    <Input value={modalTemp.name || ''} onChange={v => setModalTemp((p: any) => ({ ...p, name: v }))} />
                  </Form.Item>
                  <Form.Item label="头衔">
                    <Input value={modalTemp.title || ''} onChange={v => setModalTemp((p: any) => ({ ...p, title: v }))} />
                  </Form.Item>
                  <Form.Item label="邮箱">
                    <Input value={modalTemp.email || ''} onChange={v => setModalTemp((p: any) => ({ ...p, email: v }))} />
                  </Form.Item>
                  <Form.Item label="电话">
                    <Input value={modalTemp.phone || ''} onChange={v => setModalTemp((p: any) => ({ ...p, phone: v }))} />
                  </Form.Item>
                  <Form.Item label="网站">
                    <Input value={modalTemp.website || ''} onChange={v => setModalTemp((p: any) => ({ ...p, website: v }))} />
                  </Form.Item>
                  <Form.Item label="摘要">
                    <TextArea value={modalTemp.summary || ''} onChange={v => setModalTemp((p: any) => ({ ...p, summary: v }))} />
                  </Form.Item>
                </>
              )}
              {modalType === 'experience' && (
                <>
                  <Form.Item label="公司">
                    <Input value={modalTemp.company || ''} onChange={v => setModalTemp((p: any) => ({ ...p, company: v }))} />
                  </Form.Item>
                  <Form.Item label="职位">
                    <Input value={modalTemp.position || ''} onChange={v => setModalTemp((p: any) => ({ ...p, position: v }))} />
                  </Form.Item>
                  <Form.Item label="时间">
                    <Input value={modalTemp.period || ''} onChange={v => setModalTemp((p: any) => ({ ...p, period: v }))} />
                  </Form.Item>
                  <Form.Item label="描述">
                    <TextArea value={modalTemp.description || ''} onChange={v => setModalTemp((p: any) => ({ ...p, description: v }))} />
                  </Form.Item>
                </>
              )}
              {modalType === 'education' && (
                <>
                  <Form.Item label="学校">
                    <Input value={modalTemp.institution || ''} onChange={v => setModalTemp((p: any) => ({ ...p, institution: v }))} />
                  </Form.Item>
                  <Form.Item label="学位">
                    <Input value={modalTemp.degree || ''} onChange={v => setModalTemp((p: any) => ({ ...p, degree: v }))} />
                  </Form.Item>
                  <Form.Item label="时间">
                    <Input value={modalTemp.period || ''} onChange={v => setModalTemp((p: any) => ({ ...p, period: v }))} />
                  </Form.Item>
                </>
              )}
              {modalType === 'skills' && (
                <>
                  {modalIndex != null ? (
                    <Form.Item label="技能">
                      <Input value={modalTemp.value || ''} onChange={v => setModalTemp((p: any) => ({ ...p, value: v }))} />
                    </Form.Item>
                  ) : (
                    <>
                      <Form.Item label="单个技能">
                        <Input value={modalTemp.value || ''} onChange={v => setModalTemp((p: any) => ({ ...p, value: v }))} />
                      </Form.Item>
                      <Form.Item label="批量（逗号/空格分隔）">
                        <TextArea value={modalTemp.batch || ''} onChange={v => setModalTemp((p: any) => ({ ...p, batch: v }))} />
                      </Form.Item>
                    </>
                  )}
                </>
              )}
            </Form>
          )}
          actions={[
            { key: 'save', text: '保存', onClick: async () => { await Promise.resolve(); saveModal() } },
            { key: 'cancel', text: '取消', onClick: () => setModalOpen(false) },
          ]}
        />
      )}
    </div>
  )
}
