import { createContext, useState } from 'react';

const MyContext = createContext();

const MyContextProvider = ({ children }) => {
    const [username, setUserName] = useState('');
    const [userid, setUserID] = useState('');

 
  return (
    <MyContext.Provider value={{ username, setUserName, userid ,setUserID }}>
      {children}
    </MyContext.Provider>
  );
};


export { MyContext, MyContextProvider };