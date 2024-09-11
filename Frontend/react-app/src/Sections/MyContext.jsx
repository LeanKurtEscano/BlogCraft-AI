import { createContext, useState } from 'react';

const MyContext = createContext();

const MyContextProvider = ({ children }) => {
    const [username, setUserName] = useState('');
    const [userid, setUserID] = useState('');
    const [ blogs, setBlogs] = useState([]);
    const [selectedBlog, setSelectedBlog] = useState(null);
   

 
  return (
    <MyContext.Provider value={{ username, setUserName, userid ,setUserID, blogs, setBlogs, selectedBlog, setSelectedBlog}}>
      {children}
    </MyContext.Provider>
  );
};


export { MyContext, MyContextProvider };