import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MarkTaken = ({ itemId, currentStatus, onStatusChange }) => {
    const handleMarkTaken = async () => {
        try {
            //Toggle status
            const newStatus = currentStatus === 1 ? 0 : 1;

            //Update status on the server
            await axios.patch(`http://localhost:5001/items/${itemId}/status`, { status: newStatus });

            // Call the onStatusChange callback to update the parent component state
            console.log(`status changed from ${currentStatus} to ${newStatus}`)
            console.log(`handleMarkTaken item id is ${itemId}`);
            onStatusChange(itemId, newStatus);
        } catch (error) {
            console.error('Error updating status when running handleMarkTaken', error);
            console.log(`handleMarkTaken item id is ${itemId}`);
        }

    }

    return (
        <div>
            <button onClick={handleMarkTaken}>
                {currentStatus === 1 ? 'Mark as Taken' : 'Mark as Available'}
            </button>
        </div>
    )
}

export default MarkTaken;