import React from 'react';

import './Products.css';

const Products = ({ skew, name }) => {
    return (
        <div className="salesproducts__container">
            <div className="salesproducts__container--image"></div>
            <div className="salesproducts__container--text">
                <h6 style={{ color: 'green' }}>{skew}</h6>
                <h3>{name}</h3>
            </div>
        </div>
    );
};

export default Products;
