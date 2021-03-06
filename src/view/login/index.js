import React, { Component } from 'react';
import { render } from 'react-dom';
import { Link } from 'react-router-dom';
import './login.css';
import api from '../../services/api';

import Modal from '../../components/modal/index';

import facebook from './images/facebook.png';
import google from './images/google.png';
import twitter from './images/twitter.png';
import github from './images/github.png';



class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            emailInvalid: false,
            passwordInvalid: false,
            errorCount: null,
            errors: {
                fullName: '',
                email: '',
                password: '',
            },
            errorLogin: '',
            isShowing: false


        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    openModalHandler = () => {
        this.setState({
            isShowing: true
        });
    }

    closeModalHandler = () => {
        this.setState({
            isShowing: false
        });
    }

    handleChange = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        let errors = this.state.errors;

        switch (name) {
            case 'fullName':
                errors.fullName =
                    value.length < 5
                        ? 'Full Name must be 5 characters long!'
                        : '';
                break;
            case 'email':
                this.state.emailInvalid = false;
                errors.email = validEmailRegex.test(value) ? '' : 'Email is not valid!';
                break;
            case 'password':
                this.state.passwordInvalid = false;
                errors.password = value.length < 8 ? 'Password must be 8 characters long!' : '';
                break;
            default:
                break;
        }

        this.setState({ errors, [name]: value });
    }

    async handleSubmit(event) {



        event.preventDefault();
        this.setState({ formValid: validateForm(this.state.errors) });
        this.setState({ errorCount: countErrors(this.state.errors) });


        if (!this.state.email) {
            this.state.emailInvalid = true;
        }
        else {
            this.state.emailInvalid = false;
        }

        if (!this.state.password) {
            this.state.passwordInvalid = true;
        } else {
            this.state.emailInvalid = false;
        }


       

        try {
            let email = this.state.email;
            let password = this.state.password;
            let errors = countErrors(this.state.errors);

            if (email && password && errors === 0) {

                 await api.post('/auth/authenticate', { email, password }).then(response => {
                    const { _id } = response.data.user;
                    alert("success");
                })
                    .catch(error => {
                      
                        this.state.errorLogin = error.response.data.error;

                        
                        this.setState({
                            isShowing: true
                        });
                        
                    });
            }
        } catch (error) {
            alert(error);
        }


    }





    render() {
        const { errors } = this.state;
        return (
            <>
            
                
                                  
            <Modal  
                    show={this.state.isShowing}
                    close={this.closeModalHandler}>
                    {this.state.errorLogin}    
            </Modal>
 
                <div className="container">
                    <div className="row login-content">
                        <div className="col-sm-9 col-md-7 col-lg-5 mx-auto ">                            
                            <div className="card card-signin my-5">                                
                                <div className={`card-body`} >
                                    <h5 className="card-title text-center">Sign In</h5>
                                    <form onSubmit={this.handleSubmit} noValidate>


                                        <div className="form-label-group">
                                            <input id="email"
                                                className="form-control"
                                                type='email'
                                                name='email'
                                                placeholder="Email address"
                                                onChange={this.handleChange}
                                                noValidate
                                                required
                                            />
                                            <label htmlFor="email">Email address</label>
                                            {errors.email.length > 0 &&
                                                <span className='error'>{errors.email}</span>}

                                            {this.state.emailInvalid && <span className='error'>Email is not valid!</span>}
                                        </div>


                                        <div className="form-label-group">
                                            <input id="password"
                                                className="form-control"
                                                type='password'
                                                name='password'
                                                placeholder="password"
                                                onChange={this.handleChange}
                                                noValidate />
                                            <label htmlFor="password">Password</label>
                                            {errors.password.length > 0 && <span className='error'>{errors.password}</span>}
                                            {this.state.passwordInvalid && <span className='error'>Password must be 8 characters long!</span>}


                                        </div>

                                        <div className="custom-control custom-checkbox mb-3">
                                            <input type="checkbox" className="custom-control-input" id="customCheck1" />
                                            <label className="custom-control-label" for="customCheck1">Remember password</label>
                                        </div>
                                        <button type="submit"  className="btn-lg btn-login btn-block text-uppercase" >Sign in</button>



                                        <div className="text-center my-4 option">
                                            <Link to='forgot-password' className="ml-2 mb-4"> Forgot password?</Link>
                                            <Link to='register' className="ml-4 mb-2"> Create an account</Link>
                                        </div>


                                        <hr className="my-4" />
                                        <p className="text-center gray">Or Sign up Using</p>

                                        <div className="socialMedia">
                                            <a href="#">
                                                <img src={facebook} width="50px" height="auto" alt="IMG" />
                                            </a>
                                            <a href="#">
                                                <img src={google} width="50px" height="auto" alt="IMG" />
                                            </a>
                                            <a href="#">
                                                <img src={twitter} width="50px" height="auto" alt="IMG" />
                                            </a>

                                            <a href="#">
                                                <img src={github} width="50px" height="auto" alt="IMG" />
                                            </a>
                                        </div>

                                        

                                    </form>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
         

            </>
        );
    }
}

const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
const validateForm = (errors) => {
    let valid = true;
    Object.values(errors).forEach(
        (val) => val.length > 0 && (valid = false)
    );
    return valid;
}

const countErrors = (errors) => {
    let count = 0;
    Object.values(errors).forEach(
        (val) => val.length > 0 && (count = count + 1)
    );
    return count;
}
export default Register;