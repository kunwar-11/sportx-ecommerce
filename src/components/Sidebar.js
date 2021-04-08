import React from 'react'
import {useData} from '../contexts/DataContext'
import '../styles/sidebar.css'
const Sidebar = () => {
    const {sideBar} = useData()
    return (
        <div className = {`sidebar ${sideBar ? "show" : "hide"}`}>
            <div className="sidebar__brand__name">
                    <h2>sportX</h2>
            </div>
            <ul>
                <li>Home</li>
                <li>WishList</li>
                <li>Cart</li>
            </ul>
        </div>
    )
}

export default Sidebar
