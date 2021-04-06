import {createContext , useContext , useReducer} from 'react'
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
    return (
        <DataContext.Provider value = {{state , dispatch}}>
            {children}
        </DataContext.Provider>
    )
}

export const useData = () => useContext(DataContext);