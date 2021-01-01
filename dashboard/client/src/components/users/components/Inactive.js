import React from 'react';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

const Inactive = () => {
    return (
        <div className="usermodal__inactivetext">
            <div className="usermodal__inactivetext--icon">
                <FiberManualRecordIcon />
            </div>
            <div className="usermodal__inactivetext--info">Inactive</div>
        </div>
    );
};

export default Inactive;
