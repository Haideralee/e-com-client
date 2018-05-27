import React from 'react';
import { NavLink } from "react-router-dom";

const Header = (props) => {
    const { isLogin, products } = props;
    const divStyle = {
      position: 'absolute',
      top: '8px',
      right: '15px'
    };
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light position-relative">
          <NavLink className="nav-item nav-link" to="/">e-comm</NavLink>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav w-100">
              {!isLogin ?  <NavLink exact activeClassName="active" className="nav-item nav-link" to="/">Product</NavLink> : null}
              {!isLogin ?  <NavLink activeClassName="active" className="nav-item nav-link" to="/login">Login</NavLink> : null}
              {!isLogin ?  <NavLink activeClassName="active" className="nav-item nav-link" to="/signup">Signup</NavLink> : null}
              <div style={divStyle}>
                {isLogin ? <button type="click" className="btn btn-warning mx-2"
                                   onClick={() => props.updateState(false)}>Logout</button> : null }
                <NavLink className="btn btn-info" to='/cart'>
                  Cart
                  <span className="badge badge-warning mx-1">{products.length}</span>
                </NavLink>
              </div>
            </div>
          </div>
        </nav>
    );
};

export default Header;