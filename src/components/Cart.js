import React from 'react'
import {Navbar} from '../components/Navbar'
import {Link} from 'react-router-dom'
import '../styles/cart.css'
import axios from 'axios'
import { useAuth , useData} from '../contexts'
import { Snackbar } from './SnackBar'
export const Cart = () => {
    const {state , dispatch , message , setMessage} = useData()
    const {userId} = useAuth()
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
            if(curr._id === prodId) {
                return true
            }
            return acc
        } , false)
    }
    const UpdateQuantity = async (prodId , type) => {
        const product = state.cart.find(each => each._id === prodId)
        switch(type) {
            case "INC": 
                const increment = await axios.post(`https://intense-scrubland-09454.herokuapp.com/cart/${userId}/${product._id}` , {quantity : product.quantity + 1})
                console.log(increment)
                if(increment.data.success)
                dispatch({type : 'INCREMENT' , payload : prodId})
                break
            case "DEC" : 
                const decrement = await axios.post(`https://intense-scrubland-09454.herokuapp.com/cart/${userId}/${product._id}` , {quantity : product.quantity - 1})
                if(decrement.data.success)
                dispatch({type : 'DECREMENT' , payload : prodId})
                console.log(decrement)
                if(decrement.data.product.quantity === 0) {
                    console.log('i am here in If')
                    const {data : {success}} =  await axios.delete(`https://intense-scrubland-09454.herokuapp.com/cart/${userId}/${product._id}`)
                    if(success) {
                        dispatch({type : 'REMOVE_FROM_CART' , payload : prodId})
                    }
                 }
                 console.log(product)
                break
            default : console.log('Something went wrong')
        }
    }

    const removeFromCart = async (prodId) => {
        dispatch({type : 'STATUS' , payload : true})
        try {
            const {data : {success}} =  await axios.delete(`https://intense-scrubland-09454.herokuapp.com/cart/${userId}/${prodId}`)
            if(success) {
                dispatch({type : 'REMOVE_FROM_CART' , payload : prodId})
            }
        } catch (error) {
            console.log(error)
        }
        finally{
            dispatch({type : 'STATUS' , payload : false})
            setMessage('Removed from Cart')
        }
    }

    const fromCartToWishlist = async (prodId) => {
        const prod = state.cart.find(each => each._id === prodId)
        dispatch({type : 'STATUS' , payload : true})
        try {
            await axios.delete(`https://intense-scrubland-09454.herokuapp.com/cart/${userId}/${prodId}`)
        } catch (error) {
            console.log(error)
        }
        finally{
            dispatch({type : 'STATUS' , payload : false})
            setMessage('Removed from Cart')
        }
        dispatch({type : 'STATUS' , payload : true})
        try {
            await axios.post(`https://intense-scrubland-09454.herokuapp.com/wishlist/${userId}` , {productId : prodId})
        } catch (error) {
            console.log(error)
        }
        finally {
            dispatch({type : 'STATUS' , payload : false})
            setMessage('Added To Wishlist')
        }
        dispatch({type : 'CART_TO_WISHLIST' , payload : prod})
    }
    return (
        <div>
            <Navbar />
            {state.loading ? <h1>Loading....</h1> : <>{state.cart.length > 0 ? <div className = 'grid-row-6'> <div>{state.cart.map(each => (<div className = 'cart-card card__shadow' key = {each._id}>
                <div className="product__img">
                    <img className='image__responsive' src={each.image} alt="img"/>
                </div>
                <div className="product__details">
                    <h4>{each.productName}</h4>
                    <div className="product__quantity">
                        <button className="btn btn-primary-danger" onClick = {() => UpdateQuantity(each._id , 'DEC')} >
                            -
                        </button>
                        <p>{each.quantity}</p>
                        <button className="btn btn-primary-success" onClick = {() => UpdateQuantity(each._id , 'INC')}>+</button>
                    </div>
                    <h4>Rs. {getTotalPrice(each.price , each.quantity)}.00</h4>
                    <div className="cart-buttons">
                        {isWishListed(each._id) ?<Link to = '/wishlist'><button className="btn btn-secondary-danger" >WISHLISTED</button></Link> : <button className="btn btn-secondary-danger" onClick = {() => fromCartToWishlist(each._id)}>MOVE TO WISHLIST</button>}
                        <button className="btn btn-primary-danger" onClick = {() => removeFromCart(each._id)}>Remove From Cart</button>
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
        </div> : <h1>cart is emppty</h1>}</>}
        {state.status === false && <Snackbar message = {message} type = {"snackbar__primary"}/>}
        </div>
    )
}

export default Cart
