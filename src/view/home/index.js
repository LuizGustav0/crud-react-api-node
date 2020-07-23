import React, { Component } from 'react';
import { render } from 'react-dom';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import Modal from '../../components/modal/index';


class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
         
            isShowing: false


        };


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








    render() {

        return (
            <>

                <Modal
                    show={this.state.isShowing}
                    close={this.closeModalHandler}>
                    {this.state.errorLogin}
                </Modal>

                <div className="container">
                    <h5 className="card-title text-center">Home</h5>
                </div>


            </>
        );
    }
}

export default Home;