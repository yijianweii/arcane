
import { parseFrontMatter } from './utils';

// 博客文章元数据接口
export interface BlogPostMeta {
  id: string;
  title: string;
  summary: string;
  category: string;
  tags: string[];
  date: string;
  author: string;
  content: string;
}

// 从Markdown内容中提取元数据
export function extractBlogMetadata(markdown: string, filename: string): BlogPostMeta {
  // 使用自定义函数解析前置元数据
  const { frontMatter, content } = parseFrontMatter(markdown);
  
  // 从前置元数据或内容中获取标题
  let title = frontMatter.title || '';
  if (!title) {
    const titleMatch = content.match(/^#\s+(.+)$/);
    title = titleMatch ? titleMatch[1] : filename.replace('.md', '');
  }
  
  // 从前置元数据或内容中获取摘要
  let summary = frontMatter.summary || '';
  if (!summary) {
    const lines = content.split('\n');
    let foundFirstParagraph = false;
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      if (line && !line.startsWith('#') && !line.startsWith('```')) {
        summary = line;
        foundFirstParagraph = true;
        break;
      }
    }
    
    // 如果没有找到合适的摘要，使用默认值
    if (!summary) {
      summary = `${title}的详细内容`;
    }
  }
  
  // 从前置元数据或内容中获取分类
  let category = frontMatter.category || '';
  if (!category) {
    const categoryMatch = content.match(/分类[：:]\s*([^\n]+)/);
    if (categoryMatch) {
      category = categoryMatch[1].trim();
    } else {
      // 根据内容推断分类
      if (title.includes('React') || content.includes('React')) category = '前端开发';
      if (title.includes('TypeScript') || content.includes('TypeScript')) category = '前端开发';
      if (title.includes('CSS') || content.includes('CSS')) category = 'CSS';
      if (title.includes('性能') || content.includes('性能')) category = '性能优化';
      if (title.includes('工程化') || content.includes('工程化')) category = '工程化';
    }
  }
  if (!category) category = '未分类';
  
  // 从前置元数据或内容中获取作者
  let author = frontMatter.author || '';
  if (!author) {
    const authorMatch = content.match(/作者[：:]\s*([^\n]+)/);
    if (authorMatch) {
      author = authorMatch[1].trim();
    }
  }
  if (!author) author = '匿名';
  
  // 从前置元数据或内容中获取日期
  let date = frontMatter.date || '';
  if (!date) {
    const dateMatch = content.match(/日期[：:]\s*([^\n]+)/);
    if (dateMatch) {
      date = dateMatch[1].trim();
    }
  }
  if (!date) date = new Date().toISOString().split('T')[0]; // 默认为今天
  
  // 尝试从内容中提取标签
  let tags: string[] = [];
  const tagMatch = content.match(/标签[：:]\s*([^\n]+)/);
  if (tagMatch) {
    const tagString = tagMatch[1];
    const tagArray = tagString.split(/[,，、\s]+/);
    tags.push(...tagArray.filter(tag => tag.trim()));
  }
  
  // 如果没有找到标签，根据内容推断一些标签
  if (tags.length === 0) {
    if (title.includes('React') || content.includes('React')) tags.push('React');
    if (title.includes('TypeScript') || content.includes('TypeScript')) tags.push('TypeScript');
    if (title.includes('CSS') || content.includes('CSS')) tags.push('CSS');
    if (title.includes('JavaScript') || content.includes('JavaScript')) tags.push('JavaScript');
    if (title.includes('性能') || content.includes('性能')) tags.push('性能优化');
    if (title.includes('工程化') || content.includes('工程化')) tags.push('工程化');
  }
  
  return {
    id: filename.replace('.md', ''),
    title,
    summary,
    category,
    tags,
    date,
    author,
    content
  };
}

// 获取所有博客文章
export async function getAllBlogPosts(): Promise<BlogPostMeta[]> {
  // 导入博客文章
  const { blogPosts, blogPostIds } = await import('./blogPosts');
  
  const posts: BlogPostMeta[] = [];
  
  for (const id of blogPostIds) {
    const markdown = blogPosts[id as keyof typeof blogPosts];
    if (markdown) {
      const post = extractBlogMetadata(markdown, `${id}.md`);
      posts.push(post);
    }
  }
  
  // 按日期排序（最新的在前）
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

// 获取所有博客文章标题
export async function getAllBlogPostTitles(): Promise<Record<string, string>> {
  const { blogPostsMeta } = await import('./blogPosts');
  return blogPostsMeta;
}

// 根据ID获取特定博客文章
export async function getBlogPostById(id: string): Promise<BlogPostMeta | null> {
  try {
    // 导入博客文章
    const { blogPosts } = await import('./blogPosts');
    
    // 直接使用传入的ID查找文章
    const markdown = blogPosts[id];
    
    if (markdown) {
      return extractBlogMetadata(markdown, `${id}.md`);
    }
    return null;
  } catch (error) {
    console.error(`Error loading blog post ${id}:`, error);
    return null;
  }
}

// 获取所有分类
export function getAllCategories(posts: BlogPostMeta[]): string[] {
  const categories = [...new Set(posts.map(post => post.category))];
  return ['全部', ...categories];
}