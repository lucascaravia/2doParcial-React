// src/admin/views/Admin.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ProductList from './ProductList';
import ProductForm from './ProductForm';

const Admin = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/admin/products" component={ProductList} />
                <Route path="/admin/products/new" component={ProductForm} />
                <Route path="/admin/products/edit/:id" component={ProductForm} />
            </Switch>
        </Router>
    );
};

export default Admin;
