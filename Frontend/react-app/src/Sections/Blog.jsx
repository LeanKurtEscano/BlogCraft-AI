import { useState, useEffect, useContext } from 'react';
import '../styles/Blog.css';
import axios from 'axios';
import { MyContext } from './MyContext';

const Blog = ({ isAuthenticate }) => {
    const [blogs, setBlogs] = useState([]);
    const { userid, setUserID } = useContext(MyContext);

    const fetchBlogs = async () => {
        const accessToken = localStorage.getItem("access_token");
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
            localStorage.setItem('blog', JSON.stringify(response.data));

            console.log(response.data); 
        } catch (error) {
            console.error('Failed to fetch blogs:', error);
        }
    };

    useEffect(() => {
        const storedBlogs = localStorage.getItem('blog');
        const accessToken = localStorage.getItem('access_token');

        if (userid && isAuthenticate && accessToken) {
            fetchBlogs();
        } else if (storedBlogs) {
            setBlogs(JSON.parse(storedBlogs));
        } else {
            setBlogs([]);
        }
    }, [userid, isAuthenticate]);

    const deleteBlog = async (blogID) => {
        const accessToken = localStorage.getItem('access_token');

        try {
            const response = await axios.post('http://localhost:8000/api/deleteblog/', {
                blogid: blogID,
                userid
            }, {
                headers: {
                    "Authorization": `Bearer ${accessToken}`,
                    "Content-Type": "application/json"
                }
            });

            if (response.status === 200) {
                // Remove deleted blog from state and localStorage
                const updatedBlogs = blogs.filter(blog => blog.id !== blogID);
                setBlogs(updatedBlogs);
                localStorage.setItem('blog', JSON.stringify(updatedBlogs));
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
