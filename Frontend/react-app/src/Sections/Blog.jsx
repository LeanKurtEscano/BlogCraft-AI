

import { useState, useEffect, useContext } from 'react';
import '../styles/Blog.css';
import axios from 'axios';
import { MyContext } from './MyContext';

const Blog = ({ isAuthenticate }) => {
    const [ blogs, setBlogs] = useState([]);
    const { userid } = useContext(MyContext);
    const [success, setSuccess] = useState(false);

    const fetchBlogs = async () => {
        const accessToken = localStorage.getItem('access_token')
        try {
            const response = await axios.post('http://localhost:8000/api/blogdetails/', {
                userid,
            }, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                   
                }
            });

            setBlogs(response.data);
            console.log(response.data); 
        } catch (error) {
            console.error('Failed to fetch blogs:', error);
        }
    };

    useEffect(() => {
        if (userid && isAuthenticate) {
            fetchBlogs();
        } else {
            setBlogs([]); // Clear blogs if not authenticated
        }
    }, [userid, isAuthenticate]);

    const deleteBlog = async (blogID) => {
        try {
            const response = await axios.post('http://localhost:8000/api/deleteblog/', {
                blogid: blogID,
                userid
            }, {
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (response.status === 200) {
                setBlogs(blogs.filter(blog => blog.id !== blogID)); // Remove deleted blog from state
            }

        } catch (error) {
            console.error('Failed to delete blog:', error);
        }
    };

    return (
        <section className='blog-page'>
            <div className='blog-container'>
                <div className='title-container'>
                    <h2 className='new-title'>All Blog Posts</h2>
                </div>
                {blogs.map((blog) => (
                    <div className='blog-item' key={blog.id}> 
                        <div className='blog-box'>
                            <h1 className='blog-title'>Topic: {blog.topic}</h1>
                            <p className='d-tone'>Tone: {blog.tone}</p>
                            <p className='d-style'>Style: {blog.style}</p>
                            <p className='d-complex'>Complexity: {blog.complexity}</p> 
                            <p>{blog.content}</p>
                        </div>
                        <div className='delete-container'>
                            <button className='delete-button' onClick={() => deleteBlog(blog.id)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Blog;
