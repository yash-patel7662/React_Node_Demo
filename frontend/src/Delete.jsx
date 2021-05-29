import React from 'react'
import DeleteIcon from '@material-ui/icons/Delete';

const Delete = (props) => {

    return (
        <>
            <div>
                <DeleteIcon onClick={props.onClick} />
            </div>
        </>
    )
}

export default Delete;