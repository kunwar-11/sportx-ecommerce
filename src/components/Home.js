import React from 'react'
import {Link} from 'react-router-dom'
export const Home = () => {
    return (
        <div>
            <h1>Home Page</h1>
            <Link to = "/productlist">
                <button>Ready Set Go</button>
            </Link>
        </div>
    )
}
