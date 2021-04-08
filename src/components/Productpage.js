import React from 'react'
import {useParams} from 'react-router-dom'
import {useData} from '../contexts/DataContext'

const Productpage = () => {
    const {productId} = useParams()
    const {state : {data}} = useData() 
    console.log(productId)
    const getProductDetails = () => data.find(each => each.id === productId)
    const details = getProductDetails()
    console.log(details)
    return (
        <div>
            
        </div>
    )
}

export default Productpage
