import React , {useState} from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

const SignUp = () => {
    const [user , setUser] = useState({
        FirstName : '',
        LastName : '',
        Email : '',
        password : ''
    })
    const {users} = useAuth()
    const [error , setError] = useState({})
    const formValidation = () => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        
        const passRe = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
        let valid = true;
        if(user.FirstName.trim()){
            setError(prev => ({...prev , FirstName_error : ''}))
        } 
        else {
            setError(prev => ({...prev , FirstName_error : 'Enter First Name!'}))
            valid = false
        }
        if(user.LastName.trim()){ 
            setError(prev => ({...prev , LastName_error : ''}))
        } else {
            setError(prev => ({...prev , LastName_error : 'Enter Last Name!'}))
            valid = false
        }
        if(user.Email.trim()){
            if(re.test(user.Email)){
                setError(prev => ({...prev , Email_error : ''})) 
             }
             else {
                 setError(prev => ({...prev , Email_error : 'Enter in Correct format'})) 
                 valid = false
            }
        }
        else {
            setError(prev => ({...prev , Email_error : 'Enter Email!'}))
        }    
        if(user.password.trim()){
            if(passRe.test(user.password)){
                setError(prev => ({...prev , password_error : ''})) 
            } else {
                setError(prev => ({...prev , password_error : 'Password should have Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character'}))
                valid = false
            } 
        }  
        else {
            setError(prev => ({...prev , password_error : 'Enter Password!'}))
            valid = false
        }
        return valid
    }
    const signupHandler = (e) => {
        e.preventDefault();
        if(formValidation()) {
            console.log(user)
            users.push(user)
        }
        console.log(users , typeof(users))
    }
    return (
        <form className = 'login-form card__shadow'>
            <h3 style = {{textAlign : 'center'}}>Sign Up</h3>
            <div className="input">
                <input className = 'inputText' type="text" placeholder = 'enter FirstName' value = {user.FirstName} onChange = {(e) => setUser(prev => ({...prev , FirstName : e.target.value}))}/>
                <small className={`error`}>{error.FirstName_error}</small>
            </div>
            <div className="input">
                <input className = 'inputText' type="text" placeholder = 'enter LastName' value = {user.LastName} onChange = {(e) => setUser(prev => ({...prev , LastName : e.target.value}))}/>
                <small className={`error`}>{error.LastName_error}</small>
            </div>
            <div className="input">
                <input className = 'inputText' type="text" placeholder = 'enter email' value = {user.Email} onChange = {(e) => setUser(prev => ({...prev , Email : e.target.value}))}/>
                <small className={`error`}>{error.Email_error}</small>
            </div>
            <div className="input">  
                <input className = 'inputText' type="password" placeholder = 'enter password' value = {user.password} onChange = {(e) => setUser(prev => ({...prev , password : e.target.value}))}/>
                <small className={`error`}>{error.password_error}</small>
            </div>
            <button className="btn btn-primary" onClick = {(e)=> signupHandler(e)}>Sign Up</button>
            <small style = {{textAlign : 'center' , marginTop : '1rem'}}>already have an account , <Link to = '/login'><span style = {{textDecoration : 'underline' , cursor : 'pointer'}}>Login Here</span></Link></small>
        </form>
    )
}

export default SignUp
