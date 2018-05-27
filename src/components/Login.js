import React, { Component } from 'react';

class Login extends Component {
  constructor(props){
    super(props);
    this.state = {
      email: 'test@example.com',
      password: 'test'
    };
    this.onChange = this.onChange.bind(this);
    this.submit = this.submit.bind(this);
  }

  onChange(e, key){
    this.setState({[key]: e.target.value});
  }

  submit(e){
    this.props.submit(e, 'users/login', this.state);
  }

  render() {
    const { email, password } = this.state;
    return (
        <div className="row justify-content-center my-5">
          <div className="col-6 col-md-6">
            <form onSubmit={this.submit}>
              <div className="form-group">
                <label htmlFor="email">Email address</label>
                <input type="email" id="email" onChange={(e) => {this.onChange(e, 'email')}}
                       value={email} className="form-control" placeholder="Enter email" />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" onChange={(e) => {this.onChange(e, 'password')}}
                       value={password} className="form-control" id="password" placeholder="Password" />
              </div>
              <button disabled={ !email || !password } type="submit" className="btn btn-primary">Login</button>
            </form>
          </div>
        </div>
    );
  }
}

export default Login;