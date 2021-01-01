import React from 'react';
import { motion } from 'framer-motion';

const ActivityItem = ({ bg, title, subtitle, icon }) => {
    return (
        <div>
            <motion.div style={{ background: bg }} className={`activity__items`} initial={{ y: '30vh', opacity: 0 }} animate={{ y: 0, opacity: 1 }} whileHover={{ scale: 1.05 }}>
                <div className="activity__item">
                    <div className="activity__item--text">
                        <h1>{title}</h1>
                        <h3>{subtitle}</h3>
                    </div>
                    <div className="activity__item--icon">{icon}</div>
                </div>
            </motion.div>
        </div>
    );
};

export default ActivityItem;
