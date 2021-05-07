import React , {useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import {useData} from '../contexts/DataContext'
import '../styles/sidebar.css'
const Sidebar = () => {
    const {sideBar , setSideBar} = useData()
    const {login , name , setLogin , setName} = useAuth()
    const navigate = useNavigate()
    useEffect(() => {
        if(sideBar) {
            document.body.style.overflow = 'hidden'
        }
        return () =>  document.body.style.overflow = 'unset'
      }, [sideBar])
      const logoutHandler = () => {
          setSideBar(false)
          localStorage?.removeItem('userLoggedIn')
          localStorage?.removeItem('userName')
          setLogin(false)
          setName('')
          navigate('/')
      }
    return (
        <div className = {`sidebar ${sideBar ? "show" : "hide"}`}>
            <ul className = 'sidebar__list'>
                {!login ? <Link to = '/login' onClick = {() => setSideBar(false)}>
                    <li className="sidebar__pills sidebar__head">Login/Sign Up</li>
                </Link> : <li className = 'sidebar__pills sidebar__head'>{`Hello , ${name}`}</li>}
                <Link to = '/' onClick = {() => setSideBar(false)}>
                    <li className = 'sidebar__pills '>Home</li>
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
                {login && 
                <li className = 'sidebar__pills' onClick = {logoutHandler}>Log Out</li>
                }
            </ul>
        </div>
    )
}

export default Sidebar
