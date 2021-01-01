import React from 'react';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

const Active = () => {
    return (
        <div className="usermodal__activetext">
            <div className="usermodal__activetext--icon">
                <FiberManualRecordIcon />
            </div>
            <div className="usermodal__activetext--info">Active</div>
        </div>
    );
};

export default Active;
