// src/admin/views/ProductList.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from './componets/Header';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('https://api.example.com/products')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setProducts(data);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }, []);

    const handleDelete = (id) => {
        fetch(`https://api.example.com/products/${id}`, {
            method: 'DELETE',
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                setProducts(products.filter(product => product.id !== id));
            })
            .catch(error => {
                setError(error);
            });
    };

    if (loading) {
        return <div className="text-center">Loading...</div>;
    }

    if (error) {
        return <div className="text-center text-red-500">Error: {error.message}</div>;
    }

    return (
        <>
        <Header></Header>
        <div className="container mx-auto px-4">
            <h1 className="text-2xl font-bold mb-4">Product List</h1>
            <Link to="/admin/products/new" className="bg-blue-500 text-white px-4 py-2 rounded">Add Product</Link>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                {products.map(product => (
                    <div key={product.id} className="bg-white rounded-lg shadow p-4">
                        <h2 className="text-xl font-semibold">{product.name}</h2>
                        <p className="mt-2 text-gray-600">{product.description}</p>
                        <p className="mt-2 text-green-600 font-bold">${product.price}</p>
                        <div className="mt-4">
                            <Link to={`/admin/products/edit/${product.id}`} className="bg-yellow-500 text-white px-4 py-2 rounded mr-2">Edit</Link>
                            <button onClick={() => handleDelete(product.id)} className="bg-red-500 text-white px-4 py-2 rounded">Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        </>
    );
};

export default ProductList;
