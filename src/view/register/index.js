import React, { Component } from 'react';
import { render } from 'react-dom';
import { Link } from 'react-router-dom';
import './register.css';
import api from '../../services/api';

import Modal from '../../components/modal/index';


class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fullName: '',
            email: '',
            password: '',
            emailInvalid: false,
            passwordInvalid: false,
            fullNameInvalid:false,
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
                this.state.fullNameInvalid = false;
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

        
        if (!this.state.fullName) {
            this.state.fullNameInvalid = true;
        }
        else {
            this.state.fullNameInvalid = false;
        }


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
            let name = this.state.fullName;
            let email = this.state.email;
            let password = this.state.password;
            let errors = countErrors(this.state.errors);

            if (email && password && name && errors === 0) {

                await api.post('/auth/register', { name, email, password }).then(response => {
                    const { _id } = response.data.user;
                    alert("success");
                })
                    .catch(error => {

                        //this.state.errorLogin = error.response.data.error;
                        alert(error.response.data.error);

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
                                    <h5 className="card-title text-center">Create an account</h5>
                                    <form onSubmit={this.handleSubmit} noValidate>

                                        <div className='form-label-group'>
                                            <input id='fullName'
                                                type='text'
                                                name='fullName'
                                                className="form-control"
                                                placeholder="Name"
                                                onChange={this.handleChange} noValidate required />
                                            <label htmlFor="fullName">Name</label>

                                            {errors.fullName.length > 0 &&
                                                <span className='error'>{errors.fullName}</span>}
                                                {this.state.fullNameInvalid && <span className='error'>Name is not valid!</span>}
                                        </div>

                                        <div className="form-label-group">
                                            <input id="email"
                                                type='email'
                                                name='email'
                                                className="form-control"
                                                placeholder="Email address"
                                                onChange={this.handleChange}
                                                noValidate

                                            />
                                            <label htmlFor="email">Email address</label>
                                            {errors.email.length > 0 &&
                                                <span className='error'>{errors.email}</span>}

                                            {this.state.emailInvalid && <span className='error'>Email is not valid!</span>}
                                        </div>


                                        <div className="form-label-group">
                                            <input id="password"
                                                type='password'
                                                name='password'
                                                className="form-control"
                                                placeholder="password"
                                                onChange={this.handleChange}
                                                noValidate />
                                            <label htmlFor="password">Password</label>
                                            {errors.password.length > 0 && <span className='error'>{errors.password}</span>}
                                            {this.state.passwordInvalid && <span className='error'>Password must be 8 characters long!</span>}


                                        </div>

                                        <button type="submit" className="btn-lg btn-login btn-block text-uppercase" >Register</button>


                                        <div className="text-center my-4 option">
                                            <Link to='forgot-password' className="ml-2 mb-4"> Forgot password?</Link>
                                            <Link to='/' className="ml-4 mb-2"> Sign in</Link>
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