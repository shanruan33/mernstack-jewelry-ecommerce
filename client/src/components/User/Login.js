import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import 'whatwg-fetch';
import {
    getFromStorage,
    setInStorage
} from '../../utils/storage';
//import { ProductContext } from '../../context';

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            loggedIn: false,
            signedUp: true,
            token: '',
            signInError: '',
            signInEmail: '',
            signInPassword: '',
            signUpError: '',
            signUpFirstName: '',
            signUpLastName: '',
            signUpEmail: '',
            signUpPassword: '',
            firstName: '',
            cart: [],
            email: ''
        };
        this.onTextboxChangeSignInEmail = this.onTextboxChangeSignInEmail.bind(this);
        this.onTextboxChangeSignInPassword = this.onTextboxChangeSignInPassword.bind(this);
        this.onTextboxChangeSignUpFirstName = this.onTextboxChangeSignUpFirstName.bind(this);
        this.onTextboxChangeSignUpLastName = this.onTextboxChangeSignUpLastName.bind(this);
        this.onTextboxChangeSignUpEmail = this.onTextboxChangeSignUpEmail.bind(this);
        this.onTextboxChangeSignUpPassword = this.onTextboxChangeSignUpPassword.bind(this);
        this.onSignIn = this.onSignIn.bind(this);
        this.onSignUp = this.onSignUp.bind(this);
        this.logout = this.logout.bind(this);
        this.goSignUp = this.goSignUp.bind(this);
        this.goLogIn = this.goLogIn.bind(this);
    }

    // static contextType = ProductContext;


    componentDidMount() {
        const obj = getFromStorage('jewelry_app');
        // const value = this.context;
        // const receiveCartItem = value.receiveCartItem;
        // if (obj && obj.cart) {
        //     receiveCartItem(obj.cart);
        // }



        if (obj && obj.token) {
            const { token, firstName, cart } = obj;
            // Verify token
            fetch('/api/account/verify?token=' + token)
                .then(res => res.json())
                .then(json => {
                    if (json.success) {
                        this.setState({
                            token,
                            isLoading: false,
                            loggedIn: true,
                            firstName: firstName,
                            cart: cart
                        });
                    } else {
                        this.setState({
                            isLoading: false,
                        });
                    }
                });
        } else {
            this.setState({
                isLoading: false,
            });
        }
    }

    onTextboxChangeSignInEmail(event) {
        this.setState({
            signInEmail: event.target.value,
        });
    }
    onTextboxChangeSignInPassword(event) {
        this.setState({
            signInPassword: event.target.value,
        });
    }
    onTextboxChangeSignUpFirstName(event) {
        this.setState({
            signUpFirstName: event.target.value,
        });
    }
    onTextboxChangeSignUpLastName(event) {
        this.setState({
            signUpLastName: event.target.value,
        });
    }
    onTextboxChangeSignUpEmail(event) {
        this.setState({
            signUpEmail: event.target.value,
        });
    }
    onTextboxChangeSignUpPassword(event) {
        this.setState({
            signUpPassword: event.target.value,
        });
    }

    goSignUp() {
        this.setState({
            signedUp: false
        });
    }

    goLogIn() {
        this.setState({
            signedUp: true
        });
    }

    onSignUp() {
        // Grab state
        const {
            signUpFirstName,
            signUpLastName,
            signUpEmail,
            signUpPassword,
        } = this.state;

        this.setState({
            isLoading: true,
        });

        // Post request to backend
        fetch('http://localhost:8023/api/account/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                firstName: signUpFirstName,
                lastName: signUpLastName,
                email: signUpEmail,
                password: signUpPassword,
            }),
        }).then(res => res.json())
            .then(json => {
                console.log('signup json', json);
                if (json.success) {
                    this.setState({
                        signUpError: json.message,
                        isLoading: false,
                        signedUp: true,
                        signUpFirstName: '',
                        signUpLastName: '',
                        signUpEmail: '',
                        signUpPassword: ''
                    });
                } else {
                    this.setState({
                        signUpError: json.message,
                        isLoading: false,
                    });
                }
            });
    }

    onSignIn() {
        // const value = this.context;
        // const receiveCartItem = value.receiveCartItem;

        // Grab state
        const {
            signInEmail,
            signInPassword,
        } = this.state;

        this.setState({
            isLoading: true
        });

        // Post request to backend
        fetch('http://localhost:8023/api/account/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: signInEmail,
                password: signInPassword,
            }),
        }).then(res => res.json())
            .then(json => {
                console.log('signin json', json);
                if (json.success) {
                    //receiveCartItem(json.cart);
                    setInStorage('jewelry_app', { token: json.token, firstName: json.firstName, lastName: json.lastName, cart: json.cart, email: signInEmail, order: [] });
                    this.setState({
                        signInError: json.message,
                        isLoading: false,
                        signInPassword: '',
                        signInEmail: '',
                        token: json.token,
                        loggedIn: true,
                        firstName: json.firstName,
                        cart: json.cart
                    });
                } else {
                    this.setState({
                        signInError: json.message,
                        isLoading: false,
                    });
                }
            });
    };

    logout() {
        // const value = this.context;
        // const clearCart = value.clearCart;
        this.setState({
            isLoading: true,
        });
        const obj = getFromStorage('jewelry_app');
        if (obj && obj.token) {
            const { token } = obj;
            // Verify token
            fetch('/api/account/logout?token=' + token)
                .then(res => res.json())
                .then(json => {
                    if (json.success) {
                        setInStorage('jewelry_app', {});
                        //clearCart();
                        this.setState({
                            token: '',
                            isLoading: false,
                            loggedIn: false,
                            signInError: ''
                        });
                    } else {
                        this.setState({
                            isLoading: false,
                        });
                    }
                });
        } else {
            this.setState({
                isLoading: false,
            });
        }
    }

    render() {
        const {
            isLoading,
            signedUp,
            token,
            signInError,
            signInEmail,
            signInPassword,
            signUpFirstName,
            signUpLastName,
            signUpEmail,
            signUpPassword,
            firstName
        } = this.state;

        if (isLoading) {
            return (<div><p>Loading...</p></div>);
        }
        if (!token) {
            if (signedUp) {
                return (
                    <>
                        <div className="limiter">
                            <div className="container-login100">
                                <div className="wrap-login100">
                                    <div className="login100-form validate-form">
                                        <span className="login100-form-title p-b-26">
                                            Welcome
                      {
                                                (signInError) ? (<p>{signInError}</p>) : (null)
                                            }
                                        </span>
                                        {/* <img src="./assets/logo/logo2x.png" className="login100-form-title p-b-48" /> */}

                                        <div className="wrap-input100 validate-input" data-validate="Valid email is: a@b.c">
                                            <input type="email" placeholder="Email" value={signInEmail} onChange={this.onTextboxChangeSignInEmail} /><br />
                                        </div>

                                        <div className="wrap-input100 validate-input" data-validate="Enter password">
                                            <span className="btn-show-pass">
                                                <i className="zmdi zmdi-eye"></i>
                                            </span>
                                            <input type="password" placeholder="Password" value={signInPassword} onChange={this.onTextboxChangeSignInPassword} /><br />
                                        </div>

                                        <div className="container-login100-form-btn">
                                            <div className="wrap-login100-form-btn">
                                                <div className="login100-form-bgbtn"></div>
                                                <button className="login100-form-btn" onClick={this.onSignIn}>
                                                    Login
							</button>
                                            </div>
                                        </div>

                                        <div className="text-center p-t-115">
                                            <span className="txt1">
                                                Don’t have an account?
					  </span>
                                            <a className="txt2" onClick={this.goSignUp}>
                                                Sign Up
						</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )
            } else {
                return (
                    <React.Fragment>
                        <div className="limiter">
                            <div className="container-login100">
                                <div className="wrap-login100">
                                    <div className="login100-form validate-form">
                                        <span className="login100-form-title p-b-26">
                                            Welcome
					        </span>
                                        {/* <img src="./assets/logo/logo2x.png" className="login100-form-title p-b-48" /> */}


                                        <div className="wrap-input100 validate-input" >
                                            <input type="firstName" placeholder="First Name" value={signUpFirstName} onChange={this.onTextboxChangeSignUpFirstName} /><br />

                                        </div>
                                        <div className="wrap-input100 validate-input" >
                                            <input type="lastName" placeholder="Last Name" value={signUpLastName} onChange={this.onTextboxChangeSignUpLastName} /><br />
                                        </div>
                                        <div className="wrap-input100 validate-input" data-validate="Valid email is: a@b.c">
                                            <input type="email" placeholder="Email" value={signUpEmail} onChange={this.onTextboxChangeSignUpEmail} /><br />
                                        </div>
                                        <div className="wrap-input100 validate-input" data-validate="Enter password">
                                            <span className="btn-show-pass">
                                                <i className="zmdi zmdi-eye"></i>
                                            </span>
                                            <input type="password" placeholder="Password" value={signUpPassword} onChange={this.onTextboxChangeSignUpPassword} /><br />
                                        </div>
                                        <div className="container-login100-form-btn">
                                            <div className="wrap-login100-form-btn">
                                                <div className="login100-form-bgbtn"></div>
                                                <button className="login100-form-btn" onClick={this.onSignUp}>
                                                    Sign Up
							</button>
                                            </div>
                                        </div>
                                        <div className="text-center p-t-115">
                                            <span className="txt1">
                                                Already have an account?
					  </span>
                                            <a className="txt2" onClick={this.goLogIn}>
                                                Log In
						</a>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>

                    </React.Fragment>
                )
            }
        }

        return (
            <>
                <div className="limiter">
                    <div className="container-login100">
                        <div className="wrap-login100">
                            <div className="login100-form validate-form">
                                <span className="login100-form-title p-b-26">
                                    Account <p>{this.state.firstName}, welcome back!</p>
                                </span>
                                <div className="container-login100-form-btn">
                                    <div className="wrap-login100-form-btn">
                                        <div className="login100-form-bgbtn"></div>
                                        <Link to="/cart" className="login100-form-btn" id="goCart">
                                            Check My Cart
							</Link>

                                    </div>
                                </div>
                                <div className="container-login100-form-btn">
                                    <div className="wrap-login100-form-btn">
                                        <div className="login100-form-bgbtn"></div>
                                        <button className="login100-form-btn" onClick={this.logout}>
                                            Log Out
							</button>
                                    </div>
                                </div>
                                <div className="text-center p-t-115">
                                    <span className="txt1">
                                        Start browsing our product:
					  </span>
                                    <Link className="txt2" to="/" >
                                        Here
						</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default Login;
