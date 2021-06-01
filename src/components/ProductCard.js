import React from 'react'
import { useData , useAuth } from '../contexts'
import {addToCartHandler , getRatingType , addToWishListHandler , isInCart , isWishListed} from '../util'
import {Link} from 'react-router-dom'
import '../styles/productCard.css'

export const ProductCard = ({product , setMessage}) => {
    const {state : {cart , wishList} , dispatch} = useData()
    const {productName , image , price , ratings , _id} = product
    const {userId} = useAuth()
    return (
        <div className="card card__with__overlayButton card__shadow">
            <Link to = {`/productlist/${_id}`}>
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
            </Link>
            <i className={`heart fas fa-heart ${isWishListed(userId  ,wishList , _id)}`} onClick = {() => addToWishListHandler(_id , wishList  , dispatch , userId , setMessage)}></i>
            {isInCart(userId , cart , _id) ? <Link to = '/cart'><button className="btn btn-secondary">Go To Cart</button></Link> : <button className="btn btn-primary" onClick = {()=> addToCartHandler(_id , dispatch , userId , setMessage)}>ADD TO CART</button>}
            
        </div>
    )
}