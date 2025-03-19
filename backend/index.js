const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// MongoDB connection
const dbURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/devopsdb';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Define a simple schema and model
const messageSchema = new mongoose.Schema({ message: String });
const Message = mongoose.model('Message', messageSchema);

// API endpoint
app.get('/api', async (req, res) => {
  try {
    const message = await Message.findOne();
    res.json({ message: message ? message.message : 'Hello, DevOps World!' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
