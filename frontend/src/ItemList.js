import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MarkTaken from './MarkTaken.js';

const ItemList = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await axios.get('http://localhost:5001/items'); // Update URL if needed
                setItems(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching items', error);
            }
        };

        fetchItems();
    }, []);

    const handleStatusChange = (itemId, newStatus) => {
        setItems((prevItems) =>
            prevItems.map((item) =>
                item._id === itemId ? { ...item, status: newStatus } : item
            )
        );
    };

    const filteredItems = items.filter(item => item.status === 1);
    console.log(filteredItems);

    return (
        <div>
            <h2>Historical Entries</h2>
            <ul>
                {filteredItems.map((item) => (
                    <li key={item._id}>
                        <h3>{item.title}</h3>
                        <p>{item.description}</p>
                        {item.imageUrl && <img src={`http://localhost:5001/${item.imageUrl}`} alt={item.title} />}
                        <MarkTaken
                            itemId={item._id}
                            currentStatus={item.status}
                            onStatusChange={handleStatusChange}
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ItemList;
