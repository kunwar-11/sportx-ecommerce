import React from 'react'
import {useAuth, useData} from '../contexts'
import {Link, useNavigate} from 'react-router-dom'
import '../styles/navbar.css'
import {Sidebar} from './Sidebar'
export const Navbar = () => {
    const {sideBar , setSideBar} = useData()
    const {userId , setLogin , setUserName , setUserId } = useAuth()
    const navigate = useNavigate()
    const logout = () => {
        setSideBar(false)
        localStorage?.removeItem('userLoggedIn')
        localStorage?.removeItem('userName')
        localStorage?.removeItem('userId')
        setLogin(false)
        setUserName('')
        setUserId(null)
        navigate('/')
    }
    return (
    <>
    <Sidebar />
    <nav className="navbar">
        <Link to = '/' >
            <div className="nav__brand">
                <h2 className="navbrand__head">sportX</h2>
            </div>
        </Link>
        <div className="input nav__search desk">
            <i className="fas fa-search"></i>
            <input type="text" className="inputText" placeholder="search" />
        </div>
        <div className="nav__items">
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
            <div className='badge-on-icon nav__pills'>
                {userId ?
                    <i className="fas fa-sign-out-alt icon-only" onClick={logout}></i>
                : <Link to = "/login"><button className='button2'>Login</button></Link>}
            </div>
            {!sideBar && <div className="badge-on-icon nav__pills mob">
                <i className={`fas ${"fa-bars"}`} onClick = {() => setSideBar(true)}></i>
        </div>}
        </div>
        
    </nav>

    </>
)
}
