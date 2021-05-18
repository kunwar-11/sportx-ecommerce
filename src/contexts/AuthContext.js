
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [users , setUsers] = useState(null)
    const [login , setLogin] = useState(JSON.parse(localStorage?.getItem('userLoggedIn'))|| false)
    const [name , setUserName]  = useState(JSON.parse(localStorage?.getItem('userName'))|| '')
    const [userId , setUserId] = useState(localStorage?.getItem('userId')|| '')
    useEffect(() => {
        const userLoggendIn = JSON.parse(localStorage?.getItem('userLoggedIn'))
        userLoggendIn?.login && setLogin(userLoggendIn.login)
        const userName = JSON.parse(localStorage?.getItem('userName'))
        userName?.name && setUserName(userName.name)
        const userID = localStorage?.getItem('userId')
        userID && setUserId(userID)
        console.log(userId)
        },[userId])
    return (
        <AuthContext.Provider value = {{login , users , name , setUsers , setLogin , setUserName , userId , setUserId}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)