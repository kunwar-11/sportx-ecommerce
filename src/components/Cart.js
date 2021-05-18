import React, { useEffect } from 'react'
import {useData} from '../contexts/DataContext'
import Navbar from '../components/Navbar'
import {Link} from 'react-router-dom'
import '../styles/cart.css'
import axios from 'axios'
const Cart = () => {
    const {state , dispatch} = useData()
    const id = JSON.parse(localStorage?.getItem('userId')).id
    const getTotalPrice = (price , qty) => {
        return price*qty
    }
    const getTotalItemInCart = () => {
        return state.cart.reduce((acc , curr) => {
                return acc+curr.quantity
        },0)
    }
    const getCartPrice = () => {
        return state.cart.reduce((acc,curr) => {
            return acc+(curr.quantity*curr.price)
        },0)
    }
    const isWishListed = (prodId) => {
        return state.wishList.reduce((acc , curr) => {
            if(curr.id === prodId) {
                return true
            }
            return acc
        } , false)
    }
    useEffect(() => {
        if(id){
        (async () => {
            try {
                const {data : {cart}} = await axios.get(`https://intense-scrubland-09454.herokuapp.com/cart/${id}`)
                console.log(cart)
                dispatch({type : 'LOAD_CART' , payload : cart})
            } catch (error) {
                console.log(error)
            }          
        })()
    }
    },[dispatch , id])
    return (
        <div>
            <Navbar />
            {state.cart.length > 0 ? <div className = 'grid-row-6'> <div>{state.cart.map(each => (<div className = 'cart-card card__shadow' key = {each._id}>
                <Link to = {`/productlist/${state.data.id}`}></Link>
                <div className="product__img">
                    <img className='image__responsive' src={each.image} alt="img"/>
                </div>
                <div className="product__details">
                    <h4>{each.productName}</h4>
                    <div className="product__quantity">
                        <button className="btn btn-primary-danger" onClick = {() => dispatch({type : 'DECREMENT' , payload : each.id})} >
                            -
                        </button>
                        <p>{each.quantity}</p>
                        <button className="btn btn-primary-success" onClick = {() => dispatch({type : 'INCREMENT' , payload : each.id})}>+</button>
                    </div>
                    <h4>Rs. {getTotalPrice(each.price , each.quantity)}.00</h4>
                    <div className="cart-buttons">
                        {isWishListed(each.id) ?<Link to = '/wishlist'><button className="btn btn-secondary-danger" >WISHLISTED</button></Link> : <button className="btn btn-secondary-danger" onClick = {() => dispatch({type : 'CART_TO_WISHLIST' , payload : each})}>MOVE TO WISHLIST</button>}
                        <button className="btn btn-primary-danger" onClick = {() => dispatch({type : 'REMOVE_FROM_CART' , payload : each.id})}>Remove From Cart</button>
                    </div>
                </div>
            </div>))}</div>
            <div className="divider"></div>
            <div className="card card__text card__shadow">
                <div className="card__body__container">
                    <h3 className="card__header">PRICE DETAILS </h3>
                    <div className="divider"></div>
                    <div className="card__body">
                        <p>Items in Cart : {getTotalItemInCart()}</p>
                        <p>Total MRP : Rs. {getCartPrice()}</p>
                    </div>
                    <div className="card__body">
                        <button className="btn btn-primary-danger">Checkout</button>
                    </div>
                </div>
            </div> 
        </div> : <h1>cart is emppty</h1>}
        </div>
    )
}

export default Cart
