import React from 'react'
import {useData} from '../contexts/DataContext'
import Navbar from '../components/Navbar'
const WishList = () => {
    const {state : {wishList}} = useData()
    return (
        <div>
            <Navbar />
            {wishList.length > 0 ? wishList.map(each => <h1>{each.productName}</h1>) : <h1>cart is emppty</h1>}
        </div>
    )
}

export default WishList
