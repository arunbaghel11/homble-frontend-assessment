import React, { useState } from 'react';
import { getRequest, postRequest } from '../axios';
import useFetch from '../hooks/useFetch';
import './ProductListingPage.css';

const ProductListingPage = () => {
    const { data: products, loading, error, refetch } = useFetch('/products');
    const [showModal, setShowModal] = useState(false);
    const [newProduct, setNewProduct] = useState({
        name: '',
        description: '',
        allergens: ''
    });

    const handleAddProduct = () => {
        postRequest('/products', newProduct, { contentType: 'application/json' })
            .then(() => {
                refetch();
                setShowModal(false);
                setNewProduct({ name: '', description: '', allergens: '' });
            })
            .catch(err => {
                console.error('Error adding product:', err);
            });
    };

    return (
        <div className="product-listing">
            <button onClick={() => setShowModal(true)}>Add Product</button>
            <div className="product-grid">
                {loading ? (
                    <div className="skeleton">Loading...</div>
                ) : error ? (
                    <div>{error}</div>
                ) : (
                    products.sort((a, b) => a.price - b.price).map(product => (
                        <div className="product-tile" key={product.id} onClick={() => window.location.href = `/products/${product.id}`}>
                            <h3>{product.name}</h3>
                            <p>${product.price}</p>
                        </div>
                    ))
                )}
            </div>
            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Add Product</h2>
                        <input
                            type="text"
                            placeholder="Product Name"
                            value={newProduct.name}
                            onChange={e => setNewProduct({ ...newProduct, name: e.target.value })}
                        />
                        <input
                            type="text"
                            placeholder="Product Description"
                            value={newProduct.description}
                            onChange={e => setNewProduct({ ...newProduct, description: e.target.value })}
                        />
                        <input
                            type="text"
                            placeholder="Product Allergen Info"
                            value={newProduct.allergens}
                            onChange={e => setNewProduct({ ...newProduct, allergens: e.target.value })}
                        />
                        <button onClick={handleAddProduct}>Add</button>
                        <button onClick={() => setShowModal(false)}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductListingPage;
