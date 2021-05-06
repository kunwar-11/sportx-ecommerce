import React from 'react'
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
function App() {
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
