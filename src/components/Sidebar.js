import React , {useEffect} from 'react'
import { Link } from 'react-router-dom'
import {useData} from '../contexts/DataContext'
import '../styles/sidebar.css'
const Sidebar = () => {
    const {sideBar , setSideBar} = useData()
    useEffect(() => {
        if(sideBar) {
            document.body.style.overflow = 'hidden'
        }
        return () =>  document.body.style.overflow = 'unset'
      }, [sideBar ])
    return (
        <div className = {`sidebar ${sideBar ? "show" : "hide"}`}>
            <ul className = 'sidebar__list'>
                <Link to = '/' onClick = {() => setSideBar(false)}>
                    <li className = 'sidebar__pills'>Home</li>
                </Link>
                <Link to = '/productlist' onClick = {() => setSideBar(false)}>
                <li className = 'sidebar__pills'>Product</li>
                </Link>
                <Link to = '/wishlist' onClick = {() => setSideBar(false)}>
                <li className = 'sidebar__pills'>WishList</li>
                </Link>
                <Link to = '/cart' onClick = {() => setSideBar(false)}>
                <li className = 'sidebar__pills'>Cart</li>
                </Link>
            </ul>
        </div>
    )
}

export default Sidebar
