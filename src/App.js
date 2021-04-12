import React from 'react'
import ProductList from './components/ProductList'
import WishList from './components/WishList'
import Home from './components/Home'
import Cart from './components/Cart'
import Productpage from './components/Productpage'
import {Routes , Route}from 'react-router-dom'
import './styles/App.css'
import Filter from './components/Filter'
import Sort from './components/Sort'
function App() {
  return (
    <div className="App">
        <Routes>
          <Route path = '/' element = {<Home />} />
          <Route path = '/productlist' element = {<ProductList />} />
          <Route path = '/productlist/:productId' element = {<Productpage />} />
          <Route path ='/wishlist' element = {<WishList />} />
          <Route path = '/cart' element = {<Cart />} />
          <Route path = '/filters' element = {<Filter />} />
          <Route path = '/sort' element = {<Sort />} />
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
