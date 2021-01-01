import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { connect } from 'react-redux';

import './Application.css';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import Navbar from '../components/navbar/Navbar';
import AddProductFormPage from '../pages/AddProductFormPage';
// import EditProductFormPage from '../pages/EditProductFormPage'
// import Landing from '../pages/Landing';
import Products from '../pages/Products';
import Users from '../pages/Users';
import Orders from '../pages/Orders';
import Notification from '../pages/Notification'

import { logoutUser, setCurrentUser } from '../redux/actions/authAction';
import setAuthToken from '../utils/setAuthToken';
import PrivateRoute from '../components/private/PrivateRoute';
import NotificationFormPage from '../pages/NotificationFormPage';
import Address from '../pages/Address';
import Postcode from '../pages/Postcode';
import PostcodeFormPage from '../pages/PostcodeFormPage';
import Device from '../pages/Device';
import EditOrder from '../components/orders/EditOrder';

const Application = (props) => {
    const { auth } = props

    useEffect(() => {
        if (localStorage.jwtToken) {
            setAuthToken(localStorage.jwtToken);
            const decoded = jwt_decode(localStorage.jwtToken);
            props.setCurrentUser(decoded);
            const currenTime = Date.now() / 1000;

            if (decoded.exp < currenTime) {
                props.logoutUser(props)
                props.history.push('/login')
            }
        }
    }, []);

    return (
        <div className="application">
            <Route path="/" exact component={Dashboard} />

            <Route path="/login" exact component={Login} />

            {auth.isAuthenticated && <Navbar />}

            <Switch><PrivateRoute exact path="/dashboard" component={Dashboard} /></Switch>

            <Switch><PrivateRoute exact path="/add-product" component={AddProductFormPage} /></Switch>

            {/* <Switch><PrivateRoute exact path="/edit-product" component={EditProductFormPage} /></Switch> */}

            <Switch><PrivateRoute exact path="/products" component={Products} /></Switch>

            <Switch><PrivateRoute exact path="/users" component={Users} /></Switch>

            <Switch><PrivateRoute exact path="/orders" component={Orders} /></Switch>

            <Switch><PrivateRoute exact path="/orders/:id" component={EditOrder} /></Switch>

            <Switch><PrivateRoute exact path="/notifications" component={Notification} /></Switch>

            <Switch><PrivateRoute exact path="/add-notification" component={NotificationFormPage} /></Switch>

            <Switch><PrivateRoute exact path="/address" component={Address} /></Switch>

            <Switch><PrivateRoute exact path="/postcode" component={Postcode} /></Switch>

            <Switch><PrivateRoute exact path="/add-postcode" component={PostcodeFormPage} /></Switch>

            <Switch><PrivateRoute exact path="/device" component={Device} /></Switch>

        </div>
    );
};

const stateMapsToProps = (state) => ({
    auth: state.auth
})

export default connect(stateMapsToProps, { setCurrentUser, logoutUser })(Application);
