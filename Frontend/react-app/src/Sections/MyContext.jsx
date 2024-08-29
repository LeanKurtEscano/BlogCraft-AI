import { createContext, useState } from 'react';

const MyContext = createContext();

const MyContextProvider = ({ children }) => {
    const [username, setUserName] = useState('');

 
  return (
    <MyContext.Provider value={{ username, setUserName }}>
      {children}
    </MyContext.Provider>
  );
};


export { MyContext, MyContextProvider };