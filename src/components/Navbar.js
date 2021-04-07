import React from 'react'
import '../styles/navbar.css'
const Navbar = () => {
    return (
    <nav className="navbar">
        <div className="nav__brand">
            <h2 className="navbrand__head">navBrand</h2>
        </div>
        <div className="input nav__search desk">
            <i className="fas fa-search"></i>
            <input type="text" className="inputText" placeholder="search" />
        </div>
        <div className="nav__items">
            <div className="badge-on-icon nav__pills">
                <i className="fas fa-heart icon-only wish"></i>
            </div>
            <div className="badge-on-icon nav__pills">
                <i className="fas fa-shopping-cart  icon-only cart"></i>
            </div>
        </div>
    </nav>
)
}

export default Navbar
