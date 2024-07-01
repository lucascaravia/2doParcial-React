// src/admin/views/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className="bg-gray-800 text-white py-4">
            <div className="container mx-auto px-4 flex justify-between items-center">
                <h1 className="text-2xl font-bold">
                    <Link to="/admin">Admin Dashboard</Link>
                </h1>
                <nav>
                    <ul className="flex space-x-4">
                        <li>
                            <Link to="/admin/products" className="hover:underline">Products</Link>
                        </li>
                        <li>
                            <Link to="/admin/products/new" className="hover:underline">Add Product</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
