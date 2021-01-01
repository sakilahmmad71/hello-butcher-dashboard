import React from 'react'
import { CircularProgress } from '@material-ui/core'

const Spinner = () => {
    return (
        <div style={ { display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', padding: 20 } }>
            <CircularProgress size={ 50 } />
        </div>
    )
}

export default Spinner
