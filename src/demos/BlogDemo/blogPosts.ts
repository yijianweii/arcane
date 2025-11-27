import { extractTitle } from './utils';

// 使用动态导入自动加载所有Markdown文件
const modules = import.meta.glob('./blog/*.md', { as: 'raw', eager: true });
console.log('modules :', modules);

// 导出所有博客文章
export const blogPosts: Record<string, string> = {};

// 处理导入的模块
Object.keys(modules).forEach((path) => {
  // 从路径中提取文件名（不包含扩展名）
  const fileName = path.replace('./blog/', '').replace('.md', '');
  // @ts-ignore
  blogPosts[fileName] = modules[path];
});

// 构建博客文章标题对象
export const blogPostTitles: Record<string, string> = {};
for (const id in blogPosts) {
  const content = blogPosts[id];
  const title = extractTitle(content);
  blogPostTitles[id] = title || `文章 ${id}`;
}

// 按标题排序并导出ID数组
export const blogPostIds: string[] = Object.keys(blogPostTitles).sort((a, b) => {
  const titleA = blogPostTitles[a];
  const titleB = blogPostTitles[b];
  return titleA.localeCompare(titleB);
});

// 导出博客文章标题元数据
export { blogPostTitles as blogPostsMeta };