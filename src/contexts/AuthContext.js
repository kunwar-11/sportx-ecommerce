import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [users , setUsers] = useState([
        {
            FirstName : 'admin',
            LastName : 'admin',
            Email : 'admin@gmail.com',
            password : 'admin'
        }
    ])
    const [login , setLogin] = useState(JSON.parse(localStorage?.getItem('userLoggedIn')) || false)
    const [name , setName]  = useState(JSON.parse(localStorage?.getItem('userName')) || '')
    useEffect(() => {
        const userLoggendIn = JSON.parse(localStorage?.getItem('userLoggedIn'))
        console.log({userLoggendIn})
        userLoggendIn?.login && setLogin(userLoggendIn.login)
        const userName = JSON.parse(localStorage?.getItem('userName'))
        userName?.name && setName(userName.name)
    },[])
    return (
        <AuthContext.Provider value = {{login , users , name , setUsers , setLogin , setName}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)