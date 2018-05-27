import React, { Component } from 'react';

class SignUp extends Component {
  constructor(props){
    super(props);
    this.state = {
      name: '',
      email: '',
      password: ''
    };
    this.onChange = this.onChange.bind(this);
    this.submit = this.submit.bind(this);
  }

  onChange(e, key){
    this.setState({[key]: e.target.value});
  }

  submit(e){
    this.props.submit(e, 'users/', this.state);
  }

  render() {
    const { name, email, password } = this.state;
    return (
        <div className="row justify-content-center my-5">
          <div className="col-6 col-md-6">
            <form onSubmit={this.submit}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input type="name" id="name" onChange={(e) => {this.onChange(e, 'name')}}
                       value={name} className="form-control" placeholder="Enter Name" />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email address</label>
                <input type="email" id="email" onChange={(e) => {this.onChange(e, 'email')}}
                       value={email} className="form-control" placeholder="Enter Email" />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" className="form-control" onChange={(e) => {this.onChange(e, 'password')}}
                       value={password} id="password" placeholder="Password" />
              </div>
              <button disabled={!name || !email || !password} type="submit" className="btn btn-primary">Sign-up</button>
            </form>
          </div>
        </div>
    );
  }
}

export default SignUp;