import React from 'react'
import {Link} from 'react-router-dom'
import "../styles/Home.css"
export const Home = () => {
    return (
        <div className='flex full black'>
            <h1 style = {{color : "white", padding : "2rem"}}>Enter The World Of Sports and Atheletics</h1>
            <h4 style = {{color : "white", padding : "1rem 2rem"}}>A perferct place for your gears and equipments</h4>
            <Link to = "/productlist">
                <button className='button1'>Ready Set Go →</button>
            </Link>
        </div>
    )
}
