import React , {useEffect, useRef} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth , useData } from '../contexts'
import '../styles/sidebar.css'
export const Sidebar = () => {
    const {sideBar , setSideBar} = useData()
    const {login , name , setLogin , setUserName , setUserId} = useAuth()
    const navigate = useNavigate()
    const ref = useRef()
     
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
              setSideBar(false)
            }
          };
          document.addEventListener('click', handleClickOutside, true);
          return () => {
            document.removeEventListener('click', handleClickOutside, true);
          };
    },[setSideBar])

    useEffect(() => {
        if(sideBar) {
            document.body.style.overflow = 'hidden'
            document.body.style.pointerEvents = "none"
        }
        return () => {
             document.body.style.overflow = 'unset'
             document.body.style.pointerEvents = "auto"
            }
      }, [sideBar])

      const logoutHandler = () => {
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
        <div className = {`sidebar ${sideBar ? "show" : "hide"}`} ref = {ref}>
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
