import React from 'react'
import '../styles/Blogdetails.css'

const BlogDetails = () => {
  return (
    <section className='blogdetails-page'>
    <div className='blog-container'>
        <div className='title-container'>
            <h2 className='new-title'> Blog Posts Details</h2>
        </div>
        <div className='blog-box'>
            <h1 className='blog-title'>Blog Post Title </h1>
            <p>This is the title of the Blog page</p>
        </div>
        <div className='blog-box'>
            <h1 className='blog-title'>Youtube Title</h1>
            <p>Title of the associated youtube video</p>
        </div>
        <div className='blog-box'>
            <h1 className='blog-title'>Youtube Link</h1>
            <p>https://www.youtube.com/</p>
        </div>
    </div>
</section>
    
  )
}

export default BlogDetails