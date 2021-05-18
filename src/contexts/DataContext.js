import {createContext , useContext , useReducer, useState} from 'react'
import {dataReducer} from '../reducers/dataReducer'
const DataContext = createContext();
const initialState = {
    data : [],
    cart : [],
    wishList : [],
    loading : false,
    sortBy : null,
    showInventory : false,
    fastDelivery : false,
    isRated : null,
    rating : 0,
    isPriced : null,
    price : 0
}

const sortData = (data , sortBy) => {
    if(sortBy && sortBy === 'HIGH_TO_LOW') {
        return data.sort((a,b) => b['price'] - a['price'])
    }
    if(sortBy && sortBy === 'LOW_TO_HIGH') {
        return data.sort((a,b) => a['price'] - b['price'])
    }
    return data
}
const filterData = (data , {includeOutOfStock , fastDeliveryOnly}) => {
    return data.filter(({fastDelivery}) => fastDeliveryOnly ? fastDelivery : true).filter(({inStock}) => includeOutOfStock ? true : inStock)
}
const ratingData = (isRated ,data , rating) => {
    if(isRated) {
        return data.filter(each => each.ratings > rating)
    }
        return data
}
const priceFilter = (isPriced , data , price) => {
    if(isPriced) {
        return data.filter(each => each.price >= price )
    }
    return data
}
export const DataProvider = ({children}) => {
    
    const [state , dispatch] = useReducer(dataReducer , initialState)
    const [sideBar , setSideBar] = useState(false)
    const sortedData = sortData(state.data , state.sortBy)
     const filteredData = filterData(sortedData , {includeOutOfStock : state.showInventory , fastDeliveryOnly : state.fastDelivery})
     const ratedData = ratingData(state.isRated ,filteredData , state.rating)
     const priceFilteredData = priceFilter(state.isPriced , ratedData , state.price)
    
    return (
        <DataContext.Provider value = {{state , dispatch , sideBar , setSideBar , priceFilteredData}}>
            {children}
        </DataContext.Provider>
    )
}

export const useData = () => useContext(DataContext);