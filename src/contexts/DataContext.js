import {createContext , useContext , useReducer, useState} from 'react'
import {dataReducer} from '../reducers/dataReducer'
const DataContext = createContext();
const initialState = {
    data : [],
    cart : [],
    wishList : [],
    loading : false
}
export const DataProvider = ({children}) => {
    const [state , dispatch] = useReducer(dataReducer , initialState)
    const [sideBar , setSideBar] = useState(false)
    return (
        <DataContext.Provider value = {{state , dispatch , sideBar , setSideBar}}>
            {children}
        </DataContext.Provider>
    )
}

export const useData = () => useContext(DataContext);