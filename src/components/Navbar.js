import React from 'react'
import {useData} from '../contexts/DataContext'
import {Link} from 'react-router-dom'
import '../styles/navbar.css'
// import Sidebar from './Sidebar'
const Navbar = () => {
    const {sideBar , setSideBar} = useData()
    return (
    <>
    {/* <Sidebar /> */}
    <nav className="navbar">
        <Link to = '/' >
            <div className="nav__brand">
                <h2 className="navbrand__head">sportX</h2>
            </div>
        </Link>
        <div className="input nav__search">
            <i className="fas fa-search"></i>
            <input type="text" className="inputText" placeholder="search" />
        </div>
        <div className="nav__items desk">
            <Link to = '/wishlist'>
                <div className="badge-on-icon nav__pills">
                    <i className="fas fa-heart icon-only wish"></i>
                </div>
            </Link>
            <Link to = '/cart'>
            <div className="badge-on-icon nav__pills">
                <i className="fas fa-shopping-cart  icon-only cart"></i>
            </div>
            </Link>
        </div>
        <div className="nav__items mob">
                <i className={`fas ${sideBar ? "fa-times" : "fa-bars"}`} onClick = {() => setSideBar(prev => !prev)}></i>
        </div>
    </nav>
    </>
)
}

export default Navbar
