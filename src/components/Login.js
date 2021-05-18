import React, { useState } from 'react'
import {useAuth} from '../contexts/AuthContext'
import {Link, useLocation, useNavigate} from 'react-router-dom'
import '../styles/login.css'
import Navbar from './Navbar'
import axios from 'axios'
const Login = () => {
    const {setLogin , users , setUserName , setUserId} = useAuth()
    const [name , setName] = useState('')
    const [password , setPassword] = useState('')
    const [error , setError] = useState({
        userNameError : '',
        passwordError : ''
    })
    const navigate = useNavigate()
    const {state} = useLocation()
    console.log(users)
    const loginHandler = async (e) => {
        e.preventDefault()
        try {
            const {data : {userName , userId}} = await axios.post('https://intense-scrubland-09454.herokuapp.com/user/login' , {
                userEmail : name,
                password : password
            })
            users.forEach(element => {
                if(name === element.email) {
                    setError(prev => ({...prev , userNameError : ''}))
                    if(password === element.password) {
                        console.log('hello')
                        setLogin(true)
                        localStorage?.setItem('userLoggedIn', JSON.stringify({login : true}))
                        setUserName(userName)
                        localStorage?.setItem('userName' , JSON.stringify({name : userName}))
                        console.log(userId)
                        localStorage?.setItem('userId' , JSON.stringify({id : userId}))
                        setUserId(userId)
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
        } catch (error) {
            
        }
      
       
    }
    return (
        <>
        <Navbar />
        <form className = 'login-form card__shadow'>
            <h3 style = {{textAlign : 'center'}}>Login</h3>
            <div className="input">
                <input className = 'inputText' type="text" placeholder = 'enter Email' value = {name}  onChange = {(e) => setName(e.target.value)}/>
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
