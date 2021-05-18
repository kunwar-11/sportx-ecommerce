import React  from 'react'
import {useData} from '../contexts/DataContext'
import {getRatingType} from '../util'
import Navbar from '../components/Navbar'
import '../styles/wishlist.css'
const WishList = () => {
    const {state : {wishList} , dispatch} = useData()
    const isWishListed = (prodId) => {
        return wishList.reduce((acc , curr) => {
            if(curr._id === prodId) {
                return 'wishlisted'
            }
            return acc
        } , '')
    }
    console.log(wishList)
    return (
        <div>
            <Navbar />
            {wishList.length > 0 ?<div className = 'grid-row-6'> {wishList.map(product => (
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
                <i className={`heart fas fa-heart ${isWishListed(product._id)}`} onClick = {() => dispatch({type : 'REMOVE_FROM_WISHLIST', payload : product.id})}></i>
               <button className="btn btn-primary" onClick = {() => dispatch({type : 'WISHLIST_TO_CART', payload : product})}>Add To Cart</button>
            </div>)
            )}</div>: <h1>your WISHLIST is emppty</h1>}
        </div>
    )
}

export default WishList
