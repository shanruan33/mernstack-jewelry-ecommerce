import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom'

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import NotFound from './components/App/NotFound';
import Login from './components/User/Login';
import Home from './pages/Home';
import Contact from './pages/Contact';
import Shop from './pages/Shop';
import SingleProduct from './pages/SingleProduct';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import PaySuccess from './components/App/PaySuccess';
import PayCancelled from './components/App/PayCancelled';
import Blog from './components/Test/Blog';


const App = () => (
  <>
    {/* <Header /> */}
    <Link to="/blog">Blog</Link>
    <Link to="/login">Login</Link>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/blog" component={Blog} />
      <Route exact path="/contact" component={Contact} />
      <Route exact path="/shop" component={Shop} />
      <Route exact path="/shop/:id" component={SingleProduct} />
      <Route exact path="/cart" component={Cart} />
      <Route exact path="/checkout" component={Checkout} />
      <Route exact path="/success" component={PaySuccess} />      
      <Route exact path="/canceled" component={PayCancelled} /> 
      <Route component={NotFound} />
    </Switch>

    <Footer />
  </>
);

export default App;
