import React, { useState } from 'react'
import {useAuth} from '../contexts/AuthContext'
import {Link, useLocation, useNavigate} from 'react-router-dom'
import '../styles/login.css'
import Navbar from './Navbar'
const Login = () => {
    const {setLogin , users} = useAuth()
    const [userName , setUserName] = useState('')
    const [password , setPassword] = useState('')
    const [error , setError] = useState({
        userNameError : '',
        passwordError : ''
    })
    const navigate = useNavigate()
    const {state} = useLocation()
    const loginHandler = (e) => {
        e.preventDefault()
        users.forEach(element => {
            if(userName === element.Email) {
                setError(prev => ({...prev , userNameError : ''}))
                if(password === element.password) {
                    setLogin(true)
                    navigate(state?.from ? state.from : '/')
                    setError(prev => ({...prev , passwordError : ''}))
                    return 
                }
                setError(prev => ({...prev , passwordError : 'incorrect password'}))
            }
            else {
                setError(prev => ({...prev , userNameError : 'username not found'}))
            }
            console.log({error})
        });
       
    }
    return (
        <>
        <Navbar />
        <form className = 'login-form card__shadow'>
            <h3 style = {{textAlign : 'center'}}>Login</h3>
            <div className="input">
                <input className = 'inputText' type="text" placeholder = 'enter Email' value = {userName}  onChange = {(e) => setUserName(e.target.value)}/>
                <small className={`error`}>{error.userNameError}</small>
            </div>
            <div className="input">  
                <input className = 'inputText' type="password" placeholder = 'enter password' value = {password} onChange = {(e) => setPassword(e.target.value)}/>
                <small className={`error`}>{error.passwordError}</small>
            </div>
            <button className="btn btn-primary" onClick = {(e)=> loginHandler(e)}>Login</button>
            <small style = {{textAlign : 'center' , marginTop : '1rem'}}>not yet signed up , <Link to = '/signup'><span style = {{textDecoration : 'underline' , cursor : 'pointer'}}>Sign Up Here</span> </Link></small>
        </form>
        </>
    )
}

export default Login
