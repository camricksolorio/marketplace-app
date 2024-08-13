import React, { useState } from 'react';
import axios from 'axios';

function UploadForm() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);

    const handleSubmit = async (e) => {
        //prevents default HTML behavior, in this case for the <input> event 
        e.preventDefault();

        // create formData object
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('image', image);

        const status = 1;
        formData.append('status', status);


        const timestamp = new Date().toISOString();
        formData.append('timestamp', timestamp);

        for (const pair of formData.entries()) {
            console.log(pair[0], pair[1]);
        }

        try {
            const response = await axios.post('http://localhost:5001/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log('Upload successful:', response.data);
        } catch (error) {
            console.error('Error uploading the form data', error);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Title:</label>
                <input
                    type='text'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Description:</label>
                <input
                    type='text'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Image:</label>
                <input
                    type='file'
                    onChange={(e) => setImage(e.target.files[0])}
                    required
                />
            </div>
            <button type='submit'>Upload</button>
        </form>
    )
}

export default UploadForm;