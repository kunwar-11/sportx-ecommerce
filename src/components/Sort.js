import React from 'react'
import {useData} from '../contexts'
import {Link} from 'react-router-dom'
import '../styles/filter.css'
import {Navbar} from './Navbar'
export const Sort = () => {
    const {state : {sortBy , showInventory , fastDelivery}, dispatch} = useData()
    return (
        <div>
            <Navbar />
            <div className = 'filter'>
             <label className = 'labels'>
                <input type="radio" name = 'sort' checked = {(sortBy && sortBy === 'HIGH_TO_LOW') || false} onChange = {()=> dispatch({type : 'SORT' , payload : 'HIGH_TO_LOW'})}/>
                Price :- HIGH to LOW
            </label>
            <label className = 'labels'>
                <input type="radio" name = 'sort' checked = {(sortBy && sortBy === 'LOW_TO_HIGH') || false} onChange = {()=> dispatch({type : 'SORT' , payload : 'LOW_TO_HIGH'})}/>
                Price :- LOW TO HIGH
            </label>
            <label className = 'labels'>
          <input
            type="checkbox"
            checked={showInventory}
            onChange={() => dispatch({ type: "TOGGLE_INVENTORY" })}
          />
          Include Out of Stock
        </label>
        <label className = 'labels'>
          <input
            type="checkbox"
            checked={fastDelivery}
            onChange={() => dispatch({ type: "TOGGLE_DELIVERY" })}
          />
            FAST DELIVERY ONLY
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
