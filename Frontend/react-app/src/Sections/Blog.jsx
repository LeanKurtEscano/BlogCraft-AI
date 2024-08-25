import React from 'react'
import '../styles/Blog.css'
const Blog = () => {
  return (
    <section className='blog-page'>
        <div className='blog-container'>
            <div className='title-container'>
                <h2 className='new-title'>All Blog Posts</h2>
            </div>
            <div className='blog-box'>
                <h1 className='blog-title'>Blog Post Title 1</h1>
                <p>This is the content of the blog post Lorem ipsum dolor sir ament...</p>
            </div>
            <div className='blog-box'>
                <h1 className='blog-title'>Blog Post Title 1</h1>
                <p>This is the content of the blog post Lorem ipsum dolor sir ament...</p>
            </div>
        </div>

    </section>
    
    
  )
}

export default Blog