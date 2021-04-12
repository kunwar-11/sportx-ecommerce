import React  from 'react'
import {useData} from '../contexts/DataContext'
import Navbar from './Navbar'
import ProductCard from './ProductCard'
import '../styles/productList.css'
import FilterAndSort from './FilterAndSort'
const ProductList = () => {
    const {state : {loading} , priceFilteredData} = useData()
   
    return (
        <div>
        <Navbar />
        <div className = 'product__Layout'>
            <FilterAndSort />
            {loading ? <h3>Loading....</h3> : (
                    <div className = 'grid__row__6'>
                        {priceFilteredData.map(product => <ProductCard className = 'grid__col__6' product = {product} key = {product.id}/>)}
                    </div>
            )}
        </div>
        </div>
    )
}

export default ProductList
