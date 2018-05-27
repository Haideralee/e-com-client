import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import axios from 'axios';
import './config';
import Header from './components/Header';
import Products from './components/Products';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Cart from './components/Cart';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      isLogin: !!localStorage.getItem('token'),
      cartProducts: []
    };

    this.submit = this.submit.bind(this);
    this.updateState = this.updateState.bind(this);
    this.getAddCartProducts = this.getAddCartProducts.bind(this);
    this.rmProdFromCart = this.rmProdFromCart.bind(this);
    this.guestUser = this.guestUser.bind(this);

  }

  componentDidMount(){
    const guestUserToken = !!localStorage.getItem('guestUserToken');
    const isLogin = !!localStorage.getItem('token');
    (guestUserToken || isLogin) && this.getAddCartProducts();
    !guestUserToken && !isLogin && this.guestUser();
  }

  updateState(boolean){
    if(!boolean){
      localStorage.removeItem('token');
      localStorage.removeItem('userDetail');
    }
    this.getAddCartProducts();
    this.setState({isLogin: boolean})
  }

  guestUser(){
    axios.get("users/guest")
        .then((res)=>{
          console.log('guestUser res : ', res);
          const { data } = res;
          localStorage.setItem('guestUserToken', data);
        })
        .catch((err)=>{
          console.log('guestUser err : ', err);
        });
  }

  getAddCartProducts(){
    const guestUserToken = localStorage.getItem('guestUserToken');
    const user = JSON.parse(localStorage.getItem('userDetail')) || '';
    let key = user ? 'user' : 'browserId';
    let id = user ? user._id : guestUserToken;
    axios.get(`carts/${key}/${id}`)
        .then((res)=>{
          const { data } = res;
          console.log('getAddCartProducts data : ', data);
          this.setState({cartProducts: data})
        })
        .catch((err)=>{
          console.log('getAddCartProducts err : ', err);
        });
  }

  rmProdFromCart(item){
    axios.delete(`carts/${item._id}`)
        .then((res)=>{
          this.getAddCartProducts();
        })
        .catch((err)=>{
          console.log('rmProdFromCart err ', err);
        });
  }

  submit(e, url, payload){
    e.preventDefault();
    axios.post(url, payload)
        .then((res)=>{
          const { data } = res;
          console.log('submit data : ', data);
          localStorage.setItem('token', data.token);
          localStorage.setItem('userDetail', JSON.stringify(data));
          this.updateState(true);
          this.getAddCartProducts();
        })
        .catch((err)=>{
          console.log('submit err : ', err);
        });
  }

  render() {
    const {isLogin, cartProducts} = this.state;
    return (
        <Router>
          <div className="container my-2">
            <Header isLogin={isLogin} products={cartProducts} updateState={this.updateState} />
            <Switch>
              <Route exact path="/" render={(props)=> <Products addCart={this.getAddCartProducts} />} />
              <Route path="/cart" render={(props)=> <Cart carts={ cartProducts } rmProduct={this.rmProdFromCart} />} />
              <Route path="/login" render={(props) => isLogin ? <Redirect to="/" /> : <Login submit={this.submit} /> }/>
              <Route path="/signup" render={(props) => isLogin ? <Redirect to="/" /> : <SignUp submit={this.submit} /> }/>
              <Route render={()=> <h1>404 Not Found</h1>} />
            </Switch>
          </div>
        </Router>
    );
  }
}

export default App;
