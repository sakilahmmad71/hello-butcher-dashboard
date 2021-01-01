import React from 'react';
import logo from './cover.png';

const Poster = () => {
    return (
        <div>
            <img
                src={logo}
                alt="hello butcher"
                style={{ width: '90%', height: '90%' }}
            />
        </div>
    );
};

export default Poster;
