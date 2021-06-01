import React, { useState }  from 'react'
import {useData , useAuth} from '../contexts'
import {getRatingType, isWishListed} from '../util'
import {Navbar} from '../components/Navbar'
import axios from 'axios'
import '../styles/wishlist.css'
import { Snackbar } from './SnackBar'
export const WishList = () => {
    const {state : {wishList , loading , status , cart} , dispatch} = useData()
    const [message , setMessage] = useState('')
    const {userId} = useAuth()
    const removeFromWishlist = async (prodId) => {
        if(wishList.some(curr => curr._id === prodId) === true) {
            dispatch({type : 'STATUS' , payload : true})
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
    }

    const fromWishListToCart  = async (product) => {
        try {
            if(cart.some(each => each._id === product._id) === true) {
                const prod = cart.find(each => each._id === product._id)
                await axios.post(`https://intense-scrubland-09454.herokuapp.com/cart/${userId}/${product._id}` , {quantity : prod.quantity + 1})
            }
            else {
                try {
                    await axios.post(`https://intense-scrubland-09454.herokuapp.com/cart/${userId}` , {productId : product._id})
                } catch (error) {
                    console.log(error)
                }
                finally {
                    dispatch({type : 'STATUS' , payload : false})
                    setMessage('Added To Cart')
                }
            }
    
            removeFromWishlist(product._id)
            dispatch({type : 'WISHLIST_TO_CART', payload : product})
        } catch (error) {
            
        }
        finally {
            dispatch({type : 'STATUS' , payload : false})
            setMessage('Added To Cart')
        }

    }
    return (
        <div>
            <Navbar />
            {loading ? <h1>Loading....</h1> : <>{wishList.length > 0 ?<div className = 'grid_row_6'> {wishList.map(product => (
                <div key = {product._id} className="card card__with__overlayButton card__shadow">
                <img className="image__responsive" src={product.image} alt="img" />
                <div className="card__body__container">
                    <h5 className="card__header">{product.productName}</h5>
                    <div className = {`rating-container ${getRatingType(product.ratings)}`}>
                        <small className = 'rating'>
                            {product.ratings}
                        </small>
                        <i className="fas fa-star"></i>
                    </div>
                    <p className="card__body">
                        {product.price}
                    </p>
                </div>
                <i className={`heart fas fa-heart ${isWishListed(wishList, product._id)}`} onClick = {() => removeFromWishlist(product._id)}></i>
               <button className="btn btn-primary" onClick = {() => fromWishListToCart(product)}>Add To Cart</button>
            </div>)
            )}</div>: <h1>your WISHLIST is emppty</h1>}</>}
            {status === false && <Snackbar message = {message} type = {"snackbar__primary"}/>}
        </div>
    )
}
