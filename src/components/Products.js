import React, { Component } from 'react';
import axios from 'axios';

class Products extends Component {
  constructor(props){
    super(props);
    this.state = {
      products:[]
    };

    this.getAllProduct = this.getAllProduct.bind(this);
    this.renderProduct = this.renderProduct.bind(this);
    this.addCart = this.addCart.bind(this);
  }

  componentDidMount(){
    this.getAllProduct();
  }

  getAllProduct(){
    axios.get("products/")
        .then((res)=>{
          console.log('res ', res);
          const { data } = res;
          this.setState({ products: data })
        })
        .catch((err)=>{
          console.log('err ', err);
        });
  }

  renderProduct(){
    const { products } = this.state;
    return products.map((o,i) => {
      return (
          <div key={o._id} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{o.name}</h5>
                <p className="card-text">{o.description}</p>
              </div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <strong className="float-left"> Price </strong>
                  <span className="float-right">RS {o.price} </span>
                </li>
                <li className="list-group-item">
                  <strong className="float-left"> Quantity </strong>
                  <span className="float-right"> {o.quantity} </span>
                </li>
              </ul>
              <div className="card-body text-center">
                <button type="button" className="btn btn-success" onClick={()=> this.addCart(o)}>
                  Add to Card
                </button>
              </div>
            </div>
          </div>
      )
    })
  }

  addCart(product){
    const user = JSON.parse(localStorage.getItem('userDetail'));
    const guestUserToken = localStorage.getItem('guestUserToken');
    axios.post("carts/", {
      product: product._id,
      user: user ? user._id : undefined,
      browserId: user ? undefined : guestUserToken
    })
    .then((res)=>{
      const { data } = res;
      console.log('data ', data);
      this.props.addCart();
    })
    .catch((err)=>{
      console.log('err ', err);
    });
  }

  render() {
    return (
        <div className="row">
          <div className="col-12 col-md-12 my-4">
            <h2> Products </h2>
          </div>
          {this.renderProduct()}
        </div>
    );
  }
}

export default Products;