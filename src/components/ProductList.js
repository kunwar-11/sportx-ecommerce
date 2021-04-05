import axios from 'axios'
import React , {useEffect} from 'react'
import {useData} from '../contexts/DataContext'
const ProductList = () => {
    const {state , dispatch} = useData()
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
    }, [])
    console.log(state)
    return (
        <div>
            {!state.loading && state.data.map(product => <h1>{product.productName}</h1>)}
        </div>
    )
}

export default ProductList
