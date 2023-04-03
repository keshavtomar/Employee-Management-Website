import React, { createContext, useState } from 'react'


export const LoginContext = createContext("");

const Context = ({ children }) => {

    const [empData, setempData] = useState([]);

    return (

        <LoginContext.Provider value={{ empData, setempData }}>
            {children}
        </LoginContext.Provider>

    )
}

export default Context