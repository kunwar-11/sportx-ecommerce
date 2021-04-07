import React from 'react'
import ProductList from './components/ProductList'
import Navbar from './components/Navbar'
import './styles/App.css'
function App() {
  return (
    <div className="App">
        <Navbar />
        <div className = 'App__Layout'>
          <div></div>
        <ProductList />
        </div>
    </div>
  );
}

export default App;
