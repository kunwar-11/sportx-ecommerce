import React , {useState} from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
const SignUp = () => {
    const [newUser , setNewUser] = useState({
        FirstName : '',
        LastName : '',
        Email : '',
        password : ''
    })
    const navigate = useNavigate()
    const {setUsers} = useAuth()
    const [error , setError] = useState({})
    const formValidation = () => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        
        const passRe = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
        let valid = true;
        if(newUser.FirstName.trim()){
            setError(prev => ({...prev , FirstName_error : ''}))
        } 
        else {
            setError(prev => ({...prev , FirstName_error : 'Enter First Name!'}))
            valid = false
        }
        if(newUser.LastName.trim()){ 
            setError(prev => ({...prev , LastName_error : ''}))
        } else {
            setError(prev => ({...prev , LastName_error : 'Enter Last Name!'}))
            valid = false
        }
        if(newUser.Email.trim()){
            if(re.test(newUser.Email)){
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
        if(newUser.password.trim()){
            if(passRe.test(newUser.password)){
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
    const signupHandler = async (e) => {
        e.preventDefault();
        try {
            if(formValidation()) {
                const {data : {user}} = await axios.post('https://intense-scrubland-09454.herokuapp.com/user/signup' ,
                 {
                    userData : {
                        firstName: newUser.FirstName,
                        lastName: newUser.LastName,
                        email: newUser.Email,
                        password: newUser.password
                    }
                }
            )
                console.log(user)
                setUsers(prev => prev.concat(user))
                navigate('/login')
            }
        } catch (error) {
            
        }
        
    }
    return (
        <form className = 'login-form card__shadow'>
            <h3 style = {{textAlign : 'center'}}>Sign Up</h3>
            <div className="input">
                <input className = 'inputText' type="text" placeholder = 'enter FirstName' value = {newUser.FirstName} onChange = {(e) => setNewUser(prev => ({...prev , FirstName : e.target.value}))}/>
                <small className={`error`}>{error.FirstName_error}</small>
            </div>
            <div className="input">
                <input className = 'inputText' type="text" placeholder = 'enter LastName' value = {newUser.LastName} onChange = {(e) => setNewUser(prev => ({...prev , LastName : e.target.value}))}/>
                <small className={`error`}>{error.LastName_error}</small>
            </div>
            <div className="input">
                <input className = 'inputText' type="text" placeholder = 'enter email' value = {newUser.Email} onChange = {(e) => setNewUser(prev => ({...prev , Email : e.target.value}))}/>
                <small className={`error`}>{error.Email_error}</small>
            </div>
            <div className="input">  
                <input className = 'inputText' type="password" placeholder = 'enter password' value = {newUser.password} onChange = {(e) => setNewUser(prev => ({...prev , password : e.target.value}))}/>
                <small className={`error`}>{error.password_error}</small>
            </div>
            <button className="btn btn-primary" onClick = {(e)=> signupHandler(e)}>Sign Up</button>
            <small style = {{textAlign : 'center' , marginTop : '1rem'}}>already have an account , <Link to = '/login'><span style = {{textDecoration : 'underline' , cursor : 'pointer'}}>Login Here</span></Link></small>
        </form>
    )
}

export default SignUp
