import React, { createContext, useState } from 'react'


export const LoginContext = createContext("");

const Context = ({ children }) => {

    const [empData, setempData] = useState([]);
    const value = { state: { empData }, actions: { setempData } };


    return (

        <LoginContext.Provider value={value}>
            {children}
        </LoginContext.Provider>

    )
}

export default Context