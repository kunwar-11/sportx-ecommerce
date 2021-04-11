import React from 'react'
import {useData} from '../contexts/DataContext'
import Navbar from '../components/Navbar'
import '../styles/cart.css'
const Cart = () => {
    const {state , dispatch} = useData()
    const getTotalPrice = (price , qty) => {
        return price*qty
    }
    return (
        <div>
            <Navbar />
            {state.cart.length > 0 ? <div className = 'grid-row-6'> <div>{state.cart.map(each => (<div className = 'cart-card card__shadow' key = {each.id}>
                <div className="product__img">
                    <img className='image__responsive' src={each.image} alt="img"/>
                </div>
                <div className="product__details">
                    <h4>{each.productName}</h4>
                    <div className="product__quantity">
                        <button className="btn btn-primary-danger" onClick = {() => dispatch({type : 'DECREMENT' , payload : each.id})} >
                            -
                        </button>
                        <p>{each.qty}</p>
                        <button className="btn btn-primary-success" onClick = {() => dispatch({type : 'INCREMENT' , payload : each.id})}>+</button>
                    </div>
                    <h4>Rs. {getTotalPrice(each.price , each.qty)}.00</h4>
                </div>
            </div>))}</div>
            <div className="card card__text card__shadow">
                <div className="card__body__container">
                    <h3 className="card__header">PRICE DETAILS </h3>
                    <div className="divider"></div>
                    <div className="card__body">
                        <p>Items in Cart : 1</p>
                        <p>Total MRP : Rs. 500</p>
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
