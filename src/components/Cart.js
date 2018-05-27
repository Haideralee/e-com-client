import React, { Component } from 'react';
import axios from 'axios';
import _ from 'lodash';

class Cart extends Component {
  constructor(props){
    super(props);
    this.state = {
      products: []
    };
    this.getAllProduct = this.getAllProduct.bind(this);
    this.renderRow = this.renderRow.bind(this);
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

  renderRow(){
    const { carts, rmProduct } = this.props;
    const { products } = this.state;
    const items = carts.length ? Object.values(_.groupBy(carts, (o) => o.product)) : [];
    return items.map((o,i) => {
      const p = products.find(obj => obj._id === o[0].product) || {};
      return (
          <tr key={o[0]._id}>
            <th scope="col">{i + 1}</th>
            <th scope="col">{p.name}</th>
            <th scope="col">{o.length}</th>
            <th scope="col">Rs {p.price * o.length}</th>
            <th scope="col">
              <button type="click" className="btn btn-danger" onClick={() => rmProduct(o[0])}> - </button>
            </th>
          </tr>
      )
    })
  }

  render() {
    const { products } = this.state;
    return (
        <div className="row">
          <div className="col-12 col-md-12 my-4">
            <h2>
              Cart
            </h2>
          </div>
          <div className="col-12 col-md-12">
            <table className="table table-striped">
              <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Quantity</th>
                <th scope="col">Price</th>
                <th scope="col">Action</th>
              </tr>
              </thead>
              <tbody>
              { !!products.length && this.renderRow()}
              </tbody>
            </table>
          </div>
        </div>
    );
  }
}

export default Cart;