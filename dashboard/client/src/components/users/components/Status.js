import React from 'react';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

import './Status.css';

const Status = ({ active }) => {
    return (
        <div>
            {active ? (<div className="userprofilestatus__active">
                <FiberManualRecordIcon fontSize="small" size="small" />
                <p> Active</p>
            </div>) : (<div className="userprofilestatus__inactive">
                <FiberManualRecordIcon fontSize="small" size="small" />
                <p> Inactive</p>
            </div>)}
        </div>
    );
};

export default Status;
