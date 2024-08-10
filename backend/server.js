const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

// MongoDB connection string
const mongoURI = 'mongodb+srv://soloriocamrick:LEhnCg2umfS1LC9C@pebbiecluster.czvp5on.mongodb.net/?retryWrites=true&w=majority&appName=PebbieCluster';

// Connect to MongoDB
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Define a schema and model for your data
const itemSchema = new mongoose.Schema({
    title: String,
    description: String,
    imageUrl: String
});
const Item = mongoose.model('Item', itemSchema);

// API endpoint for handling form data
app.post('/upload', upload.single('image'), async (req, res) => {
    const { title, description, timestamp } = req.body;
    const imageUrl = req.file ? `/uploads/${path.basename(req.file.path)}` : null;

    const newItem = new Item({ title, description, timestamp, imageUrl });
    await newItem.save();

    res.send({ message: 'Upload successful', item: newItem });
});

app.get('/items', async (req, res) => {
    try {
        const items = await Item.find(); // Fetch all items from the database
        res.json(items)
    } catch (error) {
        console.error('Error fetching items', error);
        res.status(500).send('Server error');
    }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
