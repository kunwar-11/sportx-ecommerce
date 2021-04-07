import React from 'react'
import { useData } from '../contexts/DataContext'
import '../styles/productCard.css'
const ProductCard = ({product}) => {
    const {state : {cart , wishList} , dispatch} = useData()
    const {productName , image , price , ratings , id} = product
    const getRatingType = (rating) => {
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
    const isWishListed = (prodId) => {
        return wishList.reduce((acc , curr) => {
            if(curr.id === prodId) {
                return 'wishlisted'
            }
            return acc
        } , '')
    }
    //  can be done using .some too => 
    /*if(wishList.some(curr => curr.id === prodId) === true) {
         return 'wishlisted'
     }
     return ''*/
    const addToCartHandler = (prod) => {
        dispatch({type : 'ADD_TO_CART' , payload : prod})
    }
    const addToWishListHandler = (prodId) => {
        if(wishList.some(curr => curr.id === prodId) === true) {
            dispatch({type : 'REMOVE_FROM_WISHLIST' , payload : id})
        }
        else {
            dispatch({type : 'ADD_TO_WISHLIST' , payload : product})
        }
    }
    const isInCart = (prodId) => {
       return cart.some(each => each.id === prodId) ? true : false
    }
    //console.log(wishList)
    return (
        <div className="card card__with__overlayButton card__shadow">
            <img className="image__responsive" src={image} alt="img" />
            <div className="card__body__container">
                <h5 className="card__header">{productName}</h5>
                <div className = {`rating-container ${getRatingType(ratings)}`}>
                    <small className = 'rating'>
                        {ratings}
                    </small>
                    <i className="fas fa-star"></i>
                </div>
                <p className="card__body">
                    {price}
		        </p>
            </div>
            <i className={`heart fas fa-heart ${isWishListed(id)}`} onClick = {() => addToWishListHandler(id)}></i>
            {isInCart(id) ? <button className="btn btn-secondary">Go To Cart</button> : <button className="btn btn-primary" onClick = {()=> addToCartHandler(product)}>Add To Cart</button>}
        </div>
    )
}

export default ProductCard
