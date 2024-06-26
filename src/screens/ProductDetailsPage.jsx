import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import './ProductDetailsPage.css';

const ProductDetailsPage = () => {
    const { id } = useParams();
    const { data: product, loading, error } = useFetch(`/products/${id}`);
    const [sections, setSections] = useState({
        description: false,
        allergens: false,
        usage: false
    });

    const toggleSection = (section) => {
        setSections(prevSections => ({
            ...prevSections,
            [section]: !prevSections[section]
        }));
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (!product) {
        return <div>Product not found</div>;
    }

    return (
        <div className="product-details">
            <h1>{product.name}</h1>
            <p>Price: ${product.price}</p>

            <div className="section">
                <h2 onClick={() => toggleSection('description')}>Description</h2>
                {sections.description && <p>{product.description}</p>}
            </div>

            <div className="section">
                <h2 onClick={() => toggleSection('allergens')}>Allergen Information</h2>
                {sections.allergens && <p>{product.allergens}</p>}
            </div>

            <div className="section">
                <h2 onClick={() => toggleSection('usage')}>Usage Instructions</h2>
                {sections.usage && <p>{product.usage}</p>}
            </div>
        </div>
    );
};

export default ProductDetailsPage;
