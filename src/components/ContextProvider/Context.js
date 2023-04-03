import React, { createContext, useState } from 'react'


export const LoginContext = createContext("");

const Provider = ({ children }) => {

    const [empData, setempData] = useState([]);
    const value = { empData, setempData };


    return (

        <LoginContext.Provider value={value}>
            {children}
        </LoginContext.Provider>

    )
}

export default Provider