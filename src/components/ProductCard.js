import React from 'react'
import { useData } from '../contexts/DataContext'
import {addToCartHandler , getRatingType , addToWishListHandler} from '../util'
import {Link} from 'react-router-dom'
import '../styles/productCard.css'
import { useAuth } from '../contexts/AuthContext'
const ProductCard = ({product}) => {
    const {state : {cart , wishList} , dispatch} = useData()
    const {productName , image , price , ratings , _id} = product
    const {userId} = useAuth()
    const isWishListed = (prodId) => {
        if(wishList.some(curr => curr._id === prodId) === true) {
            return 'wishlisted'
        }
        return ''
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
            <i className={`heart fas fa-heart ${isWishListed(_id)}`} onClick = {() => addToWishListHandler(_id , wishList  , dispatch , userId)}></i>
            {isInCart(_id) ?<Link to = '/cart'><button className="btn btn-secondary">Go To Cart</button></Link> : <button className="btn btn-primary" onClick = {()=> addToCartHandler(_id , dispatch , userId)}>Add To Cart</button>}
        </div>
    )
}

export default ProductCard
