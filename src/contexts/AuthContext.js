
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [users , setUsers] = useState(null)
    const [login , setLogin] = useState(JSON.parse(localStorage?.getItem('userLoggedIn')) || false)
    const [name , setName]  = useState(JSON.parse(localStorage?.getItem('userName')) || '')
    const [userId , setUserId] = useState(JSON.parse(localStorage?.getItem('userId')) || '')
    useEffect(() => {
        const userLoggendIn = JSON.parse(localStorage?.getItem('userLoggedIn'))
        console.log({userLoggendIn})
        userLoggendIn?.login && setLogin(userLoggendIn.login)
        const userName = JSON.parse(localStorage?.getItem('userName'))
        userName?.name && setName(userName.name)
        const userId = JSON.parse(localStorage?.getItem('userId'))
        userId?.userId && setUserId(userId.userId)
    },[])
    return (
        <AuthContext.Provider value = {{login , users , name , setUsers , setLogin , setName , userId , setUserId}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)