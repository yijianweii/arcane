export type MenuItem = { path: string; label: string }
export type MenuGroup = { title: string; items: MenuItem[] }

export const menu: MenuGroup[] = [
  {
    title: 'PICK',
    items: [
      { path: '/demo/theme', label: '主题系统' },
      { path: '/demo/canvas', label: 'Canvas 粒子' },
      { path: '/demo/3d-card', label: '3D 卡片' },
    ],
  },
  {
    title: 'DEMO',
    items: [
      { path: '/demo/lazy-image', label: '图片懒加载' },
      { path: '/demo/city', label: '体素城市' },
      { path: '/demo/docx', label: 'Word 预览' },
      { path: '/demo/chart', label: '动态图表' },
    ],
  },
]
