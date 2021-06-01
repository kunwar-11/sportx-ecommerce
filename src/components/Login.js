import React, { useState } from 'react'
import {useAuth , useData} from '../contexts'
import {Link, useLocation, useNavigate} from 'react-router-dom'
import '../styles/login.css'
import {Navbar} from './Navbar'
import axios from 'axios'
import { Snackbar } from './SnackBar'
export const Login = () => {
    const {setLogin , setUserName , setUserId} = useAuth()
    const {dispatch , setMessage , message , state : {status}} = useData()
    const [name , setName] = useState('')
    const [password , setPassword] = useState('')
    const navigate = useNavigate()
    const {state} = useLocation()
    const loginHandler = async (e) => {
        e.preventDefault()
        dispatch({type : 'STATUS' , payload : true})
        try {
            const {data : {userName , userId} , status} = await axios.post('https://intense-scrubland-09454.herokuapp.com/user/login' , {
                userEmail : name,
                password : password
            })
                if(status === 200) {
                        setLogin(true)
                        localStorage?.setItem('userLoggedIn', JSON.stringify({login : true}))
                        setUserName(userName)
                        localStorage?.setItem('userName' , JSON.stringify({name : userName}))
                        console.log(userId)
                        localStorage?.setItem('userId' , userId)
                        setUserId(userId)
                        navigate(state?.from ? state.from : '/')
                        dispatch({type : 'STATUS' , payload : false})
                        setMessage(`Welcome! ${userName}`)
                }
        } catch (err) {
            console.log(err)
            dispatch({type : 'STATUS' , payload : false})
            setMessage("Invalid Credentials")
        }
    }
    return (
        <>
        <Navbar />
        <form className = 'login-form card__shadow'>
            <h3 style = {{textAlign : 'center'}}>Login</h3>
            <div className="input">
                <input className = 'inputText' type="text" placeholder = 'enter Email' value = {name}  onChange = {(e) => setName(e.target.value)}/>
            </div>
            <div className="input">  
                <input className = 'inputText' type="password" placeholder = 'enter password' value = {password} onChange = {(e) => setPassword(e.target.value)}/>
            </div>
            <button className="btn btn-primary" onClick = {(e)=> loginHandler(e)}>Login</button>
            <small style = {{textAlign : 'center' , marginTop : '1rem'}}>not yet signed up , <Link to = '/signup'><span style = {{textDecoration : 'underline' , cursor : 'pointer'}}>Sign Up Here</span> </Link></small>
        </form>
        {status === false && <Snackbar message = {message} type = {`${message === "Invalid Credentials" ? "snackbar__secondary" : "snackbar__Success"}`}/>}
        </>
    )
}
