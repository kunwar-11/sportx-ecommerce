import React from 'react'
import {useData} from '../contexts/DataContext'
import Navbar from '../components/Navbar'
const Cart = () => {
    const {state : {cart}} = useData()
    return (
        <div>
            <Navbar />
            {cart.length > 0 ? cart.map(each => <h1>{each.productName}</h1>) : <h1>cart is emppty</h1>}
        </div>
    )
}

export default Cart
