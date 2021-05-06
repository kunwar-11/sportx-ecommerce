import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const users =[
        {
            FirstName : 'admin',
            LastName : 'admin',
            Email : 'admin@gmail.com',
            password : 'admin'
        }
    ]
    const [login , setLogin] = useState(false)
    return (
        <AuthContext.Provider value = {{login , setLogin , users}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)