import React from 'react';
import { Avatar } from '@material-ui/core';

import './Buyer.css';

const Buyer = ({ email, date }) => {
    return (
        <div className="salesbuyer__container">
            <div className="salesbuyer__container--image">
                <Avatar style={{ background: '#6ab187' }}></Avatar>
            </div>
            <div className="salesbuyer__container--text">
                <p>{email}</p>
                <h5>{date}</h5>
            </div>
        </div>
    );
};

export default Buyer;
