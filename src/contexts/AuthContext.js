
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [users , setUsers] = useState(null)
    const [login , setLogin] = useState(JSON.parse(localStorage?.getItem('userLoggedIn')) || false)
    const [name , setUserName]  = useState(JSON.parse(localStorage?.getItem('userName')) || '')
    useEffect(() => {
        const userLoggendIn = JSON.parse(localStorage?.getItem('userLoggedIn'))
        userLoggendIn?.login && setLogin(userLoggendIn.login)
        const userName = JSON.parse(localStorage?.getItem('userName'))
        userName?.name && setUserName(userName.name)
    },[])
    return (
        <AuthContext.Provider value = {{login , users , name , setUsers , setLogin , setUserName}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)