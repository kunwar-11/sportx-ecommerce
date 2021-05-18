import React , {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {useData} from '../contexts/DataContext'
import {getRatingType , addToCartHandler} from '../util'
import Navbar from './Navbar'
import '../styles/productpage.css'
import {Link} from 'react-router-dom'
import axios from 'axios'
const Productpage = () => {
    const {productId} = useParams()
    const {state : {cart , wishList} , dispatch} = useData() 
    const addToWishListHandler = async () => {
            
            dispatch({type : 'ADD_TO_WISHLIST' , payload : details})
    }
    const isWishListed = (prodId) => {
        return wishList.reduce((acc , curr) => {
            if(curr._id === prodId) {
                return true
            }
            return acc
        } , false)
    }
    const isInCart = (prodId) => {
        return cart.some(each => each._id === prodId) ? true : false
      }
    const [details , setDetails] = useState(null)
     useEffect(() => {
         try {
            (async () => {
                const {data : {product}} = await axios.get(`https://intense-scrubland-09454.herokuapp.com/products/${productId}`)
                setDetails(product)
             })()
         } catch (error) {
             
         }
     },[productId , dispatch])
    return (
        <div className = 'productdetails'>
            <Navbar />
                {!details && <h1>Loading....</h1>} 
                {details &&  <>
                <div className="grid-row-6">
                <div className="product-img">
                    <img src={details.image} alt="product-img" className="image__responsive"/>
                    <div className="addbuttons desktop">
                      {isWishListed(details._id) ? <Link to="/wishlist"><div className = 'buttons wishlist'>WISHLISTED</div></Link> : <div className = 'buttons wishlist' onClick = {() => addToWishListHandler()}>WISHLIST</div>}
                      {isInCart(details._id)? <Link to = '/cart'><div className = 'buttons cart'>GO TO CART</div>
                      </Link>
                       : <div className = 'buttons cart' onClick = {() => addToCartHandler(details._id , dispatch)}>ADD TO CART</div>}
            </div>
                </div>
                <div className="product-details">
                    <h3 className = 'text-headings'>{details.productName}</h3>
                    <div className = {`rating-container ${getRatingType(details.ratings)}`}>
                    <small className = 'rating'>
                        {details.ratings}
                    </small>
                    <i className="fas fa-star"></i>
                    </div>
                    <div className="divider"></div>
                    <h4>Rs. {details.price}</h4>
                    <small className="text-success">inclusive of all taxes</small>
                    <p className="text-headings">{details.gender}</p>
                    <p className = 'text-dark'>
                        {details.description}
                    </p>
                    <h4>Offers</h4>
                    <ul className = 'offers-list'>
                    {details.offers.map(each => <li key = {each} className = 'offers'>{each}</li>)}
                     </ul>
                </div>
                </div>                 
            <div  className="addbuttons mobile">
                      {isWishListed(details._id) ? <Link to="/wishlist"><div className = 'buttons wishlist'>WISHLISTED</div></Link> : <div className = 'buttons wishlist' onClick = {() => addToWishListHandler()}>WISHLIST</div>}
                      {isInCart(details._id)? <Link to = '/cart'><div className = 'buttons cart'>GO TO CART</div>
                      </Link>
                       : <div className = 'buttons cart' onClick = {() => addToCartHandler(details , dispatch)}>ADD TO CART</div>}
            </div>
                </>}
        </div>
    )
}

export default Productpage
