import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';



/* PAGES */
import Login from './view/login';
import Register from './view/register';
import ForgotPassword from './view/forgotPassword';
import ResetPassword from './view/resetPassword';
import Home from './view/home';
function App() {
  return (


    <Router>
        <Route exact path='/' component={Login} />
        <Route exact path='/register' component={Register} />
        <Route exact path='/forgot-password' component={ForgotPassword} />
        <Route exact path='/home' component={Home} />
    </Router>
    
  );
}

export default App;
