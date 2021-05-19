import React , {useState}  from 'react'
import {useData} from '../contexts/DataContext'
import Navbar from './Navbar'
import ProductCard from './ProductCard'
import '../styles/productList.css'
import FilterAndSort from './FilterAndSort'
import {Link} from 'react-router-dom'
import SnackBar from './SnackBar'
const ProductList = () => {
    const {state : {loading , status} , priceFilteredData} = useData()
    const [message , setMessage] = useState('')
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
         {status === false && <SnackBar message = {message} type = {"snackbar__primary"}/>}
        </div>
    )
}

export default ProductList
