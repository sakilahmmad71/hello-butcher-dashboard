import React from 'react';
import './StatusItem.css';
import { motion } from 'framer-motion';

const StatusItem = ({ title, subtitle, icon }) => {
    return (
        <motion.div className="status__item" whileHover={{ scale: 1.05 }}>
            <div className="status__item--icon">{icon}</div>
            <div className="status__item--text">
                <h3>{title}</h3>
                <p>{subtitle}</p>
            </div>
        </motion.div>
    );
};

export default StatusItem;
