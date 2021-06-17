import React from 'react'
import {useData} from '../contexts'
import '../styles/filterandsort.css'
export const FilterAndSort = () => {
    const {state : {sortBy , showInventory , fastDelivery , isRated , isPriced}, dispatch} = useData()
    return (
        <div className = 'filter__and__sort'>
            <div className = 'clear-filters' onClick = {() => dispatch({type : 'CLEAR_FILTER'})}>
                <p style = {{fontWeight : "bold" , padding : "1rem 0rem"}}> CLEAR FILTERS</p>
            </div>
            <div className="divider"></div>
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
        <div className="divider"></div>
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
        </div>
    )
}
