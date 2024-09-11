import  { useState, useContext, useEffect } from 'react';
import { MyContext } from './MyContext';
import '../styles/Sidebar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const Sidebar = ({isAuthenticate}) => {
  const [open, setOpen] = useState(false);
  const {blogs, setSelectedBlog, userid, setBlogs} = useContext(MyContext);
  

  const toggleSidebar = () => {
    setOpen(!open);
  };

  const setBlogDetail = (blogID) => {
    setSelectedBlog(blogID);
  }
  
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


  return (
    <div>
      <div className="toggle">
        <button className="toggle-button" onClick={toggleSidebar}>
        <div className="icon-gradient">
            <FontAwesomeIcon icon={open ? faTimes : faBars} />
          </div>
        </button>
      </div>

      <div className={`slide ${open ? 'open' : 'closed'}`}>
        <div className="sidebar-content">
          <p className='history-title'>History</p>
          {blogs.map((blog) => (
            <div className='user-content' key={blog.id} onClick={() => setBlogDetail(blog.id)}>
              <p className='user-title'>{blog.topic}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
