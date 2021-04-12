import React from 'react'
import { Link } from 'react-router-dom'
import {useData} from '../contexts/DataContext'
import '../styles/filter.css'
import Navbar from './Navbar'
const Filter = () => {
    const {state : {isRated , isPriced}, dispatch} = useData()
    return (
        <div>
            <Navbar />
            <div className = 'filter'>
             <h4>RATINGS</h4>
             <label className = 'labels'>
          <input
            type="checkbox"
            checked={(isRated && isRated === 4) || false}
            onChange={() => dispatch({ type: "RATED_DATA" , payload : 4})}
          />
            4 and ABOVE
        </label>
        <label className = 'labels'>
          <input
            type="checkbox"
            checked={(isRated && isRated === 3) || false}
            onChange={() => dispatch({ type: "RATED_DATA" , payload : 3})}
          />
            3 and ABOVE
        </label>
        <label className = 'labels'>
          <input
            type="checkbox"
            checked={(isRated && isRated === 2) || false}
            onChange={() => dispatch({ type: "RATED_DATA" , payload : 2})}
          />
            2 and ABOVE
        </label>
        <div className="divider"></div>
        <h4>PRICES</h4>
        <label className = 'labels'>
          <input
            type="checkbox"
            checked={(isPriced && isPriced === 700) || false}
            onChange={() => dispatch({ type: "PRICE_FILTER" , payload : 700})}
          />
            Rs 700 and ABOVE
        </label>
        <label className = 'labels'>
          <input
            type="checkbox"
            checked={(isPriced && isPriced === 600) || false}
            onChange={() => dispatch({ type: "PRICE_FILTER" , payload : 600})}
          />
            Rs 600 and ABOVE
        </label>
        <label className = 'labels'>
          <input
            type="checkbox"
            checked={(isPriced && isPriced === 500) || false}
            onChange={() => dispatch({ type: "PRICE_FILTER" , payload : 500})}
          />
            Rs 500 and ABOVE
        </label>
        <label className = 'labels'>
          <input
            type="checkbox"
            checked={(isPriced && isPriced === 400) || false}
            onChange={() => dispatch({ type: "PRICE_FILTER" , payload : 400})}
          />
            Rs 400 and ABOVE
        </label>
        <div className="button">
            <Link to = '/productlist' onClick = {() => dispatch({type : 'CLEAR_FILTER'})}>
             <button className="btn btn-primary-danger">
                CLEAR FILTER
            </button>
            </Link>
            <Link to = '/productlist'>
                <button className="btn btn-primary-success">
                    APPLY FILTER
                </button>
            </Link>
        </div>
        </div>
        </div>
    )
}

export default Filter
