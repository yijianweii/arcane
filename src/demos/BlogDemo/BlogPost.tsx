import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getBlogPostById, BlogPostMeta } from './blogUtils'
import { parseMarkdown } from './utils'
import './index.css'

export default function BlogPost() {
  const { id } = useParams<{ id: string }>()
  const [post, setPost] = useState<BlogPostMeta | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadPost = async () => {
      if (!id) {
        setError('文章ID不存在')
        setLoading(false)
        return
      }

      try {
        const blogPost = await getBlogPostById(id)
        if (blogPost) {
          setPost(blogPost)
        } else {
          setError('文章不存在')
        }
      } catch (err) {
        setError('加载文章时出错')
        console.error('Error loading blog post:', err)
      } finally {
        setLoading(false)
      }
    }

    loadPost()
  }, [id])

  if (loading) {
    return (
      <div className="blog-post-loading">
        <div className="loading-spinner"></div>
        <p>加载中...</p>
      </div>
    )
  }

  if (error || !post) {
    return (
      <div className="blog-post-error">
        <h2>错误</h2>
        <p>{error || '文章不存在'}</p>
        <Link to="/demo/blog" className="back-link">返回博客列表</Link>
      </div>
    )
  }

  const parsedContent = parseMarkdown(post.content)

  return (
    <div className="blog-post">
      <div className="post-header">
        <Link to="/demo/blog" className="back-link">← 返回列表</Link>
        <h1 className="post-title">{post.title || '--'}</h1>
        <div className="post-meta">
          <span className="post-author">作者: {post.author || '--'}</span>
          <span className="post-date">{post.date}</span>
        </div>
      </div>
      
      <div className="post-content" dangerouslySetInnerHTML={{ __html: parsedContent }}></div>
      
    </div>
  )
}