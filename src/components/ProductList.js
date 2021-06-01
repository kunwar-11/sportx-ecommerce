import React from 'react'
import {useData} from '../contexts'
import '../styles/productList.css'
import {Link} from 'react-router-dom'
import { Snackbar } from './SnackBar'
import { Navbar } from './Navbar'
import { FilterAndSort } from './FilterAndSort'
import { ProductCard } from './ProductCard'
export const ProductList = () => {
    const {state : {loading , status} , priceFilteredData , message , setMessage} = useData()
    
    return (
        <div>
        <Navbar />
        <div className = 'product__Layout'>
            <FilterAndSort />
            {loading ? <h3>Loading....</h3> : (
                    <div className = 'grid__row__6'>
                        {priceFilteredData.map(product => <ProductCard className = 'grid__col__6' product = {product} key = {product._id} setMessage = {setMessage}/>)}
                    </div>
            )}
        </div>
        <div  className="addbuttons m">
                      <Link to="/filters"><div className = 'buttons'>FILTER</div></Link>
                      <Link to = '/sort'><div className = 'buttons cart'>SORT</div>
                      </Link>
        </div>
         {status === false && <Snackbar message = {message} type = {"snackbar__primary"}/>}
        </div>
    )
}