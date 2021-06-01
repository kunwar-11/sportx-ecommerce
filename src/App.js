import React , {useEffect} from 'react'
import { Cart, Filter, Home, Login, ProductList, Productpage, SignUp, Sort, WishList } from './components'
import {Routes , Route}from 'react-router-dom'
import './styles/App.css'
import {PrivateRoute} from './util'
import axios from 'axios'
import { useData , useAuth } from './contexts'
function App() {
  const {login , setUsers , userId} = useAuth()
  console.log(userId)
  const {dispatch} = useData()
  useEffect(()=>{
    (async () => {
        try {
            dispatch({type : 'LOADING_STATUS' , payload : true});
            const {data : {products}} = await axios.get('https://intense-scrubland-09454.herokuapp.com/products')
            dispatch({type : 'DATA' , payload : products})
        } catch (error) {
            console.log(error)
        }
        finally {
            dispatch({type : 'LOADING_STATUS' , payload : false});
        }
    })(); 
},[dispatch])
useEffect (() => {
  (async () => {
          try {
              const {data : {user}} = await axios.get('https://intense-scrubland-09454.herokuapp.com/user')
              setUsers(user)
          } catch (error) {
              
          }
      })()
},[login , setUsers])
useEffect(() => {
  if(userId){
  (async () => {
      try {
          const {data : {cart}} = await axios.get(`https://intense-scrubland-09454.herokuapp.com/cart/${userId}`)
          dispatch({type : 'LOAD_CART' , payload : cart})
      } catch (error) {
          console.log(error)
      }          
  })()
}
},[dispatch , userId])
useEffect(() =>{
  if(userId){
      (async () => {
          try {
              const {data : {wishlist}} = await axios.get(`https://intense-scrubland-09454.herokuapp.com/wishlist/${userId}`)
              dispatch({type : 'LOAD_WISHLIST' , payload : wishlist})
          } catch (error) {
              console.log(error)
          }          
      })()
}},[dispatch , userId])
  return (
    <div className="App">
        <Routes>
          <Route path = '/' element = {<Home />} />
          <Route path = '/productlist' element = {<ProductList />} />
          <Route path = '/productlist/:productId' element = {<Productpage />} />
          <PrivateRoute path ='/wishlist' element = {<WishList />} />
          <PrivateRoute path = '/cart' element = {<Cart />} />
          <Route path = '/login' element = {<Login />} />
          <Route path = '/filters' element = {<Filter />} />
          <Route path = '/sort' element = {<Sort />} />
          <Route path = '/signup' element = {<SignUp />} />
        </Routes>
    </div>
  );
}

export default App;
