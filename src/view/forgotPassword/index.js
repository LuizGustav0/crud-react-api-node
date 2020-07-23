import React, { Component } from 'react';
import { render } from 'react-dom';
import { Link } from 'react-router-dom';
import './register.css';
import api from '../../services/api';

import Modal from '../../components/modal/index';


class ForgotPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
      
            email: '',            
            emailInvalid: false,       
            errorCount: null,
            errors: {            
                email: '',               
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
         
            case 'email':
                this.state.emailInvalid = false;
                errors.email = validEmailRegex.test(value) ? '' : 'Email is not valid!';
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

      




        try {
      
            let email = this.state.email;
       
            let errors = countErrors(this.state.errors);

            if (email && errors === 0) {

                await api.post('/auth/forgot_password', { email }).then(response => {
                    this.state.errorLogin = "Verify your email";

                        
                    this.setState({
                        isShowing: true
                    });
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
                                    <h5 className="card-title text-center">Forgot password</h5>
                                    <form onSubmit={this.handleSubmit} noValidate>
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



                               
                                        <button type="submit" className="btn-lg btn-login btn-block text-uppercase" >Send email</button>



                                        <div className="text-center my-4 option">                                        
                                            <Link to='/' className="ml-4 mb-2"> Sign in</Link>
                                            <Link to='register' className="ml-2 mb-4"> Create an account</Link>
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
export default ForgotPassword;