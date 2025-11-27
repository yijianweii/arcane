import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getAllBlogPosts, getAllCategories, BlogPostMeta } from './blogUtils'
import { subscribeToMobileDetection } from './utils'
import './index.css'

export default function BlogDemo() {
  const [posts, setPosts] = useState<BlogPostMeta[]>([])
  const [allPosts, setAllPosts] = useState<BlogPostMeta[]>([])
  const [selectedCategory, setSelectedCategory] = useState('全部')
  const [categories, setCategories] = useState<string[]>(['全部'])
  const [loading, setLoading] = useState(true)
  const [isMobile, setIsMobile] = useState(false)

  // 加载所有博客文章
  useEffect(() => {
    const loadPosts = async () => {
      try {
        const blogPosts = await getAllBlogPosts()
        setAllPosts(blogPosts)
        setPosts(blogPosts)
        setCategories(getAllCategories(blogPosts))
      } catch (error) {
        console.error('Error loading blog posts:', error)
      } finally {
        setLoading(false)
      }
    }

    loadPosts()
  }, [])

  // 监听移动设备检测
  useEffect(() => {
    return subscribeToMobileDetection(setIsMobile);
  }, [])

  // 根据分类筛选文章
  useEffect(() => {
    if (selectedCategory === '全部') {
      setPosts(allPosts)
    } else {
      setPosts(allPosts.filter(post => post.category === selectedCategory))
    }
  }, [selectedCategory, allPosts])

  if (loading) {
    return (
      <div className="blog-demo-loading">
        <div className="loading-spinner"></div>
        <p>加载中...</p>
      </div>
    )
  }

  return (
    <div className="blog-demo">
      <div className="blog-header">
        <h2>BLOG</h2>
        <p>share your blog</p>
      </div>
      
      <div className="blog-content">
        <div className="blog-sidebar">
          <div className="category-filter">
            <h3>分类</h3>
            <ul>
              {categories.map(category => (
                <li 
                  key={category} 
                  className={selectedCategory === category ? 'active' : ''}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="blog-main">
          <div className="post-list">
            {posts.map(post => (
              <div key={post.id} className="post-card">
                <h4 className="post-title">
                  <Link to={`/demo/blog/${post.id}`}>{post.title}</Link>
                </h4>
                <div className="post-author">作者: {post.author}</div>
                <div className="post-meta">
                  <span className="post-date">{post.date}</span>
                </div>
                {!isMobile && (
                  <>
                    <div className="post-summary">{post.summary}</div>
                    <div className="post-footer">
                      <div className="post-category">{post.category}</div>
                      <div className="post-tags">
                        {post.tags.map(tag => (
                          <span key={tag} className="tag">{tag}</span>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}