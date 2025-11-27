// utils.ts - 全局工具函数

/**
 * 检测是否为移动设备
 * @returns {boolean} 是否为移动设备
 */
export const isMobileDevice = (): boolean => {
  // 检查是否在浏览器环境中
  if (typeof window !== 'undefined') {
    return window.innerWidth <= 768;
  }
  // 默认返回false（服务端渲染时）
  return false;
};

/**
 * 监听窗口大小变化，更新移动设备检测状态
 * @param callback 回调函数
 * @returns 清理函数
 */
export const subscribeToMobileDetection = (callback: (isMobile: boolean) => void): (() => void) => {
  const checkIsMobile = () => {
    callback(window.innerWidth <= 768);
  };

  // 初始检查
  checkIsMobile();

  // 监听窗口大小变化
  window.addEventListener('resize', checkIsMobile);

  // 返回清理函数
  return () => {
    window.removeEventListener('resize', checkIsMobile);
  };
};

// 解析前置元数据(frontmatter)的函数
export const parseFrontMatter = (markdown: string) => {
  const frontMatterMatch = markdown.match(/^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/);
  
  let frontMatter: Record<string, string> = {};
  let content = markdown;
  
  if (frontMatterMatch) {
    // 解析前置元数据
    const frontMatterText = frontMatterMatch[1];
    content = frontMatterMatch[2];
    
    // 将前置元数据转换为对象
    frontMatterText.split('\n').forEach(line => {
      const match = line.match(/^(\w+):\s*(.+)$/);
      if (match) {
        frontMatter[match[1]] = match[2].trim();
      }
    });
  }
  
  return { frontMatter, content };
};

// 获取标题的辅助函数
export const extractTitle = (content: string): string => {
  // 首先尝试从frontmatter中提取标题
  const frontMatterMatch = content.match(/^---\s*\n([\s\S]*?)\n---\s*\n/);
  if (frontMatterMatch) {
    const frontMatterText = frontMatterMatch[1];
    const titleMatch = frontMatterText.match(/^title:\s*(.+)$/m);
    if (titleMatch) {
      return titleMatch[1].trim();
    }
  }
  
  // 如果frontmatter中没有标题，从内容中提取第一个#标题
  const titleMatch = content.match(/^#\s+(.+)$/m);
  if (titleMatch) {
    return titleMatch[1].trim();
  }
  
  // 如果都没有，返回空字符串
  return '';
};

// 简单的Markdown解析器（仅处理基本格式）
export const parseMarkdown = (markdown: string) => {
  // 处理标题
  let html = markdown.replace(/^### (.*$)/gim, '<h3>$1</h3>');
  html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
  html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');
  
  // 处理粗体
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  
  // 处理斜体
  html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');
  
  // 处理代码块
  html = html.replace(/```(\w+)?\n([\s\S]*?)```/g, (match, lang, code) => {
    return `<pre><code class="language-${lang || 'text'}">${code.trim()}</code></pre>`;
  });
  
  // 处理行内代码
  html = html.replace(/`(.+?)`/g, '<code>$1</code>');
  
  // 处理链接
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
  
  // 处理段落
  html = html.replace(/\n\n/g, '</p><p>');
  html = `<p>${html}</p>`;
  
  // 处理列表
  html = html.replace(/<p>- (.+?)<\/p>/g, '<li>$1</li>');
  html = html.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>');
  
  return html;
};