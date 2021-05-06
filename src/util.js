import {Navigate, Route} from 'react-router-dom'
import {useAuth} from './contexts/AuthContext'
export  const getRatingType = (rating) => {
    if(rating >= 4) {
        return 'rating-good'
    }
    else if(rating < 4 && rating >= 2) {
        return 'rating-average'
    }
    else {
        return 'rating-poor'
    }
}
export  const addToCartHandler = (prod , dispatch) => {
    dispatch({type : 'ADD_TO_CART' , payload : prod})
}
export const addToWishListHandler = (prodId , wishList , product , dispatch) => {
    if(wishList.some(curr => curr.id === prodId) === true) {
        dispatch({type : 'REMOVE_FROM_WISHLIST' , payload : prodId})
    }
    else {
        dispatch({type : 'ADD_TO_WISHLIST' , payload : product})
    }
}

export const PrivateRoute = ({path , ...rest}) => {
    const {login} = useAuth()
    if(login) {
        return <Route {...rest} path = {path} />
    }
    return <Navigate to = '/login' replace state = {{from : path}} />
}