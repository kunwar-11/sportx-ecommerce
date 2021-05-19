import React, { useEffect } from 'react'
import '../styles/snackbar.css'
const Snackbar = ({message , type}) => {
     useEffect(() => {
        if(type === 'snackbar__primary'){
            let snackbarPrimary = document.querySelector('.snackbar__primary')
            snackbarPrimary.style.display = 'flex'
            setTimeout(() => snackbarPrimary.style.display = 'none' , 2500)
        }
        if(type === 'snackbar__secondary'){
            let snackbarPrimary = document.querySelector('.snackbar__secondary')
            snackbarPrimary.style.display = 'flex'
        }
    },[type])
    return (
        <div className={`snackbar ${type}`}>
            <p>{message}</p>
            <div className="close__snackbar"><i className="fas fa-times"></i></div>
        </div>
    )
}

export default Snackbar
