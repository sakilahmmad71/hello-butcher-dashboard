import React from 'react';
import { Switch, Route } from 'react-router-dom';

import './Wrapper.css';
import Dashboard from '../pages/Dashboard';
import Navbar from '../components/navbar/Navbar';
import AddProduct from '../pages/AddProduct';

const Wrapper = () => {
    return (
        <div className="wrapper">
            <Navbar />
            <Switch>
                <Route exact path="/dashboard">
                    <Dashboard />
                </Route>
                <Route path="/addproduct">
                    <AddProduct />
                </Route>
            </Switch>
        </div>
    );
};

export default Wrapper;
