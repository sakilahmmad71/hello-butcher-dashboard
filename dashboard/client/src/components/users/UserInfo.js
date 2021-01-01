import React from 'react'

import './UserInfo.css'

// Active, inactive and color

const UserInfo = ({ icon, text, active, inactive }) => {
    return (
        <div className="userinfo">
            <div className="userinfo__icon">{icon}</div>
            <div className="userinfo__text">{text}</div>
        </div>
    )
}

export default UserInfo
