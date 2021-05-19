import React, { useEffect } from 'react'
import { useData } from '../contexts/DataContext'
import '../styles/snackbar.css'
const Snackbar = ({message , type}) => {
    const {dispatch} = useData()
     useEffect(() => {
            let snackbarPrimary = document.querySelector('.snackbar__primary')
            snackbarPrimary.style.display = 'flex'
            setTimeout(() => snackbarPrimary.style.display = 'none' , 2500)
            return () => dispatch({type : 'STATUS' , payload : null})
    },[dispatch])
    return (
        <div className={`snackbar ${type}`}>
            <p>{message}</p>
            <div className="close__snackbar"><i className="fas fa-times"></i></div>
        </div>
    )
}

export default Snackbar
