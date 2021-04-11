import axios from 'axios'
import React , {useEffect} from 'react'
import {useData} from '../contexts/DataContext'
import Navbar from './Navbar'
import ProductCard from './ProductCard'
import '../styles/productList.css'
import FilterAndSort from './FilterAndSort'
const ProductList = () => {
    const {state : {loading} , dispatch , priceFilteredData} = useData()
    useEffect(()=>{
        (async () => {
            try {
                dispatch({type : 'LOADING_STATUS' , payload : true});
                const {data : {products}} = await axios.get('/api/products')
                dispatch({type : 'DATA' , payload : products})
            } catch (error) {
                console.log(error)
            }
            finally {
                dispatch({type : 'LOADING_STATUS' , payload : false});
            }
        })();
    }, [dispatch])
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
        {loading === false && (<div className="addbuttons mobile">
             <div className = 'buttons wishlist'>FILTERS</div>
             <div className = 'buttons cart'>SORT</div>
        </div>)}
        </div>
    )
}

export default ProductList
