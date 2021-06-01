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
export  const addToCartHandler = async (productId , dispatch , userId , setMessage) => {
    if(userId) {
    dispatch({type : 'STATUS' , payload : true})
    try {
        const {data : {product , success}} = await axios.post(`https://intense-scrubland-09454.herokuapp.com/cart/${userId}` , {productId : productId})
        if(success) {
            dispatch({type : 'ADD_TO_CART' , payload : product})
        }
    } catch (error) {
        console.log(error)
    }
    finally {
        dispatch({type : 'STATUS' , payload : false})
        setMessage('Added To Cart')
    }
 } 
 else {
     dispatch({type : 'STATUS' , playload : false})
     setMessage('Please Login To Continue')
 }
}
export const addToWishListHandler = async (prodId , wishList , dispatch , userId , setMessage) => {
    if(wishList.some(curr => curr._id === prodId) === true) {
        dispatch({type : 'STATUS' , payload : true})
        setMessage('Removing Please Wait...')
        try {
            const {data : {success , product}} = await axios.delete(`https://intense-scrubland-09454.herokuapp.com/wishlist/${userId}/${prodId}`)
            if(success){
                dispatch({type : 'REMOVE_FROM_WISHLIST' , payload : product._id})
            }
        } catch (error) {
            console.log(error)
        }
        finally {
            dispatch({type : 'STATUS' , payload : false})
            setMessage('Removed From Wishlist')
        }
    }
    else {
        if(userId) {
       addToWishList(prodId , dispatch , userId , setMessage)
    } 
    else {
        dispatch({type : 'STATUS' , playload : false})
        setMessage('Please Login To Continue')
    }
    }
}
export const addToWishList = async (prodId , dispatch , userId , setMessage) => {
    dispatch({type : 'STATUS' , payload : true})
    setMessage('Adding To Wishlist...')
    try {
        const {data : {product}} = await axios.post(`https://intense-scrubland-09454.herokuapp.com/wishlist/${userId}` , {productId : prodId})
        dispatch({type : 'ADD_TO_WISHLIST' , payload : product})
    } catch (error) {
        console.log(error)
    }
    finally {
        dispatch({type : 'STATUS' , payload : false})
        setMessage('Added To Wishlist')
    }
}
export const isWishListed = (userId ,wishList , prodId) => {
    if(userId){
    return wishList.reduce((acc , curr) => {
        if(curr._id === prodId) {
            return 'wishlisted'
        }
        return acc
    } , '')
}
else {
    return false
}
}
export const isInCart = (userId ,cart , prodId) => {
    if(userId){
    return cart.some(each => each._id === prodId) ? true : false
    }
    else {
        return false
    }
  }
export const PrivateRoute = ({path , ...rest}) => {
    const {login} = useAuth()
    if(login) {
        return <Route {...rest} path = {path} />
    }
    return <Navigate to = '/login' replace state = {{from : path}} />
}