import React from 'react'
import { useData } from '../contexts/DataContext'
import {addToCartHandler , getRatingType , addToWishListHandler} from '../util'
import {Link} from 'react-router-dom'
import '../styles/productCard.css'
const ProductCard = ({product}) => {
    const {state : {cart , wishList} , dispatch} = useData()
    const {productName , image , price , ratings , _id} = product
   
    const isWishListed = (prodId) => {
        return wishList.reduce((acc , curr) => {
            if(curr._id === prodId) {
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
   
    
    const isInCart = (prodId) => {
       return cart.some(each => each._id === prodId) ? true : false
    }
    //console.log(wishList)
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
            <i className={`heart fas fa-heart ${isWishListed(_id)}`} onClick = {() => addToWishListHandler(_id , wishList , product , dispatch)}></i>
            {isInCart(_id) ? <button className="btn btn-secondary">Go To Cart</button> : <button className="btn btn-primary" onClick = {()=> addToCartHandler(product , dispatch)}>Add To Cart</button>}
        </div>
    )
}

export default ProductCard
