// src/admin/views/ProductForm.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import Header from './componets/Header';
const ProductForm = () => {
    const { id } = useParams();
    const history = useHistory();
    const [product, setProduct] = useState({ name: '', description: '', price: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (id) {
            fetch(`https://api.example.com/products/${id}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    setProduct(data);
                })
                .catch(error => {
                    setError(error);
                });
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        const url = id ? `https://api.example.com/products/${id}` : 'https://api.example.com/products';
        const method = id ? 'PUT' : 'POST';

        fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(product),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setLoading(false);
                history.push('/admin/products');
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    };

    return (
        <>
        <Header/>
        <div className="container mx-auto px-4">
            <h1 className="text-2xl font-bold mb-4">{id ? 'Edit Product' : 'Add Product'}</h1>
            {error && <div className="text-red-500 mb-4">{error.message}</div>}
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700">Name</label>
                    <input type="text" name="name" value={product.name} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded mt-1" />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Description</label>
                    <textarea name="description" value={product.description} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded mt-1"></textarea>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Price</label>
                    <input type="number" name="price" value={product.price} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded mt-1" />
                </div>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded" disabled={loading}>{loading ? 'Saving...' : 'Save'}</button>
            </form>
        </div>
  </>
    );
};

export default ProductForm;
