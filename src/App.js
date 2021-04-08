import React from 'react'
import ProductList from './components/ProductList'
import WishList from './components/WishList'
import Home from './components/Home'
import Cart from './components/Cart'
import Productpage from './components/Productpage'
import {Routes , Route}from 'react-router-dom'
import './styles/App.css'
function App() {
  return (
    <div className="App">
        <Routes>
          <Route path = '/' element = {<Home />} />
          <Route path = '/productlist' element = {<ProductList />} />
          <Route path = '/productlist/:productId' element = {<Productpage />} />
          <Route path ='/wishlist' element = {<WishList />} />
          <Route path = '/cart' element = {<Cart />} />
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
