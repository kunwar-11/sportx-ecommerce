import React , {useEffect} from 'react'
import ProductList from './components/ProductList'
import WishList from './components/WishList'
import Home from './components/Home'
import Cart from './components/Cart'
import Productpage from './components/Productpage'
import Login from './components/Login'
import {Routes , Route}from 'react-router-dom'
import './styles/App.css'
import Filter from './components/Filter'
import Sort from './components/Sort'
import SignUp from './components/SignUp'
import {PrivateRoute} from './util'
import { useAuth } from './contexts/AuthContext'
import axios from 'axios'
import { useData } from './contexts/DataContext'
function App() {
  const {login , setUsers , userId} = useAuth()
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
            if(login) {
                try {
                    const {data : {user}} = await axios.get('https://intense-scrubland-09454.herokuapp.com/user')
                    setUsers(user)
                } catch (error) {
                    
                }
            }
        })()
},[login , setUsers])
useEffect(() => {
  (async () => {
    try {
      const {data : {cart}} = await axios.get(`https://intense-scrubland-09454.herokuapp.com/cart/${userId}`)
      dispatch({type : 'LOAD_CART' , payload : cart})
  } catch (error) {
      
  }
  try {
      const {data : {wishlist}} = await axios.get(`https://intense-scrubland-09454.herokuapp.com/wishlist/${userId}`)
      dispatch({type : 'LOAD_WISHLIST' , payload : wishlist})
  } catch (error) {
      
  }
  })()
},[userId , dispatch])
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
        {/* <Navbar />
        <div className = 'App__Layout'>
          <div></div>
        <ProductList />
        </div> */}
    </div>
  );
}

export default App;
