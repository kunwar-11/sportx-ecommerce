import axios from 'axios'
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
export  const addToCartHandler = async (productId , dispatch , userId) => {
    if(userId) {
    try {
        const {data : {product , success}} = await axios.post(`https://intense-scrubland-09454.herokuapp.com/cart/${userId}` , {productId : productId})
        console.log(product)
        if(success) {
            dispatch({type : 'ADD_TO_CART' , payload : product})
        }
    } catch (error) {
        console.log(error)
    }
 } 
}
export const addToWishListHandler = async (prodId , wishList , dispatch , userId) => {
    if(wishList.some(curr => curr._id === prodId) === true) {
        try {
            const {data : {success , product}} = await axios.delete(`https://intense-scrubland-09454.herokuapp.com/wishlist/${userId}/${prodId}`)
            console.log(product._id)
            if(success){
                dispatch({type : 'REMOVE_FROM_WISHLIST' , payload : product._id})
            }
        } catch (error) {
            console.log(error)
        }
    }
    else {
        if(userId) {
        try {
            const {data : {product}} = await axios.post(`https://intense-scrubland-09454.herokuapp.com/wishlist/${userId}` , {productId : prodId})
            dispatch({type : 'ADD_TO_WISHLIST' , payload : product})
        } catch (error) {
            console.log(error)
        }
    } 
    }
}

export const PrivateRoute = ({path , ...rest}) => {
    const {login} = useAuth()
    if(login) {
        return <Route {...rest} path = {path} />
    }
    return <Navigate to = '/login' replace state = {{from : path}} />
}