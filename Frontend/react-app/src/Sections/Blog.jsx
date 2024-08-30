import { useState, useEffect,useContext } from 'react';
import '../styles/Blog.css';
import axios from 'axios';
import { MyContext } from './MyContext';
const Blog = ({isAuthenticate})=> {
    const [blogs, setBlogs] = useState([]);
    const {userid} = useContext(MyContext);
    const [selectedBlog, setSelectedBlog] = useState(false);
    
    const fetchBlogs = async () => {
        try {
            const response = await axios.post('http://localhost:8000/api/blogdetails/', {
                userid
            }, {
                headers: {
                    'Content-Type': 'application/json' 
                }
            });
            
            setBlogs(response.data);
            console.log(response.data); // Check the structure of response.data
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



    return (
        <section className='blog-page'>
            <div className='blog-container'>
                <div className='title-container'>
                    <h2 className='new-title'>All Blog Posts</h2>
                </div>
                {blogs.map((blog, index) => (
                    <div className='blog-box' key={index}>
                        <h1 className='blog-title'>Topic: {blog.topic}</h1>
                        <p className='d-tone'>Tone: {blog.tone}</p>
                        <p className='d-style'>Style: {blog.style}</p>
                        <p className='d-complex'>Complexity: {blog.complextity}</p>
                        <p>{blog.content}</p>
                    </div>
                ))}

                
            </div>
        </section>
    );
};

export default Blog;
