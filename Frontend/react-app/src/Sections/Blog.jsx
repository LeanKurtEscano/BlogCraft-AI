import { useState, useEffect, useContext } from 'react';
import '../styles/Blog.css';
import axios from 'axios';
import { MyContext } from './MyContext';
import Sidebar from './Sidebar';


const Blog = ({ isAuthenticate }) => {
    const { userid, setUserID, blogs, setBlogs, selectedBlog } = useContext(MyContext);


    useEffect(() => {
        if (!userid) {
            const storedUserID = localStorage.getItem('userid');
            if (storedUserID) {
                const parseStored = JSON.parse(storedUserID);
                setUserID(parseStored);
            }
        }
    }, [userid, setUserID]);
    
    

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
            localStorage.setItem('blogs', JSON.stringify(response.data));
        } catch (error) {
            console.error('Failed to fetch blogs:', error);
        }
    };


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

                const updatedBlogs = blogs.filter(blog => blog.id !== blogID);
                setBlogs(updatedBlogs);

                const getStored = localStorage.getItem('blogs');

                if(getStored) {
                    const parseBlogs = JSON.parse(getStored);

                    const updateStoredBlogs = parseBlogs.filter(blog => blog.id !== blogID);
                    localStorage.setItem('blogs', JSON.stringify(updateStoredBlogs));

                }
                
            }
        } catch (error) {
            console.error('Failed to delete blog:', error);

        }
    };

    useEffect(() => {
        const storedBlogs = localStorage.getItem('blogs');
        const accessToken = localStorage.getItem('access_token');

        if (userid && isAuthenticate && accessToken) {
            fetchBlogs();
        } else if (storedBlogs){
            setBlogs(JSON.parse(storedBlogs)); 
        } else {
            setBlogs([]); 

        }
    }, [userid, isAuthenticate]);

    const selectedBlogData = blogs.find(blog => blog.id === selectedBlog);


    return (
        <section className='blog-page'>
        <div className='topic-container'>
        <div className='topic-title'>
            <h1>{selectedBlogData ? selectedBlogData.topic : 'Select a blog'}</h1>
        </div>
        </div>
        <div className='topic-text'>
            <p>{selectedBlogData ? selectedBlogData.content: ''}</p>
        </div>
    </section>      
    );
};

export default Blog;
